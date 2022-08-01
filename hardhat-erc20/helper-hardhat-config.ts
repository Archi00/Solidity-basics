import { BigNumber, ethers } from "ethers";

export interface networkConfigItem {
  name?: string;
  vrfCoordinatorV2?: string;
  entranceFee?: BigNumber;
  gasLane?: string;
  chainId?: number;
  subscriptionId?: string;
  callbackGasLimit?: string;
  interval?: string;
}
export interface networkConfigInfo {
  [name: string]: networkConfigItem;
}
export const networkConfig: networkConfigInfo = {
  localhost: {
    name: "localhost",
    subscriptionId: "9233",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    chainId: 31337,
    callbackGasLimit: "500000",
    interval: "30",
  },
  hardhat: {
    name: "hardhat",
    subscriptionId: "9233",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    chainId: 31337,
    callbackGasLimit: "500000",
    interval: "30",
  },
  rinkeby: {
    name: "rinkeby",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    chainId: 4,
    subscriptionId: "9233",
    callbackGasLimit: "500000",
    interval: "30",
  },
  kovan: {
    name: "kovan",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    chainId: 42,
    subscriptionId: "9233",
    callbackGasLimit: "500000",
    interval: "30",
  },
};
export const VERIFICATION_BLOCK_CONFIRMATIONS = 3;
export const INITIAL_SUPPLY = "1000000000000000000000";
export const devChains = ["localhost", "hardhat"];
