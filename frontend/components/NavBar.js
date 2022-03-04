import Logo from "./logo"
import NavButton from "./NavButton"
import { useWallet } from "../utils/WalletSessionProvider";
import { useContext } from "react"
import { useRouter } from "next/router";
import { useModal } from "../utils/ModalContext";
import { CustomLogo } from "./logo";

function NavBar(props) {
    return (
        <div className="sticky flex justify-center w-full top-0 space-x-4 flex-shrink-0 bg-background/90 backdrop-blur-xl z-30 py-4">
            <div className="flex grow max-w-[90rem] px-6 md:px-14 space-x-4">
                {props.children}
            </div>
        </div>
    )
}

export function MainNavBar({ showGetStarted }) {

    const walletSession = useWallet();
    const router = useRouter();
    const modalController = useModal();

    return (
        <NavBar>
            <Logo />
            <div className="flex grow" />
            <NavButton text={walletSession.walletAddress ? 'Go to Dashboard' : 'Log in with MetaMask'} bgColor={'white'} textColor={'mainBlack'} onClick={async () => {
                /*
                modalController.setContent(
                    <div className="w-64 h-24 flex items-center justify-center nunito-font font-black">
                        Issue with Metamask.
                    </div>
                )
                modalController.setIsShown(true);
                */

                if (walletSession.walletAddress) {
                    router.push('/dashboard')
                } else {
                    const sessionStatus = await walletSession.connectWallet();
                }

                /*
                console.log(sessionStatus)
    
                if (sessionStatus.isConnected) { router.push('/dashboard') }
                */
            }} />
            {
                showGetStarted
                ?
                <NavButton text={'Get Started'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/getstarted'} />
                :
                <NavButton text={'back'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/'} />
            }
        </NavBar>
    )
}

export function StorefrontNavBar() {
    return (
        <NavBar>
            <CustomLogo />
            <div className="flex grow" />
            <NavButton text={'Button 1'} bgColor={'white'} textColor={'mainBlack'} link={'/storefront'} />
            {/*<NavButton text={'Button 2'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/storefront'} />*/}
        </NavBar>
    )
}

export function DashboardNavBar() {

    const router = useRouter();

    return (
        <NavBar>
            <Logo />
            <div className="flex grow" />
            <NavButton text={'Landing Page'} bgColor={'white'} textColor={'mainBlack'} link={'/'} />
            <NavButton text={'Get Started'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/getstarted'} />
        </NavBar>
    )
}

export function TopSpacer() {
    return (
        <div className="sticky flex flex-shrink-0 top-0 h-0 w-full pb-4" />
    )
}