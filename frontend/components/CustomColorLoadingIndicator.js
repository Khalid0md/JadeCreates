import { useEffect } from "react"

export default function CustomColorLoadingIndicator({ colourHex }) {
    return (
        <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center z-50">
            <div
                style={{ backgroundColor: '#' + colourHex + 'AA' }}
                className={(!colourHex && " bg-green1 ") + " flex items-center justify-center w-16 h-16 rounded-full animate-ping"}
            >
                <div
                    style={{ backgroundColor: '#' + colourHex }}
                    className={(!colourHex && " bg-green2 ") + " w-12 h-12 rounded-full animate-ping"}
                />
            </div>
        </div>
    )
}

export function SmallCustomColorLoadingIndicator({ colourHex }) {
    return (
        <div
            style={{ backgroundColor: '#' + colourHex + 'AA' }}
            className={(!colourHex && " bg-green1 ") + " flex items-center justify-center w-12 h-12 rounded-full animate-ping"}
        >
            <div
                style={{ backgroundColor: '#' + colourHex }}
                className={(!colourHex && " bg-green2 ") + " w-6 h-6 rounded-full animate-ping"}
            />
        </div>
    )
}