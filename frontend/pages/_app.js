import '../styles/globals.css'
import WalletSessionProvider from '../utils/WalletSessionProvider'
import WalletConnectSessionProvider from '../utils/WalletConnectSessionProvider'
import { useEffect } from 'react'
import ModalProvider from '../utils/ModalContext'
import App from 'next/app'
import ErrorPage from 'next/error'

function subdomainExists(host) {

  if (!host) { return false }
  let splitHost = host.split('.');

  if (splitHost.length === 3 || splitHost.length === 2) {

    // if subdomain is 'www', there is acutally no subdomain
    let subdomain = splitHost[0];
    if (subdomain === 'www') {
      return false;
    }

    // a subdomain must exist
    return true;
  }

  // otherwise, return false
  return false;
}

function MyApp({ Component, pageProps }) {

  //Restrict main domain (www.martazo.com) routes from subdomains
  if (pageProps.mainDomainRoute && subdomainExists(pageProps.host)) {
    return (
      <ErrorPage statusCode={404} />
    )
  }

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

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const req = appContext.ctx.req

  return {
    pageProps: {
      ...appProps.pageProps,
      host: req?.headers.host,
    },
  }
}

export default MyApp
