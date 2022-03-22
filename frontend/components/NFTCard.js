import { useEffect, useState } from 'react';

// reference contracts
import { marketplaceAddress } from "../../backend/config";
import marketplaceJson from '../../backend/artifacts/contracts/Marketplace.sol/Marketplace.json';
import Web3 from 'web3';

function NFTCard2({ listingId, mmWalletSession }) {

    // load data from listing id (displays placeholder card in meantime)
    const [listingData, setListingData] = useState();
    useEffect(async () => {

        // login metamask if not / get web3 provider
        if (!mmWalletSession.walletAddress) {
            await mmWalletSession.connectWallet();
        }
        const web3 = new Web3(window.ethereum)

        // get marketplace contract
        const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

        // create listing
        setListingData(await marketplace.methods.getListing(listingId).call());
    }, [])

    return (
        <div className="flex flex-col p-4 space-y-4 bg-white rounded-2xl glow-low flex-shrink-0 min-w-max">
            {
                <div className="flex rounded-xl w-64 h-64 opacity-80 flex-shrink-0 overflow-hidden -p-16">
                    <div
                        className="bg-gradient-to-b from-green1 to-green2 flex grow -m-16 animate-spin"
                    />
                </div>

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

export default function NFTCard({ listingId, provider, isStorefrontDisplay }) {

    // load data from listing id (displays placeholder card in meantime)
    const [listingData, setListingData] = useState();
    useEffect(async () => {

        const web3 = new Web3(provider)

        // get marketplace contract
        const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

        // create listing
        setListingData(await marketplace.methods.getListing(listingId).call());
    }, [])

    // function for padding tokenId with zeros
    const maxTokenIdLength = 5;
    const zeroPad = (num, places) => {
        if (places >= 1) { return num.padStart(places, '0') }
        return num;
    }

    return (
        <div>
            {
                listingData
                    ?
                    <div 
                        className={
                            (isStorefrontDisplay && ' hover:scale-105 hover:shadow-wide transition-all duration-500 ')
                            + "aspect-[square] flex flex-col p-4 space-y-4 bg-white rounded-3xl shadow-high flex-shrink-0"
                        }
                    >
                        <img src={false && listingData.whatDoIPutHere} className="flex aspect-square flex-shrink-0 rounded-xl bg-accentGray" />
                        <div className="flex space-x-4" >
                            <p className="flex bg-background text-secondaryGray text-2xl numbers-font italic font-black rounded-xl px-4 py-2 max-w-min whitespace-nowrap">
                                {'#' + (listingData.tokenId && zeroPad(listingData.tokenId, maxTokenIdLength - listingData.tokenId.toString().length))}
                            </p>
                            {
                                isStorefrontDisplay
                                    ?
                                    <div className='flex grow'>
                                        {
                                            false //TODO: add auction functionality and check if auction here
                                                ?
                                                <AuctionButton />
                                                :
                                                <BuyButton />
                                        }
                                    </div>
                                    :
                                    <div />
                            }
                        </div>
                    </div>
                    :
                    <NFTCardLoading isStorefrontDisplay={isStorefrontDisplay} />
            }
        </div>
    )
}

function NFTCardLoading({ isStorefrontDisplay }) {
    return (
        <div className="aspect-[square] flex flex-col p-4 space-y-4 bg-white rounded-3xl flex-shrink-0">
            <div className="flex aspect-square flex-shrink-0 rounded-xl bg-accentGray animate-pulse" />
            <div className="flex space-x-4" >
                <div className="bg-accentGray animate-pulse rounded-xl px-4 py-2 h-12 w-1/2 whitespace-nowrap" />
                {
                    isStorefrontDisplay
                        ?
                        <div className='bg-mainBlack rounded-xl px-4 py-2 w-full' />
                        :
                        <div />
                }
            </div>
        </div>
    )
}

function BuyButton() {
    return (
        <button className="flex items-center justify-center grow bg-mainBlack text-white text-xl nunito-font font-black rounded-xl h-full whitespace-nowrap" >
            Buy Now
        </button>
    )
}

function AuctionButton() {
    return (
        <button className="bg-purple-500 text-white text-xl nunito-font font-black rounded-xl px-4 py-2 w-full" >
            Bid | 0.5ETH
        </button>
    )
}