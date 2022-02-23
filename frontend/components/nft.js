export default function NFT({ number, imgSrc, isAuction }) {
    return (
        <div className="aspect-[square] flex flex-col p-4 space-y-4 bg-white rounded-2xl shadow-high flex-shrink-0">
            <img src={`https://cloudflare-ipfs.com/ipfs/${imgSrc}`} className="flex aspect-square flex-shrink-0 rounded-xl" />
            <div className="flex space-x-4" >
                <p className="bg-background text-secondaryGray text-2xl numbers-font italic font-black rounded-xl px-4 py-2 max-w-min">
                    {'#' + number}
                </p>
                {
                    isAuction
                    ?
                    <AuctionButton />
                    :
                    <BuyButton />
                }
            </div>
        </div>
    )
}

function BuyButton() {
    return (
        <button className="bg-mainBlack text-white text-xl nunito-font font-black rounded-xl px-4 py-2 w-full whitespace-nowrap" >
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