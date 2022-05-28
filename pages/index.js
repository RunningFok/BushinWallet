
import LoginButton from '../components/LoginButton'
import GetTokenBalance from "../components/GetTokenBalance"
import { useWeb3  } from '@3rdweb/hooks'
import SendCoinsEthereumDrop from '../components/SendCoinsEthereumDrop'
import SwitchNetworkEthereum from '../components/SwitchNetworkEthereum'
import SwitchNetworkMoonbeam from '../components/SwitchNetworkMoonBeam'
import SwitchNetworkPolygon from '../components/SwitchNetworkPolygon'



export default function Home() {
  const {address, chainId, connectWallet} = useWeb3()
  
  if(address) {
    return (
      <div>
        <div style = {{textAlign:'center'}}>
          <p>Address: {address}</p>
          <p>Current Chain ID: {chainId}</p>

        </div>
          <div style={{ display: "flex"}}>
            <div><SwitchNetworkEthereum /></div>
            <div><SwitchNetworkMoonbeam /></div>
        </div>
        
        
        <GetTokenBalance />
        <SendCoinsEthereumDrop  />
        
     
    </div>
     
    )

  } else {
    return (
      <div>
        <LoginButton />
      </div>
    )
  }
}














////Ver 2


// export default function Home() {
//   const {address, chainId, connectWallet} = useWeb3()
//   if(address) {
//     return (
//       <div>
//         <p>Address: {address}</p>
//         <p>chainId: {chainId}</p>
//       </div>
//     )

//   } else {
//     return (
//       <div>
//         <CreateAccountButton />
//         <LoginButton />
//         <button onClick={()=> connectWallet("injected")}>Connect Wallet</button>
//       </div>
//     )
//   }
// }
