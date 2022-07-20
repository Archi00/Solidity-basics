//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error Raffle__NotEnoughEthEntered();

contract Raffle {
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    constructor(uint256 entraceFee) {
        i_entranceFee = entraceFee;
    }

    function enterRaffe() public payable {
        if (msg.value < i_entranceFee) { 
            revert Raffle__NotEnoughEthEntered(); 
        }
        s_players.push(payable(msg.sender));
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayers(uint256 _index) public view returns (address) {
        return s_players[_index];
    }

    // function pickRandomWinner(){}
}