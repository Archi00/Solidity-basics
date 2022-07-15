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

    address public owner; 

    constructor(){
        owner = msg.sender;
    }

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

    function withdraw() public onlyOwner {
        // loop through funders array and set the amount stored in the mapping 
        // for that address to 0
        for(uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        // reset the funders array
        funders = new address[](0);

        // this referes to the contract as a whole
        // this would transfer all the eth inside the contract to the caller of the func
        // we also need to cast the address type (msg.sender) to a payable address
        // capped at 2300 gas limit, if fails throws error
        //payable(msg.sender).transfer(address(this).balance);

        // this function would do the same as the transfer function above
        // it's also capped at 2300 gas usage, if fails though
        // returns a bool
        //ool sendSuccess = payable(msg.sender).send(address(this).balance);

        // so we add the require function to throw an error if returns false
        //require(sendSuccess, "Send failed");

        // this function does the same as the other 2
        // it doesn't have a limit of gas used
        // call function can be used to interact with any contract/function
        // we don't want to interact with any so we leave the ("")
        // we can pass the value object to the call function specifing the amount to send
        // this function returns 2 items a bool an a bytes array (array must be stored)
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");

        // as it returns a bool an not an error we can fail check it with require func
        require(callSuccess, "Call failed");
    }

    // modifier key word, you can add this to any function declaration
    // the function will run the code inside this modifier
    // the _ represents the when the code inside the main function will run
    // in this case first will run the require() and then the code from the main func
    modifier onlyOwner {
        require(msg.sender == owner, "Sender is not the owner!");
        _;
    }

}