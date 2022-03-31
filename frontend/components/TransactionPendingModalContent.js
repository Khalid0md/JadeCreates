import CustomColorLoadingIndicator, { SmallCustomColorLoadingIndicator } from "./CustomColorLoadingIndicator";
import { SmallLoadingIndicator } from "./LoadingIndicator";

// icons for success/fail states
import { IoWarning, IoCheckmarkCircle } from 'react-icons/io5';

// x icon
import { HiOutlineX } from "react-icons/hi";

export default function TransactionPendingModalContent({ modalController, isSuccessful, customColourHex }) {
    return (
        <div className="flex grow h-screen items-center justify-center">
            <button 
                className="w-full h-full absolute"
                onClick={() => {
                    if (isSuccessful != undefined) {
                        modalController.setIsShown(false)
                    }
                }}
            />
            <div className="flex grow max-w-[25rem] h-64 flex-col items-center justify-center nunito-font font-black m-4 p-8 bg-background shadow-high rounded-2xl">
                {
                    isSuccessful != undefined
                        ?
                        <div className="flex flex-col grow w-full items-end">
                            <div className="absolute justify-end">
                                <button className="text-4xl text-mainBlack -mt-2 -mr-2"
                                    onClick={() => {
                                        modalController.setIsShown(false);
                                    }}>
                                    <HiOutlineX />
                                </button>
                            </div>
                            {
                                isSuccessful
                                    ?
                                    <div className="flex flex-col w-full grow items-center justify-center space-y-4">
                                        <div className="text-green2">
                                            <IoCheckmarkCircle size={60} />
                                        </div>
                                        <p>
                                            Transaction Success!
                                        </p>
                                    </div>
                                    :
                                    <div className="flex flex-col w-full grow items-center justify-center space-y-2">
                                        <IoWarning size={60} color={'#D63A4A'} />
                                        <p>
                                            Transaction failed
                                        </p>
                                    </div>
                            }
                        </div>
                        :
                        <SmallLoadingIndicator colourHex={customColourHex} />
                }
            </div>
        </div>
    )
}