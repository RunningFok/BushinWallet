const ethers = require('ethers');
import { useRouter } from "next/router";



export default function SwitchNetworkPolygon() {

  
    const router = useRouter()
    
    const SwitchNetwork = async () => {

   

    if (window.ethereum) {
        try {
          // check if the chain to connect to is installed
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }], // chainId must be in hexadecimal numbers
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
                    chainName: "Polygon Mainnet",
                    chainId: "0x89",
                    rpcUrls: ["https://polygon-rpc.com"],
                    blockExplorerUrls: ["https://polygonscan.com"]
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
            <button className="mt-4 px-6 py-4 rounded-md text-sm font medium border-0 
                focus:outline-none focus ring transition text-white bg-gray-500 hover:bg-gray-600 
                active:bg-gray-700 focus:ring-gray-300" onClick={SwitchNetwork}>
                    Switch Polygon
                </button>
        </div>
        


    )
    
}
