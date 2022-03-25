import { useState } from "react"
import { HiOutlineX } from "react-icons/hi"
import Web3 from "web3"

// reference contract
import { marketplaceAddress } from "../../backend/config";
import marketplaceJson from '../../backend/artifacts/contracts/Marketplace.sol/Marketplace.json';

export default function AddListingModalContent({ store, walletSession, modalController, mmWalletSession }) {

    // states for form
    const [tokenId, setTokenId] = useState()
    const [contractAddress, setContractAddress] = useState()
    const [listingPrice, setListingPrice] = useState()

    //0x52a47d8280af28e77e2981e2a0ca0cfc41dfd1f6
    //0x1548c6227cbd78e51eb0a679c1f329b9a5a99beb

    /*
    string memory subdomain,
    uint256 tokenId,
    uint256 priceIn,
    address nftContract
    */

    const onSubmit = async (e) => {
        // prevents form from submitting early
        e.preventDefault();

        // check parameters and submit request
        if (store && store.subdomain && walletSession.provider && walletSession.provider.accounts[0]) {
            // init web3 provider
            //const web3 = new Web3(walletSession.provider)
            if (!mmWalletSession.walletAddress) {
                await mmWalletSession.connectWallet();
            }
            const web3 = new Web3(window.ethereum)

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
                if (await originalContract.methods.ownerOf(parseInt(tokenId, 10)).call() != walletSession.provider.accounts[0]) {
                    // throw some kind of error (temp console log for now)
                    console.log('You dont own this token (check the token id)')
                    return;
                }
            } catch {
                console.log('Error: token likely doesnt exist')
                return;
            }

            // approve all tokens for this contract (check not already approved first)

            if (await originalContract.methods.isApprovedForAll(walletSession.provider.accounts[0], contractAddress) != true) {
                await originalContract.methods.setApprovalForAll(marketplaceAddress, true).send({ from: walletSession.provider.accounts[0] })
            }

            // get marketplace contract
            const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

            // get listing fee
            const listingFee = await marketplace.methods.getFee().call()

            // create listing
            await marketplace.methods.createListing(
                store.subdomain,
                parseInt(tokenId, 10),
                parseInt(listingPrice, 10),
                contractAddress
            ).send({
                from: walletSession.provider.accounts[0],
                value: listingFee
            })
        }
    }

    return (
        // <div className="flex items-center justify-center nunito-font font-black p-4 w-full">
        <div className="flex grow max-w-[60rem] flex-col items-center justify-center nunito-font font-black m-4 p-8 bg-background shadow-high rounded-2xl">
            {
                //metamask: walletSession && walletSession.walletAddress
                walletSession && walletSession.provider && walletSession.provider.accounts[0]
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
                                <div className="flex flex-col space-y-4">
                                    <input
                                        name="tokenId"
                                        type="text"
                                        placeholder="token id"
                                        value={tokenId}
                                        onChange={(e) => setTokenId(e.target.value)}
                                        className="form-text-field bg-white"
                                    />
                                    <input
                                        name="contractAddress"
                                        type="text"
                                        placeholder="contract address"
                                        value={contractAddress}
                                        onChange={(e) => setContractAddress(e.target.value)}
                                        className="form-text-field bg-white"
                                    />
                                    <input
                                        name="listingPrice"
                                        type="text"
                                        placeholder="listing price"
                                        value={listingPrice}
                                        onChange={(e) => setListingPrice(e.target.value)}
                                        className="form-text-field bg-white"
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            className="flex h-16 px-8 text-lg nunito-font text-background whitespace-nowrap bg-mainBlack rounded-xl items-center justify-center font-extrabold max-w-min"
                                            onClick={async (e) => {
                                                //prevent form submit
                                                e.preventDefault()

                                                // mint hrc721 token to metamask address
                                                const address = '0x91416CF432B49b30b486BA0a5f501a69a714c3A0';
                                                if (!mmWalletSession.walletAddress) {
                                                    await mmWalletSession.connectWallet();
                                                }
                                                const web3 = new Web3(window.ethereum)
                                                const marketplace = new web3.eth.Contract(createERC721Json.abi, address)

                                                // get metamask accounts
                                                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                                                const account = accounts[0];

                                                /*
                                                const transaction = await marketplace.methods.mint(
                                                    account
                                                ).send({
                                                    from: account
                                                })
                                                console.log(transaction)
                                                */
                                            }}
                                        >
                                            Mint HRC721
                                        </button>
                                        <button type="submit" fill={true} className="flex h-16 px-8 text-lg nunito-font text-background whitespace-nowrap bg-mainBlack rounded-xl items-center justify-center font-extrabold max-w-min" >
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