require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-ethers");

var fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {},
    mumbai: {
      url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    testnet: {
      url: `https://api.s0.b.hmny.io`,
      accounts: [privateKey],
      gasPrice: 35000000000,
      saveDeployments: true
    },
    mainnet: {
      url: `https://api.harmony.one`,
      accounts: [privateKey],
      gasPrice: 35000000000,
      saveDeployments: true
    }

  },
  solidity: "0.8.4",
};