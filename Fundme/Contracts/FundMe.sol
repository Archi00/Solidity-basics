// Get funds from users
// Withdraw funds
// Set a minimum funding value in USD

// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.8;

import "./PriceConverter.sol";


contract FundMe {
    // Adding functions from the library to uint256
    // Can be accessed as a function inside an object
    // The object will be the first parameter
    using PriceConverter for uint256;

    uint256 public minUsd = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    // payable key word makes transaction with eth available
    // makes this contract able to hold eth
    function fund() public payable {
        // Require parameters need to return true, else tx gets reverted
        // Reverted => undo any previous computation, send remaining gas back
        require(msg.value.getConversionRate() >= minUsd, "Didn't send enough"); 
        funders.push(msg.sender); 

        // Saves mapping of address of the caller with the value it sent 
        addressToAmountFunded[msg.sender] = msg.value;
    }



    //function withdraw(){}


}