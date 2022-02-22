## Authors
* [ALRES ARENA](https://app.identifi.com/profile/00797e4189900e4762e3f459337dd735) (Backend Developer)
* [ALEXANDER SARITA](https://app.identifi.com/profile/00797e4189900e4762e3f459337dd735) (Frontend Developer)

## Goal Statements

At the end of this experiment, we should be able to;

- Know how to use etherscan api to retrieve transactions of erc-721 nft tokens by nft collections' smart contract address.
- Build an auto update worker service to update an ownership table when its collection status is updated.
- Know how to use discord api to create roles, private channels and get the list of guilds or server and channels.
- Create discord bots to get user information, tokens and auto remove access of non-nft owner. 
- Make discord channels exclusive only to nft owners.
- Add guild member with roles on the discord server.
- Auto remove access of discord user if he/she doesn't own an nft


## Abstract

In this experiment, We are going to build a web application that provides exclusive access only to nft token holders. Side-tasks such as fetching of transaction data of nft smart contract on the backend side was achieved using etherscan api and the auto creation of roles, setting private channels and adding of guild member features were implemented using the discord api. The token ownership validation was achieved by checking the ownership table if the holder's ethereum address owns an nft.

One of the few challenges that we encountered was the speed of updating the ownership table on mongodb, it takes a long time to finish the updates. To abate this kind of problem, we created an implementation that will reduce the time of updating the ownership table by storing the instructions into an array and execute it using the bulk write function of mongodb which executes multiple instructions into a single execution.

In the last days of this experiment, we were having an issues like getting the channel list of the discord server because the discord user token is limited only for basic access of discord api like user information, joining of guild and list of guilds and we resolved it by using the discord bot token which has higher permission that discord user token. This way, our token gating project works perfectly.

## Conclusion

Due to the rising popularity of nft tokens and exclusive digital content access, I would be recommend that we consider adding the token gating experiment as one of the projects of this company because this experiment is very feasible and we can attract potential customers like video bloggers, influencers celebrities and etc.  
## Resources

- [Discord API Documentation](https://discord.com/developers/docs) 
- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2) 
- [Discord Authorization Code Grant Documentation](https://discord.com/developers/docs/topics/oauth2#authorization-code-grant) 
- [Discord Bot Documentation](https://discord.com/developers/docs/topics/oauth2#bots) 
- [Etherscan API Documentation](https://docs.etherscan.io/) 
- [Etherscan Rinkeby Testnet API Documentation](https://rinkeby.etherscan.io/apidoc) 
- [Etherscan Sample API](https://api.etherscan.io/apis) 
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2) 
- [Google Token Info Documentation](https://developers.google.com/identity/sign-in/web/backend-auth) 
- [@highoutput/async-group](https://www.npmjs.com/package/@highoutput/async-group)
- [Axios](https://www.npmjs.com/package/axios)
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## Documentation

**Topics learned**

- acquiring discord bot tokens
- create servers using discord api
- create channels using discord api
- create roles using discord api
- create private channels using discord api
- setting discord permissions on channels
- add guild member with roles using discord api
- removing roles of a guild member using discord api
- getting discord user information on discord api using discord user tokens
- retrieve guild list on discord api using discord user tokens
- retrieve channel list on discord api using discord bot tokens
- add roles to channel using discord api
- acquiring discord user tokens using discord oauth2 authorization code grant
- discord role hierarchy on servers
- fetch transactions of nft collection smart contract using etherscan api
- acquiring google access token using google oauth2
- retrieve token information using google api
- running worker service in the background using async-group


**Topics to learn on Week 1**

- acquiring discord bot tokens
- create servers using discord api
- create channels using discord api
- create roles using discord api
- create private channels using discord api
- setting discord permissions on channels
- getting discord user information on discord api using discord user tokens
- acquiring discord user tokens using discord oauth2 authorization code grant
- retrieve guild list on discord api using discord user tokens
- fetch transactions of nft collection smart contract using etherscan api


**Challenges**

- assigning roles to discord channels using discord api
- increase ownership table update speed
- auto retry of auto update worker service when fetching of transaction fails

**Terminologies**

- OAuth2 **-** a protocol that allows a user to grant a third-party web site or application access to the user's protected resources, without necessarily revealing their long-term credentials or even their identity.
- API **-** (Application Programming Interface), an interface that delivers your request to the provider that you're requesting it from and then delivers the response back to you.
- Discord **-** a VoIP, instant messaging and digital distribution platform.
- NFT **-** (Non-Fungible Token), a non-interchangeable unit of data stored on a blockchain, a form of digital ledger, that can be sold and traded.

**Getting Discord User Information Request Sample Code**

```tsx
   await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${params.userOAuth2Token}`,
        },
      });

```

**Get Transactions of NFT Collection Smart Contract Request**

https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d&page=1&offset=5&startblock=0&sort=desc&apikey=S1W3GXNSMC72X93RF6XD2VPMQVXUUC5KY2


**Topics learned on Week 2**

- acquiring google access token using google oauth2
- retrieve token information using google api
- add roles to channel using discord api
- retrieve channel list on discord api using discord bot tokens
- add guild member with roles using discord api
- removing roles of a guild member using discord api
- discord role hierarchy on servers
- running worker service in the background using async-group


## Developing

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