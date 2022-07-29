import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import {useMoralis} from "react-moralis"

interface contractAddressesInterface{
    [key:string]: string[]
}

export default function LotteryEntrance() {
    const addresses: contractAddressesInterface = contractAddresses
    const {chainId:chainIdHex}=useMoralis()
    const chainId:string = parseInt(chainIdHex!).toString()
    const raffleAddress = chainId in addresses?addresses[chainId][0] : null
    
    const {runContractFunction: enterRaffle} = useWeb3Contract({
      abi,
      contractAddress:raffleAddress!,
      functionName: "enterRaffle",
      params: {},
      msgValue:,
      )
    return <div></div>
}
