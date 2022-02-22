import { useRouter } from "next/router"
import NavButton from "../components/NavButton";
import { FiSearch } from "react-icons/fi";
import NFT from "../components/nft";
import testNftData from "../testData/testNftData";

export default function Storefront() {
    return (
        <div className="flex flex-col w-full items-center bg-background h-screen">
            <div className="fixed w-full h-16 bg-red-300 z-50" />
            <div className="flex flex-col h-full w-full max-w-[90rem] bg-background space-y-8 px-6 md:px-14">
                
                <SearchBar />
                <SortingItemList />
                <NFTGrid nfts={testNftData} />
            </div>
        </div>
    )
}//<StorefrontNavBar />

function StorefrontNavBar() {
    return (
        <div className="fixed left-0 w-full h-14 space-x-4">
            <CustomLogo />
            <div className="flex grow" />
            <NavButton text={'Button 1'} bgColor={'white'} textColor={'mainBlack'} link={'/storefront'} />
            {/*<NavButton text={'Button 2'} bgColor={'mainBlack'} textColor={'white'} shadow={'high'} link={'/storefront'} />*/}
        </div>
    )
}//flex grow mt-8 md:mt-14 h-14 space-x-4 flex-shrink-0

function CustomLogo() {

    const router = useRouter();

    return (
        <button className="flex items-center justify-center"
            onClick={() => {
                router.push('/storefront');
            }}>

            <p className="text-3xl nunito-font font-black text-mainBlack" >
                Mar
            </p>
            <p className="bg-clip-text bg-gradient-to-l from-green1 to-green2 text-transparent text-3xl nunito-font font-black glow-main-xs" >
                tazo
            </p>
        </button>
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
        <div className="pr-4 pb-12 grid gap-8 overflow-y-scroll nft-grid  scrollbar">
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
    )
}//auto-rows-min auto-cols-min

function NFTGrid2({ nfts, expectedBatchSize = 1 }) {
    return (
        <div className="h-full pb-12 grid gap-8 p-4 overflow-y-scroll ticket-grid auto-rows-min auto-cols-min">
            {
                nfts &&
                nfts.map(ticketsPromise => {

                    // state for tracking promise results
                    const [ticketsMetadata, setTicketsMetadata] = useState()
                    const [fetchFailed, setFetchFailed] = useState(false)

                    // check that the promise exists
                    if (!ticketsPromise) { return }

                    // update state based on promise outcome
                    // successful promise should return an array of metadata objects
                    ticketsPromise
                        .then(metadata => {
                            setTicketsMetadata(metadata)
                        })
                        .catch(() => {
                            setFetchFailed(true)
                        })

                    // display loading skeleton until promise is fulfilled
                    if (!ticketsMetadata && !fetchFailed) { return Array(expectedBatchSize).fill(0).map(_ => { return <TicketCardLoading /> }) }

                    // check that ticketsMetadata mapys nicely
                    if (!Array.isArray(ticketsMetadata)) { return }

                    return ticketsMetadata.map(ticketMetadata => {
                        return (
                            ticketMetadata &&
                            ticketMetadata.section && ticketMetadata.row && ticketMetadata.price &&
                            <TicketCard section={ticketMetadata.section} row={ticketMetadata.row} price={ticketMetadata.price} />
                        )
                    })
                })
            }
        </div>
    )
}