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

## Abstract
To develop a customized smart contract with the security and optimization in mind alongside with unit testing it.

Lastly, we tried to redesign the workflow module for doing off-chain actions with signatures.

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


## Documentation
--
### Prerequisites
--
### Development
--
### Using Hardhat
--
### Testing
--
### Deployment
--


### Progress

Redesigning WorkflowModule

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

Initiating a transaction
