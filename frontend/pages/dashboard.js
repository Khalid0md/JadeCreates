
import { WalletContext } from "../utils/WalletSessionProvider"
import { useEffect, useContext } from "react"
import { useRouter } from "next/router";
import Logo from "../components/logo";
import NavButton from "../components/NavButton";

export default function DashboardLoginHandler() {

    const walletSession = useContext(WalletContext);
    const router = useRouter();

    useEffect(() => {
        if (!walletSession.isLoaded) { return }

        if (walletSession.walletAddress) {
            router.push('/dashboard')
        } else {
            router.push('/')
        }
    }, [walletSession.walletAddress])

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
    return (
        <div className="flex w-full justify-center bg-background h-screen">
            <div className="w-full max-w-[90rem] bg-background px-14">
                <DashboardNavBar />
                <p className="nunito-font font-black text-4xl">
                    Dashboard
                </p>
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

function EditStoreMetadata() {
    return (
        <div>

        </div>
    )
}