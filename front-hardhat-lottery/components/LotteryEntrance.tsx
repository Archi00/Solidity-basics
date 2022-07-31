import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber } from "ethers"

interface contractAddressesInterface {
    [key: string]: string[]
}

export default function LotteryEntrance() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const raffleAddress = chainId in addresses ? addresses[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")

    const { runContractFunction: enterRaffle } = useWeb3Contract({
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

    useEffect(() => {
        if (isWeb3Enabled) {
            ;(async function () {
                const entranceFeeFromCall = ((await getEntranceFee()) as BigNumber).toString()
                setEntranceFee(entranceFeeFromCall)
            })()
        }
    }, [isWeb3Enabled])
    return <div></div>
}
