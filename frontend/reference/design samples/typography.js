import Logo from "../../components/logo"
import NFT from "../../components/nft"

export default function Typography() {
  return (
    <div className=" text-mainBlack bg-background flex flex-col items-center justify-center h-screen space-y-10" >
      <p className="text-xl nunito-font font-black w-full px-16" >
        Logo
      </p>
      <div className="flex w-full">
        <p className="bg-clip-text bg-gradient-to-r from-mainTwo to-mainOne text-transparent text-9xl nunito-font font-black pl-28 glow-main-xs" >
          Your
        </p>
        <p className="text-9xl nunito-font font-black pr-28" >
          Logo
        </p>
      </div>
      <p className="text-xl nunito-font font-black w-full px-16 pt-16" >
        Typography
      </p>
      <div className="flex w-full px-28">
        <div className="w-1/2">
          <div className="flex flex-col items-center max-w-min">
            <p className="text-9xl nunito-font font-black" >
              Aa
            </p>
            <p className="text-2xl nunito-font font-black" >
              Nunito Sans
            </p>
          </div>
          <p className="text-xl nunito-font font-bold pt-10 w-[25rem] text-secondaryGray" >
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
          </p>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col items-center max-w-min">
            <p className="text-9xl numbers-font font-black px-4" >
              01
            </p>
            <p className="text-2xl nunito-font font-black" >
              Bai Jamjuree
            </p>
          </div>
          <p className="flex space-x-8 text-4xl numbers-font font-bold pt-10 w-[25rem] text-secondaryGray italic" >
            <p>
              #0123456789
            </p>
            <p>
              $5.39
            </p>
          </p>
        </div>
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