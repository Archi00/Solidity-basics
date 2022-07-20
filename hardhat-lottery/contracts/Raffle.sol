//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error Raffle__NotEnoughEthEntered();

contract Raffle {
    /* State Variables  */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /* Events */
    event RaffleEnter(address indexed _player);

    constructor(uint256 _entraceFee) {
        i_entranceFee = _entraceFee;
    }

    function enterRaffe() public payable {
        if (msg.value < i_entranceFee) { 
            revert Raffle__NotEnoughEthEntered(); 
        }
        s_players.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayers(uint256 _index) public view returns (address) {
        return s_players[_index];
    }

    // function pickRandomWinner(){}
}