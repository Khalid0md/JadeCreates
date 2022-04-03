import { useState } from "react"
import { HiOutlineX } from "react-icons/hi"
import Web3 from "web3"

// reference contract
import { marketplaceAddress } from "../../backend/config";
import marketplaceJson from '../../backend/artifacts/contracts/RevisedMarketplace.sol/RevisedMarketplace.json';
import TransactionPendingModalContent from "./TransactionPendingModalContent";

export default function AddListingModalContent({ store, walletSession, modalController }) {

    // states for form
    const [tokenId, setTokenId] = useState()
    const [contractAddress, setContractAddress] = useState()
    const [listingPrice, setListingPrice] = useState()

    // error states
    const [tokenidError, setTokenidError] = useState(false)
    const [contractAddressError, setContractAddressError] = useState(false)
    const [listingPriceError, setListingPriceError] = useState(false)

    /* Functions for testing each form field */
    function checkTokenid(tokenId) {
        if (!tokenId || tokenId.length <= 0) { return true }
        if (!/^[0-9]*$/.test(tokenId)) { return true }

        return false
    }

    function checkContractAddress(address) {
        if (!address || address.length <= 0) { return true }
        if (!Web3.utils.isAddress(address)) { return true }

        return false
    }

    function checkListingPrice(price) {
        if (!price || price.length <= 0) { return true }
        if (!/^[.0-9]*$/.test(price)) { return true }

        return false
    }

    const onSubmit = async (e) => {
        // prevents form from submitting early
        e.preventDefault();

        // check form inputs
        setTokenidError(checkTokenid(tokenId))
        setContractAddressError(checkContractAddress(contractAddress))
        setListingPriceError(checkListingPrice(listingPrice))
        if (tokenidError || contractAddressError || listingPriceError) { return }

        // check parameters and submit request
        if (store && store.subdomain && walletSession.provider && walletSession.address) {
            // init web3 provider
            const web3 = new Web3(walletSession.provider)

            // get abi for required erc721 methods and get original contract
            const erc721Abi = [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
            //onst originalAddress = '0x91416cf432b49b30b486ba0a5f501a69a714c3a0'
            const originalContract = new web3.eth.Contract(erc721Abi, contractAddress)

            // check that user owns token
            try {
                if ((await originalContract.methods.ownerOf(parseInt(tokenId, 10)).call()).toLowerCase() != walletSession.address.toLowerCase()) {
                    // throw some kind of error (temp console log for now)
                    console.log('You dont own this token (check the token id)')
                    return;
                }
            } catch {
                /** TODO: display error in UI */
                console.log('Error: token likely doesnt exist')
                return;
            }

            // show loading modal
            modalController.setContent(
                <TransactionPendingModalContent modalController={modalController} />
            )
            modalController.setIsShown(true)

            try {
                // approve all tokens for this contract (check not already approved first)
                const tx1 = { status: true };
                if (await originalContract.methods.isApprovedForAll(walletSession.address, contractAddress) != true) {
                    tx1 = await originalContract.methods.setApprovalForAll(marketplaceAddress, true).send({ from: walletSession.address })
                }

                // get marketplace contract
                const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

                // create listing
                const tx2 = await marketplace.methods.createListing(
                    store.subdomain,
                    parseInt(tokenId, 10),
                    parseInt(listingPrice, 10),
                    contractAddress
                ).send({
                    from: walletSession.address
                })
                modalController.setContent(
                    <TransactionPendingModalContent modalController={modalController} isSuccessful={tx1.status ? tx2.status : false} />
                )
            } catch {
                modalController.setContent(
                    <TransactionPendingModalContent modalController={modalController} isSuccessful={false} />
                )
            }
        }
    }

    return (
        // <div className="flex items-center justify-center nunito-font font-black p-4 w-full">
        <div className="flex grow max-w-[60rem] flex-col items-center justify-center nunito-font font-black m-4 p-8 bg-background shadow-high rounded-2xl">
            {
                walletSession && walletSession.provider && walletSession.address
                    ?
                    <div className="flex flex-col w-full space-y-4">
                        <div className="flex w-full text-4xl nunito-font font-black text-green1" >
                            <p className="pr-16">
                                Create Listing
                            </p>
                            <div className="flex grow" />
                            <button className="aspect-square h-full text-mainBlack"
                                onClick={() => {
                                    modalController.setIsShown(false);
                                }}>
                                <HiOutlineX />
                            </button>
                        </div>
                        <div className="w-full rounded-2xl">
                            <form className="flex flex-col space-y-4" onSubmit={e => onSubmit(e)}>
                                <div className="flex flex-col space-y-2">
                                    <p className="font-bold text-sm pt-2">
                                        Token ID
                                    </p>
                                    <input
                                        name="tokenId"
                                        type="text"
                                        placeholder="token id"
                                        value={tokenId}
                                        onChange={(e) => {
                                            setTokenidError(checkTokenid(e.target.value))
                                            setTokenId(e.target.value)
                                        }}
                                        className={'form-text-field bg-white' + (tokenidError ? ' outline-2 outline-red-400 ' : ' form-text-field-highlight ')}
                                    />
                                    <p className="font-bold text-sm pt-2">
                                        NFT Contract Address
                                    </p>
                                    <input
                                        name="contractAddress"
                                        type="text"
                                        placeholder="contract address"
                                        value={contractAddress}
                                        onChange={(e) => {
                                            setContractAddressError(checkContractAddress(e.target.value))
                                            setContractAddress(e.target.value)
                                        }}
                                        className={'form-text-field bg-white' + (contractAddressError ? ' outline-2 outline-red-400 ' : ' form-text-field-highlight ')}
                                    />
                                    <p className="font-bold text-sm pt-2">
                                        Listing Price
                                    </p>
                                    <input
                                        name="listingPrice"
                                        type="text"
                                        placeholder="listing price"
                                        value={listingPrice}
                                        onChange={(e) => {
                                            setListingPriceError(checkListingPrice(e.target.value))
                                            setListingPrice(e.target.value)
                                        }}
                                        className={'form-text-field bg-white' + (listingPriceError ? ' outline-2 outline-red-400 ' : ' form-text-field-highlight ')}
                                    />
                                    <div className="flex justify-end space-x-4 pt-2">
                                        <button type="submit" className="flex h-16 px-8 text-lg nunito-font text-background whitespace-nowrap bg-mainBlack rounded-xl items-center justify-center font-extrabold max-w-min" >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <p>
                        Please log in with MetaMask.
                    </p>
            }
        </div>
    )
}