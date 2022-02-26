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
        uint256 listingId;
        uint256 tokenId;
        uint256 price;
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
        address indexed nftContract,
        address indexed owner,
        bool sold,
        bool active
    );

    //places an item for sale on the marketplace
    function createListing(
        uint256 tokenId,
        uint256 price,
        address nftContract
    ) public payable nonReentrant {
        require(msg.value == fee, "Please pay listing fee");
        //list something you don't own? require or backend? moralis?
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToListing[itemId] = Listing(
            itemId,
            tokenId,
            price,
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
        uint256 price = idToListing[itemId].price;
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
            idToListing[itemId].active == false,
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
}
