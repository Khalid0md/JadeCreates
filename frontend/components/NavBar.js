import Logo from "./logo"
import NavButton from "./NavButton"
import { WalletContext } from "../utils/WalletSessionProvider"
import { useContext } from "react"
import { useRouter } from "next/router";
import { useModal } from "../utils/ModalContext";

export default function NavBar() {

    const walletSession = useContext(WalletContext);
    const router = useRouter();
    const modalController = useModal();

    return (
        <div className="flex grow mx-14 my-14 h-14 space-x-4 flex-shrink-0">
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
            <NavButton text={'Get Started'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/getstarted'} />
        </div>
    )
}