
import NavBar from "../components/NavBar"
import { AiFillCheckCircle } from "react-icons/ai";
import { GrDomain } from "react-icons/gr";
import { HiOutlineGlobe, HiOutlineGlobeAlt, HiViewGrid, HiViewGridAdd, HiCreditCard, HiReceiptTax } from "react-icons/hi";
import { FiDollarSign } from "react-icons/fi";

export default function GetStarted() {
    return (
        <div className="flex flex-col w-full items-center bg-background h-screen space-y-8">
            <div className="w-full max-w-[90rem] bg-background">
                <NavBar />
            </div>
            <PlansHeader />
            <div className="flex items-center justify-center w-full space-x-8 py-14 bg-background">
                <BasicPlan />
                <UnlimitedPlan />
                <ProPlan />
            </div>
        </div>
    )
}

function PlansHeader() {
    return (
        <div className="flex flex-col items-center space-y-4 max-w-2xl mx-14">
            <p className="text-5xl nunito-font font-black">
                Choose your plan
            </p>
            <p className="nunito-font font-bold text-secondaryGray text-center">
                With Martazo, you can create your own NFT marketplace in seconds! All plans will provide you with a unique subdomain (e.g. yourname.martazo.com).
            </p>
        </div>
    )
}

function BasicPlan() {
    return (
        <div className="flex flex-col w-[18rem] aspect-[3/5] bg-white rounded-2xl drop-shadow-xl transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl px-6 py-6 group space-y-4">
            <p className="-translate-x-2 flex w-full text-4xl nunito-font font-black text-accentGray group-hover:text-green1 transition-all duration-300 justify-center" >
                Basic
            </p>
            <div className="translate-x-1 translate-y-1 bg-green2 rounded-xl">
                <p className="-translate-x-2 -translate-y-2 flex space-x-2 bg-green1 p-4 mb-0 mr-0 rounded-xl text-white justify-center items-end">
                    <p className="text-5xl numbers-font font-black" >
                        <div className="inline-block h-full align-text-baseline" />
                        500
                    </p>
                    <p className="text-3xl nunito-font font-black">
                        <div className="inline-block h-full align-text-baseline" />
                        ONE
                    </p>
                </p>
            </div>
            <div className="flex grow justify-center">
                <div className="flex flex-col grow justify-center max-w-min space-y-6">
                    <ListItem icon={<HiCreditCard size={25} />} text={'One time payment'} space={4} />
                    <ListItem icon={<HiOutlineGlobeAlt size={25} />} text={'Custom subdomain'} space={4} />
                    <ListItem icon={<HiViewGrid size={25} />} text={'List up to 10 NFTs'} space={4} />
                    <ListItem icon={<HiReceiptTax size={25} />} text={'5% service fee'} space={4} />
                </div>
            </div>
            <button className="w-full h-14 bg-mainBlack rounded-2xl shadow-low">
                <p className="text-white font-bold nunito-font">
                    Go Basic
                </p>
            </button>
        </div>
    )
}

function UnlimitedPlan() {
    return (
        <div className="flex flex-col w-[20rem] aspect-[3/5] bg-white rounded-2xl drop-shadow-2xl transition-all duration-300 hover:scale-105 px-6 py-6 group space-y-4">
            <p className="-translate-x-2 flex w-full text-4xl nunito-font font-black text-accentGray group-hover:text-green1 transition-all duration-300 justify-center" >
                Unlimited
            </p>
            <div className="translate-x-1 translate-y-1 bg-green2 rounded-xl">
                <p className="-translate-x-2 -translate-y-2 flex space-x-2 bg-green1 p-4 mb-0 mr-0 rounded-xl text-white justify-center items-end">
                    <p className="text-5xl numbers-font font-black" >
                        <div className="inline-block h-full align-text-baseline" />
                        2000
                    </p>
                    <p className="text-3xl nunito-font font-black">
                        <div className="inline-block h-full align-text-baseline" />
                        ONE
                    </p>
                </p>
            </div>
            <div className="flex grow justify-center">
                <div className="flex flex-col grow justify-center max-w-min space-y-8">
                    <ListItem icon={<HiCreditCard size={25} />} text={'One time payment'} space={8} />
                    <ListItem icon={<HiOutlineGlobeAlt size={25} />} text={'Custom subdomain'} space={8} />
                    <ListItem icon={<HiViewGrid size={25} />} text={'List unlimited NFTs'} space={8} />
                    <ListItem icon={<HiReceiptTax size={25} />} text={'1% service fee'} space={8} />
                </div>
            </div>
            <button className="w-full h-14 bg-mainBlack rounded-2xl shadow-low">
                <p className="text-white font-bold nunito-font">
                    Go Unlimited
                </p>
            </button>
        </div>
    )
}

function ProPlan() {
    return (
        <div className="flex flex-col w-[18rem] aspect-[3/5] bg-white rounded-2xl drop-shadow-xl transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl px-6 py-6 group space-y-4">
            <p className="-translate-x-2 flex w-full text-4xl nunito-font font-black text-accentGray group-hover:text-green1 transition-all duration-300 justify-center" >
                Pro
            </p>
            <div className="translate-x-1 translate-y-1 bg-green2 rounded-xl">
                <p className="-translate-x-2 -translate-y-2 flex space-x-2 bg-green1 p-4 mb-0 mr-0 rounded-xl text-white justify-center items-end">
                    <p className="text-5xl numbers-font font-black" >
                        <div className="inline-block h-full align-text-baseline" />
                        1000
                    </p>
                    <p className="text-3xl nunito-font font-black">
                        <div className="inline-block h-full align-text-baseline" />
                        ONE
                    </p>
                </p>
            </div>
            <div className="flex grow justify-center">
                <div className="flex flex-col grow justify-center max-w-min space-y-6">
                    <ListItem icon={<HiCreditCard size={25} />} text={'One time payment'} space={4} />
                    <ListItem icon={<HiOutlineGlobeAlt size={25} />} text={'Custom subdomain'} space={4} />
                    <ListItem icon={<HiViewGrid size={25} />} text={'List up to 100 NFTs'} space={4} />
                    <ListItem icon={<HiReceiptTax size={25} />} text={'3% service fee'} space={4} />
                </div>
            </div>
            <button className="w-full h-14 bg-mainBlack rounded-2xl shadow-low">
                <p className="text-white font-bold nunito-font">
                    Go Pro
                </p>
            </button>
        </div>
    )
}

function ListItem({ icon, text, space }) {
    return (
        <div className={"flex whitespace-nowrap" + " space-x-" + space}>
            <p className="text-green2">
                {icon}
            </p>
            <p className="nunito-font font-bold">
                {text}
            </p>
        </div>
    )
}