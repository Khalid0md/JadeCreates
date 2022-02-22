import { createContext } from "react"
import { useState, useEffect } from "react/cjs/react.development"

// create context
export const WalletContext = createContext()

// this context provider allows the wallet address to be passed down the component tree
export default function WalletSessionProvider(props) {

    // setup state for wallet address
    const [walletAddress, setWalletAddress] = useState()

    // assign walletAddress if already signed in
    useEffect(async () => {
        const currentWallet = await getCurrentWalletConnected()
        setWalletAddress(currentWallet.address)

        addWalletListener()
    })

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", async() => {
                const currentWallet = await getCurrentWalletConnected()
                setWalletAddress(currentWallet.address)
            });
        }
    }

    const walletSession = new Object()
    walletSession.walletAddress = walletAddress
    walletSession.connectWallet = connectWallet

    return (
        <WalletContext.Provider value={walletSession}>
            {props.children}
        </WalletContext.Provider>
    )
}

// used only in context provider
const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "Connected",
                };
            } else {
                return {
                    address: "",
                    status: "Metamask installed but not connected",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: err.message,
            };
        }
    } else {
        return {
            address: "",
            status: "Need to install metamask",
        };
    }
};

// OLD NOTE: can be used to connect wallet from anywhere in the app
const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "Connected",
                address: addressArray[0],
            };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: err.message,
            };
        }
    } else {
        return {
            address: "",
            status: "Need to install metamask",
        };
    }
};