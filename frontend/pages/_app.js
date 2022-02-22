import '../styles/globals.css'
import MoralisWrapper from '../utils/MoralisWrapper'
import WalletSessionProvider from '../utils/WalletSessionProvider'

function MyApp({ Component, pageProps }) {
  return (
    <WalletSessionProvider>
      <Component {...pageProps} />
    </WalletSessionProvider>
  )
}

export default MyApp
