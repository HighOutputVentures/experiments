import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import "@nomiclabs/hardhat-solhint";

// import "hardhat-deploy";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.5.0',
      },
      {
        version: '0.8.9',
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/JRg6lBJPJ8PiIFVvvlkSqakwc5cGDCvj',
      accounts: [
        'e57a0b19e2a0a1a20864e9f4ef2b464b54d65dbe5bb6b5d8da677a955c5602aa',
        '65290224200a67be9fd9f791581e3fd5fa3d85a4a0869caf158d163a2fffb955',
        '21261d3bfaae1ad92618c1ef31b22141741852b90f89e26ddecd43d957b958a9',
      ],
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    require: ['ts-node/register/transpile-only'],
    timeout: '5m',
  },
};

export default config;
