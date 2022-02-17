/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { inject, injectable } from 'inversify';
import Logger from '@highoutput/logger';
import Queue from 'p-queue';
import axios from 'axios';
import { TYPES as ACCOUNT_TYPES } from '../account/types';
import { TYPES as GLOBAL_TYPES } from '../../types';
import { TYPES as PROJECT_TYPES } from '../project/types';
import { TYPES as WORKER_TYPES } from '../worker/types';
import { TYPES } from '../worker/src/types';
import { WorkerService } from '../worker/src';
import OwnershipController from '../worker/src/controllers/ownership';
import HolderAccountRepository from '../account/repositories/holder-account';
import ProjectController from '../project/controllers/project';
import { DiscordUserInfo } from '../../types/discord-userinfo';
import { DiscordChannel } from '../../types/discord-channel';
import { DiscordRole, DiscordRoleAction } from '../../types/discord-role';

@injectable()
export class DiscordService {
  @inject(GLOBAL_TYPES.logger) private logger!: Logger;

  @inject(WORKER_TYPES.WorkerService) private workerService!: WorkerService;

  @inject(TYPES.OwnershipController) private ownershipController!: OwnershipController;

  @inject(ACCOUNT_TYPES.HolderAccountRepository) private holderAccountRepository!: HolderAccountRepository;

  @inject(PROJECT_TYPES.ProjectController) private projectController!: ProjectController;

  @inject(GLOBAL_TYPES.BOT_TOKEN) private BOT_TOKEN!: string;

  private localQueue: Queue = new Queue({ concurrency: 1, interval: 200, intervalCap: 1 });

  async getGuildRoles(params:{
    guildId: string;
  }): Promise<DiscordRole[]> {
    this.logger.info({
      name: 'getGuildRoles',
      params,
    });

    const getGuildRolesResponse = await axios.get(`https://discord.com/api/guilds/${params.guildId}/roles`, {
      headers: {
        Authorization: `Bot ${this.BOT_TOKEN}`,
      },
    });

    return getGuildRolesResponse.data || [];
  }

  async addRoleToChannelPermission(params:{
    roleId: string;
    guildId: string;
    channelId: string;
    roleAction: DiscordRoleAction;
  }) {
    this.logger.info({
      name: 'addRoleToChannelPermission',
      params,
    });
    await axios.put(`https://discord.com/api/v9/channels/${params.channelId}/permissions/${params.guildId}`, {
      id: params.roleId,
      type: 0,
      allow: params.roleAction === DiscordRoleAction.ALLOW ? '1024' : '0',
      deny: params.roleAction === DiscordRoleAction.DENY ? '1024' : '0',
    }, {
      headers: {
        Authorization: `Bot ${this.BOT_TOKEN}`,
      },
    });
  }

  async addGuildRole(params:{
    roleName: string;
    guildId: string;
  }): Promise<DiscordRole> {
    this.logger.info({
      name: 'addGuildRole',
      params,
    });
    const discordRoleResponse = await axios.post(`https://discord.com/api/guilds/${params.guildId}/roles`, {
      name: params.roleName,
    }, {
      headers: {
        Authorization: `Bot ${this.BOT_TOKEN}`,
      },
    });

    return discordRoleResponse.data;
  }

  async removeMemberRole(params:{
    userId: string;
    roleId: string;
    guildId: string;
  }): Promise<void> {
    this.logger.info({
      name: 'removeMemberRole',
      params,
    });
    await axios.delete(`https://discord.com/api/guilds/${params.guildId}/members/${params.userId}/roles/${params.roleId}`, {
      headers: {
        Authorization: `Bot ${this.BOT_TOKEN}`,
      },
    });
  }

  async addGuildMember(params: {
    guildId: string;
    userId: string;
    userOAuth2Token: string;
    roleId?: string | null;
  }): Promise<void> {
    this.logger.info({
      name: 'addGuildMember',
      params,
    });
    await axios
      .put(`https://discord.com/api/guilds/${params.guildId}/members/${params.userId}`, {
        access_token: params.userOAuth2Token,
        roles: [params.roleId],
      }, {
        headers: {
          Authorization: `Bot ${this.BOT_TOKEN}`,
        },
      });
  }

  async getGuildChannels(params: {
    guildId: string;
  }): Promise<DiscordChannel[]> {
    this.logger.info({
      name: 'getGuildChannels',
      params,
    });
    const channelsResponse = await axios.get(`https://discord.com/api/guilds/${params.guildId}/channels`, {
      headers: {
        Authorization: `Bot ${this.BOT_TOKEN}`,
      },
    });

    return channelsResponse.data || [];
  }

  async getUserInfo(params:{
    userOAuth2Token: string
  }): Promise<DiscordUserInfo> {
    this.logger.info({
      name: 'getUserInfo',
      params,
    });
    const userInfoQueryResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${params.userOAuth2Token}`,
      },
    });

    return userInfoQueryResponse.data;
  }

  async start() {
    this.logger.info('DiscordService => Starting');

    // await this.startAutoKick();

    this.logger.info('DiscordService => Started');
  }

  async stop() {
    this.logger.info('DiscordService => Stopping');
    await this.stopAutoKick();
    this.logger.info('DiscordService => Stopped');
  }

  async scanAndKickMember(contractAddress: string) {
    const batchSize = 1000;
    const model = await this.holderAccountRepository.model;

    const project = await this.projectController.findOneProject({
      filter: {
        contractAddress,
      },
    });

    if (project) {
      await this.localQueue.add(async () => {
        const cursor = model.collection.find({}, {
          batchSize,
        });

        while (await cursor.hasNext()) {
          const document = await cursor.next();

          if (document) {
            const ownership = await this.ownershipController.findOneOwnership({
              filter: {
                owner: document.ethereumAddress,
              },
            });

            if (!ownership) {
              await this.removeMemberRole({
                userId: document.discordId,
                roleId: project.discordRoleId,
                guildId: project.discordGuild,
              });
            }
          }
        }
      });
    }
  }

  async startAutoKick() {
    this.logger.info('DiscordService => AutoKick Starting');

    this.workerService.eventHandler.on('transfer', async (contractAddress) => {
      this.logger.info(`Event Changed: ${contractAddress}`);
      await this.scanAndKickMember(contractAddress);
    });

    this.logger.info('DiscordService => AutoKick Started');
  }

  async stopAutoKick() {
    this.logger.info('DiscordService => AutoKick Stopping');
    this.workerService.eventHandler.removeAllListeners();
    this.logger.info('DiscordService => AutoKick Stopped');
  }
}
