import { BigNumber } from "ethers"
import { ethers } from "hardhat"

export interface networkConfigItem {
    vrfCoordinatorV2?: string
    entranceFee?: BigNumber
    gasLane?: string
    chainId?: number
    subscriptionId?: string
    callbackGasLimit?: string
    interval?: string
}
export interface networkConfigInfo {
    [name: string]: networkConfigItem
}
export const networkConfig: networkConfigInfo = {
    hardhat: {
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        chainId: 31337,
        callbackGasLimit: "500000",
        interval: "30",
    },
    rinkeby: {
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        chainId: 4,
        subscriptionId: "0",
        callbackGasLimit: "500000",
        interval: "30",
    },
}
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
export const devChains = ["localhost", "hardhat"]
