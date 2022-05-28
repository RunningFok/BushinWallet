const hre = require("hardhat");

async function readPrice() {
    
    const priceFeedFactory = await hre.ethers.getContractFactory("PriceFeed");

    const gasPrice = await priceFeedFactory.signer.getGasPrice();
    console.log(`Current gas price: ${gasPrice}`);

    const estimatedGas = await priceFeedFactory.signer.estimateGas(
      priceFeedFactory.getDeployTransaction(),
    );
    console.log(`Estimated gas: ${estimatedGas}`);

    
    const deployerBalance = await priceFeedFactory.signer.getBalance();
    console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);


    const deploymentPrice = gasPrice.mul(estimatedGas);
    console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);



    console.log("Deploying")
    const priceFeedContract = await priceFeedFactory.deploy();
    await priceFeedContract.deployed();

    console.log("PriceFeed deployed to ", priceFeedContract.address)
    

    apePrice = await priceFeedContract.getLatestApePrice()
    console.log("hi ape price is ",apePrice.toString());

    bnbPrice = await priceFeedContract.getLatestBnbPrice()
    console.log("hi bnb price is ",bnbPrice.toString());

    daiPrice = await priceFeedContract.getLatestDaiPrice()
    console.log("hi dai price is ",daiPrice.toString());
  
    dogePrice = await priceFeedContract.getLatestDogePrice()
    console.log("hi doge price is ",dogePrice.toString());

    ethPrice = await priceFeedContract.getLatestEthPrice()
    console.log("hi eth price is ",ethPrice.toString());

    linkPrice = await priceFeedContract.getLatestLinkPrice()
    console.log("hi link price is ",linkPrice.toString());
  
    maticPrice = await priceFeedContract.getLatestMaticPrice()
    console.log("hi matic price is ",maticPrice.toString());
    
    usdtPrice = await priceFeedContract.getLatestUsdtPrice()
    console.log("hi usdt price is ",usdtPrice.toString());

    
    
  
  
  }
  
  
  readPrice()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  