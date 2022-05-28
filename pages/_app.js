
import "regenerator-runtime/runtime"
import Layout from '../components/Layout'
import '../styles/globals.css'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks"

const supportedChainIds = [1, 4, 1284]
const connectors = {
  injected:{}
}

function MyApp({ Component, pageProps:{ ...pageProps} }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </ThirdwebWeb3Provider>
    
      
    
  
  )
}

export default MyApp
