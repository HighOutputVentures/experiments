import { ParameterizedContext } from 'koa';
import {
  AccountRole, AdminAccount, HolderAccount, Project,
} from '../../types';
import BasicDataLoader from '../../library/basic-data-loader';
import { AccountService } from '../account';
import { ProjectService } from '../project';
import { WorkerService } from '../worker/src';
import { DiscordService } from '../discord';

export const TYPES = {
  PORT: Symbol.for('PORT'),
  ORIGIN_URL: Symbol.for('ORIGIN_URL'),
  SCHEME: Symbol.for('SCHEME'),
  BASE_URL: Symbol.for('BASE_URL'),
};

export type Context = ParameterizedContext<{
  claims: {
    sub: string;
    role: AccountRole;
  };
  user: Pick<AdminAccount, 'id' | 'role'> | Pick<HolderAccount, 'id' | 'role'>;
}> & {
  services: {
    account: AccountService;
    project: ProjectService;
    worker: WorkerService;
    discord: DiscordService;
  };
  config: {
    MONGODB_URI: string,
    JWT_SECRET: Buffer;
    BASE_URL: string;
    ENV: 'staging' | 'production';
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    REDIRECT_URI: string;
    BOT_TOKEN: string;
  };
  fetch: typeof fetch,
  loaders: {
    adminAccount: BasicDataLoader<AdminAccount>;
    project: BasicDataLoader<Project>;
    holderAccount: BasicDataLoader<HolderAccount>;
  }
};
