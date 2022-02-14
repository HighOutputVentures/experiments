/* eslint-disable no-console */
import jsonwebtoken from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { ethers } from 'ethers';
import axios from 'axios';
import ObjectId, { ObjectType } from '../../../../library/object-id';
import { Context } from '../../types';
import { DiscordUserInfo } from '../../../../types/discord-userinfo';

export default {
  Mutation: {
    async generateAccessTokenByGoogle(_: never, args: {
      request: {
        accessToken: string;
      }
    }, ctx: Context) {
      const tokenInfoResponse = await axios.post('https://oauth2.googleapis.com/tokeninfo', {}, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${args.request.accessToken}`,
        },
      });

      const tokenInfo = tokenInfoResponse.data;

      if (!tokenInfo.email) {
        return {
          data: null,
          error: {
            __typename: 'InvalidGoogleAccessTokenError',
            message: 'Invalid Google Access Token',
          },
        };
      }

      let adminAccountData = await ctx.services.account.adminAccountController.findOneAdminAccount({
        filter: {
          emailAddress: tokenInfo.email,
        },
      });

      if (!adminAccountData) {
        adminAccountData = await ctx.services.account.adminAccountController.createAdminAccount({
          id: ObjectId.generate(ObjectType.ADMIN).buffer,
          data: {
            emailAddress: tokenInfo.email,
          },
        });
      }

      return {
        data: {
          accessToken: jsonwebtoken.sign(
            { role: adminAccountData.role },
            ctx.config.JWT_SECRET,
            {
              subject: new ObjectId(adminAccountData.id).toString(),
              expiresIn: '30d',
            },
          ),
        },
        error: null,
      };
    },
    async generateProjectAccessToken(_: never, args: {
      request: {
        projectId: string;
        discordAccessToken: string;
        ethAddress: string;
        timestamp: string;
        signature: string;
        ttl: string;
      }
    }, ctx: Context) {
      const {
        discordAccessToken, ethAddress, timestamp, signature,
      } = args.request;

      if (DateTime.now()
        .diff(DateTime.fromISO(timestamp.slice(0, -1)), 'minutes').minutes < 10) {
        return {
          error: {
            __typename: 'InvalidAuthenticationSignatureError',
            message: 'Invalid Timestamp',
          },
          data: null,
        };
      }

      const message = `Timestamp: ${timestamp}`;

      const timestampBytes = ethers.utils.toUtf8Bytes(
        `\u0019Ethereum Signed Message:\n${
          message.length.toString()
        }${message}`,
        ethers.utils.UnicodeNormalizationForm.current,
      );
      const timestampHash = ethers.utils.keccak256(timestampBytes);

      const recoveredAddress = ethers.utils.verifyMessage(timestampHash, signature);

      if (ethAddress !== recoveredAddress) {
        return {
          error: {
            __typename: 'InvalidAuthenticationSignatureError',
            message: 'Invalid Authentication Signature',
          },
          data: null,
        };
      }

      const response = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${discordAccessToken}`,
        },
      });

      const userInfo:DiscordUserInfo = response.data;

      if (!userInfo.id) {
        return {
          data: null,
          error: {
            __typename: 'InvalidDiscordAccessTokenError',
            message: 'Invalid Discord Access Token',
          },
        };
      }

      const ownershipExists = await ctx.services.worker.ownershipController.ownershipExists({
        filter: {
          owner: ethAddress,
        },
      });

      if (!ownershipExists) {
        return {
          data: null,
          error: {
            __typename: 'NftOwnershipDoesNotExistError',
            message: 'NFT Ownership does not exist',
          },
        };
      }

      let holderAccount = await ctx.services.account.holderAccountController.findOneHolderAccount({
        filter: {
          ethereumAddress: ethAddress,
        },
      });

      if (!holderAccount) {
        holderAccount = await ctx.services.account.holderAccountController.createHolderAccount({
          id: ObjectId.generate(ObjectType.HOLDER).buffer,
          data: {
            ethereumAddress: ethAddress,
            discordId: userInfo.id,
          },
        });
      }

      const projectId = ObjectId.from(args.request.projectId).buffer;

      const project = await ctx.services.project.projectController.findOneProject({
        id: projectId,
      });

      if (!project) {
        return {
          data: null,
          error: {
            __typename: 'ProjectDoesNotExistError',
            message: 'Project does not exist',
          },
        };
      }

      const addMemberResponse = await axios
        .put(`https://discord.com/api/guilds/${project.discordGuild}/members/${userInfo.id}`, {
          access_token: discordAccessToken,
        }, {
          headers: {
            Authorization: `Bearer ${project.discordAccessToken}`,
          },
        });

      console.log(addMemberResponse.data);

      return {
        data: {
          accessToken: jsonwebtoken.sign(
            { role: holderAccount.role },
            ctx.config.JWT_SECRET,
            {
              subject: new ObjectId(holderAccount.id).toString(),
              expiresIn: '30d',
            },
          ),
        },
        error: null,
      };
    },
  },
};
