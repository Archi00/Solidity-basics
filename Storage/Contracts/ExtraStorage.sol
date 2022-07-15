// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

// Inherits all the functions from the SimpleStorage contract
contract ExtraStorage is SimpleStorage {
    // We can override functions from the parent contract
    // The parent contract function needs the virtual keyword on the function declaration
    // The child contract function needs the override keyword on the function declaration
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 5;
    }
}