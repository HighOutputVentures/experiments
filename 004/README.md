## Authors

- [ALRES ARENA](https://app.identifi.com/profile/00797e4189900e4762e3f459337dd735) (Backend Developer)
- [ALEXANDER SARITA](https://app.identifi.com/profile/00797e4189900e4762e3f459337dd735) (Frontend Developer)

## Goal Statements

At the end of this experiment, we should be able to;

- Implement token gating mechanism
- Create an app that will let a creator/admin create an online space where he/she will set specific space (discord, youtube etc) and NFT collection to be checked.
- Create an app that will check if the NFT holder owns the NFT set by the creator/admin
- Know how to use Etherscan API to retrieve transactions of ERC-721 NFT tokens by NFT collection's smart contract address.
- Build an auto-update worker service to update an ownership table when its collection status is updated.
- Auto remove the access of users if he/she doesn't own an NFT

## Abstract

In this experiment, We are going to build a web application that provides exclusive access only to NFT token holders. Side-tasks such as fetching of transaction data of NFT smart contract on backend was achieved using Etherscan API, and the auto-creation of roles, setting private channels, and adding of guild member features were implemented using the Discord API. The token ownership validation was achieved by checking the ownership table if the holder's Ethereum address owns an NFT.

One of the few challenges that we encountered was the speed of updating the ownership table on MongoDB, it takes a long time to finish the updates. To abate this kind of problem, we created an implementation that will reduce the time of updating the ownership table by storing the instructions into an array and executing it using the bulk write function of MongoDB which executes multiple instructions into a single execution.

In the last days of this experiment, we were having issues like getting the channel list of the discord server because the discord user token is limited only for basic access of Discord API, and we resolved it by using the discord bot token which has higher permission than discord user token. This way, our token gating project is working correctly.

## Conclusion

Due to the rising popularity of NFT tokens and exclusive digital content access, I would recommend that we consider adding the token gating experiment as one of the projects of this company because this experiment has potential feasibility, and we can attract customers like video bloggers, influencers, celebrities, etc.

## Resources

- [Discord API Documentation](https://discord.com/developers/docs)
- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
- [Discord Authorization Code Grant Documentation](https://discord.com/developers/docs/topics/oauth2#authorization-code-grant)
- [Discord Bot Documentation](https://discord.com/developers/docs/topics/oauth2#bots)
- [Etherscan API Documentation](https://docs.Etherscan.io/)
- [Etherscan Rinkeby Testnet API Documentation](https://rinkeby.Etherscan.io/apidoc)
- [Etherscan Sample API](https://API.Etherscan.io/apis)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Token Info Documentation](https://developers.google.com/identity/sign-in/web/backend-auth)
- [@highoutput/async-group](https://www.npmjs.com/package/@highoutput/async-group)
- [Axios](https://www.npmjs.com/package/axios)
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [React Query Documentation](https://react-query.tanstack.com/overview)
- [NextJS Documentation](https://nextjs.org/docs)

## Documentation

**Topics learned on Week 1**

- [create discord bots](./docs/create-discord-bots/index.md)
- [acquiring discord bot tokens](./docs/acquiring-discord-bot-tokens/index.md)
- create roles using Discord API
- convert channels into private channels using Discord API
- [acquire user tokens using Discord OAuth2 authorization code grant](./docs/acquire-discord-user-access-tokens/index.md)
- get user information using discord user tokens
- retrieve guild list using discord user tokens
- add roles to channel using Discord API
- fetch transactions of NFT collection smart contract using Etherscan API

**Create Roles using Discord API**

```tsx
const discordRoleResponse = await axios.post(
  `https://discord.com/api/guilds/${params.guildId}/roles`,
  {
    name: params.roleName,
  },
  {
    headers: {
      Authorization: `Bot ${this.BOT_TOKEN}`,
    },
  }
);
```

_Note: Make sure your Bot has **Manage Roles** permission enabled._

**Add Roles to Channels**

```tsx
await axios.put(
  `https://discord.com/api/v9/channels/${params.channelId}/permissions/${params.roleId}`,
  {
    id: params.roleId, // role id
    type: 0,
    allow: "1024", // 1024 - TRUE, 0 - FALSE
    deny: "0", // 1024 - TRUE, 0 - FALSE
  },
  {
    headers: {
      Authorization: `Bot ${this.BOT_TOKEN}`,
    },
  }
);
```

_Note: Make sure your Bot has **Manage Channels** permission enabled._

**Convert Channels to Private Channels**

```tsx
await axios.put(
  `https://discord.com/api/v9/channels/${params.channelId}/permissions/${params.guildId}`,
  {
    id: params.guildId, // guild id is everyone role id
    type: 0,
    allow: "0", // 1024 - TRUE, 0 - FALSE
    deny: "1024", // 1024 - TRUE, 0 - FALSE
  },
  {
    headers: {
      Authorization: `Bot ${this.BOT_TOKEN}`,
    },
  }
);
```

_Note: Make sure your Bot has **Manage Channels** permission enabled._

**Add Guild Member to Server with Role**

```tsx
await axios.put(
  `https://discord.com/api/guilds/${params.guildId}/members/${params.userId}`,
  {
    access_token: params.userOAuth2Token,
    roles: [params.roleId],
  },
  {
    headers: {
      Authorization: `Bot ${this.BOT_TOKEN}`,
    },
  }
);
```

_Note: Make sure your Bot has **Guilds.Join** permission enabled._

**Get Discord User Information**

```tsx
const discordUserResponse = await axios.get(
  "https://discord.com/api/users/@me",
  {
    headers: {
      Authorization: `Bearer ${params.userOAuth2Token}`,
    },
  }
);
```

**Get Transactions of NFT Collection Smart Contract Sample Request**

https://api.etherscan.io/API?module=account&action=tokennfttx&contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d&page=1&offset=5&startblock=0&sort=desc&apikey=S1W3GXNSMC72X93RF6XD2VPMQVXUUC5KY2

**Challenges**

- assigning roles to channels using Discord API
- increase ownership table update speed
- auto-retry of update worker service when fetching of the transaction fails

**Topics learned on Week 2**

- acquiring access token using Google OAuth2
- retrieve token information using Google API
- retrieve channel list using discord bot tokens
- add guild members with roles using Discord API
- remove roles of a guild member using Discord API
- discord role hierarchy on servers
- running worker service in the background using async-group

**Terminologies**

- OAuth2 **-** a protocol that allows a user to grant a third-party website or application access to the user's protected resources, without necessarily revealing their long-term credentials or even their identity.
- API **-** (Application Programming Interface), an interface that delivers the request from the client to the provider and then delivers the response back to the client.
- Discord **-** a VoIP, instant messaging, and digital distribution platform.
- NFT **-** (Non-Fungible Token), a non-interchangeable unit of data stored on a blockchain, a form of digital ledger, that can be sold and traded.

## Developing

**Week 1**

- Build Worker Service Base Code
- Add syncCollection function to fetch transactions from etherscan
- Build API Service Base Code
- Integrate Worker Service to API Service
- Create resolver for Mutation.generateAccessTokenByGoogle
- Create resolver for Mutation.createProject
- Create resolver for Mutation.deleteProject
- Create resolver for Query.projects
- Create resolver for Mutation.generateProjectAccessToken
- Create access endpoint for redirection
- Add test for Mutation.createProject
- Add test for Mutation.deleteProject
- Add test for Query.projects
- Add test for Mutation.generateProjectAccessToken
- Add test for access endpoint test
- Created wireframe of the app
- Initialized Frontend project from the scaffold
- Setup the codegen for type generations
- Setup the GoogleOAuth2 for signup/login
- Created the initial dashboard and login UI
- Setup the OAuth2 setup for discord
- Developed the CRUD features of the app

**Week 2**

- Add discord guild member adding feature on generate project access token endpoint
- Auto remove role for discord users that didn't have owned a NFT
- Create docker container for token gating api service
- Create the grant page and worked on its features
- Linked the project to opensea api to get the assets
- Revamped the UI of the app

Once cloned the project and installed dependencies with `npm install`, start a development server:

```bash
ENV=staging BOT_TOKEN=<discord_bot_token> npm run start
```

## Building

Before creating a production version of your app, for your target environment. Then:

```bash
npm run build
```

## Production

Once cloned the project and installed dependencies with `npm install`, start a production server:

```bash
ENV=production BOT_TOKEN=<discord_bot_token> npm run start
```
