// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceFeed {
    AggregatorV3Interface internal apePriceFeed;
    AggregatorV3Interface internal bnbPriceFeed;
    AggregatorV3Interface internal daiPriceFeed;
    AggregatorV3Interface internal dogePriceFeed;
    AggregatorV3Interface internal ethPriceFeed;
    AggregatorV3Interface internal linkPriceFeed;
    AggregatorV3Interface internal maticPriceFeed;
    AggregatorV3Interface internal usdtPriceFeed;

  

    constructor() {
        apePriceFeed = AggregatorV3Interface(0xD10aBbC76679a20055E167BB80A24ac851b37056);
        bnbPriceFeed = AggregatorV3Interface(0x14e613AC84a31f709eadbdF89C6CC390fDc9540A);
        daiPriceFeed = AggregatorV3Interface(0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9);
        dogePriceFeed = AggregatorV3Interface(0x2465CefD3b488BE410b941b1d4b2767088e2A028);
        ethPriceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
        linkPriceFeed = AggregatorV3Interface(0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c);
        maticPriceFeed = AggregatorV3Interface(0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676);
        usdtPriceFeed = AggregatorV3Interface(0x3E7d1eAB13ad0104d2750B8863b489D65364e32D);
         
    }

 

     function getLatestApePrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int apePrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = apePriceFeed.latestRoundData();
        return apePrice ;
    }

    function getLatestBnbPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int bnbPrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = bnbPriceFeed.latestRoundData();
        return bnbPrice ;
    }


    function getLatestDaiPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int daiPrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = daiPriceFeed.latestRoundData();
        return daiPrice ;
    }

    function getLatestDogePrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int dogePrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dogePriceFeed.latestRoundData();
        return dogePrice ;
    }



    function getLatestEthPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int ethPrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = ethPriceFeed.latestRoundData();
        return ethPrice ;
    }

     function getLatestLinkPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int linkPrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = linkPriceFeed.latestRoundData();
        return linkPrice ;
    }

    
     

     function getLatestMaticPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int maticPrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = maticPriceFeed.latestRoundData();
        return maticPrice ;
    }

     function getLatestUsdtPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int usdtPrice,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = usdtPriceFeed.latestRoundData();
        return usdtPrice ;
    }

   

    
}