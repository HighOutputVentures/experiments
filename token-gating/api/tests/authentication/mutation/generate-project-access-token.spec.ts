/* eslint-disable no-console */
import nock from 'nock';
import faker from 'faker';
import { ethers } from 'ethers';
import { DateTime } from 'luxon';
import { Context as FixtureContext, setup, teardown } from '../../helpers/fixture';
import { TYPES as PROJECT_TYPES } from '../../../services/project/types';
import { container } from '../../../inversify.config';
import ProjectRepository from '../../../services/project/repositories/project';
import { TYPES as GLOBAL_TYPES } from '../../../types';
import { TYPES as WORKER_TYPES } from '../../../services/worker/src/types';
import generateProject from '../../helpers/generate-project';
import ObjectId, { ObjectType } from '../../../library/object-id';
import OwnershipRepository from '../../../services/worker/src/repositories/ownership';
import generateOwnership from '../../helpers/generate-ownership';

type Context = FixtureContext & {
  projectRepository: ProjectRepository;
  ownershipRepository: OwnershipRepository;
  secret: Buffer;
};

describe('Mutation.generateProjectAccessToken', () => {
  beforeEach(async function (this: Context) {
    await setup.apply(this);

    this.ownershipRepository = container.get<OwnershipRepository>(WORKER_TYPES.OwnershipRepository);
    this.projectRepository = container.get<ProjectRepository>(PROJECT_TYPES.ProjectRepository);
    this.secret = container.get<Buffer>(GLOBAL_TYPES.JWT_SECRET);

    nock('https://discord.com').get('/api/users/@me').reply(200, {
      id: `93569146681729437${faker.datatype.number({
        min: 0,
        max: 9,
      })}`,
      email: faker.internet.email(),
    }, {
      'content-type': 'application/json',
    });
  });

  afterEach(async function (this: Context) {
    await Promise.all([
      this.projectRepository.clear(),
    ]);

    await teardown.apply(this);
  });

  test('should generate access token', async function (this: Context) {
    const project = generateProject();
    await this.projectRepository.create({
      id: project.id,
      data: {
        ...project,
      },
    });

    const timestamp = new Date(new Date().getTime() - (10 * 60000)).toISOString();

    const message = `Timestamp: ${timestamp}`;

    const timestampBytes = ethers.utils.toUtf8Bytes(
      `\u0019Ethereum Signed Message:\n${
        message.length.toString()
      }${message}`,
      ethers.utils.UnicodeNormalizationForm.current,
    );

    const timestampHash = ethers.utils.keccak256(timestampBytes);

    const privateKey = '0xb285734ffc1851bbbe69a0542fdbfc10204d71ac80c6aac76eeace3040c2e5b6';
    const provider = ethers.getDefaultProvider('rinkeby');
    const wallet = new ethers.Wallet(privateKey, provider);
    const ethAddress = wallet.address;
    const signature = await wallet.signMessage(timestampHash);

    const ownership = generateOwnership(ObjectId.generate(ObjectType.COLLECTION).buffer);

    await this.ownershipRepository.create({
      id: ownership.id,
      data: {
        collectionID: ownership.collectionID,
        owner: ethAddress,
        timestamp: DateTime.now().toMillis(),
        tokenID: faker.datatype.number({
          min: 1000, max: 9999,
        }).toString(),
      },
    });

    const query = `
      mutation ($request: GenerateProjectAccessTokenRequest){
        generateProjectAccessToken(request: $request){
          data {
            accessToken
          }
        }
      }
    `;

    const variables = {
      request: {
        projectId: new ObjectId(project.id).toString(),
        discordAccessToken: faker.git.commitSha(),
        ethAddress,
        timestamp,
        signature,
        ttl: 'P10D',
      },
    };

    const response = await this.request
      .post('/graphql')
      .send({
        query, variables,
      });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(['data', 'generateProjectAccessToken', 'data', 'accessToken']);
  });
});
