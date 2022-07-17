import verify from "../utils/verify"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { devChains, networkConfig } from "../helper-hardhat-config"

const deployFundme: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  let ethUsdPriceFeedAddress: string
  if (!networkConfig[network.name])
    return log(
      `No price feed available for ${network.name}!\nPlease choose another network to deploy your contract!`
    )
  if (devChains.includes(network.name)) {
    const ethUsdAggregator = await get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress =
      networkConfig[network.name]["ethUsdPriceFeedAddress"]
  }

  const args: any[] = [ethUsdPriceFeedAddress]
  const fundMe = await deploy("FundMe", {
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

export default deployFundme

deployFundme.tags = ["all", "fundMe"]
