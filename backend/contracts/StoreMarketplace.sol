//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StoreMarketplace is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _storeIds;
    uint256 basicFee = 500 ether;
    uint256 proFee = 1000 ether;
    uint256 unlimitedFee = 2000 ether;
    string public baseURI;

    struct Store {
        uint256 storeId;
        string subdomain;
        string colourHex;
        string plan;
        address payable owner;
        string logoURI;
        bool isInitialized;
    }

    event StoreCreated(
        uint256 indexed storeId,
        string indexed subdomain,
        string colourHex,
        string plan,
        address owner,
        string logoURI,
        bool isInitialized
    );

    mapping(string => Store) private subdomainToStore;
    mapping(address => string[]) private ownerAddressToSubdomains;

    constructor(
        string memory newBaseURI,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        setBaseURI(newBaseURI);
    }

    function nameAvailable(string memory subdomain) public view returns (bool) {
        // check if key's value exists
        if (subdomainToStore[subdomain].isInitialized) {
            return false;
        }
        return true;
    }

    //creates a store and mints a Martazo token to the store owner
    function createStore(
        string memory subdomainIn,
        string memory colourhex,
        string memory plan,
        string memory logoURI
    ) external payable nonReentrant {
        require(nameAvailable(subdomainIn) == true, "Name not available.");
        if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("basic"))
        ) {
            require(msg.value == basicFee, "submit fee to create a store");
        } else if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("pro"))
        ) {
            require(msg.value == proFee, "submit fee to create a store");
        } else if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("unlimited"))
        ) {
            require(msg.value == unlimitedFee, "submit fee to create a store");
        } else {
            revert();
        }

        _storeIds.increment();
        uint256 id = _storeIds.current();

        subdomainToStore[subdomainIn] = Store(
            id,
            subdomainIn,
            colourhex,
            plan,
            payable(msg.sender),
            logoURI,
            true
        );

        ownerAddressToSubdomains[msg.sender].push(subdomainIn);

        emit StoreCreated(
            id,
            subdomainIn,
            colourhex,
            plan,
            msg.sender,
            logoURI,
            true
        );

        _safeMint(msg.sender, id);
        //mints martazo token that indicates ownership of a store
    }

    //returns tokenURI of Martazo token
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return baseURI;
    }

    //chnages logo of Martazo token
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function getStoreWithSubdomain(string memory subdomain)
        public
        view
        returns (Store memory)
    {
        require(nameAvailable(subdomain) == false);
        return subdomainToStore[subdomain];
    }

    //takes in owner address and returns a set of store ids
    function getSubdomainsFromWalletAddress(address ownerAddress)
        public
        view
        returns (string[] memory)
    {
        return ownerAddressToSubdomains[ownerAddress];
    }

    //takes in store object, store colour in hex, updates store colour
    function editStoreColour(Store memory storeIn, string memory newHexColour)
        external
        payable
    {
        require(msg.sender == storeIn.owner);
        storeIn.colourHex = newHexColour;

        subdomainToStore[storeIn.subdomain] = storeIn;
    }

    //takes in subdomain, store colour in hex, updates store colour
    function editStoreColour(
        string memory subdomainIn,
        string memory newHexColour
    ) external payable {
        Store memory currentStore = getStoreWithSubdomain(subdomainIn);

        require(msg.sender == currentStore.owner);
        currentStore.colourHex = newHexColour;

        subdomainToStore[subdomainIn] = currentStore;
    }

    //takes in subdomain, new logoURI, updates logo for particular subdomain
    function editStoreLogo(string memory subdomainIn, string memory newLogoURI)
        external
        payable
    {
        Store memory currentStore = getStoreWithSubdomain(subdomainIn);

        require(msg.sender == currentStore.owner);
        currentStore.logoURI = newLogoURI;

        subdomainToStore[subdomainIn] = currentStore;
    }

    function getValue(uint256 initial) public view returns (uint256) {
        return initial + 150;
    }
}
