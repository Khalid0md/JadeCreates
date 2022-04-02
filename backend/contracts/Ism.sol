//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

abstract contract Ism is ERC721, ReentrancyGuard, Ownable {
    struct Store {
        uint256 storeId;
        string subdomain;
        string colourHex;
        string plan;
        address payable owner;
        string logoURI;
        bool isInitialized;
    }

    function nameAvailable(string memory subdomain)
        public
        view
        returns (bool)
    {}

    function createStore(
        string memory subdomainIn,
        string memory colourhex,
        string memory plan,
        string memory logoURI
    ) external payable nonReentrant {}

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {}

    function setBaseURI(string memory _newBaseURI) public onlyOwner {}

    function getStoreWithSubdomain(string memory subdomain)
        public
        view
        returns (Store memory)
    {}

    function getSubdomainsFromWalletAddress(address ownerAddress)
        public
        view
        returns (string[] memory)
    {}

    function editStoreColour(Store memory storeIn, string memory newHexColour)
        external
        payable
    {}

    function editStoreColour(
        string memory subdomainIn,
        string memory newHexColour
    ) external payable {}

    function editStoreLogo(string memory subdomainIn, string memory newLogoURI)
        external
        payable
    {}
}
