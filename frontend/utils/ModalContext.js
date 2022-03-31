import { createContext, useContext, useEffect } from "react"
import { useState } from "react";
import { createPortal } from "react-dom";

// create context
const ModalContext = createContext()

export function useModal() {
    return useContext(ModalContext)
}

export default function ModalProvider(props) {

    // setup state for modal type
    const [isShown, setIsShown] = useState(false)
    const [content, setContent] = useState()

    useEffect(async () => {
        if (isShown) {
            (await import('./ScrollLock')).enable()
        } else {
            (await import('./ScrollLock')).disable()
        }
    }, [isShown])

    return (
        <ModalContext.Provider value={{ isShown, setIsShown, setContent,  }}>
            <Modal isShown={isShown} setIsShown={setIsShown} >
                {content}
            </Modal>

            {props.children}
        </ModalContext.Provider>
    )
}

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000
}

function Modal(props) {
    if (!props.isShown) { return null }

    const [shown, setShown] = useState()
    useEffect(() => {
        setShown(props.isShown)
    }, [props.isShown])

    return (
        <div>
            <button style={MODAL_STYLES} onClick={() => { props.setIsShown(false) }} className={"flex w-screen h-screen backdrop-blur-none z-40 transition-all duration-500 cursor-default " + (shown ? "backdrop-blur-[4px] bg-mainBlack/30" : "backdrop-blur-none bg-transparent invisible")} />
            <div style={MODAL_STYLES} className={"flex grow w-full items-center justify-center z-50" + (!shown && " invisible")} >
                {props.children}
            </div>
        </div>
    )
}