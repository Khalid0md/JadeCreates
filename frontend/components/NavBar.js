import Logo from "./logo"
import NavButton from "./NavButton"
import { WalletContext } from "../utils/WalletSessionProvider"
import { useContext } from "react"

export default function NavBar() {

    const ctxt = useContext(WalletContext);

    return (
        <div className="flex grow mx-14 my-14 h-14 space-x-4 flex-shrink-0">
            <Logo />
            <div className="flex grow" />
            <NavButton text={'Log in'} bgColor={'white'} textColor={'mainBlack'} onClick={() => {
                console.log(ctxt.connectWallet())
            }} />
            <NavButton text={'Get Started'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/getstarted'} />
        </div>
    )
}