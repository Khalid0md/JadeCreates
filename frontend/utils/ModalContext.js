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

    function clearContent() {

    }

    useEffect(async () => {
        if (isShown) {
            (await import('./ScrollLock')).enable()
        } else {
            (await import('./ScrollLock')).disable()
        }
    }, [isShown])

    return (
        <ModalContext.Provider value={{ isShown, setIsShown, setContent, clearContent }}>

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

function Modal2(props) {
    return (
        props.isShown
            ?
            createPortal(
                <div style={MODAL_STYLES} >
                    <div>
                        <h5>Modal</h5>
                        <span>
                            Why this modal has popped up
                        </span>
                    </div>
                    <button onClick={() => {
                        props.setIsShown(false)
                    }}>
                        Close
                    </button>
                </div>,
                document.body,
            )
            : null
    )
}

function Modal(props) {
    return (
        <div>
            <button style={MODAL_STYLES} onClick={() => { props.setIsShown(false) }} className={"flex w-screen h-screen backdrop-blur-none z-40 transition-all duration-75 cursor-default " + (props.isShown ? "backdrop-blur-[4px] bg-mainBlack/30" : "backdrop-blur-none bg-transparent invisible")} />
            <div style={MODAL_STYLES} className={"flex grow w-full items-center justify-center z-50" + (!props.isShown && " invisible")} >
                {props.children}
            </div>
        </div>
    )
}
//<div className="flex grow items-center justify-center z-50 bg-white rounded-2xl shadow-high m-4">
//<div className="flex items-center justify-center text-center bg-white p-4 rounded-2xl shadow-high z-50" >

//<div className={"flex items-center justify-center absolute w-screen h-screen " + (!props.isShown && "invisible")} >
//"fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"

/*
<div className=" bg-blue-500 flex grow items-center justify-center z-50">
                    {props.children}
                </div>
                */