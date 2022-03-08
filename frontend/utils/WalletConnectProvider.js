import { createContext } from "react"
import { useState, useEffect, useContext } from "react"
import { useModal } from "./ModalContext"
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// create context
const WalletConnectContext = createContext()

export function useWalletConnect() {
    return useContext(WalletConnectContext)
}

// this context provider allows the wallet address to be passed down the component tree
export default function WalletConnectProvider(props) {

    // setup state for wallet address
    const [walletAddress, setWalletAddress] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [connector, setConnector] = useState()

    // assign walletAddress if already signed in
    useEffect(async () => {

        /*
                const provider = new WalletConnectProvider({
                    rpc: {
                        1: 'https://api.s0.t.hmny.io/',
                        2: 'https://api.s0.b.hmny.io'
                    },
                    qrcodeModalOptions: {
                        mobileLinks: [
                            "metamask",
                            "trust",
                        ],
                    }

                })
                */

        const newConnector = new WalletConnect({ bridge: 'https://bridge.walletconnect.org', qrcodeModal: QRCodeModal });
        setConnector(newConnector)

        // check if already connected
        if (!newConnector.connected) {
            //setWalletAddress(currentWallet.address)
            //addWalletListener()
        }

        // subscribe to events
        setIsLoaded(true)
    }, [])

    const modalController = useModal()

    async function connectWalletAndUpdateStatus() {
        setIsLoaded(false)
        const sessionStatus = await connectWallet(modalController)
        setIsLoaded(true)

        return sessionStatus;
    }

    return (
        <WalletConnectContext.Provider value={{ walletAddress: walletAddress, connector: connector, isLoaded: isLoaded }}>
            {props.children}
        </WalletConnectContext.Provider>
    )
}