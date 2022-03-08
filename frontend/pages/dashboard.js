
import { useWallet } from "../utils/WalletSessionProvider";
import { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router";
import Logo from "../components/logo";
import NavButton from "../components/NavButton";
import { HiOutlineChevronRight } from "react-icons/hi";
import testStoresData from "../testData/testStoresData";
import { DashboardNavBar, TopSpacer } from "../components/NavBar";
import LoadingIndicator from "../components/LoadingIndicator";

export default function DashboardLoginHandler() {

    const walletSession = useWallet();
    const router = useRouter();

    function CheckLogin() {
        if (!walletSession.isLoaded) { return }

        while (!walletSession.isLoaded) { }

        if (walletSession.walletAddress) {
            router.push('/dashboard')
        } else {
            router.push('/')
        }
    }

    useEffect(() => {
        console.log("address changed")
        CheckLogin()
    }, [walletSession.walletAddress])

    useEffect(() => {
        CheckLogin()
    }, [walletSession.isLoaded])

    if (walletSession.walletAddress) {
        return (
            <Dashboard />
        )
    } else {
        return (
            <LoadingIndicator />
        )
    }
}

async function GetMyStores() {
    
}

function Dashboard() {

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
                        <DashboardMainContent setSelectedStore={setSelectedStore} />
                }
            </div>
        </div>
    )
}

function DashboardMainContent({ setSelectedStore }) {
    return (
        <div className="flex flex-col space-y-4">
            <p className="nunito-font text-2xl font-black">
                My Stores
            </p>
            <StoresList stores={testStoresData} setSelectedStore={setSelectedStore} />
        </div>
    )
}

function StoresList({ stores, setSelectedStore }) {
    return (
        <div className="pb-12 grid gap-8 store-grid">
            {
                stores.map(store => {
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