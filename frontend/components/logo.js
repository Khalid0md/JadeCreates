import { useRouter } from "next/router"

export default function Logo() {

    const router = useRouter();

    return (
        <button className="flex items-center justify-center"
            onClick={() => {
                router.push('/');
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