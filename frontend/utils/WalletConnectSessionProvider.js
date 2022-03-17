import { createContext } from "react"
import { useState, useEffect, useContext } from "react"
import { useModal } from "./ModalContext"
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

// create context
const WalletConnectContext = createContext()

export function useWalletConnect() {
    return useContext(WalletConnectContext)
}

// this context provider allows the wallet address to be passed down the component tree
export default function WalletConnectSessionProvider(props) {

    // setup state for wallet address
    const [walletAddress, setWalletAddress] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [connector, setConnector] = useState()
    const [provider, setProvider] = useState()
    const [isConnected, setIsConnected] = useState(false)

    // assign walletAddress if already signed in
    useEffect(async () => {


        //const newProvider = new WalletConnectProvider({
        setProvider(
            new WalletConnectProvider({
                rpc: {
                    //1: 'https://api.s0.t.hmny.io/', // harmony mainnet
                    1666700000: 'https://api.s0.b.hmny.io' // harmony testnet
                },
                qrcodeModalOptions: {
                    mobileLinks: [
                        "metamask",
                        "trust",
                    ],
                }
            })
        )

        //console.log(newProvider)
        //console.log(newProvider.connector)
        //if (newProvider.connector.connected) { newProvider.enable() }
        //setProvider(newProvider)
        //setConnector(newConnector)

        /*
        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            newProvider.
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
            
        });

        // Subscribe to session disconnection
        provider.on("disconnect", (code, reason) => {
            
        });
        */

        // check if already connected
        //if (!newConnector.connected) {
        //setWalletAddress(currentWallet.address)
        //addWalletListener()
        //}

        // subscribe to events
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (provider && provider.connector.connected) { 
            provider.enable() 
            setIsConnected(true)
        }
        if (provider) {
            console.log(provider)

            // Subscribe to accounts change
            provider.on("accountsChanged", (accounts) => {
                console.log(accounts)
                if (accounts && accounts[0]) {
                    setIsConnected(true);
                }
            });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
                //setProvider(provider)
            });

            // Subscribe to session disconnection
            provider.on("disconnect", (code, reason) => {
                console.log(code, reason)
                setIsConnected(false);
            });
        }
    }, [provider])


    const modalController = useModal()

    async function connectWalletAndUpdateStatus() {
        setIsLoaded(false)
        const sessionStatus = await connectWallet(modalController)
        setIsLoaded(true)

        return sessionStatus;
    }

    return (
        <WalletConnectContext.Provider value={{ walletAddress: walletAddress, provider: provider, isLoaded: isLoaded, isConnected: isConnected }}>
            {props.children}
        </WalletConnectContext.Provider>
    )
}