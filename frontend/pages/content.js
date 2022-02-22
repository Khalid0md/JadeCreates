import Logo from "../components/logo"
import NFT from "../components/nft"

export default function Content() {
  return (
    <div className=" text-mainBlack bg-background flex flex-col items-center justify-center h-screen space-y-10" >
      <p className="text-xl nunito-font font-black w-full px-16" >
        Color Palette
      </p>
      <div className="flex items-start w-full px-28">
        <div className="flex items-end justify-start w-64 h-64 bg-green1 p-4 nunito-font font-black text-2xl text-background shadow-high border-2 border-secondaryGray rounded-2xl" >
          49DCB1
        </div>
        <div className="ml-4 mr-12 flex items-end justify-start w-64 h-64 bg-green2 p-4 nunito-font font-black text-2xl text-background shadow-high border-2 border-secondaryGray rounded-2xl" >
          49BEAA
        </div>
        <div className="mr-4 flex items-end justify-start w-64 h-64 bg-background p-4 nunito-font font-black text-2xl text-mainBlack shadow-high border-2 border-secondaryGray rounded-2xl" >
          F3F3F4
        </div>
        <div className="mr-4 flex items-end justify-start w-64 h-64 bg-mainBlack p-4 nunito-font font-black text-2xl text-background shadow-high border-2 border-secondaryGray rounded-2xl" >
          040404
        </div>
        <div className="flex items-end justify-start w-64 h-64 bg-secondaryGray p-4 nunito-font font-black text-2xl text-background shadow-high border-2 border-secondaryGray rounded-2xl" >
          9ca3af
        </div>
      </div>
      <p className="text-xl nunito-font font-black w-full px-16 pt-16" >
        Content
      </p>
      <div className="flex space-x-8 w-full px-28" >
        <NFT number={'#9996'} imgSrc={'QmNMjRbzWxPf6eeLC6UiuFecWFmU6Nq18CZutHmD4Gapbm'} />
        <NFT number={'#5047'} imgSrc={'QmfUM2yFGTz4N8x7WNCB5BMnFbU9y2dFHWFWkqFPwWEk19'} />
        <NFT number={'#6045'} imgSrc={'QmcLX1swvjkAXebraQp6pRgfRzDoBtCx7Gyk11F24tH2zT'} isAuction={false} />
      </div>
    </div>
  )
}

/*

#49BEAA
#49DCB1
#456990


#B0FE76
#81E979



#99D5C9
#6C969D

niice
3ABD50


one
4CBA71


three
339178
*/

function ColorBlock({ color }) {
  return (
    <div className="flex items-end justify-start w-64 h-64 bg-blue-500 p-4" >
      {color}
    </div>
  )
}


/*




<p className="inter-font" >
       The dog jumped over the fence.
      </p>
      <p className=" font-extrabold" >
        The dog jumped over the fence.
      </p>



<p className="text-8xl nunito-font font-black" >
        Lorem ipsum dolor, sit amet.
      </p>


*/