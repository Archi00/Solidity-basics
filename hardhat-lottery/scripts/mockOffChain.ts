import { BigNumber, ContractReceipt, ContractTransaction } from "ethers"
import { ethers, network } from "hardhat"
import { devChains, networkConfig } from "../helper-hardhat-config"
import { Raffle, VRFCoordinatorV2Mock } from "../typechain-types"

async function mockKeepers() {
    const raffle: Raffle = await ethers.getContract("Raffle")
    const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
    const { upkeepNeeded } = await raffle.callStatic.checkUpkeep(checkData)

    if (upkeepNeeded) {
        const tx: ContractTransaction = await raffle.performUpkeep(checkData)
        const txReceipt: ContractReceipt = await tx.wait(1)
        const requestId: BigNumber = txReceipt.events![1].args!.requestId
        if (devChains.includes(network.name)) {
            await mockVrf(requestId, raffle)
        } else {
            console.log("No upkeep needed!")
        }
    }
}

async function mockVrf(requestId: BigNumber, raffle: Raffle) {
    console.log("Local netowrk detected...")
    const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
        "VRFCoordinatorV2Mock"
    )
    await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, raffle.address)
    console.log("Responded")
    const recentWinner = await raffle.getRecentWinner()
    console.log(`The winner is: ${recentWinner}`)
}

mockKeepers()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
