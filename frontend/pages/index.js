
import { MainNavBar, TopSpacer } from "../components/NavBar"
import { WalletContext } from "../utils/WalletSessionProvider"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center bg-background h-full space-y-4">
      <TopSpacer />
      <MainNavBar />
      <div className="flex flex-col items-center h-full w-full max-w-[90rem] space-y-8 px-6 md:px-14">
        
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