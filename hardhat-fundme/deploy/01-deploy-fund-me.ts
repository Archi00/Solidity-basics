import verify from "../utils/verify"
import {
  DeployFunction,
  Deployment,
  DeployResult,
} from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { devChains, networkConfig } from "../helper-hardhat-config"

const deployFundme: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  let ethUsdPriceFeedAddress: string
  if (devChains.includes(network.name)) {
    const ethUsdAggregator: Deployment = await get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress =
      networkConfig[network.name]["ethUsdPriceFeedAddress"]!
  }

  const args: any[] = [ethUsdPriceFeedAddress]

  const fundMe: DeployResult = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name]["blockConfirmations"] || 1,
  })

  if (!devChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(fundMe.address, args)
  }
  log("----------------------------------------------")
}

deployFundme.tags = ["all", "fundMe"]
export default deployFundme
