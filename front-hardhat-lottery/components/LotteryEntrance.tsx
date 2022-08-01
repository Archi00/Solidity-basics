import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ContractTransaction, ethers, ContractInterface } from "ethers"
import { useNotification } from "web3uikit"

interface contractAddressesInterface {
    [key: string]: string[]
}

export default function LotteryEntrance() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled, enableWeb3 } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const raffleAddress = chainId in addresses ? addresses[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi,
        contractAddress: raffleAddress!,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi,
        contractAddress: raffleAddress!,
        functionName: "getEntranceFee",
        params: {},
    })
    const { runContractFunction: getNumOfPlayers } = useWeb3Contract({
        abi,
        contractAddress: raffleAddress!,
        functionName: "getNumPlayers",
        params: {},
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi,
        contractAddress: raffleAddress!,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = ((await getEntranceFee()) as BigNumber).toString()
        const numPlayersFromCall = ((await getNumOfPlayers()) as BigNumber).toString()
        const recentWinnerFromCall = (await getRecentWinner()) as string
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    async function getContract() {
        const moralisProvider: any = await enableWeb3()
        const raffle = new ethers.Contract(
            raffleAddress! as string,
            abi as ContractInterface,
            moralisProvider
        )
        return raffle
    }

    const contractListener = () => {
        new Promise<void>(async (resolve, reject) => {
            const contract = await getContract()
            contract.once("WinnerPicked", async () => {
                try {
                    const winner = await contract.getRecentWinner()
                    console.log(`Winner updated: ${winner}`)
                    setRecentWinner(winner)
                } catch (e) {
                    reject(e)
                }
                resolve()
            })
        })
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            // contractListener()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx: ContractTransaction) => {
        await tx.wait(1)
        handleNewNotification()
        updateUI()
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            {raffleAddress ? (
                <div className="">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () => {
                            await enterRaffle({
                                onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
                                onError: (e) => console.log(e),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")}</div>
                    <div>Players: {numPlayers}</div>
                    <div>Recent Winner: {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
