## Authors
* Ralph Kevin Casipe

## Goal Statements
We should be able to:
1. Implement custom smart contract, in this experiment it is `WorkflowModule`
2. Benchmark gas optimization with `SingleTransfer` vs `BulkTransfer`
3. Doing integrations with other well-known Smart COntracts:
   1. `UniswapV3`
   2. `GnosisSafe`
4. Practice security with Multi Signature using the feature of GnosisSafe.
5. Tried out different development environment for development contracts
6. Different technique of testing

<!-- TODO: Finish up Abstract -->
## Abstract
To develop a well-tested customized smart contract with the security and optimization in mind. In the first week we implemented the usage of `BulkTransfer` on a smart contract, `WorkflowModule`. By running `BulkTransfer` under the hood, we should make use of function selectors and transaction hash. We also tried implementing `UniSwap` in `WorkflowModule`, however could not since the `Rinkeby` test network is unstable for `UniSwap`. During the implementation phase we incorporate different kinds of techniques, simple tests, mocking tests and tests using the rinkeby network config from `Hardhat`. 

After we implemented the `BulkTransfer` into the `WorkflowModule`, we benchmark multiple single transfers and bulk transfers with multiple transactions in it. During the benchmarking we discover that as the number increases the BulkTransfer win over single transfer in optimizing gas fees. 

Lastly, we tried to redesign the workflow module for doing off-chain actions with signatures. This will help us on security on who executes the workflow making use of the delegates.

## Conclusion
I, the author, volunteer to take part in this interesting experiment with the help of my colleagues. I found 
that blockhain development is a huge game changer in IT industry and developing smart contract, my experiment, is just a small part of it.

The first thing that the developer should have is the basic understanding of what a blockchain is and what are basic concept of Ethereum's ecosystem. This would help anyone when reading documentation about smart contracts.

My main programming language is, JavaScript and learning to develop smart contract using Solidity is quite easy, given my background. But, there are several things to take note of when writing solidity is that the developer should prioritize security and optimization first.

I started writing this documentation as of now, the company, High Output Ventures, is still quite young in the space of blockchain development. We're not yet ready to rapidly deliver high standard blockchain products. However, we can accomplish simple products, given that we have enough leeway. We just need to have more exposure to the blockchain development so that we can try different use cases and solve different problems.

In this case, we can train developers to write smart contracts and flesh out ideas into MVP. So that, we can make ourselves, as a team, fit for blockchain development.

## Resources
* https://github.com/gnosis/safe-contracts
* https://medium.com/gauntlet-networks/multisig-transactions-with-gnosis-safe-f5dbe67c1c2d
* https://hardhat.org/
* https://docs.gnosis-safe.io/
* https://uniswap.org/developers
* https://www.quicknode.com/guides/web3-sdks/how-to-create-and-deploy-a-smart-contract-with-hardhat
* https://betterprogramming.pub/the-complete-hands-on-hardhat-tutorial-9e23728fc8a4


## Documentation

## Tutorials
<details>
  <summary><b>Getting started</b></summary>

  Create the project directory
  ```sh
  ~ $  mkdir getting-started; cd getting-started
  ```

  Initializing the NodeJS project
  ```sh
  ~/getting-started $ npm init -y
  ```

  Finding developments tools for smart contract development
  - Truffle Suite
  - Brownie
  - Dapp Tools
  - Foundry
  - **Hardhat**
  - Remix

  **Using hardhat**

  Install `hardhat`
  ```sh
  ~/getting-started $ npm install -D hardhat
  ```

  Barebones installation using `TypeScript`
  ```sh
  ~/getting-started $ npx hardhat 


  Welcome to Hardhat v2.0.8

  ? What do you want to do? …
    Create a sample project
    Create an advanced sample project
  > Create an advanced sample project that uses TypeScript
    Create an empty hardhat.config.js
    Quit
  ```

  > 💡 **TIP**
  > 
  >Hardhat will let you know how, but, in case you missed it, you can install them with,
  > ```sh
  >npm install -D @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
  >```

  Add this rule in `eslintrc.js`
  ```js
  'prettier/prettier': ['error', { singleQuote: true, trailingComma: true, semi: true }]
  ```

  Update the `"test"` iln `package.json`
  From:
  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  ```
  To:
  ```json
  "scripts": {
    "test": "hardhat test"
  }
  ```

  Install `chai-as-promised`
  ```sh
  npm i -D chai-as-promised @types/chai-as-promised
  ```

  Update the test
  ```ts
  import { expect, use } from "chai";
  import { ethers } from "hardhat";
  import chaiAsPromised from 'chai-as-promised';

  use(chaiAsPromised);

  describe("Lottery", function () {
    it('should be deployed', async () => {
      const Lottery = await ethers.getContractFactory('Lottery');

      await expect(Lottery.deploy('test')).to.eventually.fulfilled;
    });
  });
  ```
  Run the test above using `npm t` and **it will fail**.
  ```sh
    Lottery
      1) should be deployed


    0 passing (634ms)
    1 failing

    1) Lottery
        should be deployed:
      HardhatError: HH700: Artifact for contract "Lottery" not found. 
  ```

  Update the `Greeter.sol` to `Lottery.sol` to this:
  ```solidity
  //SPDX-License-Identifier: Unlicense
  pragma solidity ^0.8.0;

  contract Lottery {
      string private greeting;

      constructor(string memory _greeting) {
          greeting = _greeting;
      }

      function greet() public view returns (string memory) {
          return greeting;
      }

      function setGreeting(string memory _greeting) public {
          greeting = _greeting;
      }
  }
  ```
  Run the test again, `npm t` and it will pass:
  ```sh
    Lottery
      ✓ should be deployed (765ms)


    1 passing (766ms)
  ```

  We're going to remove the `constructor`, `#greet`, `setGreeting` and `.greeting`
  ```solidity
  //SPDX-License-Identifier: Unlicense
  pragma solidity ^0.8.0;

  contract Lottery {}
  ```

  Update the test so that we're expecting a method, `sum`.
  ```ts
  describe('#sum', () => {
    it('should have sum method', async () => {
      expect(contract.sum).to.be.exist;
    });
  });
  ```

  Run the tests and expect it to fail.
  ```
  FAILED
  ```

  Update the `Lottery.sol`
  ```
  //SPDX-License-Identifier: Unlicense
  pragma solidity ^0.8.0;

  contract Lottery {
    function sum() public {}
  }
  ```

  Run the tests and it will pass
  ```
  PASSED
  ```

  Update the test to have fully functional `#sum`
  ```ts
  describe('#sum', () => {
    it('should have sum method', async () => {
      expect(contract.sum).to.be.exist;
    });

    it('should return 3 when the given parametes are 1 and 2', async () => {
      const sum = await contract.sum(1, 2);

      expect(sum).to.be.exist;
    });
  });
  ```

  The test would fail again
  ```
  FAILED
  ```

  Update the `Lottery.sol` to pass the failing test
  ```
  //SPDX-License-Identifier: Unlicense
  pragma solidity ^0.8.0;

  contract Lottery {
    function sum(uint _a, uint _b) public pure returns(uint) {
        return _a + _b;
    }
  }
  ```

  Let deploy this contract in `Rinkeby` test network:
  Update your `hardhat.config.ts`
  ```ts
  ...

  const config: HardhatUserConfig = {
    solidity: "0.8.4",
    networks: {
      rinkeby: {
        url: process.env.RINKEBY_URL || "",
        accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      },
    },
    gasReporter: {
      enabled: process.env.REPORT_GAS !== undefined,
      currency: "USD",
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY
    },
    mocha: {
      bail: true,
    },
  };

  export default config;
  ```

  Choosing Node Providers:
  1. Infura
  2. **Alchemy**

  Registering to **Alchemy**

  Registering to **Etherscan**

  Exporting your private key in **Metamask**

  Update your `.env` file

  ```sh
  ETHERSCAN_API_KEY=<YOUR ETHERSCAN API KEY>
  RINKEBY_URL=<YOUR ALCHEMY API KEY>
  PRIVATE_KEY=<YOU ACCOUNT PRIVATE FROM METAMASK>
  ```
  
  Update your `scripts/deploy.ts`
  ```ts
  async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const owner = ethers.provider.getSigner('You accounts address');

    // We get the contract to deploy
    const Lottery = await ethers.getContractFactory("Lottery");
    const contract = await Lottery.deploy();

    await contract.deployed();

    console.log("Lottery deployed to:", contract.address);
  }
  ```

  Update your `package.json`
  ```json
  "scripts": {
    ...
    "deploy": "hardhat run scripts/deploy.ts --network rinkeby"
  }
  ```

  Run this command:
  ```sh
  npm run deploy rinkeby
  ```

  After that copy the contract address of the Lottery for verification

  And run:
  ```
  npx hardhat verifiy --network rinkeby <Lottery's contract address>
  ```
</details>

<details>
  <summary><b>Optimizations</b></summary>
</details>
____

### Experiment journey
**Week 1**
- Writing custom smart contract
- Integrate Uniswap
- Integrate GnosisSafe

**Week 2**
- Testing the custom smart contract
- Make integration work with the smart contract
- Try developing in Truffle and Hardhat

**Week 3**
- Benchmarking
- Redesign custom smart contract

**Week 4**
- Redesigning Workflow
- Apply security hash
- Apply nonce


### Redesigning WorkflowModule
### V1
- `#addWorkflow`
  - `IGnosisSafe _safe`
  - `address[] _delegates`
  - `Action[] calldata _actions`

- `#executeWorkflow`
  - `uint256 _workflow`

### V2
- ~`#addWorkflow`~
- `executeWorkflow`
  - `IGnosisSafe _safe`
  - `address[] _delegates`
  - `Action[] calldata _actions`
  - `bytes memory signatures`
    - Using the `_delegates`
    - Using the `_nonce`

