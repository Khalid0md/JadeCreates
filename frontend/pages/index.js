
import NavBar from "../components/NavBar"
import { WalletContext } from "../utils/WalletSessionProvider"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div className="flex w-full justify-center bg-background h-screen">
      <div className="w-full max-w-[90rem] bg-background">
        <NavBar />
        <LandingContent1 />
      </div>
    </div>
  )
}

function LandingContent1() {
  return (
    <div className="p-16">
      <div className="w-1/2 text-mainBlack nunito-font font-black text-8xl">
        This will be a landing page.
      </div>
    </div>
  )
}