import { useEffect, useState } from 'react';
import axios from 'axios';

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
    const [imageUri, setImageUri] = useState();
    useEffect(async () => {

        const web3 = new Web3(provider)

        // get marketplace contract
        const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

        // create listing
        const data = await marketplace.methods.getListing(listingId).call()
        setListingData(data);

        // get image uri
        if (data && data.nftContract && data.tokenId) {
            const erc721Abi = [
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]

            const originalContract = new web3.eth.Contract(erc721Abi, data.nftContract)
            const tokenURI = await originalContract.methods.tokenURI(data.tokenId).call()
            //setImageUri("https://ipfs.infura.io/ipfs/" + tokenURI.substring(7))
            //console.log(tokenURI.substring(7))

            //https://ipfs.infura.io/ipfs/QmT9UFT4okuSNg4xsT3arxxSvv3CbJJghrFU9n1raRZCnu
            if (tokenURI.length > 10) {
                try {
                    const meta = await fetch("https://ipfs.infura.io/ipfs/" + tokenURI.substring(7))
                    const data = await meta.json()
                    setImageUri(data && data.image && ("https://ipfs.infura.io/ipfs/" + data.image.substring(7)))
                } catch {
                    console.log("Error loading imageURI / imageURI doesn't exist")
                }
            }

        }
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
                        <div
                            className={
                                //(!imageUri && ' animate-pulse ') +
                                "flex aspect-square flex-shrink-0 rounded-xl bg-accentGray"
                            }
                        >
                            <img
                                src={imageUri && imageUri}
                            />
                            <div className='absolute left-0 top-0 p-4 w-full h-full pointer-events-none'>
                                <div className='flex aspect-square flex-shrink-0 rounded-xl shadow-inner' />
                            </div>
                        </div>
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