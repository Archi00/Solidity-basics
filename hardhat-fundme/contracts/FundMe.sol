// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
  using PriceConverter for uint256;

  uint256 public constant MIN_USD = 50 * 1e18;

  address[] public funders;
  mapping(address => uint256) public addressToAmountFunded;

  address public immutable i_owner;

  constructor() {
    i_owner = msg.sender;
  }

  function fund() public payable {
    require(msg.value.getConversionRate() >= MIN_USD, "Didn't send enough");
    funders.push(msg.sender);

    addressToAmountFunded[msg.sender] = msg.value;
  }

  function withdraw() public onlyOwner {
    for (uint256 i = 0; i < funders.length; i++) {
      address funder = funders[i];
      addressToAmountFunded[funder] = 0;
    }

    funders = new address[](0);

    (bool callSuccess, ) = payable(msg.sender).call{
      value: address(this).balance
    }("");
    require(callSuccess, "Call failed");
  }

  modifier onlyOwner() {
    if (msg.sender == i_owner) {
      revert NotOwner();
    }
    _;
  }

  receive() external payable {
    fund();
  }

  fallback() external payable {
    fund();
  }
}
