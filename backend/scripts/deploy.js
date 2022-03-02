// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const Market = await ethers.getContractFactory("Marketplace")
  const market = await Market.deploy()
  await market.deployed()

  const NFT = await ethers.getContractFactory("NFTest")
  const nft = await NFT.deploy("name", "symbol", "baseUri", "notRevealedUri")
  await nft.deployed()

  const Store = await ethers.getContractFactory("StoreMarketplace")
  const store = await Store.deploy("newBaseUri", "name", "Symbol")
  await store.deployed()

  fs.writeFileSync('./config.js', `
  export const marketplaceAddress = "${market.address}"
  `)

  fs.writeFileSync('./config.js', `
  export const storeMarketplaceAddress = "${store.address}"
  `)

  fs.writeFileSync('./config.js', `
  export const nftAddress = "${nft.address}"
  `)

  let fee = await market.getFee()
  fee = fee.toString()

  const auctionPrice = ethers.utils.parseUnits('1', 'ether')
  const basicFee = ethers.utils.parseUnits('500', 'ether')

  const [_, seller1, seller2, buyer1, buyer2, buyer3] = await ethers.getSigners()

  //seller1 mints
  await nft.connect(seller1).mint(1, { value: auctionPrice })
  console.log("mint successful")

  //seller1 registers store
  await store.connect(seller1).createStore("khalids", "#571686", "basic", "www.logo.com", { value: basicFee })
  console.log("store registery successful")

  //seller 1 approves marketplace to transfer his NFT, setApprovalForAllFunction takes in address and bool
  await nft.connect(seller1).setApprovalForAll(marketAddress, true)
  console.log("seller1 approval successful")

  //seller 1 creates listing
  //should require the subdomain to be available
  await market.connect(seller1).createListing("khalids", 1, 1, nftaddress, { value: auctionPrice })
  console.log("seller1 lsiitng created successful")

  //buyer 1 buys NFT from seller1
  await market.connect(buyer1).buyNow(nftaddress, 1, { value: auctionPrice })
  console.log("seller1 sale to buyer1 successful")

  //buyer 1 wants to relist, he must seek approval first. approves marketplace to transfer his NFT, setApprovalForAllFunction takes in address and bool
  await nft.connect(buyer1).setApprovalForAll(marketAddress, true)
  console.log("buyer1 approval successful")

  //buyer 1 relists
  //need a way of grabbing these nftcontractaddresses
  await market.connect(buyer1).relistToken(1, 1, nftaddress, { value: auctionPrice })
  console.log("buyer1 relist successful")

  //seller 1 buys it back
  await market.connect(seller1).buyNow(nftaddress, 1, { value: auctionPrice })
  console.log("buyer1 sale back to resller1 successful")

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
