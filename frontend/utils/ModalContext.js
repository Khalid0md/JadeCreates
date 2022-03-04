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

    return (
        <ModalContext.Provider value={{ isShown, setIsShown, setContent, clearContent }}>

            <Modal isShown={isShown} setIsShown={setIsShown} >
                {content}
            </Modal>

            {props.children}
        </ModalContext.Provider>
    )
}

function Modal(props) {
    return (
        <div>
            <button onClick={() => { props.setIsShown(false) }} className={"flex items-center justify-center absolute w-screen h-screen backdrop-blur-none z-40 transition-all duration-300 cursor-default " + (props.isShown ? "backdrop-blur-[4px] bg-gray-500/30" : "backdrop-blur-none bg-transparent invisible")} />
            <div className={ "flex items-center justify-center absolute w-screen h-screen " + (!props.isShown && "invisible") } >
                <div className="flex items-center justify-center text-center bg-white p-4 rounded-2xl shadow-high z-50" >
                    {props.children}
                </div>
            </div>
        </div>
    )
}