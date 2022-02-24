//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract StoreMarketplace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter _storeIds;
    uint256 basicFee = 500 ether;
    uint256 proFee = 1000 ether;
    uint256 unlimitedFee = 2000 ether;

    struct Store {
        storeId
        subdomain
        colourhex
        plan
        owner
        logoURI
    }

    event StoreCreated {

    }

    mapping idToStore() 

    constructor () {}

    function createStore (string memory subdomainIn, string memory colourhex, string memory plan, string memory logoURI) external payable {
        if (keccak256(abi.encodePacked(plan)) ==
                    keccak256(abi.encodePacked("basic")))) {
                        require(msg.value == basicFee);
        }

        else if (keccak256(abi.encodePacked(plan)) ==
                    keccak256(abi.encodePacked("pro")))) {
                        require(msg.value == proFee);
        }

        else if (keccak256(abi.encodePacked(plan)) ==
                    keccak256(abi.encodePacked("unlimited")))) {
                        require(msg.value == unlimitedFee);
        }

        else {
            revert();
        }

        _storeIds.increment();
        uint256 id = _storeIds.current();
        


         
    }
}
