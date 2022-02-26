
import { WalletContext } from "../utils/WalletSessionProvider"
import { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router";
import Logo from "../components/logo";
import NavButton from "../components/NavButton";
import { HiOutlineChevronRight } from "react-icons/hi";
import testStoresData from "../testData/testStoresData";

export default function DashboardLoginHandler() {

    const walletSession = useContext(WalletContext);
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
            <div>
                Loading . . .
            </div>
        )
    }
}

function Dashboard() {

    const [selectedStore, setSelectedStore] = useState();  //{ storeName: 'My New Store' })

    return (
        <div className="flex w-full justify-center bg-background h-screen">
            <div className="w-full max-w-[90rem] bg-background px-14">
                <DashboardNavBar />
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
                                {selectedStore.storeName ? selectedStore.storeName : 'Unnamed Store'}
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
                        <DashboardMainContent />
                }
            </div>
        </div>
    )
}

function DashboardNavBar() {

    const router = useRouter();

    return (
        <div className="flex grow my-14 h-14 space-x-4 flex-shrink-0">
            <Logo />
            <div className="flex grow" />
            <NavButton text={'Landing Page'} bgColor={'white'} textColor={'mainBlack'} link={'/'} />
            <NavButton text={'Get Started'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/getstarted'} />
        </div>
    )
}

function DashboardMainContent() {
    return (
        <div>
            <p className="nunito-font text-2xl font-black pt-4">
                My Stores
            </p>
            <StoresList stores={testStoresData} />
        </div>
    )
}

function StoresList({ stores }) {
    return (
        <div className="flex space-x-8 overflow-x-scroll p-8">
            {
                stores.map(store => {
                    return (
                        <SmallStoreDisplay logoUri={store.logoUri} subdomain={store.subdomain} name={store.name} owner={store.owner} colourInHex={store.colourInHex} />
                    )
                })
            }
        </div>
    )
}

function SmallStoreDisplay({ logoUri, subdomain, name, owner, colourInHex }) {
    return (
        <div className="flex flex-shrink-0 w-96 bg-white p-4 rounded-2xl shadow-high">
            <img src={`https://cloudflare-ipfs.com/ipfs/${logoUri}`} className="flex aspect-square flex-shrink-0 rounded-xl" />
        </div>
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