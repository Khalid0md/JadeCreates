//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    uint256 fee = 1 ether;

    constructor() {}

    //struct defines a listing
    struct Listing {
        uint256 itemId;
        uint256 tokenId;
        uint256 price;
        string subdomain;
        address nftContract;
        address payable owner;
        bool sold;
        bool active;
    }

    //mapping id to Listing
    mapping(uint256 => Listing) private idToListing;
    //?
    //mapping(address => mapping(uint256 => mapping(address => uint256))) public bids;

    event ListingCreated(
        uint256 indexed itemId,
        uint256 tokenId,
        uint256 price,
        string subdomain,
        address indexed nftContract,
        address indexed owner,
        bool sold,
        bool active
    );

    //places an item for sale on the marketplace
    function createListing(
        string memory subdomain,
        uint256 tokenId,
        uint256 priceIn,
        address nftContract
    ) public payable nonReentrant {
        require(msg.value == fee, "Please pay listing fee");
        //list something you don't own? require or backend? moralis?
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        uint256 price = priceIn;
        idToListing[itemId] = Listing(
            itemId,
            tokenId,
            price,
            subdomain,
            nftContract,
            payable(msg.sender),
            false,
            true
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit ListingCreated(
            itemId,
            tokenId,
            price,
            subdomain,
            nftContract,
            msg.sender,
            false,
            true
        );
    }

    //buy now function
    function buyNow(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = 1 ether * idToListing[itemId].price;
        uint256 tokenId = idToListing[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        require(
            idToListing[itemId].sold == false,
            "This item has already been sold"
        );
        require(
            idToListing[itemId].active == true,
            "This listing is no longer active"
        );

        //change status to sold
        idToListing[itemId].sold = true;
        _itemsSold.increment();
        //transfer money to seller
        idToListing[itemId].owner.transfer(msg.value);
        //transfer NFT to buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        //change owner to buyer
        idToListing[itemId].owner = payable(msg.sender);
        //change listing to inactive
        idToListing[itemId].active = false;
        _itemsSold.increment();
    }

    function cancelListing(uint256 itemId) public payable nonReentrant {
        require(msg.sender == idToListing[itemId].owner, "Not owner");
        delete idToListing[itemId];
    }

    /** 
    function placeBid(
        address nftContract,
        uint256 itemId,
        uint256 price
    ) public payable {
        require (price > 0, "Bid has to be larger than 0");
        require (idToListing[itemId].sold == false, "This listing has expired");
        require (idToListing[itemId].active == false, "This listing is no longer active");
        transferFrom(msg.sender, address(this))
    }
    function acceptBid(address nftContract, uint256 itemId) public payable {}
    */
    function getListingPrice(uint256 id) public view returns (uint256) {
        return idToListing[id].price;
    }

    function getFee() public view returns (uint256) {
        return fee;
    }

    function fetchListings() public view returns (Listing[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        Listing[] memory items = new Listing[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToListing[i + 1].owner == address(0)) {
                uint256 currentId = i + 1;
                Listing storage currentItem = idToListing[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //returns an array of unsold listing id's by subdomain
    function getListingIdsBySubDomain(string memory subdomainIn)
        public
        view
        returns (uint256[] memory)
    {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        uint256[] memory items = new uint256[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (
                idToListing[i + 1].owner == address(0) &&
                (keccak256(abi.encodePacked(idToListing[i + 1].subdomain)) ==
                    keccak256(abi.encodePacked(subdomainIn)))
            ) {
                uint256 currentId = i + 1;
                uint256 currentItem = idToListing[currentId].itemId;
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getListing(uint256 id) external view returns (Listing memory) {
        return idToListing[id];
    }
}
