
import { useWallet } from "../utils/WalletSessionProvider";
import { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router";
import Logo from "../components/logo";
import NavButton from "../components/NavButton";
import { HiOutlineChevronRight } from "react-icons/hi";
import testStoresData from "../testData/testStoresData";
import { DashboardNavBar, TopSpacer } from "../components/NavBar";
import LoadingIndicator from "../components/LoadingIndicator";
import { useWalletConnect } from "../utils/WalletConnectSessionProvider";
import { HiOutlineX } from "react-icons/hi";
import Web3 from "web3";

// reference contracts
import { marketplaceAddress, storeMarketplaceAddress } from "../../backend/config";
import marketplaceJson from '../../backend/artifacts/contracts/Marketplace.sol/Marketplace.json';
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';
//import nfTestJson from '../../backend/artifacts/contracts/NFTest.sol/NFTest.json';
import createERC721Json from '../../backend/artifacts/contracts/CreateERC721.sol/CreateERC721.json';
import { useModal } from "../utils/ModalContext";
import NFTCard from "../components/NFTCard";
import ListingsList from "../components/ListingsList";

// get tatum function
//import { Currency, getNFTsByAddress } from '@tatumio/tatum'

// set page props
export async function getStaticProps(context) {
    return {
        props: {
            mainDomainRoute: true
        }
    };
}

/*
export async function getServerSideProps(context) {

    const nfts = await getNFTsByAddress(
        Currency.ONE,
        '0xFc25b7BE2945Dd578799D15EC5834Baf34BA28e1',
    )
    console.log(nfts)

    return {
        props: {}, // will be passed to the page component as props
    }
}
*/

export default function DashboardLoginHandler() {

    const walletSession = useWallet();
    
    const router = useRouter();

    // Redirects if loaded and not connected
    function CheckLogin() {
        if (!walletSession.isLoaded) { return }

        if (walletSession.isConnected) {
            router.push('/dashboard')
        } else {
            router.push('/')
        }
    }

    // Check login every time there is an update to the connection status
    useEffect(() => {
        CheckLogin()
    }, [walletSession.isLoaded, walletSession.isConnected])

    if (walletSession.isLoaded && walletSession.isConnected) {
        /*
        return (
            <Dashboard walletConnectSession={walletConnectSession} />
        )
        */
        return (
            <Dashboard walletSession={walletSession} />
        )
    } else {
        return (
            <LoadingIndicator />
        )
    }

    /*
    const walletConnectSession = useWalletConnect();

    function CheckLogin() {
        if (!walletConnectSession.provider) { return }
        if (walletConnectSession.provider.isConnecting) { return }

        if (walletConnectSession.provider.accounts[0]) {
            router.push('/dashboard')
        } else {
            router.push('/')
        }
    }

    useEffect(() => {
        CheckLogin()
    }, [walletConnectSession.provider && walletConnectSession.provider.accounts])

    useEffect(() => {
        CheckLogin()
    }, [walletConnectSession.provider && walletConnectSession.provider.isConnecting])

    if (walletConnectSession.provider && walletConnectSession.provider.accounts[0]) {
        return (
            <Dashboard walletConnectSession={walletConnectSession} />
        )
    } else {
        return (
            <LoadingIndicator />
        )
    }
    */
}

function Dashboard({ walletSession }) {

    const [selectedStore, setSelectedStore] = useState();

    return (
        <div className="flex flex-col w-full items-center bg-background h-full space-y-4">
            <TopSpacer />
            <DashboardNavBar />
            <div className="flex flex-col h-full w-full max-w-[90rem] space-y-8 px-6 md:px-14">
                {
                    selectedStore
                        ?
                        <div className="flex space-x-4">
                            <button onClick={() => setSelectedStore()} className="nunito-font font-black text-4xl text-mainBlack/50 hover:text-mainBlack transition-all">
                                Dashboard
                            </button>
                            <p className="text-4xl">
                                <HiOutlineChevronRight />
                            </p>
                            <p className="nunito-font font-black text-4xl">
                                {selectedStore.subdomain ? selectedStore.subdomain : 'Unnamed Store'}
                            </p>
                        </div>
                        :
                        <p className="nunito-font font-black text-4xl">
                            Dashboard
                        </p>
                }
                {
                    selectedStore
                        ?
                        <DashboardStoreContent store={selectedStore} walletSession={walletSession} />
                        :
                        <DashboardMainContent walletSession={walletSession} setSelectedStore={setSelectedStore} />
                }
            </div>
        </div>
    )
}

function DashboardMainContent({ walletSession, setSelectedStore }) {

    const [storeDomains, setStoreDomains] = useState();

    useEffect(() => {
        if (walletSession.provider && walletSession.address) {
            // init web3 provider
            const web3 = new Web3(walletSession.provider)

            // get store contract
            const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

            storeMarketplace.methods.getSubdomainsFromWalletAddress(walletSession.address).call()
                .then((domains) => {
                    setStoreDomains(domains)
                })
        }
    }, [])

    return (
        <div className="flex flex-col space-y-8">
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                My Wallet
            </p>
            <WalletOptions walletSession={walletSession} />
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                My Stores
            </p>
            <StoresList storeDomains={storeDomains} setSelectedStore={setSelectedStore} walletSession={walletSession} />
        </div>
    )
}

function WalletOptions({ walletSession }) {

    const [userBalance, setUserBalance] = useState('---');

    useEffect(() => {
        if (walletSession.provider && walletSession.address) {
            // init web3 provider
            const web3 = new Web3(walletSession.provider)

            // get balance
            web3.eth.getBalance(walletSession.address)
                .then((balance) => {
                    const formattedBalance = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(2);
                    setUserBalance(formattedBalance);
                })
        }
    }, [])

    return (
        <div className="flex flex-col h-64 w-full bg-gradient-to-l from-green1/80 to-green2/80 p-8 rounded-2xl shadow-high max-w-[28rem]" >
            <p className="nunito-font font-extrabold text-white/80">
                Address
            </p>
            <p className="numbers-font text-xl font-black text-white pb-4 text-ellipsis overflow-clip">
                {walletSession.address}
            </p>
            <p className="nunito-font font-extrabold text-white/80">
                Balance
            </p>
            <div className="flex items-center justify-center h-full bg-white/20 rounded-xl space-x-4 mt-1">
                <div className="flex space-x-2 p-4 mb-0 mr-0 text-white justify-center items-end">
                    <div className="text-6xl numbers-font font-black" >
                        <div className="inline-block h-full align-text-baseline" />
                        {userBalance}
                    </div>
                    <div className="text-3xl nunito-font font-black">
                        <div className="inline-block h-full align-text-baseline" />
                        ONE
                    </div>
                </div>
            </div>
        </div>
    )//bg-gradient-to-bl from-green1/0 to-green2/0
}

function StoresList({ storeDomains, setSelectedStore, walletSession }) {
    return (
        <div>
            {
                storeDomains
                    ?
                    <div className="pb-12">
                        {
                            storeDomains.length > 0
                                ?
                                <div className="pb-12 grid gap-8 store-grid">
                                    {
                                        storeDomains.map(subdomain => {
                                            return (
                                                <SmallStoreDisplay key={subdomain} subdomain={subdomain} setSelectedStore={setSelectedStore} walletSession={walletSession} />
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className="flex flex-col items-center justify-center w-full h-64 bg-white rounded-2xl space-y-4 px-10">
                                    <p className="nunito-font text-3xl font-extrabold text-center">
                                        Oops, you don't own any stores.
                                    </p>
                                    <p className="nunito-font font-bold text-secondaryGray text-center">
                                        Make sure you are logged in with the correct wallet.
                                    </p>
                                </div>
                        }
                    </div>
                    :
                    <LoadingIndicator />
            }
        </div>
    )
}

function SmallStoreDisplay({ subdomain, setSelectedStore, walletSession }) {

    // State for store
    const [store, setStore] = useState()

    // Retrieve store metadata
    useEffect(() => {
        if (walletSession.provider) {
            // init web3 provider
            const web3 = new Web3(walletSession.provider)

            // get store contract
            const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

            storeMarketplace.methods.getStoreWithSubdomain(subdomain).call()
                .then((store) => {
                    setStore(store)
                })
        }
    }, [])

    return (
        <div>
            {
                store
                    ?
                    <button className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low hover:shadow-high hover:scale-105 transition-all"
                        onClick={() => {
                            if (store) { setSelectedStore(store); }
                        }}>
                        <div className="flex items-center justify-center p-8 w-[18rem] flex-shrink-0 grow aspect-square rounded-xl border-accentGray overflow-clip">
                            <img src={store.logoURI && store.logoURI} className="min-w-full h-fit rounded-xl" />
                        </div>
                    </button>
                    :
                    <SmallStoreDisplayLoading />
            }
        </div>
    )
}//`https://cloudflare-ipfs.com/ipfs/${logoUri}`

function SmallStoreDisplayOld({ store, logoUri, subdomain, name, owner, colourInHex, setSelectedStore }) {
    return (
        <button className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low hover:shadow-high hover:scale-105 transition-all"
            onClick={() => {
                setSelectedStore(store);
            }}>
            <img src={`https://cloudflare-ipfs.com/ipfs/${logoUri}`} className="min-w-full h-fit rounded-xl" />
        </button>
    )//<img src={imgSrc} className="min-w-full h-fit rounded-xl" />
}

function SmallStoreDisplayLoading() {
    return (
        <div className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low transition-all" />
    )
}

function DashboardStoreContent({ store, walletSession }) {
    return (
        <div className="flex flex-col space-y-8">
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                Store Properties
            </p>
            <div className="pb-12 grid gap-8 nft-grid">
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Logo
                    </p>
                    <div className="flex items-center justify-center grow rounded-xl border-accentGray overflow-clip">
                        <img src={store.logoURI && store.logoURI} className="min-w-full h-fit rounded-xl px-2" />
                    </div>
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Logo
                    </button>
                </div>
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Colour
                    </p>
                    <p className="nunito-font text-2xl font-black text-mainBlack">
                        {'#' + (store.colourHex ? store.colourHex : '------')}
                    </p>
                    <div style={{ backgroundColor: "#" + store.colourHex }} className="flex grow rounded-xl mt-4 mb-6 border-2 border-mainBlack/10 shadow-low" />
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Colour
                    </button>
                </div>
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Plan
                    </p>
                    <p className="nunito-font text-4xl font-black text-mainBlack">
                        {store.plan && store.plan}
                    </p>
                    <div className="flex grow" />
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Logo
                    </button>
                </div>
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Subdomain
                    </p>
                    <p className="nunito-font text-4xl font-black text-mainBlack">
                        {store.subdomain && store.subdomain}
                    </p>
                    <div className="flex grow" />
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Subdomain
                    </button>
                </div>
            </div>
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                Listings
            </p>
            <ListingsList store={store} walletSession={walletSession} />
        </div>
    )
}