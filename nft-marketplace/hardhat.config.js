require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
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
      accounts: [privateKey]
    },

  },
  solidity: "0.8.4",
};

