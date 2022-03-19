
import { useWallet } from "../utils/WalletSessionProvider";
import { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router";
import Logo from "../components/logo";
import NavButton from "../components/NavButton";
import { HiOutlineChevronRight } from "react-icons/hi";
import testStoresData from "../testData/testStoresData";
import { DashboardNavBar, TopSpacer } from "../components/NavBar";
import LoadingIndicator from "../components/LoadingIndicator";
import { useWalletConnect } from "../utils/WalletConnectSessionProvider";
import { HiOutlineX } from "react-icons/hi";
import Web3 from "web3";

// reference contracts
import { marketplaceAddress, storeMarketplaceAddress } from "../../backend/config";
import marketplaceJson from '../../backend/artifacts/contracts/Marketplace.sol/Marketplace.json';
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';
//import nfTestJson from '../../backend/artifacts/contracts/NFTest.sol/NFTest.json';
import createERC721Json from '../../backend/artifacts/contracts/CreateERC721.sol/CreateERC721.json';
import { useModal } from "../utils/ModalContext";

// get tatum function
//import { Currency, getNFTsByAddress } from '@tatumio/tatum'

// set page props
export async function getStaticProps(context) {
    return {
        props: {
            mainDomainRoute: true
        }
    };
}

/*
export async function getServerSideProps(context) {

    const nfts = await getNFTsByAddress(
        Currency.ONE,
        '0xFc25b7BE2945Dd578799D15EC5834Baf34BA28e1',
    )
    console.log(nfts)

    return {
        props: {}, // will be passed to the page component as props
    }
}
*/

export default function DashboardLoginHandler() {

    const walletConnectSession = useWalletConnect();
    const router = useRouter();

    function CheckLogin() {
        if (!walletConnectSession.provider) { return }
        if (walletConnectSession.provider.isConnecting) { return }

        if (walletConnectSession.provider.accounts[0]) {
            router.push('/dashboard')
        } else {
            router.push('/')
        }
    }

    useEffect(() => {
        console.log("address changed")
        CheckLogin()
    }, [walletConnectSession.provider && walletConnectSession.provider.accounts])

    useEffect(() => {
        CheckLogin()
    }, [walletConnectSession.provider && walletConnectSession.provider.isConnecting])

    if (walletConnectSession.provider && walletConnectSession.provider.accounts[0]) {
        return (
            <Dashboard walletConnectSession={walletConnectSession} />
        )
    } else {
        return (
            <LoadingIndicator />
        )
    }
}

function Dashboard({ walletConnectSession }) {

    const [selectedStore, setSelectedStore] = useState();  //{ storeName: 'My New Store' })

    return (
        <div className="flex flex-col w-full items-center bg-background h-full space-y-4">
            <TopSpacer />
            <DashboardNavBar />
            <div className="flex flex-col h-full w-full max-w-[90rem] space-y-8 px-6 md:px-14">
                {
                    selectedStore
                        ?
                        <div className="flex space-x-4">
                            <button onClick={() => setSelectedStore()} className="nunito-font font-black text-4xl text-mainBlack/50 hover:text-mainBlack transition-all">
                                Dashboard
                            </button>
                            <p className="text-4xl">
                                <HiOutlineChevronRight />
                            </p>
                            <p className="nunito-font font-black text-4xl">
                                {selectedStore.subdomain ? selectedStore.subdomain : 'Unnamed Store'}
                            </p>
                        </div>
                        :
                        <p className="nunito-font font-black text-4xl">
                            Dashboard
                        </p>
                }
                {
                    selectedStore
                        ?
                        <DashboardStoreContent store={selectedStore} walletSession={walletConnectSession} />
                        :
                        <DashboardMainContent walletConnectSession={walletConnectSession} setSelectedStore={setSelectedStore} />
                }
            </div>
        </div>
    )
}

function DashboardMainContent({ walletConnectSession, setSelectedStore }) {

    const [storeDomains, setStoreDomains] = useState();

    useEffect(() => {
        // init web3 provider
        const web3 = new Web3(walletConnectSession.provider)

        // get store contract
        const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

        storeMarketplace.methods.getSubdomainsFromWalletAddress(walletConnectSession.provider.accounts[0]).call()
            .then((domains) => {
                setStoreDomains(domains)
                console.log(domains)
            })
    }, [])

    return (
        <div className="flex flex-col space-y-8">
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                My Wallet
            </p>
            <WalletOptions walletConnectSession={walletConnectSession} />
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                My Stores
            </p>
            <StoresList storeDomains={storeDomains} setSelectedStore={setSelectedStore} walletConnectSession={walletConnectSession} />
        </div>
    )
}

function WalletOptions({ walletConnectSession }) {

    const [userBalance, setUserBalance] = useState('---');

    useEffect(() => {
        if (walletConnectSession.provider && walletConnectSession.provider.accounts[0]) {
            // init web3 provider
            const web3 = new Web3(walletConnectSession.provider)

            // get balance
            web3.eth.getBalance(walletConnectSession.provider.accounts[0])
                .then((balance) => {
                    const formattedBalance = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(2);
                    setUserBalance(formattedBalance);
                })
        }
    }, [])

    return (
        <div className="flex flex-col h-64 w-full bg-gradient-to-l from-green1/80 to-green2/80 p-8 rounded-2xl shadow-high max-w-[28rem]" >
            <p className="nunito-font font-extrabold text-white/80">
                Address
            </p>
            <p className="numbers-font text-xl font-black text-white pb-4 text-ellipsis overflow-clip">
                {walletConnectSession.provider.accounts[0]}
            </p>
            <p className="nunito-font font-extrabold text-white/80">
                Balance
            </p>
            <div className="flex items-center justify-center h-full bg-white/20 rounded-xl space-x-4 mt-1">
                <div className="flex space-x-2 p-4 mb-0 mr-0 text-white justify-center items-end">
                    <div className="text-6xl numbers-font font-black" >
                        <div className="inline-block h-full align-text-baseline" />
                        {userBalance}
                    </div>
                    <div className="text-3xl nunito-font font-black">
                        <div className="inline-block h-full align-text-baseline" />
                        ONE
                    </div>
                </div>
            </div>
        </div>
    )//bg-gradient-to-bl from-green1/0 to-green2/0
}

function StoresList({ storeDomains, setSelectedStore, walletConnectSession }) {
    return (
        <div>
            {
                storeDomains
                    ?
                    <div className="pb-12">
                        {
                            storeDomains.length > 0
                                ?
                                <div className="pb-12 grid gap-8 store-grid">
                                    {
                                        storeDomains.map(subdomain => {
                                            /*
                                            return (
                                                <SmallStoreDisplay store={store} logoUri={store.logoURI} subdomain={store.subdomain} name={store.name} owner={store.owner} colourInHex={store.colourInHex} setSelectedStore={setSelectedStore} />
                                            )
                                            */
                                            return (
                                                <SmallStoreDisplay subdomain={subdomain} setSelectedStore={setSelectedStore} walletConnectSession={walletConnectSession} />
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className="flex flex-col items-center justify-center w-full h-64 bg-white rounded-2xl space-y-4 px-10">
                                    <p className="nunito-font text-3xl font-extrabold text-center">
                                        Oops, you don't own any stores.
                                    </p>
                                    <p className="nunito-font font-bold text-secondaryGray text-center">
                                        Make sure you are logged in with the correct wallet.
                                    </p>
                                </div>
                        }
                    </div>
                    :
                    <LoadingIndicator />
            }
        </div>
    )
}//<div className="pb-12 grid gap-8 nft-grid scrollbar">
//<div className="flex space-x-8 overflow-x-scroll p-8">

function SmallStoreDisplay({ subdomain, setSelectedStore, walletConnectSession }) {

    // State for store
    const [store, setStore] = useState()

    // Retrieve store metadata
    useEffect(() => {
        // init web3 provider
        const web3 = new Web3(walletConnectSession.provider)

        // get store contract
        const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

        storeMarketplace.methods.getStoreWithSubdomain(subdomain).call()
            .then((store) => {
                setStore(store)
                console.log(store)
            })
    }, [])

    return (
        <div>
            {
                store
                    ?
                    <button className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low hover:shadow-high hover:scale-105 transition-all"
                        onClick={() => {
                            if (store) { setSelectedStore(store); }
                        }}>
                        <div className="flex items-center justify-center p-8 w-[18rem] flex-shrink-0 grow aspect-square rounded-xl border-accentGray overflow-clip">
                            <img src={store.logoURI && store.logoURI} className="min-w-full h-fit rounded-xl" />
                        </div>
                    </button>
                    :
                    <SmallStoreDisplayLoading />
            }
        </div>
    )
}//`https://cloudflare-ipfs.com/ipfs/${logoUri}`

function SmallStoreDisplayOld({ store, logoUri, subdomain, name, owner, colourInHex, setSelectedStore }) {
    return (
        <button className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low hover:shadow-high hover:scale-105 transition-all"
            onClick={() => {
                setSelectedStore(store);
            }}>
            <img src={`https://cloudflare-ipfs.com/ipfs/${logoUri}`} className="min-w-full h-fit rounded-xl" />
        </button>
    )//<img src={imgSrc} className="min-w-full h-fit rounded-xl" />
}

function SmallStoreDisplayLoading() {
    return (
        <div className="flex aspect-square w-full bg-white p-4 rounded-2xl shadow-low transition-all" />
    )
}

function DashboardStoreContent({ store, walletSession }) {
    return (
        <div className="flex flex-col space-y-8">
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                Store Properties
            </p>
            <div className="pb-12 grid gap-8 nft-grid">
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Logo
                    </p>
                    <div className="flex items-center justify-center grow rounded-xl border-accentGray overflow-clip">
                        <img src={store.logoURI && store.logoURI} className="min-w-full h-fit rounded-xl px-2" />
                    </div>
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Logo
                    </button>
                </div>
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Colour
                    </p>
                    <p className="nunito-font text-2xl font-black text-mainBlack">
                        {'#' + (store.colourHex ? store.colourHex : '------')}
                    </p>
                    <div style={{ backgroundColor: "#" + store.colourHex }} className="flex grow rounded-xl mt-4 mb-6 border-2 border-mainBlack/10 shadow-low" />
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Colour
                    </button>
                </div>
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Plan
                    </p>
                    <p className="nunito-font text-4xl font-black text-mainBlack">
                        {store.plan && store.plan}
                    </p>
                    <div className="flex grow" />
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Logo
                    </button>
                </div>
                <div className="flex flex-col aspect-square w-full bg-white shadow-low rounded-2xl p-8">
                    <p className="nunito-font font-extrabold text-mainBlack/50">
                        Subdomain
                    </p>
                    <p className="nunito-font text-4xl font-black text-mainBlack">
                        {store.subdomain && store.subdomain}
                    </p>
                    <div className="flex grow" />
                    <button className="flex items-center justify-center w-full h-14 bg-black rounded-xl nunito-font text-white font-bold">
                        Edit Subdomain
                    </button>
                </div>
            </div>
            <p className="nunito-font text-2xl font-black text-mainBlack/50">
                Listings
            </p>
            <ListingsList store={store} walletSession={walletSession} />
        </div>
    )
}

function ListingsList({ store, walletSession }) {

    // setup modal for adding listing
    const modalController = useModal()

    const mmWalletSession = useWallet();

    return (
        <div>
            {
                true
                    ?
                    <div className="pb-12">
                        {
                            false
                                ?
                                <div className="pb-12 grid gap-8 store-grid">
                                    {
                                        storeDomains.map(subdomain => {
                                            return (
                                                <SmallStoreDisplay subdomain={subdomain} setSelectedStore={setSelectedStore} walletConnectSession={walletConnectSession} />
                                            )
                                        })
                                    }
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
                    :
                    <LoadingIndicator />
            }
        </div>
    )
}

function AddListingModalContent({ store, walletSession, modalController, mmWalletSession }) {

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

            const approveAbi = [{ "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
            const originalAddress = '0x356bbc0bbc37d50a4bcd0062768ccf10b70cf19a'
            const originalContract = new web3.eth.Contract(approveAbi, originalAddress)
            const transaction1 = await originalContract.methods.setApprovalForAll(marketplaceAddress, true).send({ from: walletSession.provider.accounts[0] })

            // get store contract d
            const marketplace = new web3.eth.Contract(marketplaceJson.abi, marketplaceAddress)

            // get listing fee
            const listingFee = await marketplace.methods.getFee().call()

            //parseInt(tokenId, 10),

            //store.subdomain,
            // create listing
            const transaction = await marketplace.methods.createListing(
                store.subdomain,
                3,
                1,
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

                                                const transaction = await marketplace.methods.mint(
                                                    account
                                                ).send({
                                                    from: account
                                                })
                                                console.log(transaction)
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