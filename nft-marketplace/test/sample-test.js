const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("Marketplace")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("NFTest")
    const nft = await NFT.deploy("dfd", "df", "sdfd", "fsdf")
    await nft.deployed()
    const nftaddress = nft.address

    let fee = await market.getFee()
    fee = fee.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    const [_, seller1, seller2, buyer1, buyer2, buyer3] = await ethers.getSigners()

    //seller1 mints
    await nft.connect(seller1).mint(1, { value: auctionPrice })

    //seller 1 approves marketplace to transfer his NFT, setApprovalForAllFunction takes in address and bool
    await nft.connect(seller1).setApprovalForAll(marketAddress, true)

    //seller 1 creates listing
    await market.connect(seller1).createListing(1, 1, nftaddress, { value: auctionPrice })

    //buyer 1 buys NFT from seller1
    await market.connect(buyer1).buyNow(nftaddress, 1, { value: auctionPrice })

    //using value auctionPrice for everything because minting fee, listing fee,
    //price set by seller, and price paid by buyer are all 1 eth for simplicity

    //add fetch market and display items 1:08:32


  });
});
