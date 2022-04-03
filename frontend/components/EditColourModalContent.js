import { useState } from "react";
import Web3 from "web3";
import { HiOutlineX } from "react-icons/hi";
import { TwitterPicker } from "react-color";

// reference contracts
import { storeMarketplaceAddress } from "../../backend/config";
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';

import TransactionPendingModalContent from "./TransactionPendingModalContent";

export default function EditColourModalContent({ store, walletSession, modalController }) {

    // form state
    const [colourInHex, setColourInHex] = useState(store.colourHex)

    const onSubmit = async (e) => {
        // prevents form from submitting early
        e.preventDefault();
        
        // perform transaction
        if (walletSession.provider && walletSession.address) {
            const web3 = new Web3(walletSession.provider);
            const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

            modalController.setContent(
                <TransactionPendingModalContent modalController={modalController} />
            )
            modalController.setIsShown(true)

            try {
                const tx = await storeMarketplace.methods.editStoreColour(store, colourInHex).send({ from: walletSession.address })
                modalController.setContent(
                    <TransactionPendingModalContent modalController={modalController} isSuccessful={tx.status} />
                )
            } catch (err) {
                console.log(err)
                modalController.setContent(
                    <TransactionPendingModalContent modalController={modalController} isSuccessful={false} />
                )
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 nunito-font font-black p-8 bg-background shadow-high rounded-2xl">
            <div className="flex w-full text-2xl nunito-font font-black text-mainBlack" >
                <p>
                    Edit Colour
                </p>
                <div className="flex grow px-16" />
                <button className="text-4xl text-mainBlack"
                    onClick={() => {
                        modalController.setIsShown(false);
                    }}>
                    <HiOutlineX />
                </button>
            </div>
            <form className="flex w-full flex-col space-y-4" onSubmit={e => onSubmit(e)}>
                <div className="flex flex-col grow space-y-4 aspect-square flex-shrink-0">
                    <div style={{ backgroundColor: "#" + colourInHex }} className="flex grow rounded-2xl border-2 border-mainBlack/10 transition-colors duration-300" />
                    <div className="flex justify-center">
                        <TwitterPicker triangle={"hide"} onChange={(e) => setColourInHex(e.hex.substring(1))} />
                    </div>
                </div>
                <button type="submit" className="shadow-wide flex grow h-16 text-lg nunito-font text-background whitespace-nowrap bg-mainBlack rounded-xl items-center justify-center font-extrabold" >
                    Update
                </button>
            </form>
        </div>

    )
}