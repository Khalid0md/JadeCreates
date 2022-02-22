import { useRouter } from "next/router"

export default function NavButton({ text, bgColor, textColor, shadow, link, onClick }) {

    const router = useRouter();

    return (
        <button className={"flex items-center justify-center px-8 h-full rounded-2xl" + " shadow-" + shadow + " bg-" + bgColor}
            onClick={() => {
                if (onClick) {
                    onClick()
                } else {
                    router.push(link);
                }
            }}>

            <p className={"font-bold nunito-font whitespace-nowrap" + " text-" + textColor} >
                {text}
            </p>
        </button>
    )
}