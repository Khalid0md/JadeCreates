import Logo from "./logo"
import NavButton from "./NavButton"
import { useWallet } from "../utils/WalletSessionProvider";
import { useContext, useEffect, useReducer, useState } from "react"
import { useRouter } from "next/router";
import { useModal } from "../utils/ModalContext";
import { CustomLogo } from "./logo";
//import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useWalletConnect } from "../utils/WalletConnectSessionProvider";
const walletConnectLogo = require('../public/walletconnect-logo.png')

function NavBar(props) {
    return (
        <div className="sticky flex justify-center w-full top-0 space-x-4 flex-shrink-0 bg-background/70 backdrop-blur-xl z-30 py-4">
            <div className="flex grow max-w-[90rem] px-6 md:px-14 space-x-4">
                {props.children}
            </div>
        </div>
    )
}

export function MainNavBar({ showGetStarted }) {

    const walletConnectSession = useWalletConnect();
    const router = useRouter();
    const modalController = useModal();
    
    return (
        <NavBar>
            <Logo />
            <div className="flex grow" />
            <NavButton 
                text={walletConnectSession.isConnected ? 'Go to Dashboard' : 'Log in with WalletConnect'}
                bgColor={'white'} textColor={'mainBlack'}
                iconRight={!walletConnectSession.isConnected && <img src="/walletconnect-logo.png" className="h-5 pl-4 -mr-2 -mt-1" />}
                onClick={async () => {
                /*
                modalController.setContent(
                    <div className="w-64 h-24 flex items-center justify-center nunito-font font-black">
                        Issue with Metamask.
                    </div>
                )
                modalController.setIsShown(true);
                */

                /*
                if (walletSession.walletAddress) {
                    router.push('/dashboard')
                } else {
                    const sessionStatus = await walletSession.connectWallet();
                }
                */

                if (walletConnectSession.provider.connected) {
                    router.push('/dashboard')
                } else {
                    //await walletConnectSession.connector.createSession()
                    await walletConnectSession.provider.enable();
                }
            }} />
            {
                showGetStarted
                    ?
                    <NavButton text={'Get Started'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/getstarted'} />
                    :
                    <NavButton text={'Back'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/'} />
            }
        </NavBar>
    )
}

export function StorefrontNavBar({ storeData }) {

    const router = useRouter();

    useEffect(() => {
        console.log(storeData.logoURI)
    }, [])

    return (
        <NavBar>
            <img
                src={storeData && storeData.logoURI}
                className="max-h-14 object-contain p-2 cursor-pointer"
                onClick={() => {
                    router.push('/')
                }}
            />
            <div className="flex grow" />
            <div className={`bg-[#${storeData && storeData.colourHex}] p-4 px-16 rounded-2xl `} >

            </div>
            {/*<NavButton text={'Button 1'} bgColor={'white'} textColor={'mainBlack'} link={'/storefront'} /> */}
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