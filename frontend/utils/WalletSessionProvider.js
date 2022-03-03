import { createContext } from "react"
import { useState, useEffect } from "react"
import { useModal } from "./ModalContext"

// create context
export const WalletContext = createContext()

// wallet states


// this context provider allows the wallet address to be passed down the component tree
export default function WalletSessionProvider(props) {

    // setup state for wallet address
    const [walletAddress, setWalletAddress] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    // assign walletAddress if already signed in
    useEffect(async () => {
        const currentWallet = await getCurrentWalletConnected()
        setWalletAddress(currentWallet.address)
        addWalletListener()
        setIsLoaded(true)
    })

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", async() => {
                const currentWallet = await getCurrentWalletConnected()
                setWalletAddress(currentWallet.address)
            });
        }
    }

    const modalController = useModal()

    async function connectWalletAndUpdateStatus() {
        setIsLoaded(false)
        const sessionStatus = await connectWallet(modalController)
        setIsLoaded(true)

        return sessionStatus;
    }

    return (
        <WalletContext.Provider value={ {walletAddress: walletAddress, connectWallet: connectWalletAndUpdateStatus, isLoaded: isLoaded} }>
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

// connects your wallet through metamask
const connectWallet = async (modalController) => {

    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "Connected",
                isConnected: true,
                address: addressArray[0],
            };
            return obj;
        } catch (err) {

            modalController.setContent(
                <div className="w-64 h-24 flex items-center justify-center nunito-font font-black">
                    Issue logging in. Please try again.
                </div>
            )
            modalController.setIsShown(true);

            return {
                address: "",
                isConnected: false,
                status: err.message,
            };
        }
    } else {

        modalController.setContent(
            <div className="w-64 h-24 flex items-center justify-center nunito-font font-black">
                Please install Metamask.
            </div>
        )
        modalController.setIsShown(true);

        return {
            address: "",
            isConnected: false,
            status: "Need to install metamask",
        };
    }
};