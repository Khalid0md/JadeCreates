import { useRouter } from "next/router"
import NavButton from "./NavButton";
import { FiSearch } from "react-icons/fi";
import NFT from "./nft";
import testNftData from "../testData/testNftData";
import { StorefrontNavBar, TopSpacer } from "./NavBar";
import { useModal } from "../utils/ModalContext"
import { useWallet } from "../utils/WalletSessionProvider";
import { useState } from "react";
import NFTCard from "./NFTCard";
import ListingsList from "./ListingsList";
import Web3 from "web3";

// reference store and marketplace contracts
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';
import marketplaceJson from '../../backend/artifacts/contracts/Marketplace.sol/Marketplace.json';
import { marketplaceAddress, storeMarketplaceAddress } from "../../backend/config";

export default function Storefront({ storeData }) {

    const walletSession = useWallet()

    return (
        <div className="flex flex-col w-full items-center bg-background h-full space-y-4">
            <TopSpacer />
            <StorefrontNavBar storeData={storeData} />
            <div className="flex flex-col h-full w-full max-w-[90rem] space-y-8 px-6 md:px-14">
                <SearchBar />
                {/*<SortingItemList />*/}
                {/*<NFTGrid nfts={testNftData} />*/}
                <ListingsList store={storeData} walletSession={walletSession} isStorefrontDisplay={true} />
            </div>
        </div>
    )
}

function SearchBar() {
    return (
        <div className="flex grow h-16 bg-white rounded-2xl items-center px-4 space-x-4 shadow-low flex-shrink-0">
            <FiSearch size="25" className="text-mainBlack" />
            <input type="text" placeholder="Search for products . . ."
                className="flex grow bg-transparent text-lg font-bold outline-none text-accent nunito-font ">
            </input>
        </div>
    )
}

function SortingItemList() {
    return (
        <div className="flex w-full h-10 space-x-4 overflow-x-scroll scrollbar flex-shrink-0">
            <SortingItem text={'Collection 1'} />
            <SortingItem text={'Collection 2'} />
            <SortingItem text={'Collection 3'} />
            <SortingItem text={'Collection 4'} />
            <SortingItem text={'Collection 5'} />
            <SortingItem text={'Collection 1'} />
            <SortingItem text={'Collection 2'} />
            <SortingItem text={'Collection 3'} />
            <SortingItem text={'Collection 4'} />
            <SortingItem text={'Collection 5'} />
        </div>
    )
}

function SortingItem({ text }) {
    return (
        <button className="flex items-center justify-center px-6 h-full bg-white rounded-full shadow-low">
            <p className="nunito-font font-bold whitespace-nowrap">
                {text}
            </p>
        </button>
    )
}

function NFTGrid({ nfts, expectedBatchSize = 1 }) {
    return (
        <div className="pb-12 grid gap-8 nft-grid scrollbar">
            {
                nfts &&
                nfts.map(nftData => {
                    return (
                        nftData &&
                        nftData.number && nftData.imgSrc &&
                        <NFT number={nftData.number} imgSrc={nftData.imgSrc} isAuction={nftData.isAuction} />
                        
                    )
                })
            }
        </div>
    )//{/*<NFTCard listingId={} mmWalletSession={} isStorefrontDisplay={} />*/}
}//auto-rows-min auto-cols-min
//overflow-y-scroll

function NFTGrid2({ nfts, expectedBatchSize = 1 }) {
    return (
        <div className="h-full pb-12 grid gap-8 p-4 overflow-y-scroll ticket-grid auto-rows-min auto-cols-min">
            {
                nfts &&
                nfts.map(nftsPromise => {

                    // state for tracking promise results
                    const [nftsMetadata, setNftsMetadata] = useState()
                    const [fetchFailed, setFetchFailed] = useState(false)

                    // check that the promise exists
                    if (!nftsPromise) { return }

                    // update state based on promise outcome
                    // successful promise should return an array of metadata objects
                    nftsPromise
                        .then(metadata => {
                            setNftsMetadata(metadata)
                        })
                        .catch(() => {
                            setFetchFailed(true)
                        })

                    // display loading skeleton until promise is fulfilled
                    //if (!nftsMetadata && !fetchFailed) { return Array(expectedBatchSize).fill(0).map(_ => { return  }) }

                    // check that ticketsMetadata mapys nicely
                    if (!Array.isArray(nftsMetadata)) { return }

                    return nftsMetadata.map(nftsMetadata => {

                    })
                })
            }
        </div>
    )
}

function ListNFT({ walletSession }) {

    const [nftContract, setNftContract] = useState()
    const [price, setPrice] = useState()
    const [subdomain, setSubdomain] = useState()
    const [tokenId, setTokenId] = useState()


    const onSubmit = async (e) => {
        // prevents form from submitting early
        e.preventDefault();

        if (window.ethereum && uri && walletSession.walletAddress) {
            const web3 = new Web3(window.ethereum);

            const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)
            const listingFee = await marketplace.methods.getFee().send({ from: walletSession.walletAddress })
            const fee = web3.utils.toWei(listingFee, "ether")
            const transaction = await marketplace.methods.createListing(subdomain, tokenId, price, nftContract).send({ from: walletSession.walletAddress, value: fee })
            console.log(transaction)

        }
    }

}