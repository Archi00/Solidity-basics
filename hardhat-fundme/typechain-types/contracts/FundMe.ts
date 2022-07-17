/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface FundMeInterface extends utils.Interface {
  functions: {
    "cheaperWithdraw()": FunctionFragment;
    "fund()": FunctionFragment;
    "getVersion()": FunctionFragment;
    "s_addressToAmountFunded(address)": FunctionFragment;
    "s_funders(uint256)": FunctionFragment;
    "s_owner()": FunctionFragment;
    "s_priceFeed()": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "cheaperWithdraw"
      | "fund"
      | "getVersion"
      | "s_addressToAmountFunded"
      | "s_funders"
      | "s_owner"
      | "s_priceFeed"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cheaperWithdraw",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "fund", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_addressToAmountFunded",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "s_funders",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "s_owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "s_priceFeed",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "cheaperWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVersion", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "s_addressToAmountFunded",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "s_funders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "s_owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "s_priceFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export interface FundMe extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FundMeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    cheaperWithdraw(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fund(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getVersion(overrides?: CallOverrides): Promise<[BigNumber]>;

    s_addressToAmountFunded(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    s_funders(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    s_owner(overrides?: CallOverrides): Promise<[string]>;

    s_priceFeed(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  cheaperWithdraw(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fund(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getVersion(overrides?: CallOverrides): Promise<BigNumber>;

  s_addressToAmountFunded(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  s_funders(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  s_owner(overrides?: CallOverrides): Promise<string>;

  s_priceFeed(overrides?: CallOverrides): Promise<string>;

  withdraw(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cheaperWithdraw(overrides?: CallOverrides): Promise<void>;

    fund(overrides?: CallOverrides): Promise<void>;

    getVersion(overrides?: CallOverrides): Promise<BigNumber>;

    s_addressToAmountFunded(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s_funders(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    s_owner(overrides?: CallOverrides): Promise<string>;

    s_priceFeed(overrides?: CallOverrides): Promise<string>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    cheaperWithdraw(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fund(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getVersion(overrides?: CallOverrides): Promise<BigNumber>;

    s_addressToAmountFunded(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s_funders(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s_owner(overrides?: CallOverrides): Promise<BigNumber>;

    s_priceFeed(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cheaperWithdraw(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fund(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_addressToAmountFunded(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    s_funders(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    s_owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_priceFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
