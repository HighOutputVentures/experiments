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
* [https://cryptozombies.io/en/course/](https://cryptozombies.io/en/course/)
* [https://cryptozombies.io/en/lesson/3/chapter/4](https://cryptozombies.io/en/lesson/3/chapter/4)
* [https://cryptozombies.io/en/lesson/3/chapter/10](https://cryptozombies.io/en/lesson/3/chapter/10)
* [https://eip2535diamonds.substack.com/p/smart-contract-gas-optimization-with](https://eip2535diamonds.substack.com/p/smart-contract-gas-optimization-with)
* [https://eip2535diamonds.substack.com/p/how-eip2535-diamonds-reduces-gas](https://eip2535diamonds.substack.com/p/how-eip2535-diamonds-reduces-gas)
* [https://github.com/solidstate-network/solidstate-solidity](https://github.com/solidstate-network/solidstate-solidity)
* [https://github.com/BeanstalkFarms/Beanstalk](https://github.com/BeanstalkFarms/Beanstalk)
* [https://github.com/aavegotchi/aavegotchi-contracts](https://github.com/aavegotchi/aavegotchi-contracts)
* [https://github.com/crytic/not-so-smart-contracts](https://github.com/crytic/not-so-smart-contracts)
* [https://github.com/ConsenSys/smart-contract-best-practices](https://github.com/ConsenSys/smart-contract-best-practices)


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


  Structuring `struct`

  ```
  struct ExpensiveStruct {
    address addressOne;
    uint8 numberOne;
    string stringOne;
    uint8 numberTwo;
    address addressTwo;
    string stringTwo;
  }

  struct CheapStruct {
    address addressOne;
    address addressTwo;
    uint8 numberOne;
    uint8 numberTwo;
    string stringOne;
    string stringTwo;
  }
  ```

  **View functions don’t cost Gas**

  `view` functions don't cost any gas when they're called externally by a user.

  This is because `view` functions don't actually change anything on the blockchain – they only read the data. So marking a function with `view` tells `web3.js` that it only needs to query your local Ethereum node to run the function, and it doesn't actually have to create a transaction on the blockchain (which would need to be run on every single node, and cost gas).

  We'll cover setting up web3.js with your own node later. But for now, the big takeaway is that you can optimize your DApp's gas usage for your users by using read-only `external view` functions wherever possible.

  ```solidity
  contract MyContract {
    ...
    struct User {
      ...,
      string name;
    }
    
    User[] public users;

    function getNameByUser(uint userId) external view returns(string memory) {
      return users[userId].name;
    }
  }
  ```

  > *Note: If a `view` function is called internally from another function in the same contract that is **not** a `view` function, it will still cost gas. This is because the other function creates a transaction on Ethereum, and will still need to be verified from every node. So `view` functions are only free when they're called externally.*
  
  **Reading constants and immutable variables**

  ```solidity
  contract CallMyName {
    string public NAME = "ETH"; // Expensive 24586 Gas
    string public constant CONSTANT_NAME = "ETH"; // Cheap 21865 Gas
  }
  ```

  **Reading and writing local variables**

  Expensive:

  ```solidity
  contract Expensive {
    uint16[] public myArray;
    uint16 public myCounter = 0;

    function run() external {                
      for(uint256 index; index < myArray.length; index++) { // state reads
        myCounter++; // state reads and writes
      }        
    }
  }
  ```

  Cheap:

  ```solidity
  contract Cheap {
    uint16[] public myArray;
    uint16 public stateCounter = 0;

    function run() external {
        uint16 length = myArray.length; // one state read
        uint16 localCounter = myCounter; // one state read
    
        for(uint16 index; index < length; index++) { // local reads
            localCounter++; // local reads and writes  
        }
    
        stateCounter = localCounter; // one state write
    }
  }
  ```

  **Reading `calldata` variables like `calldata` arrays and structs.**


  Benchmarking results:

  **WorkflowModule**
  
  100 WEI = 0.0000000000000001 ETH

  Deployment
  - Actual Gas Fee `0.006974072544634064`

  Enabling Workflow Module
  - Actual Gas Fee `0.0001898125009111`


  Single Transfer
  Adding a workflow
  - Actual Gas Fee `0.001344555012907728` (3 Single Transfers)

  Execute Workflow
  - Actual Gas Fee `0.000358567502294832` (3 Single Transfers)
    
  ---

  Direct a single transfer
  - Actual Gas Fee `0.000133077500904927` ETH

  Total: 0.00039923250303416696

  Direct Bulk Transfer
  - Estimated Gas Fee 0.000254ETH
  - Actual Gas Fee 0.000253347501418746 ETH

  Bulk Transfer
  Adding a Workflow
  - Actual Gas Fee 0.001243105005469662 ETH  (3 Single Transfer into Bulk)

  Execute Workflow
  - Estimated Gas Fee 0.000317ETH (3 Single Transfer into Bulk)
  - Actual Gas Fee 0.00031673250126693 (3 Single Transfer into Bulk)

  Workflow with Bulk Transfer (3 ST) and 3 Single Transfers

  Add Workflow
  - Estimated Gas Fee 0.002272ETH
  - Actual Gas Fee 0.002271610009995084

  Execute Workflow
  - Estimated Gas Fee 0.000533ETH
  - Actual Gas Fee 0.0005333750025602
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

