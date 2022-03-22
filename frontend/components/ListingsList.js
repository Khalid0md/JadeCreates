import { useModal } from "../utils/ModalContext";
import { useWallet } from "../utils/WalletSessionProvider";
import { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import Web3 from "web3";
import NFTCard from "./NFTCard";

// reference contract
import { marketplaceAddress, storeMarketplaceAddress } from "../../backend/config";
import marketplaceJson from '../../backend/artifacts/contracts/Marketplace.sol/Marketplace.json';
import CustomColorLoadingIndicator from "./CustomColorLoadingIndicator";

export default function ListingsList({ store, walletSession, isStorefrontDisplay }) {

    // setup modal for adding listing
    const modalController = useModal()

    // metamask
    const mmWalletSession = useWallet();

    // get listings
    const [isLoaded, setIsLoaded] = useState(false);
    const [listingIds, setListingIds] = useState();
    const [provider, setProvider] = useState();
    useEffect(async () => {

        // if logged in, use account as provider
        // otherwise, use standard provider only if on storefront (storefront doesn't require that you be logged in)
        const provider = (walletSession.provider != undefined && walletSession.provider.accounts[0]) ? walletSession.provider : (isStorefrontDisplay && 'https://api.s0.b.hmny.io')
        setProvider(provider);

        // fetch listings data
        if (provider) {
            // init web3 provider
            const web3 = new Web3(provider)

            // get store contract
            const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

            // get listing ids
            setListingIds(await marketplace.methods.getListingIdsBySubdomain(store.subdomain).call())
        }

        setIsLoaded(true)
    }, [])

    return (
        <div>
            {
                isLoaded
                    ?
                    <div className="pb-12">
                        {
                            listingIds && listingIds.length > 0
                                ?
                                <div className="pb-12 grid gap-8 nft-grid">
                                    {
                                        listingIds.map(id => {
                                            return (
                                                <NFTCard listingId={id} mmWalletSession={mmWalletSession} provider={provider} isStorefrontDisplay={isStorefrontDisplay} />
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div>
                                    {
                                        isStorefrontDisplay
                                            ?
                                            <div className="flex flex-col items-center justify-center w-full h-64 bg-white rounded-2xl space-y-4 px-10" >
                                                <p className="nunito-font text-3xl font-extrabold text-center">
                                                    NFTs are on the way!
                                                </p>
                                                <p className="nunito-font font-bold text-secondaryGray text-center">
                                                    Check back soon . . .
                                                </p>
                                            </div>
                                            :
                                            <button
                                                className="flex flex-col items-center justify-center w-full h-64 bg-white rounded-2xl space-y-4 px-10 hover:scale-105 hover:shadow-high transition-all"
                                                onClick={async () => {

                                                    modalController.setContent(
                                                        <AddListingModalContent store={store} walletSession={walletSession} modalController={modalController} mmWalletSession={mmWalletSession} />
                                                    )
                                                    modalController.setIsShown(true);
                                                }}
                                            >
                                                <p className="nunito-font text-3xl font-extrabold text-center">
                                                    No listings yet.
                                                </p>
                                                <p className="nunito-font font-bold text-secondaryGray text-center">
                                                    Click me to add your first listing!
                                                </p>
                                            </button>
                                    }
                                </div>
                        }
                    </div>
                    :
                    <div>
                        {
                            isStorefrontDisplay
                                ?
                                <CustomColorLoadingIndicator colourHex={store.colourHex} />
                                :
                                <LoadingIndicator />
                        }
                    </div>
            }
        </div>
    )
}