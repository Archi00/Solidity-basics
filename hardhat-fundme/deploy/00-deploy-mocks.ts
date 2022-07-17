import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig } from "../helper-hardhat-config"

const deployFundme: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId: number = network.config.chainId!

  const ethUsdPriceFeedAddress =
    networkConfig[chainId]["ethUsdPriceFeedAddress"]

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [
      /* Address */
    ],
    log: true,
  })
}

export default deployFundme
