import '../styles/globals.css'
import WalletSessionProvider from '../utils/WalletSessionProvider'
import WalletConnectProvider from '../utils/WalletConnectProvider'
import { useEffect } from 'react'
import ModalProvider from '../utils/ModalContext'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Set page background to gray background
    document.body.style.backgroundColor = "#F3F3F4";
  }, [])

  return (
    <ModalProvider>
      <WalletConnectProvider>
        <Component {...pageProps} />
      </WalletConnectProvider>
    </ModalProvider >
  )
}

export default MyApp
