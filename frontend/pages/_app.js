import '../styles/globals.css'
import MoralisWrapper from '../utils/MoralisWrapper'
import WalletSessionProvider from '../utils/WalletSessionProvider'
import ModalProvider from '../utils/ModalContext'

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <WalletSessionProvider>
        <Component {...pageProps} />
      </WalletSessionProvider>
    </ModalProvider >
  )
}

export default MyApp
