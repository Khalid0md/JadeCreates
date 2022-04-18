import { useEffect, useState } from 'react';
import axios from 'axios';
import { useModal } from '../utils/ModalContext';

// reference contracts
import { marketplaceAddress } from "../../backend/config";
import marketplaceJson from '../../backend/artifacts/contracts/RevisedMarketplace.sol/RevisedMarketplace.json';
import Web3 from 'web3';
import TransactionPendingModalContent from './TransactionPendingModalContent';
import { hrmnyRpc } from '../utils/WalletSessionProvider';

export default function NFTCard({ listingId, provider, isStorefrontDisplay, walletIsConnected, walletSession, storeData }) {

    const modalController = useModal();

    // load data from listing id (displays placeholder card in meantime)
    const [listingData, setListingData] = useState();
    const [imageUri, setImageUri] = useState();
    const [name, setName] = useState();
    useEffect(async () => {

        const web3 = new Web3(hrmnyRpc)  //provider)

        // get marketplace contract
        const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

        // get listings data
        const data = await marketplace.methods.getListing(listingId).call()

        // if storefront display, hide sold nfts
        setListingData(data);
        if (isStorefrontDisplay && data.sold) { return }

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


            try {
                const meta = await fetch(tokenURI)
                const data = await meta.json()
                setName(data && data.name)
                setImageUri(data && data.image && data.image)
            } catch {
                console.log("Error loading imageURI / imageURI doesn't exist")
            }
        }
    }, [])

    // function for padding tokenId with zeros
    const maxTokenIdLength = 5;
    const zeroPad = (num, places) => {
        if (places >= 1) { return num.padStart(places, '0') }
        return num;
    }

    if (listingData && listingData.sold && isStorefrontDisplay) { return null }

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
                        <img
                            src={imageUri && imageUri}
                            className={
                                (!imageUri && ' animate-pulse ') +
                                "flex aspect-square flex-shrink-0 rounded-xl bg-accentGray border-2"
                            }
                        />
                        <div className='flex space-x-4 nunito-font font-extrabold text-mainBlack bg-background py-2 px-4 rounded-xl'>
                            <p className='w-2/3 text-ellipsis overflow-clip'>
                                {name}
                            </p>
                            <div className='flex grow' />
                            <div className='flex items-center space-x-2'>
                                <p className=''>
                                    {listingData.price}
                                </p>
                                <img src={'/harmony-one-logo.svg'} className='flex h-5 mb-[0.1rem]' />
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
                                                <BuyButton listingData={listingData} modalController={modalController} walletSession={walletSession} storeData={storeData} />
                                        }
                                    </div>
                                    :
                                    <div className='flex grow'>
                                        {
                                            !listingData.sold
                                                ?
                                                <CancelListingButton />
                                                :
                                                <SoldTag />
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    :
                    <NFTCardLoading isStorefrontDisplay={isStorefrontDisplay} />
            }
        </div >
    )
}

function NFTCardLoading({ isStorefrontDisplay }) {
    return (
        <div className="aspect-[square] flex flex-col p-4 space-y-4 bg-white rounded-3xl flex-shrink-0">
            <div className="flex aspect-square flex-shrink-0 rounded-xl bg-accentGray animate-pulse" />
            <div className='flex bg-accentGray rounded-xl h-10 animate-pulse' />
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

function CancelListingButton() {
    return (
        <button className="flex items-center justify-center grow bg-mainBlack text-white text-xl nunito-font font-black rounded-xl h-full whitespace-nowrap" >
            Remove
        </button>
    )
}

function SoldTag() {
    return (
        <div className="flex items-center justify-center grow bg-gradient-to-tr from-green2 to-green1 text-white text-xl nunito-font font-black rounded-xl h-full whitespace-nowrap" >
            Sold!
        </div>
    )
}

function BuyButton({ listingData, modalController, walletSession, storeData }) {
    return (
        <button
            className="flex items-center justify-center grow bg-mainBlack text-white text-xl nunito-font font-black rounded-xl h-full whitespace-nowrap"
            onClick={async () => {
                if (!walletSession || !walletSession.isConnected || !walletSession.provider) {
                    await walletSession.showConnectModal()
                    return
                }

                if (!listingData || !listingData.nftContract || !listingData.itemId) {
                    console.log('issue with item metadata')
                    return
                }

                if (await walletSession.ensureCorrectNetwork() == false) {
                    return
                }

                const web3 = new Web3(walletSession.provider)

                // get marketplace contract
                const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

                // format payment price
                const amount = web3.utils.toWei(listingData.price, "ether")

                // buy nft
                modalController.setContent(
                    <TransactionPendingModalContent modalController={modalController} customColourHex={storeData && storeData.colourHex} />
                )
                modalController.setIsShown(true)

                try {
                    const tx = await marketplace.methods.buyNow(listingData.nftContract, listingData.itemId).send({ from: walletSession.address, value: amount })
                    modalController.setContent(
                        <TransactionPendingModalContent modalController={modalController} customColourHex={storeData && storeData.colourHex} isSuccessful={tx.status} />
                    )
                } catch {
                    modalController.setContent(
                        <TransactionPendingModalContent modalController={modalController} customColourHex={storeData && storeData.colourHex} isSuccessful={false} />
                    )
                }
            }}
        >
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