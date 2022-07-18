export interface netWorkConfigItem {
  ethUsdPriceFeedAddress?: string
  blockConfirmations?: number
}

export interface networkConfigInfo {
  [key: string]: netWorkConfigItem
}

export const networkConfig: networkConfigInfo = {
  hardhat: {},
  localhost: {},
  rinkeby: {
    ethUsdPriceFeedAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    blockConfirmations: 6,
  },
  kovan: {
    ethUsdPriceFeedAddress: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    blockConfirmations: 6,
  },
  polygon: {
    ethUsdPriceFeedAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    blockConfirmations: 6,
  },
}

export const devChains: string[] = ["hardhat", "localhost"]
export const DECIMALS: number = 0
export const INITIAL_ANSWER: number = 200000000000
