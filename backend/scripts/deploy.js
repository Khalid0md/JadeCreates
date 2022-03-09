// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs")



async function main() {

  const Market = await ethers.getContractFactory("Marketplace")
  const market = await Market.deploy()
  await market.deployed()
  console.log("marketplace deployed to: " + market.address)


  //const NFT = await ethers.getContractFactory("NFTest")
  //const nft = await NFT.deploy("name", "symbol", "baseUri", "notRevealedUri")
  //await nft.deployed()
  //console.log("nft deployed to: " + nft.address)

  const Store = await ethers.getContractFactory("StoreMarketplace")
  const store = await Store.deploy("newBaseUri", "name", "blah")
  await store.deployed()
  console.log("store deployed to: " + store.address)

  fs.writeFileSync('./config.js', `export const marketplaceAddress = "${market.address}"\nexport const storeMarketplaceAddress = "${store.address}"`)

  //fs.writeFileSync('./config.js', `
  //export const nftAddress = "${nft.address}"
  //`)



  //using value auctionPrice for everything because minting fee, listing fee,
  //price set by seller, and price paid by buyer are all 1 eth for simplicity

  //add fetch market and display items 1:08:32

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
