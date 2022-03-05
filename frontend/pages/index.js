
import { MainNavBar, TopSpacer } from "../components/NavBar"
import { WalletContext } from "../utils/WalletSessionProvider"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import makeBlockie from 'ethereum-blockies-base64';

export default function Home() {

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
          Build your brand, list all of your NFTs in one place.
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
      <img src={makeBlockie(blockSeed)} className="flex rounded-xl w-64 h-64 opacity-80 flex-shrink-0 " />
      <div className="flex space-x-4" >
        <p className="bg-accentGray text-secondaryGray text-2xl numbers-font italic font-black rounded-xl px-4 py-2 w-24">
          {/*'#' + number*/}
        </p>
        <div className="w-full h-12 bg-accentGray rounded-xl" />
      </div>
    </div>
  )
}