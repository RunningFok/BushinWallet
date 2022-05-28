const ethers = require('ethers');
import { useRouter } from "next/router";



export default function SwitchNetworkEthereum() {
  const router = useRouter()
  const SwitchNetwork = async () => {
    


    if (window.ethereum) {
        try {
          // check if the chain to connect to is installed
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x1" }], // chainId must be in hexadecimal numbers
          });
        } catch (error) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: "Ethereum Mainnet",
                    chainId: "0x1",
                    rpcUrls: ["https://mainnet.infura.io/v3/"],
                    blockExplorerUrls: ["https://etherscan.io"]
                  },
                ],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
          console.error(error);
        }
      } else {
        // if no window.ethereum then MetaMask is not installed
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      }
      
      router.reload("/")

}



    return (
        <div>
            <button onClick={SwitchNetwork}>
                    Switch Ethereum
                </button>
        </div>
        


    )
    
}
