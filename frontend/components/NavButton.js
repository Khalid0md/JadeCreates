import { useRouter } from "next/router"

export default function NavButton({ text, bgColor, textColor, shadow, link, onClick, iconLeft, iconRight }) {

    const router = useRouter();

    return (
        <button className={"flex items-center justify-center px-8 h-14 rounded-2xl flex-shrink-0" + " shadow-" + shadow + " bg-" + bgColor}
            onClick={() => {
                if (onClick) {
                    onClick()
                } else {
                    router.push(link);
                }
            }}>

            {iconLeft && iconLeft}

            <p className={"font-bold nunito-font whitespace-nowrap" + " text-" + textColor} >
                {text}
            </p>
            
            {iconRight && iconRight}
        </button>
    )
}