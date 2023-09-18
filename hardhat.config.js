require('@nomicfoundation/hardhat-toolbox');

const fs = require('fs');
const privateKey = fs.readFileSync('.account-private-key').toString().trim();
const infuraProjectID = fs.readFileSync('.infura').toString().trim();
const etherscanKey = fs.readFileSync('.etherscan').toString().trim();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectID}`,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: etherscanKey,
  },
  solidity: '0.8.19',
};
