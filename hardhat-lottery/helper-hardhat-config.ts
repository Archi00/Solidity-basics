export interface networkConfigItem {
    vrfCoordinatorV2?: string
}
export interface networkConfigInfo {
    [name: string]: networkConfigItem
}
export const networkConfig: networkConfigInfo = {
    rinkeby: { vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab" },
}
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
export const devChains = ["localhost", "hardhat"]
