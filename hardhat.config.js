require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers")
require('dotenv').config();
const { PRIV_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: PRIV_KEY
    }
  },
  gasReporter: {
    enabled: false,
  },
};
