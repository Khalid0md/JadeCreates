import { useState } from "react";
import Web3 from "web3";
import { HiOutlineX } from "react-icons/hi";

// ipfs
import { create as ipfsHttpClient } from 'ipfs-http-client'
const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

// reference contracts
import { storeMarketplaceAddress } from "../../backend/config";
import storeMarketplaceJson from '../../backend/artifacts/contracts/StoreMarketplace.sol/StoreMarketplace.json';
import TransactionPendingModalContent from "./TransactionPendingModalContent";

export default function EditLogoModalContent({ subdomain, walletSession, modalController }) {

    // form state
    const [logoUri, setLogoUri] = useState()

    // error state
    const [imgError, setImgError] = useState(false)

    const onSubmit = async (e) => {
        // prevents form from submitting early
        e.preventDefault();

        // Upload to ipfs (the url)
        uploadFile().then(async (uri) => {

            // do final checks on form inputs
            setImgError(uri == null || uri == undefined)
            if (imgError) { return }

            // perform transaction
            if (uri && walletSession.provider && walletSession.address) {
                const web3 = new Web3(walletSession.provider);
                const storeMarketplace = new web3.eth.Contract(storeMarketplaceJson.abi, storeMarketplaceAddress)

                modalController.setContent(
                    <TransactionPendingModalContent modalController={modalController} />
                )
                modalController.setIsShown(true)

                try {
                    const tx = await storeMarketplace.methods.editStoreLogo(subdomain, uri).send({ from: walletSession.address })
                    modalController.setContent(
                        <TransactionPendingModalContent modalController={modalController} isSuccessful={tx.status} />
                    )
                } catch(err) {
                    console.log(err)
                    modalController.setContent(
                        <TransactionPendingModalContent modalController={modalController} isSuccessful={false} />
                    )
                }
            }
        })
    }

    const [image, setImage] = useState({})
    const [imagePreview, setImagePreview] = useState('')

    const createPreview = (e) => {
        if (e.target.value !== '') {
            setImage(e.target.files[0])
            const src = URL.createObjectURL(e.target.files[0])
            setImagePreview(src)
        } else {
            setImagePreview('')
        }
    }

    const uploadFile = async (e) => {
        try {
            const added = await ipfs.add(image)
            const uri = `https://ipfs.infura.io/ipfs/${added.path}`
            return uri;
            //setImageUri(added.path)
            //setImagePreview(uri)
        } catch (err) {
            console.log('Error uploading the file : ', err)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 nunito-font font-black p-8 bg-background shadow-high rounded-2xl">
            <div className="flex w-full text-2xl nunito-font font-black text-mainBlack" >
                <p>
                    Edit Logo
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
                <div className="flex flex-col grow space-y-2 aspect-square flex-shrink-0">
                    <div className={
                        "flex items-center justify-center grow aspect-square rounded-2xl outline outline-2 shadow-inner border-accentGray overflow-clip"
                        + (imgError ? ' outline-red-400 ' : ' outline-accentGray ')
                    }>
                        {
                            imagePreview
                                ?
                                <img src={imagePreview} className="max-h-14 object-contain p-2 border-2 rounded-xl" />
                                :
                                <label className="flex grow h-screen items-center justify-center text-secondaryGray hover:bg-mainBlack/5 cursor-pointer">
                                    <input type="file" onChange={(e) => createPreview(e)} className="hidden" />
                                    <div className="flex flex-col items-center">
                                        <p className="text-5xl font-light">
                                            +
                                        </p>
                                        <p className="text-lg font-extrabold">
                                            Add Logo
                                        </p>
                                    </div>
                                </label>
                        }
                    </div>
                </div>
                <button type="submit" className="shadow-wide flex grow h-16 text-lg nunito-font text-background whitespace-nowrap bg-mainBlack rounded-xl items-center justify-center font-extrabold" >
                    Update
                </button>
            </form>
        </div>

    )
}