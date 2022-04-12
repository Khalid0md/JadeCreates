
import { MainNavBar, TopSpacer } from "../components/NavBar"
import { useContext, useEffect, useReducer, useRef, useState } from "react"
import { useRouter } from "next/router";
import makeBlockie from 'ethereum-blockies-base64';
import Storefront from "../components/Storefront";
import Head from 'next/head'
const Web3 = require("web3");
var throttle = require('lodash.throttle');

// icons for 'how it works' section
import { BsListCheck, BsGlobe2 } from "react-icons/bs";
import { IoWallet } from "react-icons/io5";
import { GrDomain } from "react-icons/gr";
import { HiOutlineGlobe, HiOutlineGlobeAlt, HiViewGrid, HiViewGridAdd, HiCreditCard, HiReceiptTax } from "react-icons/hi";
import { MdSell } from 'react-icons/md';
//
//const fs = require("fs")
//const market = fs.readFileSync("market.txt").toString()
//const store = fs.readFileSync("store.txt").toString()
//

import { marketplaceAddress, storeMarketplaceAddress } from "../../backend/config";

// reference store marketplace contract
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';
import LoadingIndicator from "../components/LoadingIndicator";
import Logo from "../components/logo";
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

    // remove subdomain and return null
    splitHost.shift()
    window.location.replace('http://' + splitHost.join('.'))
    return null;
  }

  return null;
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
      <Head>
        <title>Martazo</title>
        <link rel="icon" href="/favicon.ico?" />
      </Head>
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

  function handleScroll() {
    setOffsetY(window.pageYOffset)
  }

  // hook to track scrolling
  useEffect(() => {

    const throttledScroll = throttle(handleScroll, 10);
    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    }

  }, [])

  return (
    <div
      className="flex flex-col w-full items-center bg-background h-full space-y-4"
    >
      <TopSpacer />
      <MainNavBar showGetStarted={true} />
      <LandingContent1 />
      <div className="h-12" />
      <LandingContent2 offsetY={offsetY} />
      <div id='posTracker' className="h-12" />
      <div className={false ? '  ' : ' sticky ' + "flex flex-col items-center justify-center flex-shrink-0 top-[18%] h-screen w-full"} >
        <LandingContent3 offsetY={offsetY} trackerId='posTracker' endTrackerId={'endTracker'} />
      </div>
      <div id='endTracker' className="h-[125rem]" />
      <Footer />
    </div>
  )
}

function Footer() {

  const router = useRouter();

  return (
    <div className="sticky top-0 flex items-center justify-center h-screen w-full bg-background">
      <div className="grid items-center justify-center grid-flow-row xl:grid-flow-col px-16 py-32 xl:px-48 nunito-font bg-white rounded-3xl space-y-8 xl:space-y-0 xl:space-x-16">
        <div className="max-w-[15rem] -mr-4">
          <Logo />
          <p className="font-bold">
            The fastest way to build your own NFT marketplace.
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-extrabold">
            Links
          </p>
          <button onClick={() => router.push('/getstarted')}>
            Get Started
          </button>
          <button onClick={() => router.push('/dashboard')}>
            Dashboard
          </button>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-extrabold">
            Socials
          </p>
          <div className="flex space-x-2">
            <button className="flex items-center justify-center w-16 h-16 bg-mainBlack text-white rounded-2xl">
              a
            </button>
            <button className="flex items-center justify-center w-16 h-16 bg-mainBlack text-white rounded-2xl">
              b
            </button>
            <button className="flex items-center justify-center w-16 h-16 bg-mainBlack text-white rounded-2xl">
              c
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

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

function LandingContent3({ offsetY, trackerId, endTrackerId }) {

  const [inView, setInView] = useState(false)
  const [bgInView, setBgInView] = useState(false)

  useEffect(() => {

    // get element's position
    const rect = document.getElementById('howitworks').getBoundingClientRect();

    // apply effects
    setInView(rect.y < screen.height / 2)
    setBgInView(rect.y < screen.height / 2 - 100)

  }, [offsetY])

  return (
    <div className="flex flex-col h-full w-full max-w-[90rem] px-10 md:px-24">
      <div
        id='howitworks'
        className={
          (bgInView ? ' bg-white shadow-wide2 ' : ' shadow-none ') +
          "max-w-fit -ml-8 p-8 nunito-font font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl rounded-3xl transition-all duration-500"
        }
      >
        <p className={(inView ? ' opacity-100 ' : ' opacity-0 ') + "absolute bg-clip-text bg-gradient-to-bl from-green2 via-green1 to-green2 text-transparent transition-all duration-500"} >
          How it works:
        </p>
        <p className={(inView ? ' opacity-0 ' : ' opacity-100 ') + "text-accentGray transition-all duration-500"} >
          How it works:
        </p>
      </div>
      <InfoCardCollection offsetY={offsetY} trackerId={trackerId} />
    </div>
  )
}

function InfoCardCollection({ offsetY, trackerId, endTrackerId }) {

  const [offsetX, setOffsetX] = useState(0)
  const [posIsFrozen, setPosIsFrozen] = useState(false)

  useEffect(() => {

    // get width of collection
    /*
    if (!collectionWidth) {
      const collection = document.getElementById('infoCardCollection').getBoundingClientRect()
      setCollecitonWidth(collection.width - 200)
    }
    */

    // get tracker's position
    const tracker = document.getElementById(trackerId).getBoundingClientRect()

    setPosIsFrozen(tracker.y < 0)

    if (posIsFrozen) {

      // check that last card does not go past edge of collection
      //if (tracker.y * -1 > collectionWidth) {
      const col = document.getElementById('infoCardCollection').getBoundingClientRect();
      const lastItem = document.getElementById('lastInfoCard').getBoundingClientRect();
      if (!(lastItem.right < col.right && offsetX + tracker.y < 0)) {
        setOffsetX(tracker.y * -1)
      }
    } else {
      setOffsetX(0)
    }

  }, [offsetY])

  return (
    <div id='infoCardCollection' className="flex overflow-hidden rounded-3xl -mx-8 z-0 mt-8">
      <div id='posTracker2' className="h-0" />
      <div
        className={
          "flex space-x-8 transition-all ease-linear duration-[10ms]"
        }
        style={{ willChange: 'transform', transform: `translate3d(${offsetX * -0.5}px, 0, 0)` }}
      >
        <InfoCard
          iden={'1'}
          transitionOffset={0}
          offsetY={offsetY}
          titleText='Connect a wallet'
          mainText='Lorem ipsum dolor sit amet, bla something else to put here to fill up space.'
          icon={<img src="/landing_howitworks/wallet.png" className="h-64" />}//<IoWallet size={175} />}
        />
        <InfoCard
          iden={'2'}
          transitionOffset={75}
          offsetY={offsetY}
          titleText='Choose a plan'
          mainText='Lorem ipsum dolor sit amet, bla something else to put here to fill up space.'
          icon={<img src="/landing_howitworks/plan.png" className="h-64" />}//<BsListCheck size={175} />}
        />
        <InfoCard
          iden={'3'}
          transitionOffset={150}
          offsetY={offsetY}
          titleText='Claim a subdomain'
          mainText='Lorem ipsum dolor sit amet, bla something else to put here to fill up space.'
          icon={<img src="/landing_howitworks/domain.png" className="h-64" />}//<BsGlobe2 size={175} />}
        />
        <InfoCard
          iden={'4'}
          transitionOffset={175}
          offsetY={offsetY}
          titleText='List NFTs'
          mainText='Lorem ipsum dolor sit amet, bla something else to put here to fill up space.'
          icon={<img src="/landing_howitworks/list.png" className="h-64" />}//<HiViewGridAdd size={175} />}
        />
        <InfoCard
          iden={'lastInfoCard'}
          transitionOffset={180}
          offsetY={offsetY}
          titleText='Done! Start Selling'
          mainText='Lorem ipsum dolor sit amet, bla something else to put here to fill up space.'
          icon={<img src="/landing_howitworks/sell.png" className="h-64" />}//<MdSell size={175} />}
        />
      </div>
    </div>
  )
}

function InfoCard({ iden, transitionOffset, offsetY, titleText, mainText, icon }) {

  const [inView, setInView] = useState(false)

  useEffect(() => {

    // get element's position
    const rect = document.getElementById(iden).getBoundingClientRect();

    // apply effects
    setInView(rect.y < screen.height / 2 - transitionOffset)

  }, [offsetY])

  return (
    <div id={iden}
      className={
        (inView ? ' opacity-100 ' : ' opacity-0 ') +
        "flex flex-col w-96 aspect-[5/6] bg-white rounded-3xl p-4 flex-shrink-0 transition-all duration-500"
      }

    >
      <div className="flex items-center justify-center bg-background grow h-2/3 rounded-2xl text-green0">
        {/*
        <div
          className="drop-shadow-2xl2 bg-green1 px-6 py-10 rounded-3xl"
          style={{
            //transform: 'rotate3d(1, 1, 1, 45deg)',
            //transform: 'rotateX(23deg) rotateY(-19deg) rotateZ(20deg)',
            //transformOrigin: '50% 50% 0px'
          }}
        >
          <div className="drop-shadow-xl">
            {icon}
          </div>
        </div>
        */}
        {icon}
      </div>
      <div className="flex flex-col grow justify-center nunito-font px-2 space-y-2">
        <p className="font-black text-2xl text-mainBlack/75">
          {titleText}
        </p>
        <p className="font-bold text-mainBlack/50">
          {mainText}
        </p>
      </div>
    </div>
  )
}

function NFTParallax({ offsetY }) {
  return (
    <div className="flex space-x-6 overflow-hidden h-[40rem] rounded-2xl flex-shrink-0">
      <div
        className="flex flex-col space-y-6 transition-all ease-linear duration-[10ms]"
        style={{ willChange: 'transform', transform: `translate3d(0, ${offsetY * -0.75}px, 0)` }}
      >
        <PseudoNFTCard number={1234} blockSeed={'qetuoadgjlxvn'} offsetY={offsetY} />
        <PseudoNFTCard number={1234} blockSeed={'iuqwerhf'} offsetY={offsetY} />
        <PseudoNFTCard number={1234} blockSeed={'oiqwuernf'} offsetY={offsetY} />
        <PseudoNFTCard number={1234} blockSeed={'ljiq2h34'} offsetY={offsetY} />
      </div>
      <div
        className="flex flex-col space-y-6 transition-all ease-linear duration-[10ms]"
        style={{ willChange: 'transform', transform: `translate3d(0, ${offsetY * -1}px, 0)` }}
      >
        <PseudoNFTCard number={1234} blockSeed={'askldfhlkja'} offsetY={offsetY} />
        <PseudoNFTCard number={1234} blockSeed={'klwefjkasdf'} offsetY={offsetY} />
        <PseudoNFTCard number={1234} blockSeed={'aiousdfh423'} offsetY={offsetY} />
        <PseudoNFTCard number={1234} blockSeed={'23k4jhsdfa'} offsetY={offsetY} />
        <PseudoNFTCard number={1234} blockSeed={'as9o8d7fk2j3'} offsetY={offsetY} />
      </div>
    </div>
  )
}

function PseudoNFTCard({ number, blockSeed, offsetY }) {
  return (
    <div className="flex flex-col p-4 space-y-4 bg-white rounded-2xl flex-shrink-0 min-w-max">
      {
        <div className="flex rounded-xl w-64 h-64 opacity-80 flex-shrink-0 overflow-hidden -p-16">
          <div
            className="bg-gradient-to-b from-green1 to-green2 flex grow -m-16 animate-spin"
          />
        </div>
      }
      {
        /*
        <img src={makeBlockie(blockSeed)} className="flex rounded-xl w-64 h-64 opacity-80 flex-shrink-0" />
        */
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

/*
<div
            className="bg-gradient-to-b from-green1 to-green2 flex grow -m-16 animate-spin"
          />

          */