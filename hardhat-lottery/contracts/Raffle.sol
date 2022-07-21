//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


/* Imports */
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

/* Custom errors */
error Raffle__NotEnoughEthEntered();

contract Raffle is VRFConsumerBaseV2 {
    /* State Variables  */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /* Events */
    event RaffleEnter(address indexed _player);

    constructor(address _vrfCoordinatorV2, uint256 _entraceFee) VRFConsumerBaseV2(_vrfCoordinatorV2) {
        i_entranceFee = _entraceFee;
    }

    function enterRaffe() public payable {
        if (msg.value < i_entranceFee) { 
            revert Raffle__NotEnoughEthEntered(); 
        }
        s_players.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }

    function requestRandomWinner() external {

    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {}

    /* View / Pure functions */
    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayers(uint256 _index) public view returns (address) {
        return s_players[_index];
    }

}