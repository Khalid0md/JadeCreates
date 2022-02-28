import '../styles/globals.css'
import WalletSessionProvider from '../utils/WalletSessionProvider'
import ModalProvider from '../utils/ModalContext'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Set page background to gray background
    document.body.style.backgroundColor = "#F3F3F4";
  }, [])

  return (
    <ModalProvider>
      <WalletSessionProvider>
        <Component {...pageProps} />
      </WalletSessionProvider>
    </ModalProvider >
  )
}

export default MyApp
