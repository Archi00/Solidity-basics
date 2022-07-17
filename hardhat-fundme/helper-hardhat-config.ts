export interface netWorkConfigItem {
  name?: string
  ethUsdPriceFeedAddress?: string
}

export interface networkConfigInfo {
  [key: number]: netWorkConfigItem
}

export const networkConfig: networkConfigInfo = {
  4: {
    name: "goerli",
    ethUsdPriceFeedAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
  137: {
    name: "polygon",
    ethUsdPriceFeedAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  },
}

export const devChains: string[] = ["hardhat", "localhost"]
export const DECIMALS: number = 0
export const INITIAL_ANSWER: number = 200000000000
