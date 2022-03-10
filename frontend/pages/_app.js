import '../styles/globals.css'
import WalletSessionProvider from '../utils/WalletSessionProvider'
import WalletConnectSessionProvider from '../utils/WalletConnectSessionProvider'
import { useEffect } from 'react'
import ModalProvider from '../utils/ModalContext'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Set page background to gray background
    document.body.style.backgroundColor = "#F3F3F4";
  }, [])

  return (
    <ModalProvider>
      <WalletConnectSessionProvider>
        <Component {...pageProps} />
      </WalletConnectSessionProvider>
    </ModalProvider >
  )
}

export default MyApp
