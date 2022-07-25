import {
    devChains,
    VERIFICATION_BLOCK_CONFIRMATIONS as WAIT_BLOCKS,
} from "../helper-hardhat-config"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers, network } from "hardhat"
import { networkConfig } from "../helper-hardhat-config"

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2")

const deployRaffle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    let vrfCoordinatorV2Address, subscriptionId
    log(network.name)

    if (devChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const txResponse = await vrfCoordinatorV2Mock.createSubscription()
        const txReceipt = await txResponse.wait(1)
        subscriptionId = txReceipt.events[0].args.subId
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[network.name]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[network.name]["subscriptionId"]
    }

    const entranceFee = networkConfig[network.name]["entranceFee"]
    const gasLane = networkConfig[network.name]["gasLane"]
    const callbackGasLimit = networkConfig[network.name]["callbackGasLimit"]
    const interval = networkConfig[network.name]["interval"]

    const args = [
        vrfCoordinatorV2Address,
        entranceFee,
        gasLane,
        subscriptionId,
        callbackGasLimit,
        interval,
    ]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: WAIT_BLOCKS,
    })
}

export default deployRaffle
