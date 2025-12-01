import React, { useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import PopUp from './PopUp';
import { useAuth } from '../context/AuthContext';

interface ItemProps {
    itemID: string
    title: string;
    details: string;
    media: string;
    creator: string;
    createdAt: Date;
    tags: string[];
    requesterID: string
}

const Item: React.FC<ItemProps> = ({ itemID, title, details, media, creator, createdAt, tags }) => {

    const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';
    const { token, user } = useAuth()
    const { requestItem } = useRequest()
    const [showPopup, setShowPopup] = useState(false)
    const [eventMessage, setEventMessage] = useState("")

    const handleDelete = async () => {
        try {
            const response = await fetch("/api/list/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ listId: itemID })
            })
    
            if (response.ok) {
                // Add Success popup
                console.log("Successfully deleted item: ", response)
                setShowPopup(true)
                setEventMessage(`Deleted ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
            } else {
                setEventMessage(`Failed to delete ${title}`)
                setShowPopup(true)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.error("Failed to delete item: ", response)
            }
        } catch (error) {
            setEventMessage(`Failed to delete ${title}`)
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
            console.error("Failed to delete item: ", error)
        }
    }

    const handleBorrow = async () => {
        try {
            await requestItem( itemID, createdAt )
            setShowPopup(true)
            setEventMessage(`Borrowed ${title}`)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
        } catch (error) {
            setEventMessage(`Failed to borrow ${title}`)
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
        }
    }

    const imageSrc = `/src/assets/images/${media}`

    return (
        <div className="m-5 flex flex-col items-center justify-center border border-maroon w-[300px] h-[400px] shadow-2xl overflow-y-auto bg-blush rounded-xl relative">
            {/* Image Container */}
            <div className="mt-[10vh] w-full h-[20vh] flex-shrink-0">
                <img 
                src={imageSrc} 
                alt="" 
                className="w-full h-[150px] object-cover rounded-lg"
                />
            </div>

            {/* Item Info */}
            <div className="flex flex-col items-center w-full h-[35vh] text-center mb-[3vh] px-4">
                <h3 className="font-extrabold text-xl text-maroon mb-2">{title}</h3>
                <p className="font-bold text-crimson mb-[2vh]">Creator: {creator}</p>
                <p className="w-full max-h-[9em] overflow-y-auto text-rose-pink/80 mb-[2vh] leading-relaxed px-2">
                {details}
                </p>
                <p className="text-light-pink/70 mb-[1vh] text-sm">Date: {createdAtString}</p>
                <p className="text-maroon text-sm font-medium">Category: {tags}</p>
            </div>

            {/* Borrow Button */}
            <button 
                className="mb-[2vh] py-3 px-8 rounded-xl bg-bright-red text-light font-bold text-lg hover:bg-maroon transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 w-full mx-4"
                onClick={handleBorrow}
            >
                Borrow
            </button>

            {/* Admin Remove Button */}
            {user && user.role === "admin" && (
                <button 
                className="mb-[1vh] py-3 px-8 rounded-xl bg-scarlet text-light font-bold text-lg hover:bg-dark-scarlet transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 w-full mx-4"
                onClick={handleDelete}
                >
                Remove
                </button>
            )}

            {showPopup && (
                <PopUp message={eventMessage} />
            )}
        </div>
    )
}

export default Item