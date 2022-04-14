/*
    Usage: 
        1. Wrap root of app with the WalletSessionProvider
        2. Use the useWallet() hook to referecnce the wallet session anywhere down the component tree

    This is intended to provide a single interface to the app for any wallet.
    Currently supports metamask and walletconnect.
*/

import { createContext } from "react"
import { useState, useEffect, useContext } from "react"
import { useModal } from "./ModalContext"
import detectEthereumProvider from '@metamask/detect-provider';
import { HiOutlineX } from "react-icons/hi";
import Web3 from "web3";

// create context
const WalletContext = createContext()

// hook for using this context
export function useWallet() {
    return useContext(WalletContext)
}

// rpc endpoint (for reference in other files)
// testnet: export const hrmnyRpc = https://api.s0.b.hmny.io
export const hrmnyRpc = 'https://api.harmony.one';

// enum for currently connected wallet
export const walletTypes = Object.freeze({
    metamask: 'mm',
    walletconnect: 'wc'
});

// enum for wallet connection status
export const walletStatus = Object.freeze({
    success: 's',
    notConnected: 'nc',
    notAvailable: 'na',
    err: 'err'
});

// this context provider allows the wallet address to be passed down the component tree
export default function WalletSessionProvider(props) {

    // setup state for connected wallet session
    const [availableWalletTypes, setAvailableWalletTypes] = useState([])
    const [currentWalletType, setCurrentWalletType] = useState()
    const [walletAddress, setWalletAddress] = useState()
    const [provider, setProvider] = useState()
    const [isConnected, setIsConnected] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [ensureCorrectNetwork, setEnsureCorrectNetwork] = useState()

    // start by checking which wallet is connected (if any) and updating available wallets
    // (e.g.) metamask will not be available on safari or a mobile browser, so don't show it as an option
    useEffect(async () => {

        /** call every checkFor__Wallet__ function **/

        // metamask
        const metamaskStatus = await checkForMetamask()
        if (metamaskStatus.status != walletStatus.notAvailable) {
            setAvailableWalletTypes(oldArray => [...oldArray, walletTypes.metamask])
            addMetamaskListeners(setWalletAddress, setIsConnected, setCurrentWalletType, setProvider, setEnsureCorrectNetwork)
        }
        if (metamaskStatus.status == walletStatus.success) {
            setIsConnected(true)
            setCurrentWalletType(walletTypes.metamask)
            setWalletAddress(metamaskStatus.address)
            const provider = await detectEthereumProvider();
            setProvider(provider)
            setEnsureCorrectNetwork(() => ensureMetamaskIsOnHarmony)

            // if metamask is connected, return early (don't check for other wallets)
            setIsLoaded(true)
            return
        }

        // walletConnect
        /*
        const walletConnectStatus = await checkForWalletConnect()
        setAvailableWalletTypes(oldArray => [...oldArray, walletTypes.walletconnect])
        if (walletConnectStatus.status == walletStatus.success) {
            setCurrentWalletType(walletTypes.walletconnect)
            setWalletAddress(walletConnectStatus.address)
            addWalletConnectListeners(setWalletAddress)

            setIsLoaded(true)
            return
        }
        */

        setIsLoaded(true)
    }, [])

    // Hides login modal once user authenticates with a wallet successfully
    useEffect(() => {
        if (isConnected) {
            modalController.setIsShown(false);
        }
    }, [isConnected])

    const modalController = useModal()

    // delegates to connect wallet function for current wallet
    async function connectWalletAndUpdateStatus() {
        setIsLoaded(false)
        const sessionStatus = await connectWallet(modalController)
        setIsLoaded(true)

        return sessionStatus;
    }

    async function showConnectModal() {
        // shows modal with options for each supported wallet
        modalController.setContent(
            <ConnectModalContent modalController={modalController} />
        )
        modalController.setIsShown(true);
    }

    return (
        <WalletContext.Provider value={
            {
                provider: provider,
                address: walletAddress,
                showConnectModal: showConnectModal,
                ensureCorrectNetwork: ensureCorrectNetwork,
                isLoaded: isLoaded,
                isConnected: isConnected
            }
        }>
            {props.children}
        </WalletContext.Provider>
    )
}

function ConnectModalContent({ modalController }) {
    return (
        <div className="nunito-font font-extrabold m-4 p-8 bg-accentGray shadow-high rounded-2xl grow max-w-xl">
            <div className="flex w-full nunito-font font-extrabold text-mainBlack pb-4" >
                <p className="flex items-end">
                    Select a provider:
                </p>
                <div className="flex grow" />
                <button className="text-4xl -mt-2"
                    onClick={() => {
                        modalController.setIsShown(false);
                    }}>
                    <HiOutlineX />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <button
                    className="flex items-center justify-center flex-shrink-0 aspect-[15/14] shadow-low bg-white rounded-xl hover:shadow-wide transition-all"
                    onClick={async () => {
                        // Connect with metamask
                        const provider = await detectEthereumProvider();

                        await provider.request({ method: "eth_requestAccounts" })
                    }}
                >
                    <img src="/metamask-fox-wordmark-stacked.svg" className="p-10" />
                </button>
                <button
                    disabled={true}
                    className="flex flex-col items-center justify-center flex-shrink-0 aspect-[15/14] shadow-low bg-white rounded-xl transition-all"
                >
                    <img src="/walletconnect-banner.svg" className="p-10" />
                    <p className="pt-20 absolute font-bold text-secondaryGray">
                        Coming soon
                    </p>
                </button>
            </div>
        </div>
    )
}

/** Implement functions here to check if each wallet is connected (should only allow one at a time) **/
//const getCurrentWalletConnected = async () => {
const checkForMetamask = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: walletStatus.success
                };
            } else {
                return {
                    address: "",
                    status: walletStatus.notConnected
                };
            }
        } catch (err) {
            return {
                address: "",
                status: walletStatus.err,
                error: err.message
            };
        }
    } else {
        return {
            address: "",
            status: walletStatus.notAvailable
        };
    }
};

const checkForWalletConnect = async () => {

}

/** Implement functions here to add listeners for each respective wallet **/

function addMetamaskListeners(setWalletAddress, setIsConnected, setCurrentWalletType, setProvider, setEnsureCorrectNetwork) {
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", async () => {

            // call metmask check function again if accounts are changed
            const currentStatus = await checkForMetamask()
            setWalletAddress(currentStatus.address)

            // set connected based on status
            if (currentStatus.status == walletStatus.success) {
                setIsConnected(true)
                setCurrentWalletType(walletTypes.metamask)
                const provider = await detectEthereumProvider();
                setProvider(provider)
                setEnsureCorrectNetwork(() => ensureMetamaskIsOnHarmony)
            } else {
                setIsConnected(false)
            }
        });
    }
}

function addWalletConnectListeners({ setWalletAddress }) {

}


/** Implement functions to check that chain is set to harmony (and if not, ask to switch) */

async function ensureMetamaskIsOnHarmony() {

    /* TESTNET ID: */
    //const chainId = 1666700000

    /* MAINNET ID: */
    const chainId = 1666600000

    if (window.ethereum.networkVersion !== chainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(chainId) }],
            });
            return true;
        } catch (err) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (err.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: 'Harmony Mainnet',
                                chainId: Web3.utils.toHex(chainId),
                                nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
                                rpcUrls: ['https://api.s0.b.hmny.io'],
                            },
                        ],
                    });
                    return true;
                } catch (err2) {
                    return false;
                }
            }

            return false;
        }
    }
}






/*
function addWalletListener() {
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", async() => {
            if (currentWalletType != walletTypes.metamask) { return }

            const currentWallet = await getCurrentWalletConnected()
            setWalletAddress(currentWallet.address)
        });
    }
}
*/



/** Implement functions here to connect each respective wallet **/

// connects your wallet through metamask
/*
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
*/