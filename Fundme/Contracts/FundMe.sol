// Get funds from users
// Withdraw funds
// Set a minimum funding value in USD

// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.8;

contract FundMe {

    uint256 public minUsd = 50;
    // payable key word makes transaction with eth available
    // makes this contract able to hold eth
    function fund() public payable {
        // Want to be able to set a minimum fund amount in USD
        require(msg.value > 1e18, "Didn't send enough"); //1e18 wei == 1 * 10 ** 18 == 1000000000000000000 == 1eth 

    }

    //function withdraw(){}


}