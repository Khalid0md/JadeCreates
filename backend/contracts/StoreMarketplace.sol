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

    //mapping(uint256 => Store) private idToStore;
    mapping(string => Store) private subdomainToStore;
    mapping(address => string[]) private ownerAddressToSubdomains;

    constructor(
        string memory newBaseURI,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        setBaseURI(newBaseURI);
    }

    //internal function, used by the contract to search if a name is taken or not before completing many procedures
    /*
    function nameAvailable(string memory name) public view returns (bool) {
        uint256 itemCount = _storeIds.current();
        for (uint256 i = 0; i <= itemCount; i++) {
            if (
                keccak256(abi.encodePacked(idToStore[i].subdomain)) ==
                keccak256(abi.encodePacked(name))
            ) {
                return false;
            }
        }
        return true;
    }
    */
    function nameAvailable(string memory subdomain) public view returns (bool) {
        // check if key's value exists
        if (subdomainToStore[subdomain].isInitialized) { return false; }
        return true;
    }

    //?use enums
    //creates a store and mints a Martazo token to the store owner
    function createStore(
        string memory subdomainIn,
        string memory colourhex,
        string memory plan,
        string memory logoURI
    ) external payable nonReentrant {
        require(nameAvailable(subdomainIn) == true);
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

        //idToStore[id] = Store(
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

    //takes in id and returns store object
    /*
    function getStoreWithId(uint256 id) public view returns (Store memory) {
        return idToStore[id];
    }
    */

    //takes in subdomain and returns store object
    /*
    function getStoreWithSubdomain(string memory subdomainIn)
        public
        view
        returns (Store memory)
    {
        require(nameAvailable(subdomainIn) == false);
        uint256 itemCount = _storeIds.current();
        for (uint256 i = 0; i <= itemCount; i++) {
            if (
                keccak256(abi.encodePacked(idToStore[i].subdomain)) ==
                keccak256(abi.encodePacked(subdomainIn))
            ) {
                return idToStore[i];
            }
        }
    }
    */
    function getStoreWithSubdomain(string memory subdomain) public view returns (Store memory) {
        require(nameAvailable(subdomain) == false);
        return subdomainToStore[subdomain];
    }

    //takes in owner address and returns a set of store ids
    function getSubdomainsFromSender()
        public
        view
        returns (string[] memory)
    {
        return ownerAddressToSubdomains[msg.sender];
    }

    //takes in store object, store colour in hex, updates store colour
    function editStoreColour(Store memory storeIn, string memory newHexColour)
        external
        payable
    {
        require(msg.sender == storeIn.owner);
        storeIn.colourHex = newHexColour;
        //idToStore[storeIn.storeId] = storeIn;
        subdomainToStore[storeIn.subdomain] = storeIn;
    }

    //takes in subdomain, store colour in hex, updates store colour
    function editStoreColour(
        string memory subdomainIn,
        string memory newHexColour
    ) external payable {
        Store memory currentStore = getStoreWithSubdomain(subdomainIn);
        //uint256 id = currentStore.storeId;
        require(msg.sender == currentStore.owner);
        currentStore.colourHex = newHexColour;
        //idToStore[id] = currentStore;
        subdomainToStore[subdomainIn] = currentStore;
    }

    //takes in subdomain, new logoURI, updates logo for particular subdomain
    function editStoreLogo(string memory subdomainIn, string memory newLogoURI)
        external
        payable
    {
        Store memory currentStore = getStoreWithSubdomain(subdomainIn);
        //uint256 id = currentStore.storeId;
        require(msg.sender == currentStore.owner);
        currentStore.logoURI = newLogoURI;
        //idToStore[id] = currentStore;
        subdomainToStore[subdomainIn] = currentStore;
    }
}
