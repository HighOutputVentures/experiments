/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  WorkflowModuleV2,
  WorkflowModuleV2Interface,
} from "../WorkflowModuleV2";

const _abi = [
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
        internalType: "address",
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
        internalType: "struct WorkflowModuleV2.Action[]",
        name: "_actions",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
    ],
    name: "encodeTransactionData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
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
        internalType: "struct WorkflowModuleV2.Action[]",
        name: "_actions",
        type: "tuple[]",
      },
      {
        internalType: "bytes",
        name: "_signatures",
        type: "bytes",
      },
    ],
    name: "executeWorkflow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
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
        internalType: "struct WorkflowModuleV2.Action[]",
        name: "_actions",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
    ],
    name: "getTransactionHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_haystack",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_needle",
        type: "address",
      },
    ],
    name: "indexOf",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "nonce",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611ecb806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063affed0e01161005b578063affed0e014610127578063d8d8b25d14610145578063f4ab024014610175578063ffa1ad741461019157610088565b80630ebaf6501461008d578063655b7255146100a95780639fce5c8e146100d9578063a3f4df7e14610109575b600080fd5b6100a760048036038101906100a29190610b93565b6101af565b005b6100c360048036038101906100be9190610d01565b6102a4565b6040516100d09190610e41565b60405180910390f35b6100f360048036038101906100ee9190610e63565b61039e565b6040516101009190610edf565b60405180910390f35b610111610436565b60405161011e9190610f4f565b60405180910390f35b61012f61046f565b60405161013c9190610f80565b60405180910390f35b61015f600480360381019061015a9190610d01565b610475565b60405161016c9190610fb4565b60405180910390f35b61018f600480360381019061018a91906110ff565b610498565b005b61019961078a565b6040516101a69190610f4f565b60405180910390f35b6101b76107c3565b8181600082829050116101ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f69061120e565b60405180910390fd5b60005b8484905081101561029c57610289868686848181106102245761022361122e565b5b905060600201602001602081019061023c919061125d565b87878581811061024f5761024e61122e565b5b9050606002016000016020810190610267919061125d565b88888681811061027a5761027961122e565b5b90506060020160400135610833565b8080610294906112b9565b915050610202565b505050505050565b6060601960f81b600160f81b888888888860006040516020016102c7919061134a565b6040516020818303038152906040526040516024016102eb9695949392919061168c565b6040516020818303038152906040527ff4ab0240000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505080519060200120846040516020016103839493929190611779565b60405160208183030381529060405290509695505050505050565b600080600090505b84849050811015610429578273ffffffffffffffffffffffffffffffffffffffff168585838181106103db576103da61122e565b5b90506020020160208101906103f0919061125d565b73ffffffffffffffffffffffffffffffffffffffff16141561041657600191505061042f565b8080610421906112b9565b9150506103a6565b50600090505b9392505050565b6040518060400160405280601281526020017f576f726b666c6f77204d6f64756c65205632000000000000000000000000000081525081565b60005481565b60006104858787878787876102a4565b8051906020012090509695505050505050565b6104a06107c3565b60008060006104b589898989896000546102a4565b9050808051906020012091508873ffffffffffffffffffffffffffffffffffffffff1663934f3a118383876040518463ffffffff1660e01b81526004016104fe939291906117c7565b60006040518083038186803b15801561051657600080fd5b505afa15801561052a573d6000803e3d6000fd5b5050505050600161053c88883361039e565b60ff1614806105d057508773ffffffffffffffffffffffffffffffffffffffff16632f54bf6e336040518263ffffffff1660e01b815260040161057f919061180c565b60206040518083038186803b15801561059757600080fd5b505afa1580156105ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105cf919061185f565b5b61060f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610606906118fe565b60405180910390fd5b600080815480929190610621906112b9565b919050555060005b8585905081101561073f573073ffffffffffffffffffffffffffffffffffffffff1686868381811061065e5761065d61122e565b5b9050602002810190610670919061192d565b60000160208101906106829190611955565b8787848181106106955761069461122e565b5b90506020028101906106a7919061192d565b80602001906106b69190611982565b6040516020016106c893929190611a36565b6040516020818303038152906040526040516106e49190611a91565b6000604051808303816000865af19150503d8060008114610721576040519150601f19603f3d011682016040523d82523d6000602084013e610726565b606091505b5050809350508080610737906112b9565b915050610629565b5081610780576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077790611af4565b60405180910390fd5b5050505050505050565b6040518060400160405280600581526020017f302e302e3200000000000000000000000000000000000000000000000000000081525081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610831576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082890611b86565b60405180910390fd5b565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561093c578373ffffffffffffffffffffffffffffffffffffffff1663468721a7838360006040518463ffffffff1660e01b81526004016108a693929190611ca2565b602060405180830381600087803b1580156108c057600080fd5b505af11580156108d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f8919061185f565b610937576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092e90611d38565b60405180910390fd5b610aa4565b60008282604051602401610951929190611d79565b6040516020818303038152906040527fa9059cbb000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090508473ffffffffffffffffffffffffffffffffffffffff1663468721a78560008460006040518563ffffffff1660e01b8152600401610a119493929190611ddd565b602060405180830381600087803b158015610a2b57600080fd5b505af1158015610a3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a63919061185f565b610aa2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a9990611e75565b60405180910390fd5b505b50505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ae982610abe565b9050919050565b6000610afb82610ade565b9050919050565b610b0b81610af0565b8114610b1657600080fd5b50565b600081359050610b2881610b02565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610b5357610b52610b2e565b5b8235905067ffffffffffffffff811115610b7057610b6f610b33565b5b602083019150836060820283011115610b8c57610b8b610b38565b5b9250929050565b600080600060408486031215610bac57610bab610ab4565b5b6000610bba86828701610b19565b935050602084013567ffffffffffffffff811115610bdb57610bda610ab9565b5b610be786828701610b3d565b92509250509250925092565b610bfc81610ade565b8114610c0757600080fd5b50565b600081359050610c1981610bf3565b92915050565b60008083601f840112610c3557610c34610b2e565b5b8235905067ffffffffffffffff811115610c5257610c51610b33565b5b602083019150836020820283011115610c6e57610c6d610b38565b5b9250929050565b60008083601f840112610c8b57610c8a610b2e565b5b8235905067ffffffffffffffff811115610ca857610ca7610b33565b5b602083019150836020820283011115610cc457610cc3610b38565b5b9250929050565b6000819050919050565b610cde81610ccb565b8114610ce957600080fd5b50565b600081359050610cfb81610cd5565b92915050565b60008060008060008060808789031215610d1e57610d1d610ab4565b5b6000610d2c89828a01610c0a565b965050602087013567ffffffffffffffff811115610d4d57610d4c610ab9565b5b610d5989828a01610c1f565b9550955050604087013567ffffffffffffffff811115610d7c57610d7b610ab9565b5b610d8889828a01610c75565b93509350506060610d9b89828a01610cec565b9150509295509295509295565b600081519050919050565b600082825260208201905092915050565b60005b83811015610de2578082015181840152602081019050610dc7565b83811115610df1576000848401525b50505050565b6000601f19601f8301169050919050565b6000610e1382610da8565b610e1d8185610db3565b9350610e2d818560208601610dc4565b610e3681610df7565b840191505092915050565b60006020820190508181036000830152610e5b8184610e08565b905092915050565b600080600060408486031215610e7c57610e7b610ab4565b5b600084013567ffffffffffffffff811115610e9a57610e99610ab9565b5b610ea686828701610c1f565b93509350506020610eb986828701610c0a565b9150509250925092565b600060ff82169050919050565b610ed981610ec3565b82525050565b6000602082019050610ef46000830184610ed0565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610f2182610efa565b610f2b8185610f05565b9350610f3b818560208601610dc4565b610f4481610df7565b840191505092915050565b60006020820190508181036000830152610f698184610f16565b905092915050565b610f7a81610ccb565b82525050565b6000602082019050610f956000830184610f71565b92915050565b6000819050919050565b610fae81610f9b565b82525050565b6000602082019050610fc96000830184610fa5565b92915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61100c82610df7565b810181811067ffffffffffffffff8211171561102b5761102a610fd4565b5b80604052505050565b600061103e610aaa565b905061104a8282611003565b919050565b600067ffffffffffffffff82111561106a57611069610fd4565b5b61107382610df7565b9050602081019050919050565b82818337600083830152505050565b60006110a261109d8461104f565b611034565b9050828152602081018484840111156110be576110bd610fcf565b5b6110c9848285611080565b509392505050565b600082601f8301126110e6576110e5610b2e565b5b81356110f684826020860161108f565b91505092915050565b6000806000806000806080878903121561111c5761111b610ab4565b5b600061112a89828a01610b19565b965050602087013567ffffffffffffffff81111561114b5761114a610ab9565b5b61115789828a01610c1f565b9550955050604087013567ffffffffffffffff81111561117a57611179610ab9565b5b61118689828a01610c75565b9350935050606087013567ffffffffffffffff8111156111a9576111a8610ab9565b5b6111b589828a016110d1565b9150509295509295509295565b7f49742073686f756c642068617665207472616e73666572730000000000000000600082015250565b60006111f8601883610f05565b9150611203826111c2565b602082019050919050565b60006020820190508181036000830152611227816111eb565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561127357611272610ab4565b5b600061128184828501610c0a565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006112c482610ccb565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156112f7576112f661128a565b5b600182019050919050565b60008160601b9050919050565b600061131a82611302565b9050919050565b600061132c8261130f565b9050919050565b61134461133f82610ade565b611321565b82525050565b60006113568284611333565b60148201915081905092915050565b61136e81610ade565b82525050565b600082825260208201905092915050565b6000819050919050565b61139881610ade565b82525050565b60006113aa838361138f565b60208301905092915050565b60006113c56020840184610c0a565b905092915050565b6000602082019050919050565b60006113e68385611374565b93506113f182611385565b8060005b8581101561142a5761140782846113b6565b611411888261139e565b975061141c836113cd565b9250506001810190506113f5565b5085925050509392505050565b600082825260208201905092915050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61148781611452565b811461149257600080fd5b50565b6000813590506114a48161147e565b92915050565b60006114b96020840184611495565b905092915050565b6114ca81611452565b82525050565b600080fd5b600080fd5b600080fd5b600080833560016020038436030381126114fc576114fb6114da565b5b83810192508235915060208301925067ffffffffffffffff821115611524576115236114d0565b5b60018202360384131561153a576115396114d5565b5b509250929050565b600082825260208201905092915050565b600061155f8385611542565b935061156c838584611080565b61157583610df7565b840190509392505050565b60006040830161159360008401846114aa565b6115a060008601826114c1565b506115ae60208401846114df565b85830360208701526115c1838284611553565b925050508091505092915050565b60006115db8383611580565b905092915050565b6000823560016040038336030381126115ff576115fe6114da565b5b82810191505092915050565b6000602082019050919050565b60006116248385611437565b93508360208402850161163684611448565b8060005b8781101561167a57848403895261165182846115e3565b61165b85826115cf565b94506116668361160b565b925060208a0199505060018101905061163a565b50829750879450505050509392505050565b60006080820190506116a16000830189611365565b81810360208301526116b48187896113da565b905081810360408301526116c9818587611618565b905081810360608301526116dd8184610e08565b9050979650505050505050565b60007fff0000000000000000000000000000000000000000000000000000000000000082169050919050565b6000819050919050565b61173161172c826116ea565b611716565b82525050565b6000819050919050565b61175261174d82610f9b565b611737565b82525050565b6000819050919050565b61177361176e82610ccb565b611758565b82525050565b60006117858287611720565b6001820191506117958286611720565b6001820191506117a58285611741565b6020820191506117b58284611762565b60208201915081905095945050505050565b60006060820190506117dc6000830186610fa5565b81810360208301526117ee8185610e08565b905081810360408301526118028184610e08565b9050949350505050565b60006020820190506118216000830184611365565b92915050565b60008115159050919050565b61183c81611827565b811461184757600080fd5b50565b60008151905061185981611833565b92915050565b60006020828403121561187557611874610ab4565b5b60006118838482850161184a565b91505092915050565b7f43616e27742065786563757465206966206e6f7420616e206f776e6572206e6f60008201527f722070617274206f66207468652064656c656761746573000000000000000000602082015250565b60006118e8603783610f05565b91506118f38261188c565b604082019050919050565b60006020820190508181036000830152611917816118db565b9050919050565b600080fd5b600080fd5b600080fd5b6000823560016040038336030381126119495761194861191e565b5b80830191505092915050565b60006020828403121561196b5761196a610ab4565b5b600061197984828501611495565b91505092915050565b6000808335600160200384360303811261199f5761199e61191e565b5b80840192508235915067ffffffffffffffff8211156119c1576119c0611923565b5b6020830192506001820236038313156119dd576119dc611928565b5b509250929050565b6000819050919050565b611a006119fb82611452565b6119e5565b82525050565b600081905092915050565b6000611a1d8385611a06565b9350611a2a838584611080565b82840190509392505050565b6000611a4282866119ef565b600482019150611a53828486611a11565b9150819050949350505050565b6000611a6b82610da8565b611a758185611a06565b9350611a85818560208601610dc4565b80840191505092915050565b6000611a9d8284611a60565b915081905092915050565b7f43616c6c206661696c6564210000000000000000000000000000000000000000600082015250565b6000611ade600c83610f05565b9150611ae982611aa8565b602082019050919050565b60006020820190508181036000830152611b0d81611ad1565b9050919050565b7f4f6e6c79207468652060576f726b666c6f774d6f64756c65602063616e20636160008201527f6c6c000000000000000000000000000000000000000000000000000000000000602082015250565b6000611b70602283610f05565b9150611b7b82611b14565b604082019050919050565b60006020820190508181036000830152611b9f81611b63565b9050919050565b6000819050919050565b6000611bcb611bc6611bc184610abe565b611ba6565b610abe565b9050919050565b6000611bdd82611bb0565b9050919050565b6000611bef82611bd2565b9050919050565b611bff81611be4565b82525050565b50565b6000611c15600083610db3565b9150611c2082611c05565b600082019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110611c6b57611c6a611c2b565b5b50565b6000819050611c7c82611c5a565b919050565b6000611c8c82611c6e565b9050919050565b611c9c81611c81565b82525050565b6000608082019050611cb76000830186611bf6565b611cc46020830185610f71565b8181036040830152611cd581611c08565b9050611ce46060830184611c93565b949350505050565b7f43616e6e6f742065786563757465206574686572207472616e736665722e0000600082015250565b6000611d22601e83610f05565b9150611d2d82611cec565b602082019050919050565b60006020820190508181036000830152611d5181611d15565b9050919050565b6000611d6382610abe565b9050919050565b611d7381611d58565b82525050565b6000604082019050611d8e6000830185611d6a565b611d9b6020830184610f71565b9392505050565b6000819050919050565b6000611dc7611dc2611dbd84611da2565b611ba6565b610ccb565b9050919050565b611dd781611dac565b82525050565b6000608082019050611df26000830187611365565b611dff6020830186611dce565b8181036040830152611e118185610e08565b9050611e206060830184611c93565b95945050505050565b7f43616e6e6f74206578656375746520746f6b656e207472616e736665722e0000600082015250565b6000611e5f601e83610f05565b9150611e6a82611e29565b602082019050919050565b60006020820190508181036000830152611e8e81611e52565b905091905056fea26469706673582212201b6972d5ba53131662ed1fc78383b3e0ed595d29e56c31ba853dac9b7418685b64736f6c63430008090033";

type WorkflowModuleV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WorkflowModuleV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WorkflowModuleV2__factory extends ContractFactory {
  constructor(...args: WorkflowModuleV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "WorkflowModuleV2";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WorkflowModuleV2> {
    return super.deploy(overrides || {}) as Promise<WorkflowModuleV2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): WorkflowModuleV2 {
    return super.attach(address) as WorkflowModuleV2;
  }
  connect(signer: Signer): WorkflowModuleV2__factory {
    return super.connect(signer) as WorkflowModuleV2__factory;
  }
  static readonly contractName: "WorkflowModuleV2";
  public readonly contractName: "WorkflowModuleV2";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WorkflowModuleV2Interface {
    return new utils.Interface(_abi) as WorkflowModuleV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WorkflowModuleV2 {
    return new Contract(address, _abi, signerOrProvider) as WorkflowModuleV2;
  }
}