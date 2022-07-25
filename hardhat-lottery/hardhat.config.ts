import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"
import "hardhat/config"
import { HardhatUserConfig } from "hardhat/config"

/** @type import('hardhat/config').HardhatUserConfig */

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: { hardhat: { chainId: 31337 }, localhost: { chainId: 31337 } },
    namedAccounts: { deployer: { default: 0 }, player: { default: 1 } },
    solidity: { compilers: [{ version: "0.8.8" }, { version: "0.4.24" }] },
}
export default config
