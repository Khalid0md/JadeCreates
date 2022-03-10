
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
import Web3 from "web3";

// reference contracts
import { storeMarketplaceAddress } from "../../backend/config";
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';

export default function DashboardLoginHandler() {

    const walletConnectSession = useWalletConnect();
    const router = useRouter();

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
        console.log("address changed")
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
}

function Dashboard({ walletConnectSession }) {

    const [selectedStore, setSelectedStore] = useState();  //{ storeName: 'My New Store' })

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
                                {selectedStore.name ? selectedStore.name : 'Unnamed Store'}
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
                        <DashboardStoreContent />
                        :
                        <DashboardMainContent walletConnectSession={walletConnectSession} setSelectedStore={setSelectedStore} />
                }
            </div>
        </div>
    )
}

function DashboardMainContent({ walletConnectSession, setSelectedStore }) {

    const [storeDomains, setStoreDomains] = useState();

    useEffect(() => {
        // init web3 provider
        const web3 = new Web3(walletConnectSession.provider)
        
        // get store contract
        const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

        storeMarketplace.methods.getSubdomainsFromSender().call()
            .then((domains) => {
                setStoreDomains(domains)
                console.log(domains)
            })
    }, [])

    return (
        <div className="flex flex-col space-y-4">
            <p className="nunito-font text-2xl font-black">
                My Stores
            </p>
            <StoresList storeDomains={testStoresData} setSelectedStore={setSelectedStore} />
        </div>
    )
}

function StoresList({ storeDomains, setSelectedStore }) {

    return (
        <div className="pb-12 grid gap-8 store-grid">
            {
                storeDomains.map(store => {
                    return (
                        <SmallStoreDisplay store={store} logoUri={store.logoUri} subdomain={store.subdomain} name={store.name} owner={store.owner} colourInHex={store.colourInHex} setSelectedStore={setSelectedStore} />
                    )
                })
            }
        </div>
    )
}//<div className="pb-12 grid gap-8 nft-grid scrollbar">
//<div className="flex space-x-8 overflow-x-scroll p-8">

function SmallStoreDisplay({ store, logoUri, subdomain, name, owner, colourInHex, setSelectedStore }) {
    return (
        <button className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low hover:shadow-high hover:scale-105 transition-all"
                onClick={() => {
                    setSelectedStore(store);
                }}>
            <img src={`https://cloudflare-ipfs.com/ipfs/${logoUri}`} className="flex aspect-square flex-shrink-0 rounded-xl" />
        </button>
    )
}

function SmallStoreDisplayLoading() {
    return (
        <div className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low transition-all" />
    )
}

function DashboardStoreContent() {
    return (
        <div>
            store
        </div>
    )
}

function DashboardTabs() {

}

function EditStoreMetadata() {
    return (
        <div>

        </div>
    )
}