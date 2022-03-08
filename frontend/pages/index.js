
import { MainNavBar, TopSpacer } from "../components/NavBar"
import { WalletContext } from "../utils/WalletSessionProvider"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import makeBlockie from 'ethereum-blockies-base64';
import Storefront from "./storefront";
const Web3 = require("web3");
//
//const fs = require("fs")
//const market = fs.readFileSync("market.txt").toString()
//const store = fs.readFileSync("store.txt").toString()
//

import { marketplaceAddress, storeMarketplaceAddress } from "../../backend/config";

// reference store marketplace contract
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';
import LoadingIndicator from "../components/LoadingIndicator";
//const storeMarketplaceAddress = '0x02DfcEFB6069f27b89f041b6Be92dC3e2185c9bB';

async function getStoreData() {
  const { host } = window.location;
  let splitHost = host.split('.');

  if (splitHost.length === 3 || splitHost.length === 2) {
    let subdomain = splitHost[0];
    if (subdomain === 'www') {
      return null;
    }

    // Check subdomain validity here:
    const web3 = new Web3('https://api.s0.b.hmny.io');
    const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

    const isAvailable = await storeMarketplace.methods.nameAvailable(subdomain).call()

    if (!isAvailable) {
      const storeData = await storeMarketplace.methods.getStoreWithSubdomain(subdomain).call()

      if (storeData.subdomain === subdomain) { return storeData }
    }

    return null;
  }
}

export default function CheckDomain() {

  const [storeData, setStoreData] = useState();
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    if (!storeData) {
      const data = await getStoreData()

      if (data) { setStoreData(data) }
      setLoaded(true)
    }
  }, [storeData]);

  return (
    <div>
      {
        loaded
          ?
          <div>
            {
              storeData
                ?
                <Storefront storeData={storeData} />
                :
                <LandingPage />
            }
          </div>
          :
          <LoadingIndicator />
      }
    </div>
  )
}

function LandingPage() {

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  // hook to track scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <div className="flex flex-col w-full items-center bg-background h-full space-y-4">
      <TopSpacer />
      <MainNavBar showGetStarted={true} />
      <div className="space-y-24">
        <LandingContent1 />
        <LandingContent2 offsetY={offsetY} />
      </div>
      <div className="h-[100rem]" />
    </div>
  )
}//<div className="flex flex-col h-full w-full max-w-[90rem] px-14 md:px-24 space-y-24">

function LandingContent1() {
  return (
    <div className="flex flex-col h-full w-full max-w-[90rem] px-10 md:px-24 pt-16">
      <div className="w-2/3 text-mainBlack/80 nunito-font font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        <a className="bg-clip-text bg-gradient-to-bl from-green1 to-green2 text-transparent">Create</a> an <a className="bg-clip-text bg-gradient-to-tr from-green1 to-green2 text-transparent">NFT</a> marketplace in seconds.
      </div>
    </div>
  )
}

function LandingContent2({ offsetY }) {
  return (
    <div className="px-6 2xl:px-0">
      <div className="flex items-center justify-end h-full w-full max-w-[90rem] px-6 md:px-12 bg-mainBlack/90 p-4 py-12 rounded-3xl">
        <div className="flex grow text-center pr-6 md:pr-12 nunito-font text-6xl font-black text-background leading-tight">
          List all of your NFTs in one place.
        </div>
        <NFTParallax offsetY={offsetY} />
      </div>
    </div>
  )
}

function NFTParallax({ offsetY }) {
  return (
    <div className="flex space-x-6 overflow-clip h-[40rem] rounded-2xl glow-wide flex-shrink-0">
      <div
        className="flex flex-col space-y-6"
        style={{ transform: `translateY(${offsetY * -0.75}px)` }}
      >
        <NFTCard number={1234} blockSeed={'qetuoadgjlxvn'} />
        <NFTCard number={1234} blockSeed={'iuqwerhf'} />
        <NFTCard number={1234} blockSeed={'oiqwuernf'} />
        <NFTCard number={1234} blockSeed={'ljiq2h34'} />
      </div>
      <div
        className="flex flex-col space-y-6"
        style={{ transform: `translateY(${offsetY * -1}px)` }}
      >
        <NFTCard number={1234} blockSeed={'askldfhlkja'} />
        <NFTCard number={1234} blockSeed={'klwefjkasdf'} />
        <NFTCard number={1234} blockSeed={'aiousdfh423'} />
        <NFTCard number={1234} blockSeed={'23k4jhsdfa'} />
        <NFTCard number={1234} blockSeed={'as9o8d7fk2j3'} />
      </div>
    </div>
  )
}

function NFTCard({ number, blockSeed }) {
  return (
    <div className="flex flex-col p-4 space-y-4 bg-white rounded-2xl glow-low flex-shrink-0 min-w-max">
      {
        /*
        <div className="flex rounded-xl w-64 h-64 opacity-80 flex-shrink-0 overflow-clip -p-16">
          <div className="bg-gradient-to-tr from-green1 to-green-600 flex grow -m-16 animate-spin" />
        </div>
        */
      }
      {
        <img src={makeBlockie(blockSeed)} className="flex rounded-xl w-64 h-64 opacity-80 flex-shrink-0" />
      }
      <div className="flex space-x-4" >
        <p className="bg-accentGray text-secondaryGray text-2xl numbers-font italic font-black rounded-xl px-4 py-2 w-24">
          {/*'#' + number*/}
        </p>
        <div className="w-full h-12 bg-accentGray rounded-xl" />
      </div>
    </div>
  )
}