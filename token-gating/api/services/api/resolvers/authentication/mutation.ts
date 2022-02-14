/* eslint-disable no-console */
import jsonwebtoken from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { ethers } from 'ethers';
import axios from 'axios';
import withQuery from 'with-query';
import fetch from 'node-fetch';
import ObjectId, { ObjectType } from '../../../../library/object-id';
import { Context } from '../../types';
import { DiscordUserInfo } from '../../../../types/discord-userinfo';
import { DiscordToken } from '../../../../types/discord-token';

export default {
  Mutation: {
    async generateAccessTokenByGoogle(_: never, args: {
      request: {
        googleAuthorizationCode: string;
      }
    }, ctx: Context) {
      const authorizationCodePayload = {
        code: args.request.googleAuthorizationCode,
        redirect_uri: 'http://localhost:3000',
        client_id: '170683676664-p6purmiveulul6b7gcgugldqlag3tb60.apps.googleusercontent.com',
        client_secret: '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',
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        grant_type: 'authorization_code',

      };

      const authorizationCodeResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: withQuery(null, authorizationCodePayload).slice(1),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const authorizationCodeInfo = await authorizationCodeResponse.json();

      if (!authorizationCodeInfo.access_token) {
        return {
          data: null,
          error: {
            __typename: 'InvalidGoogleAuthorizationCodeError',
            message: 'Invalid Google Authorization Code',
          },
        };
      }

      const tokenInfoResponse = await axios.post('https://oauth2.googleapis.com/tokeninfo', {}, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authorizationCodeInfo.access_token}`,
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
        discordAuthorizationCode: string;
        ethAddress: string;
        timestamp: string;
        signature: string;
        ttl: string;
      }
    }, ctx: Context) {
      const {
        discordAuthorizationCode, ethAddress, timestamp, signature,
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

      const requestBody = {
        client_id: ctx.config.CLIENT_ID,
        client_secret: ctx.config.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: discordAuthorizationCode,
        redirect_uri: ctx.config.REDIRECT_URI,
      };

      const tokenQueryResponse = await fetch('https://discord.com/api/v8/oauth2/token', {
        method: 'POST',
        body: withQuery(null, requestBody).slice(1),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const discordToken: DiscordToken = await tokenQueryResponse.json();

      if (!discordToken.access_token) {
        return {
          data: null,
          error: {
            __typename: 'InvalidDiscordAuthorizationCodeError',
            message: 'Invalid Discord Authorization Code',
          },
        };
      }

      const userInfoQueryResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${discordToken.access_token}`,
        },
      });

      const userInfo: DiscordUserInfo = userInfoQueryResponse.data;

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

      // await axios
      //   .put(`https://discord.com/api/guilds/${project.discordGuild}/members/${userInfo.id}`, {
      //     access_token: discordToken.access_token,
      //   }, {
      //     headers: {
      //       Authorization: `Bearer ${project.discordAccessToken}`,
      //     },
      //   });

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
