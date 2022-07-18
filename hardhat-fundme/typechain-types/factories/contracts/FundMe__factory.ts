/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { FundMe, FundMeInterface } from "../../contracts/FundMe";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "priceFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FundMe__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "MIN_USD",
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
    inputs: [],
    name: "cheaperWithdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_funder",
        type: "address",
      },
    ],
    name: "getAddressToAmountFunded",
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
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getFunder",
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
    inputs: [],
    name: "getOwner",
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
    inputs: [],
    name: "getPriceFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVersion",
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
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b506040516200134338038062001343833981810160405281019062000037919062000120565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250505062000152565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000e882620000bb565b9050919050565b620000fa81620000db565b81146200010657600080fd5b50565b6000815190506200011a81620000ef565b92915050565b600060208284031215620001395762000138620000b6565b5b6000620001498482850162000109565b91505092915050565b60805160601c6111bd62000186600039600081816102cd015281816104a901528181610633015261087001526111bd6000f3fe6080604052600436106100865760003560e01c8063893d20e811610059578063893d20e8146101285780639e87a5cd14610153578063b60d42881461017e578063be2693f014610188578063d7b4750c1461019257610086565b80630343fb251461008b5780630d8e6e2c146100c8578063213dbea2146100f35780633ccfd60b1461011e575b600080fd5b34801561009757600080fd5b506100b260048036038101906100ad9190610b34565b6101cf565b6040516100bf9190610b7a565b60405180910390f35b3480156100d457600080fd5b506100dd610217565b6040516100ea9190610b7a565b60405180910390f35b3480156100ff57600080fd5b506101086102be565b6040516101159190610b7a565b60405180910390f35b6101266102cb565b005b34801561013457600080fd5b5061013d6104a5565b60405161014a9190610ba4565b60405180910390f35b34801561015f57600080fd5b506101686104cd565b6040516101759190610c1e565b60405180910390f35b6101866104f7565b005b610190610631565b005b34801561019e57600080fd5b506101b960048036038101906101b49190610c65565b610906565b6040516101c69190610ba4565b60405180910390f35b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166354fd4d506040518163ffffffff1660e01b815260040160206040518083038186803b15801561028157600080fd5b505afa158015610295573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b99190610ca7565b905090565b6802b5e3af16b188000081565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610350576040517f579610db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610396573d6000803e3d6000fd5b5060005b600180549050811015610442576000600182815481106103bd576103bc610cd4565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050808061043a90610d32565b91505061039a565b50600067ffffffffffffffff81111561045e5761045d610d7b565b5b60405190808252806020026020018201604052801561048c5781602001602082028036833780820191505090505b50600190805190602001906104a2929190610a2a565b50565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6802b5e3af16b1880000610536600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163461094e90919063ffffffff16565b1015610577576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056e90610e07565b60405180910390fd5b346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105c59190610e27565b925050819055506001339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106b6576040517f579610db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f193505050501580156106fc573d6000803e3d6000fd5b506000600180548060200260200160405190810160405280929190818152602001828054801561078157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610737575b5050505050905060005b815181101561080b5760008282815181106107a9576107a8610cd4565b5b6020026020010151905060008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050808061080390610d32565b91505061078b565b50600067ffffffffffffffff81111561082757610826610d7b565b5b6040519080825280602002602001820160405280156108555781602001602082028036833780820191505090505b506001908051906020019061086b929190610a2a565b5060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16476040516108b290610eae565b60006040518083038185875af1925050503d80600081146108ef576040519150601f19603f3d011682016040523d82523d6000602084013e6108f4565b606091505b505090508061090257600080fd5b5050565b60006001828154811061091c5761091b610cd4565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008061095a8361098a565b90506000670de0b6b3a764000085836109739190610ec3565b61097d9190610f4c565b9050809250505092915050565b6000808273ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b1580156109d357600080fd5b505afa1580156109e7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0b9190610ff5565b5050509150506402540be40081610a229190611070565b915050919050565b828054828255906000526020600020908101928215610aa3579160200282015b82811115610aa25782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610a4a565b5b509050610ab09190610ab4565b5090565b5b80821115610acd576000816000905550600101610ab5565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b0182610ad6565b9050919050565b610b1181610af6565b8114610b1c57600080fd5b50565b600081359050610b2e81610b08565b92915050565b600060208284031215610b4a57610b49610ad1565b5b6000610b5884828501610b1f565b91505092915050565b6000819050919050565b610b7481610b61565b82525050565b6000602082019050610b8f6000830184610b6b565b92915050565b610b9e81610af6565b82525050565b6000602082019050610bb96000830184610b95565b92915050565b6000819050919050565b6000610be4610bdf610bda84610ad6565b610bbf565b610ad6565b9050919050565b6000610bf682610bc9565b9050919050565b6000610c0882610beb565b9050919050565b610c1881610bfd565b82525050565b6000602082019050610c336000830184610c0f565b92915050565b610c4281610b61565b8114610c4d57600080fd5b50565b600081359050610c5f81610c39565b92915050565b600060208284031215610c7b57610c7a610ad1565b5b6000610c8984828501610c50565b91505092915050565b600081519050610ca181610c39565b92915050565b600060208284031215610cbd57610cbc610ad1565b5b6000610ccb84828501610c92565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d3d82610b61565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610d7057610d6f610d03565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082825260208201905092915050565b7f596f75206e65656420746f207370656e64206d6f726520455448210000000000600082015250565b6000610df1601b83610daa565b9150610dfc82610dbb565b602082019050919050565b60006020820190508181036000830152610e2081610de4565b9050919050565b6000610e3282610b61565b9150610e3d83610b61565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610e7257610e71610d03565b5b828201905092915050565b600081905092915050565b50565b6000610e98600083610e7d565b9150610ea382610e88565b600082019050919050565b6000610eb982610e8b565b9150819050919050565b6000610ece82610b61565b9150610ed983610b61565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610f1257610f11610d03565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610f5782610b61565b9150610f6283610b61565b925082610f7257610f71610f1d565b5b828204905092915050565b600069ffffffffffffffffffff82169050919050565b610f9c81610f7d565b8114610fa757600080fd5b50565b600081519050610fb981610f93565b92915050565b6000819050919050565b610fd281610fbf565b8114610fdd57600080fd5b50565b600081519050610fef81610fc9565b92915050565b600080600080600060a0868803121561101157611010610ad1565b5b600061101f88828901610faa565b955050602061103088828901610fe0565b945050604061104188828901610c92565b935050606061105288828901610c92565b925050608061106388828901610faa565b9150509295509295909350565b600061107b82610fbf565b915061108683610fbf565b9250827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821160008413600084131616156110c5576110c4610d03565b5b817f8000000000000000000000000000000000000000000000000000000000000000058312600084126000841316161561110257611101610d03565b5b827f8000000000000000000000000000000000000000000000000000000000000000058212600084136000841216161561113f5761113e610d03565b5b827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff058212600084126000841216161561117c5761117b610d03565b5b82820290509291505056fea264697066735822122034b2a74f60d10678a2c7693c2465dfeb46dd84b8d80facbdc8c1da3a3c0400f964736f6c63430008080033";

type FundMeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FundMeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FundMe__factory extends ContractFactory {
  constructor(...args: FundMeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    priceFeed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FundMe> {
    return super.deploy(priceFeed, overrides || {}) as Promise<FundMe>;
  }
  override getDeployTransaction(
    priceFeed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(priceFeed, overrides || {});
  }
  override attach(address: string): FundMe {
    return super.attach(address) as FundMe;
  }
  override connect(signer: Signer): FundMe__factory {
    return super.connect(signer) as FundMe__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FundMeInterface {
    return new utils.Interface(_abi) as FundMeInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): FundMe {
    return new Contract(address, _abi, signerOrProvider) as FundMe;
  }
}
