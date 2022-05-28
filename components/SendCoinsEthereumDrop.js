import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TransactionList from "./TransactionList";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

const startEthPayment = async ({ setError, setTransactions, amount, addr }) => {
  
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = walletProvider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(amount)
    });
    console.log({ amount, addr });
    console.log("tx", tx);
    setTransactions([tx]);
  } catch (err) {
    setError(err.message);
  }
};

const startNonEthPayment = async ({ setError, setTransactions, amount, addr, tokenAddress }) => {
  const ERC20_ABI = [
    "function transfer(address to, uint amount) returns (bool)"
  ]
  
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
    // const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, walletProvider)
    const signer = walletProvider.getSigner();
    
    
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)


    // const tokenSigner = tokenContract.connect(signer);
    ethers.utils.getAddress(addr);
    console.log("hi", addr)
    amount = ethers.utils.parseUnits(amount, 18)
    const tx = await tokenContract.transfer(
      addr,
      amount,
    );

    console.log({ amount, addr });
    console.log("tx", tx);
    setTransactions([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function SendCoinsEthereumDrop() {
  const [error, setError] = useState();
  const [transactions, setTransactions] = useState([]);
  const [token, setToken]=useState();
  
  const tokenAddressMap = {
     "ape": "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
     "bnb":  "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
     "dai": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
     "doge": "0x2a98f128092aBBadef25d17910EbE15B8495D0c1",
     "link": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
     "matic": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
     "usdt": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
     "glmr": "0xAcc15dC74880C9944775448304B263D191c6077F"
  }
  
  const handleSelect=(t)=>{
    console.log(t);
    setToken(t)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi", token)
    if(token == "ethers") {
      console.log("It be Ether")
      //Something here
      const data = new FormData(e.target);
      console.log(data.get("amount"))
      console.log(data.get("addr"))
      const tokenAddress = tokenAddressMap[token]
      console.log("tokenAddress is ", tokenAddress)
      setError();
      await startEthPayment({
        setError,
        setTransactions,
        amount: data.get("amount"),
        addr: data.get("addr")
    });
    } else {
      console.log("not ether")
      console.log("it is ", token)
      const data = new FormData(e.target);
      console.log(data.get("amount"))
      console.log(data.get("addr"))
      const tokenAddress = tokenAddressMap[token]
      console.log("tokenAddress is ", tokenAddress)
      setError();
      await startNonEthPayment({
        setError,
        setTransactions,
        tokenAddress,
        amount: data.get("amount"),
        addr: data.get("addr")
    });
    }
    
  };

  return (
    <>
    
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send {token} payment
          </h1>

          <div>
    <DropdownButton
        title="Select Token"
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
        >
            <Dropdown.Item eventKey="ape">APECOIN</Dropdown.Item>
            <Dropdown.Item eventKey="bnb">BNB</Dropdown.Item>
            <Dropdown.Item eventKey="dai">DAI</Dropdown.Item>
            <Dropdown.Item eventKey="doge">DOGE</Dropdown.Item>
            <Dropdown.Item eventKey="ethers">ETHERS</Dropdown.Item>
            <Dropdown.Item eventKey="link">LINK</Dropdown.Item>
            <Dropdown.Item eventKey="matic">MATIC</Dropdown.Item>
            <Dropdown.Item eventKey="usdt">USDT</Dropdown.Item>
            <Dropdown.Item eventKey="glmr">GLMR</Dropdown.Item>
          </DropdownButton> 
    </div>

          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="amount"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount"
              />
            </div>
          </div>
        </main>
       
        

        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TransactionList transactions={transactions} />
        </footer>
      </div>
    </form>
    </>
  );
}
