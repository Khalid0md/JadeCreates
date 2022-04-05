//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "../contracts/Ism.sol";

contract RevisedMarketplace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address addy;
    address payable royalty;

    function setRoyaltyAddress(address payable add) public onlyOwner {
        royalty = add;
    }

    function setAddy(address add) public onlyOwner {
        addy = add;
    }

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
    mapping(string => uint256[]) private subdomainToListingIds;

    //.length depending on plan

    function migrateListings()
        public
        view
        onlyOwner
        returns (Listing[] memory)
    {
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        Listing[] memory arr = new Listing[](unsoldItemCount);
        for (uint256 i = 0; i <= unsoldItemCount; i++) {
            Listing memory currentItem = idToListing[i];
            arr[i] = currentItem;
        }
        return arr;
    }

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
        uint256 maxListings;

        Ism a = Ism(addy);
        string memory plan = a.getStoreWithSubdomain(subdomain).plan;

        if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("basic"))
        ) {
            maxListings = 9;
        } else if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("pro"))
        ) {
            maxListings = 99;
        } else if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("unlimited"))
        ) {
            maxListings = 1000000000;
        } else {
            revert();
        }

        if (subdomainToListingIds[subdomain].length > maxListings) {
            revert();
        }

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
        subdomainToListingIds[subdomain].push(itemId);

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

        //transfer money to seller
        Ism b = Ism(addy);
        string memory plan = b
            .getStoreWithSubdomain(idToListing[itemId].subdomain)
            .plan;

        if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("basic"))
        ) {
            idToListing[itemId].owner.transfer((price * 95) / 100);
            royalty.transfer((price * 5) / 100);
        } else if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("pro"))
        ) {
            idToListing[itemId].owner.transfer((price * 97) / 100);
            royalty.transfer((price * 3) / 100);
        } else if (
            keccak256(abi.encodePacked(plan)) ==
            keccak256(abi.encodePacked("unlimited"))
        ) {
            idToListing[itemId].owner.transfer((price * 99) / 100);
            royalty.transfer((price * 1) / 100);
        } else {
            revert();
        }

        //change status to sold
        idToListing[itemId].sold = true;
        _itemsSold.increment();

        //transfer NFT to buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        //change owner to buyer
        idToListing[itemId].owner = payable(msg.sender);
        //change listing to inactive
        idToListing[itemId].active = false;
        _itemsSold.increment();
    }

    function relistToken(
        uint256 tokenId,
        uint256 price,
        address nftContract
    ) public payable {
        require(
            idToListing[tokenId].owner == msg.sender,
            "Only owner can relist"
        );

        idToListing[tokenId].sold = false;
        idToListing[tokenId].active = false;
        idToListing[tokenId].price = price;
        idToListing[tokenId].active = true;

        _itemsSold.decrement();

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    }

    function cancelListing(uint256 itemId) public payable nonReentrant {
        require(msg.sender == idToListing[itemId].owner, "Not owner");
        delete idToListing[itemId];
    }

    function getListingPrice(uint256 id) public view returns (uint256) {
        return idToListing[id].price;
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

    function getListingIdsBySubdomain(string memory subdomainIn)
        public
        view
        returns (uint256[] memory)
    {
        return subdomainToListingIds[subdomainIn];
    }

    function getListing(uint256 id) external view returns (Listing memory) {
        return idToListing[id];
    }
}
