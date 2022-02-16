/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  WorkflowModule,
  WorkflowModuleInterface,
} from "../WorkflowModule";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "ExecuteWorkflow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quote",
        type: "uint256",
      },
    ],
    name: "Quote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "poolFee",
        type: "uint24",
      },
    ],
    name: "SwapAndSend",
    type: "event",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IGnosisSafe",
        name: "_safe",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_delegates",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "bytes4",
            name: "selector",
            type: "bytes4",
          },
          {
            internalType: "bytes",
            name: "arguments",
            type: "bytes",
          },
        ],
        internalType: "struct WorkflowModule.Action[]",
        name: "_actions",
        type: "tuple[]",
      },
    ],
    name: "addWorkflow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IGnosisSafe",
        name: "safe",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct BulkTransfer.Transfer[]",
        name: "transfers",
        type: "tuple[]",
      },
    ],
    name: "executeBulkTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_workflow",
        type: "uint256",
      },
    ],
    name: "executeWorkflow",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greet",
        type: "string",
      },
    ],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_wethAmount",
        type: "uint256",
      },
    ],
    name: "quoteUsdtFromEth",
    outputs: [
      {
        internalType: "uint256",
        name: "quote",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "safeApproveWeth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "safeWorkflowCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "swapAndSend",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint24",
        name: "poolFee",
        type: "uint24",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "workflowDelegates",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "workflows",
    outputs: [
      {
        internalType: "contract IGnosisSafe",
        name: "safe",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505060805161303c61006060003960006108ec015261303c6000f3fe6080604052600436106100e15760003560e01c80639f69bee31161007f578063ead710c411610059578063ead710c4146102b9578063f0f56253146102f6578063feaec52514610312578063ffa1ad741461034f576100e8565b80639f69bee314610220578063a3f4df7e1461025d578063c158339214610288576100e8565b80635ef12cb2116100bb5780635ef12cb21461017e5780636751c831146101885780638da5cb5b146101b857806396a7bfcf146101e3576100e8565b80630ebaf650146100ed57806312065fe0146101165780632220907114610141576100e8565b366100e857005b600080fd5b3480156100f957600080fd5b50610114600480360381019061010f91906119c6565b61037a565b005b34801561012257600080fd5b5061012b61046f565b6040516101389190611a3f565b60405180910390f35b34801561014d57600080fd5b5061016860048036038101906101639190611b06565b61048e565b6040516101759190611a3f565b60405180910390f35b61018661074f565b005b6101a2600480360381019061019d9190611bc7565b6107af565b6040516101af9190611a3f565b60405180910390f35b3480156101c457600080fd5b506101cd6108ea565b6040516101da9190611c15565b60405180910390f35b3480156101ef57600080fd5b5061020a60048036038101906102059190611bc7565b61090e565b6040516102179190611c8f565b60405180910390f35b34801561022c57600080fd5b5061024760048036038101906102429190611cd6565b61095c565b6040516102549190611d38565b60405180910390f35b34801561026957600080fd5b506102726109ab565b60405161027f9190611dec565b60405180910390f35b6102a2600480360381019061029d9190611e0e565b6109e4565b6040516102b0929190611e59565b60405180910390f35b3480156102c557600080fd5b506102e060048036038101906102db9190611fb2565b610bfd565b6040516102ed9190611dec565b60405180910390f35b610310600480360381019061030b9190611bc7565b610c07565b005b34801561031e57600080fd5b5061033960048036038101906103349190611e0e565b611130565b6040516103469190611a3f565b60405180910390f35b34801561035b57600080fd5b50610364611148565b6040516103719190611dec565b60405180910390f35b610382611181565b8181600082829050116103ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c190612047565b60405180910390fd5b60005b8484905081101561046757610454868686848181106103ef576103ee612067565b5b90506060020160200160208101906104079190611e0e565b87878581811061041a57610419612067565b5b90506060020160000160208101906104329190611e0e565b88888681811061044557610444612067565b5b905060600201604001356111f1565b808061045f906120c5565b9150506103cd565b505050505050565b60003373ffffffffffffffffffffffffffffffffffffffff1631905090565b600080869050600060018160018154018082558091505003906000526020600020905050600080805490509050600060016000805490506104cf919061210e565b905088600082815481106104e6576104e5612067565b5b906000526020600020906003020160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555087876000838154811061054b5761054a612067565b5b90600052602060002090600302016002019190610569929190611820565b5060005b8686905081101561060c576000828154811061058c5761058b612067565b5b90600052602060002090600302016001018787838181106105b0576105af612067565b5b90506020028101906105c29190612151565b908060018154018082558091505060019003906000526020600020906002020160009091909190915081816105f791906125f0565b50508080610604906120c5565b91505061056d565b50600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548092919061065d906120c5565b919050555060005b8888905081101561073f576001600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008b8b858181106106c6576106c5612067565b5b90506020020160208101906106db9190611e0e565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508080610737906120c5565b915050610665565b5081935050505095945050505050565b3461075981611468565b61077973c778417e063141139fce010982780140aa0cd5ab3330346114ae565b6107ac73c778417e063141139fce010982780140aa0cd5ab73e592427a0aece92de3edee1f18e0157c0586156434611606565b50565b60006107b9611181565b816107c381611468565b600073c778417e063141139fce010982780140aa0cd5ab9050600073eb8f08a975ab53e34d8a0330e0d34de942c9592690506000610bb89050600073b27308f9f90d607463bb33ea1bebb41c27ce5ab673ffffffffffffffffffffffffffffffffffffffff1663f7729d438585858b866040518663ffffffff1660e01b815260040161085395949392919061260d565b602060405180830381600087803b15801561086d57600080fd5b505af1158015610881573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a59190612675565b95507f6cba9c15a7be8f1a884ac4dc44d3fee2a7a22f2b93a2dd862914a5b0530d635587876040516108d89291906126ee565b60405180910390a15050505050919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000818154811061091e57600080fd5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081565b6002602052826000526040600020602052816000526040600020602052806000526040600020600092509250509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6040518060400160405280600f81526020017f576f726b666c6f77204d6f64756c65000000000000000000000000000000000081525081565b600080346109f181611468565b610a1173c778417e063141139fce010982780140aa0cd5ab3330346114ae565b610a4473c778417e063141139fce010982780140aa0cd5ab73e592427a0aece92de3edee1f18e0157c0586156434611606565b610bb89150600060405180610100016040528073c778417e063141139fce010982780140aa0cd5ab73ffffffffffffffffffffffffffffffffffffffff16815260200173ad6d458402f60fd3bd25163575031acdce07538d73ffffffffffffffffffffffffffffffffffffffff1681526020018462ffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff168152602001600f42610aeb919061272a565b815260200134815260200160018152602001600073ffffffffffffffffffffffffffffffffffffffff16815250905073e592427a0aece92de3edee1f18e0157c0586156473ffffffffffffffffffffffffffffffffffffffff1663414bf389826040518263ffffffff1660e01b8152600401610b67919061285e565b602060405180830381600087803b158015610b8157600080fd5b505af1158015610b95573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb99190612675565b93507f2531495aaf0af38c3de3c7aa29700c3deb2a0a2e9711405412177ba532fc48c6348585604051610bee9392919061287a565b60405180910390a15050915091565b6060819050919050565b6001151560036000808481548110610c2257610c21612067565b5b906000526020600020906003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514610d1b6040518060400160405280600e81526020017f43414e2044454c45474154453a200000000000000000000000000000000000008152508261175b565b80610d5b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d52906128fd565b60405180910390fd5b6000808381548110610d7057610d6f612067565b5b90600052602060002090600302016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201805480602002602001604051908101604052809291908181526020016000905b82821015610f1d57838290600052602060002090600202016040518060400160405290816000820160009054906101000a900460e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001600182018054610e8c906122f6565b80601f0160208091040260200160405190810160405280929190818152602001828054610eb8906122f6565b8015610f055780601f10610eda57610100808354040283529160200191610f05565b820191906000526020600020905b815481529060010190602001808311610ee857829003601f168201915b50505050508152505081526020019060010190610e04565b50505050815260200160028201805480602002602001604051908101604052809291908181526020018280548015610faa57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610f60575b50505050508152505090506000606060005b8360200151518110156110e8573073ffffffffffffffffffffffffffffffffffffffff1684602001518281518110610ff757610ff6612067565b5b6020026020010151600001518560200151838151811061101a57611019612067565b5b602002602001015160200151604051602001611037929190612985565b60405160208183030381529060405260405161105391906129ad565b6000604051808303816000865af19150503d8060008114611090576040519150601f19603f3d011682016040523d82523d6000602084013e611095565b606091505b5080935081945050507f8e1a0bc72f3801575e768d1f01c5b66c6f18d3d1ac1a5f4ad75b97566ae69bca826040516110cd9190612a0e565b60405180910390a180806110e0906120c5565b915050610fbc565b5081611129576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161112090612a7c565b60405180910390fd5b5050505050565b60016020528060005260406000206000915090505481565b6040518060400160405280600581526020017f302e302e3100000000000000000000000000000000000000000000000000000081525081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146111ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111e690612b0e565b60405180910390fd5b565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156112fa578373ffffffffffffffffffffffffffffffffffffffff1663468721a7838360006040518463ffffffff1660e01b815260040161126493929190612bec565b602060405180830381600087803b15801561127e57600080fd5b505af1158015611292573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b69190612c6e565b6112f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ec90612ce7565b60405180910390fd5b611462565b6000828260405160240161130f929190612d07565b6040516020818303038152906040527fa9059cbb000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090508473ffffffffffffffffffffffffffffffffffffffff1663468721a78560008460006040518563ffffffff1660e01b81526004016113cf9493929190612d6b565b602060405180830381600087803b1580156113e957600080fd5b505af11580156113fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114219190612c6e565b611460576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161145790612e03565b60405180910390fd5b505b50505050565b600081116114ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114a290612e6f565b60405180910390fd5b50565b6000808573ffffffffffffffffffffffffffffffffffffffff166323b872dd60e01b8686866040516024016114e593929190612e8f565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161154f91906129ad565b6000604051808303816000865af19150503d806000811461158c576040519150601f19603f3d011682016040523d82523d6000602084013e611591565b606091505b50915091508180156115bf57506000815114806115be5750808060200190518101906115bd9190612c6e565b5b5b6115fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115f590612f12565b60405180910390fd5b505050505050565b6000808473ffffffffffffffffffffffffffffffffffffffff1663095ea7b360e01b858560405160240161163b929190612f32565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516116a591906129ad565b6000604051808303816000865af19150503d80600081146116e2576040519150601f19603f3d011682016040523d82523d6000602084013e6116e7565b606091505b509150915081801561171557506000815114806117145750808060200190518101906117139190612c6e565b5b5b611754576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161174b90612fa7565b60405180910390fd5b5050505050565b6117f38282604051602401611771929190612fd6565b6040516020818303038152906040527fc3b55635000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506117f7565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b8280548282559060005260206000209081019282156118af579160200282015b828111156118ae57823573ffffffffffffffffffffffffffffffffffffffff168260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190611840565b5b5090506118bc91906118c0565b5090565b5b808211156118d95760008160009055506001016118c1565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061191c826118f1565b9050919050565b600061192e82611911565b9050919050565b61193e81611923565b811461194957600080fd5b50565b60008135905061195b81611935565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261198657611985611961565b5b8235905067ffffffffffffffff8111156119a3576119a2611966565b5b6020830191508360608202830111156119bf576119be61196b565b5b9250929050565b6000806000604084860312156119df576119de6118e7565b5b60006119ed8682870161194c565b935050602084013567ffffffffffffffff811115611a0e57611a0d6118ec565b5b611a1a86828701611970565b92509250509250925092565b6000819050919050565b611a3981611a26565b82525050565b6000602082019050611a546000830184611a30565b92915050565b60008083601f840112611a7057611a6f611961565b5b8235905067ffffffffffffffff811115611a8d57611a8c611966565b5b602083019150836020820283011115611aa957611aa861196b565b5b9250929050565b60008083601f840112611ac657611ac5611961565b5b8235905067ffffffffffffffff811115611ae357611ae2611966565b5b602083019150836020820283011115611aff57611afe61196b565b5b9250929050565b600080600080600060608688031215611b2257611b216118e7565b5b6000611b308882890161194c565b955050602086013567ffffffffffffffff811115611b5157611b506118ec565b5b611b5d88828901611a5a565b9450945050604086013567ffffffffffffffff811115611b8057611b7f6118ec565b5b611b8c88828901611ab0565b92509250509295509295909350565b611ba481611a26565b8114611baf57600080fd5b50565b600081359050611bc181611b9b565b92915050565b600060208284031215611bdd57611bdc6118e7565b5b6000611beb84828501611bb2565b91505092915050565b6000611bff826118f1565b9050919050565b611c0f81611bf4565b82525050565b6000602082019050611c2a6000830184611c06565b92915050565b6000819050919050565b6000611c55611c50611c4b846118f1565b611c30565b6118f1565b9050919050565b6000611c6782611c3a565b9050919050565b6000611c7982611c5c565b9050919050565b611c8981611c6e565b82525050565b6000602082019050611ca46000830184611c80565b92915050565b611cb381611911565b8114611cbe57600080fd5b50565b600081359050611cd081611caa565b92915050565b600080600060608486031215611cef57611cee6118e7565b5b6000611cfd86828701611cc1565b9350506020611d0e86828701611bb2565b9250506040611d1f86828701611bb2565b9150509250925092565b611d3281611911565b82525050565b6000602082019050611d4d6000830184611d29565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611d8d578082015181840152602081019050611d72565b83811115611d9c576000848401525b50505050565b6000601f19601f8301169050919050565b6000611dbe82611d53565b611dc88185611d5e565b9350611dd8818560208601611d6f565b611de181611da2565b840191505092915050565b60006020820190508181036000830152611e068184611db3565b905092915050565b600060208284031215611e2457611e236118e7565b5b6000611e3284828501611cc1565b91505092915050565b600062ffffff82169050919050565b611e5381611e3b565b82525050565b6000604082019050611e6e6000830185611a30565b611e7b6020830184611e4a565b9392505050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611ebf82611da2565b810181811067ffffffffffffffff82111715611ede57611edd611e87565b5b80604052505050565b6000611ef16118dd565b9050611efd8282611eb6565b919050565b600067ffffffffffffffff821115611f1d57611f1c611e87565b5b611f2682611da2565b9050602081019050919050565b82818337600083830152505050565b6000611f55611f5084611f02565b611ee7565b905082815260208101848484011115611f7157611f70611e82565b5b611f7c848285611f33565b509392505050565b600082601f830112611f9957611f98611961565b5b8135611fa9848260208601611f42565b91505092915050565b600060208284031215611fc857611fc76118e7565b5b600082013567ffffffffffffffff811115611fe657611fe56118ec565b5b611ff284828501611f84565b91505092915050565b7f49742073686f756c642068617665207472616e73666572730000000000000000600082015250565b6000612031601883611d5e565b915061203c82611ffb565b602082019050919050565b6000602082019050818103600083015261206081612024565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006120d082611a26565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561210357612102612096565b5b600182019050919050565b600061211982611a26565b915061212483611a26565b92508282101561213757612136612096565b5b828203905092915050565b600080fd5b600080fd5b600080fd5b60008235600160400383360303811261216d5761216c612142565b5b80830191505092915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6121ae81612179565b81146121b957600080fd5b50565b600081356121c9816121a5565b80915050919050565b60008160001b9050919050565b600063ffffffff6121ef846121d2565b9350801983169250808416831791505092915050565b600061221082612179565b9050919050565b60008160e01c9050919050565b600061222f82612217565b9050919050565b61223f82612205565b61225261224b82612224565b83546121df565b8255505050565b6000808335600160200384360303811261227657612275612142565b5b80840192508235915067ffffffffffffffff82111561229857612297612147565b5b6020830192506001820236038313156122b4576122b361214c565b5b509250929050565b600082905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061230e57607f821691505b60208210811415612322576123216122c7565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261238a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261234d565b612394868361234d565b95508019841693508086168417925050509392505050565b60006123c76123c26123bd84611a26565b611c30565b611a26565b9050919050565b6000819050919050565b6123e1836123ac565b6123f56123ed826123ce565b84845461235a565b825550505050565b600090565b61240a6123fd565b6124158184846123d8565b505050565b5b818110156124395761242e600082612402565b60018101905061241b565b5050565b601f82111561247e5761244f81612328565b6124588461233d565b81016020851015612467578190505b61247b6124738561233d565b83018261241a565b50505b505050565b600082821c905092915050565b60006124a160001984600802612483565b1980831691505092915050565b60006124ba8383612490565b9150826002028217905092915050565b6124d483836122bc565b67ffffffffffffffff8111156124ed576124ec611e87565b5b6124f782546122f6565b61250282828561243d565b6000601f831160018114612531576000841561251f578287013590505b61252985826124ae565b865550612591565b601f19841661253f86612328565b60005b8281101561256757848901358255600182019150602085019450602081019050612542565b868310156125845784890135612580601f891682612490565b8355505b6001600288020188555050505b50505050505050565b6125a58383836124ca565b505050565b6000810160008301806125bc816121bc565b90506125c88184612236565b50505060018101602083016125dd8185612259565b6125e881838661259a565b505050505050565b6125fa82826125aa565b5050565b612607816118f1565b82525050565b600060a0820190506126226000830188611d29565b61262f6020830187611d29565b61263c6040830186611e4a565b6126496060830185611a30565b61265660808301846125fe565b9695505050505050565b60008151905061266f81611b9b565b92915050565b60006020828403121561268b5761268a6118e7565b5b600061269984828501612660565b91505092915050565b7f455448202d3e2055534454000000000000000000000000000000000000000000600082015250565b60006126d8600b83611d5e565b91506126e3826126a2565b602082019050919050565b60006060820190508181036000830152612707816126cb565b90506127166020830185611a30565b6127236040830184611a30565b9392505050565b600061273582611a26565b915061274083611a26565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561277557612774612096565b5b828201905092915050565b61278981611911565b82525050565b61279881611e3b565b82525050565b6127a781611a26565b82525050565b6127b6816118f1565b82525050565b610100820160008201516127d36000850182612780565b5060208201516127e66020850182612780565b5060408201516127f9604085018261278f565b50606082015161280c6060850182612780565b50608082015161281f608085018261279e565b5060a082015161283260a085018261279e565b5060c082015161284560c085018261279e565b5060e082015161285860e08501826127ad565b50505050565b60006101008201905061287460008301846127bc565b92915050565b600060608201905061288f6000830186611a30565b61289c6020830185611a30565b6128a96040830184611e4a565b949350505050565b7f53656e646572206973206e6f7420612064656c65676174650000000000000000600082015250565b60006128e7601883611d5e565b91506128f2826128b1565b602082019050919050565b60006020820190508181036000830152612916816128da565b9050919050565b6000819050919050565b61293861293382612179565b61291d565b82525050565b600081519050919050565b600081905092915050565b600061295f8261293e565b6129698185612949565b9350612979818560208601611d6f565b80840191505092915050565b60006129918285612927565b6004820191506129a18284612954565b91508190509392505050565b60006129b98284612954565b915081905092915050565b600082825260208201905092915050565b60006129e08261293e565b6129ea81856129c4565b93506129fa818560208601611d6f565b612a0381611da2565b840191505092915050565b60006020820190508181036000830152612a2881846129d5565b905092915050565b7f43616c6c206661696c6564210000000000000000000000000000000000000000600082015250565b6000612a66600c83611d5e565b9150612a7182612a30565b602082019050919050565b60006020820190508181036000830152612a9581612a59565b9050919050565b7f4f6e6c79207468652060576f726b666c6f774d6f64756c65602063616e20636160008201527f6c6c000000000000000000000000000000000000000000000000000000000000602082015250565b6000612af8602283611d5e565b9150612b0382612a9c565b604082019050919050565b60006020820190508181036000830152612b2781612aeb565b9050919050565b6000612b3982611c5c565b9050919050565b612b4981612b2e565b82525050565b50565b6000612b5f6000836129c4565b9150612b6a82612b4f565b600082019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110612bb557612bb4612b75565b5b50565b6000819050612bc682612ba4565b919050565b6000612bd682612bb8565b9050919050565b612be681612bcb565b82525050565b6000608082019050612c016000830186612b40565b612c0e6020830185611a30565b8181036040830152612c1f81612b52565b9050612c2e6060830184612bdd565b949350505050565b60008115159050919050565b612c4b81612c36565b8114612c5657600080fd5b50565b600081519050612c6881612c42565b92915050565b600060208284031215612c8457612c836118e7565b5b6000612c9284828501612c59565b91505092915050565b7f43616e6e6f742065786563757465206574686572207472616e736665722e0000600082015250565b6000612cd1601e83611d5e565b9150612cdc82612c9b565b602082019050919050565b60006020820190508181036000830152612d0081612cc4565b9050919050565b6000604082019050612d1c6000830185611c06565b612d296020830184611a30565b9392505050565b6000819050919050565b6000612d55612d50612d4b84612d30565b611c30565b611a26565b9050919050565b612d6581612d3a565b82525050565b6000608082019050612d806000830187611d29565b612d8d6020830186612d5c565b8181036040830152612d9f81856129d5565b9050612dae6060830184612bdd565b95945050505050565b7f43616e6e6f74206578656375746520746f6b656e207472616e736665722e0000600082015250565b6000612ded601e83611d5e565b9150612df882612db7565b602082019050919050565b60006020820190508181036000830152612e1c81612de0565b9050919050565b7f4d7573742070617373206e6f6e203020616d6f756e7400000000000000000000600082015250565b6000612e59601683611d5e565b9150612e6482612e23565b602082019050919050565b60006020820190508181036000830152612e8881612e4c565b9050919050565b6000606082019050612ea46000830186611d29565b612eb16020830185611d29565b612ebe6040830184611a30565b949350505050565b7f5354460000000000000000000000000000000000000000000000000000000000600082015250565b6000612efc600383611d5e565b9150612f0782612ec6565b602082019050919050565b60006020820190508181036000830152612f2b81612eef565b9050919050565b6000604082019050612f476000830185611d29565b612f546020830184611a30565b9392505050565b7f5341000000000000000000000000000000000000000000000000000000000000600082015250565b6000612f91600283611d5e565b9150612f9c82612f5b565b602082019050919050565b60006020820190508181036000830152612fc081612f84565b9050919050565b612fd081612c36565b82525050565b60006040820190508181036000830152612ff08185611db3565b9050612fff6020830184612fc7565b939250505056fea2646970667358221220e19012a6a050340ff259722acbe87b682477ddddc6fbd9196e7994c7b23df62f64736f6c63430008090033";

type WorkflowModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WorkflowModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WorkflowModule__factory extends ContractFactory {
  constructor(...args: WorkflowModuleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "WorkflowModule";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WorkflowModule> {
    return super.deploy(overrides || {}) as Promise<WorkflowModule>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): WorkflowModule {
    return super.attach(address) as WorkflowModule;
  }
  connect(signer: Signer): WorkflowModule__factory {
    return super.connect(signer) as WorkflowModule__factory;
  }
  static readonly contractName: "WorkflowModule";
  public readonly contractName: "WorkflowModule";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WorkflowModuleInterface {
    return new utils.Interface(_abi) as WorkflowModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WorkflowModule {
    return new Contract(address, _abi, signerOrProvider) as WorkflowModule;
  }
}