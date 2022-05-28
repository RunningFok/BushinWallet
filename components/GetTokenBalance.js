const { ethers, Signer, Contract, providers } = require("ethers");
import React, { useEffect, useState } from "react";
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
const fs = require("fs");
const path = require("path")
import PriceFeed from "../artifacts/contracts/PriceFeed.sol/PriceFeed.json"

use(Web3ClientPlugin)



const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
]

const PRICE_FEED_ABI = [
    "function getLatestEthPrice() public view returns (int)",
    "function getLatestDaiPrice() public view returns (int)",
    "function getLatestDogePrice() public view returns (int)",
    "function getLatestMaticPrice() public view returns (int)",
    "function getLatestApePrice() public view returns (int)"
]


// const price_abi_json = "../artifacts/contracts/PriceFeed.sol/PriceFeed.json"
// const filePath = path.resolve("../artifacts", "contracts", "PriceFeed.sol", "PriceFeed.json")
// const parsed = fs.readFileSync(filePath)

const priceABI = PriceFeed.abi;

//Ethereum Mainnet Contracts
const APE_ADDRESS = "0x4d224452801ACEd8B2F0aebE155379bb5D594381"
const BNB_ADDRESS = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const DOGE_ADDRESS = "0x2a98f128092aBBadef25d17910EbE15B8495D0c1"
const LINK_ADDRESS = "0x514910771AF9Ca656af840dff83E8264EcF986CA"
const MATIC_ADDRESS = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"

const APE_PRICE_ADDR = "0xD10aBbC76679a20055E167BB80A24ac851b37056"
const BNB_PRICE_ADDR = "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A"
const DAI_PRICE_ADDR = "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9"
const DOGE_PRICE_ADDR = "0x2465CefD3b488BE410b941b1d4b2767088e2A028"
const ETH_PRICE_ADDR = "0x9326BFA02ADD2366b30bacB125260Af641031331"
const LINK_PRICE_ADDR = "0x396c5E36DD0a0F5a5D33dae44368D4193f69a1F0"
const MATIC_PRICE_ADDR = "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676"
const USDT_PRICE_ADDR = "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D"

//Moonbeam Contracts
const GLIMMER_ADDRESS = "0xAcc15dC74880C9944775448304B263D191c6077F"


//Polygon Contracts
const POLY_ETHER_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
const POLY_MATIC_ADDRESS = "0x0000000000000000000000000000000000001010"


const PRICE_FEED_ADDR = "0xFEb9bedcc2090F58ebCE52D3FFaeE932F606D82A"



const GetTokenBalance = () => {

    const [ethBalance, setEthBalance] = useState("");
    const [daiBalance, setDaiBalance] = useState("");
    const [dogeBalance, setDogeBalance] = useState("");
    const [maticBalance, setMaticBalance] = useState("");
    const [apeBalance, setApeBalance] = useState("");
    const [bnbBalance, setBnbBalance] = useState("")
    const [usdtBalance, setUsdtBalance] = useState("")
    const [linkBalance, setLinkBalance] = useState("")


    const [glimmerBalance, setGlimmerBalance] = useState("");
    
    const [polyEtherBalance, setPolyEtherBalance] = useState("");
    const [polyMaticBalance, setPolyMaticBalance] = useState("");



    const [apePrice, setApePrice] = useState("");
    const [bnbPrice, setBnbPrice] = useState("");
    const [daiPrice, setDaiPrice] = useState("");
    const [dogePrice, setDogePrice] = useState("");
    const [ethPrice, setEthPrice] = useState("");
    const [linkPrice, setLinkPrice] = useState("");
    const [maticPrice, setMaticPrice] = useState("");
    const [usdtPrice, setUsdtPrice] = useState("");

    const getCurrentNetwork = async () => {
        const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
        const network  = await walletProvider.getNetwork()
        const chainId = network.chainId
        console.log (chainId);
        return chainId
        
    }


    const accountBalance = async () => {
        // const infuraRinkebyAPI = process.env.INFURA_RINKEBY_API
        // await ethereum.request({method: 'eth_getBalance'})
        
        const currentNetwork = getCurrentNetwork().then(value => {
            if (value == "1284") {
                console.log("It be Moonbeam")
                getMoonBeamData()
            } if (value == "1") {
                console.log("It be Ethereum")
                getEthereumData()
            } if (value == "137") {
                console.log("It be Polygon")
                getPolygonData()
            }
        })

        const getPolygonData = async () => {
            const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = walletProvider.getSigner();
            const walletAddr = await signer.getAddress();

            const polyEtherContract = new ethers.Contract(POLY_ETHER_ADDRESS, ERC20_ABI, walletProvider)
            console.log("hi", polyEtherContract)

            const getPolyEtherBalance = await polyEtherContract.balanceOf(walletAddr)
            console.log(getPolyEtherBalance)
            getPolyEtherBalance = ethers.utils.formatUnits(getPolyEtherBalance, "ether");

            setPolyEtherBalance(getPolyEtherBalance)



        }

        
        const getMoonBeamData = async () => {
            const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = walletProvider.getSigner();
            const walletAddr = await signer.getAddress();

            const glimmerContract = new ethers.Contract(GLIMMER_ADDRESS, ERC20_ABI, walletProvider)
            console.log("hi", glimmerContract)

            const getGlimmerBalance = await glimmerContract.balanceOf(walletAddr)
            console.log(getGlimmerBalance)
            getGlimmerBalance = ethers.utils.formatUnits(getGlimmerBalance, "ether");

            setGlimmerBalance(getGlimmerBalance)



        }

        const getEthereumData = async () => {
            const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
            const alchemyProvider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_API);
        
            const signer = walletProvider.getSigner();
            const walletAddr = await signer.getAddress();
        
       
       


            const daiContract = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, walletProvider)
            const dogeContract = new ethers.Contract(DOGE_ADDRESS, ERC20_ABI, walletProvider)
            const maticContract = new ethers.Contract(MATIC_ADDRESS, ERC20_ABI, walletProvider)
            const apeContract = new ethers.Contract(APE_ADDRESS, ERC20_ABI, walletProvider)
            const bnbContract = new ethers.Contract(BNB_ADDRESS, ERC20_ABI, walletProvider)
            const usdtContract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, walletProvider)
            const linkContract = new ethers.Contract(LINK_ADDRESS, ERC20_ABI, walletProvider)

            
            const getEthBalance = await walletProvider.getBalance(walletAddr)
            const getDaiBalance = await daiContract.balanceOf(walletAddr)
            const getDogeBalance = await dogeContract.balanceOf(walletAddr)
            const getMaticBalance = await maticContract.balanceOf(walletAddr)
            const getApeBalance = await apeContract.balanceOf(walletAddr)
            const getBnbBalance = await bnbContract.balanceOf(walletAddr)
            const getUsdtBalance = await usdtContract.balanceOf(walletAddr)
            const getLinkBalance = await linkContract.balanceOf(walletAddr)


            getEthBalance = ethers.utils.formatEther(getEthBalance);
            getDaiBalance = ethers.utils.formatUnits(getDaiBalance, "ether");
            getDogeBalance = ethers.utils.formatUnits(getDogeBalance, "ether");
            getMaticBalance = ethers.utils.formatUnits(getMaticBalance, "ether");
            getApeBalance = ethers.utils.formatUnits(getApeBalance, "ether");
            getBnbBalance = ethers.utils.formatUnits(getBnbBalance, "ether");
            getUsdtBalance = ethers.utils.formatUnits(getUsdtBalance, "ether");
            getLinkBalance = ethers.utils.formatUnits(getLinkBalance, "ether");

            setEthBalance(getEthBalance)
            setDaiBalance(getDaiBalance)
            setDogeBalance(getDogeBalance)
            setMaticBalance(getMaticBalance)
            setApeBalance(getApeBalance)
            setBnbBalance(getBnbBalance)
            setUsdtBalance(getUsdtBalance)
            setLinkBalance(getLinkBalance)

            console.log("walletProvider is ", walletProvider)
            console.log("alchemyProvider is ", alchemyProvider)
            


            const priceFeedContract = new ethers.Contract(PRICE_FEED_ADDR, PriceFeed.abi, walletProvider)
            // priceFeedContract.connect(signer)
            console.log(priceFeedContract)
            console.log(walletProvider.getCode(PRICE_FEED_ADDR))
            try {
                const apePriceFeed = await priceFeedContract.getLatestApePrice()
                const bnbPriceFeed = await priceFeedContract.getLatestBnbPrice()
                const daiPriceFeed = await priceFeedContract.getLatestDaiPrice()
                const dogePriceFeed = await priceFeedContract.getLatestDogePrice()
                const ethPriceFeed = await priceFeedContract.getLatestEthPrice()
                const linkPriceFeed = await priceFeedContract.getLatestLinkPrice()
                const maticPriceFeed = await priceFeedContract.getLatestMaticPrice()
                const usdtPriceFeed = await priceFeedContract.getLatestUsdtPrice()
                console.log("Price Feed: ", ethPriceFeed.toString())
                setApePrice(apePriceFeed.toNumber())
                setBnbPrice(bnbPriceFeed.toNumber())
                setDaiPrice(daiPriceFeed.toNumber())
                setDogePrice(dogePriceFeed.toNumber())
                setEthPrice(ethPriceFeed.toNumber())
                setLinkPrice(linkPriceFeed.toNumber())
                setMaticPrice(maticPriceFeed.toNumber())
                setUsdtPrice(usdtPriceFeed.toNumber())
            } catch (err) {
                console.log ("Error:", err)
            }
            
        }

    }
    
    useEffect(()=> {
        accountBalance()
    }, [])

    return (
        <div>
            <h1>Ethereum Mainnet</h1>
            <p>The ApeCoin balance is : {apeBalance}</p> 
            <p>APE/USD: {apePrice}</p>

            <p>The BNB balance is : {bnbBalance}</p> 
            <p>BNB/USD: {bnbPrice}</p>

            <p>The Dai balance is : {daiBalance}</p> 
            <p>DAI/USD: {daiPrice}</p>

            <p>The Doge balance is : {dogeBalance}</p> 
            <p>Doge/USD: {dogePrice}</p>

            <p>The Ethers balance is : {ethBalance}</p>
            <p>ETH/USD: {ethPrice}</p>
            
            <p>The Link balance is : {linkBalance}</p>  
            <p>LINK/USD: {linkPrice}</p>

            <p>The Matic balance is : {maticBalance}</p> 
            <p>MATIC/USD: {maticPrice}</p>

            <p>The USDT balance is : {usdtBalance}</p> 
            <p>USDT/USD: {usdtPrice}</p>
            <br></br>

            

            <br></br>

            <h1>Moonbeam</h1>
            <p>The Glimmer balance is : {glimmerBalance}</p> 
        </div>
        
    );
}

export default GetTokenBalance