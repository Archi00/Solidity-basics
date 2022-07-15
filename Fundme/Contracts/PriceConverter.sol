// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    // Rinkeby
    function getPrice() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        // gets the price of ETH in USD
        (,int256 price,,,) = priceFeed.latestRoundData();
        // casts int256 to uint256 as msg.value == uint256
        // adds 10 decimals to the price because msg.value == 1e18 and price == 1e8
        return uint256(price * 1e10);
    }

    function getVersion() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        return priceFeed.version();
    }

    function getConversionRate(uint256 ethAmount) internal view returns (uint256) {
        // Calls the function to get the current eth price
        uint256 ethPrice = getPrice();
        // Convert the var passed in eth amount to USD
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        // Returns the price in USD + 18 decimals
        return ethAmountInUsd; 

    }
}