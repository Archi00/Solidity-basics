//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {
    // Initializes an array to store the contracts (SimpleStorage *imported)
    // It's public so solidity creates a getter function automatically 
    SimpleStorage[] public simpleStorageArray;

    // Public function so we can interact with it externally
    function createSimpleStorageContract() public {
        // Creates a new variable called simpleStorage that's type SimpleStorage
        // and initializes a new contract from SimpleStorage
        // then pushes it into the array that's public so we can access the contract
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        // in the array simpleStorageArray at the index we pass 
        // to our function sfStore renamed as _simpleStorageIndex
        // Calls the store function inside the contract and passes the var 
        simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);

    }

    // Function to retrieve the stored number using sfStore to the SimpleStorage contract
    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    }
}