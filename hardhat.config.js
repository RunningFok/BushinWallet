require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking:{
        url: process.env.ALCHEMY_MAINNET_API,
        enabled: true
      },
      chainId:1337

    },
    ethereum_mainnet: {
      
      url: process.env.ALCHEMY_MAINNET_API,
      accounts:[process.env.ACCOUNT_1_PRIVATE_KEY],
      
  },
    rinkeby: {
      url: process.env.INFURA_RINKEBY_API,
      account: process.env.ACCOUNT_1_PRIVATE_KEY
    }
  }
};
