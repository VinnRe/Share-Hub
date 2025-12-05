import React, { useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import PopUp from './PopUp';
import { useAuth } from '../context/AuthContext';
import { endpoints } from '../config/config';

interface ItemProps {
    itemID: string
    title: string;
    details: string;
    media: string;
    creator: string;
    createdAt: Date;
    tags: string[];
    requesterID: string
    onRefresh?: () => void;
}

const Item: React.FC<ItemProps> = ({ itemID, title, details, media, creator, createdAt, tags, onRefresh }) => {

    const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';
    const { token, user } = useAuth()
    const { requestItem } = useRequest()
    const [showPopup, setShowPopup] = useState(false)
    const [eventMessage, setEventMessage] = useState("")

    const handleDelete = async () => {
        try {
            const response = await fetch(endpoints.deleteItem, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ listId: itemID })
            })
    
            if (response.ok) {
                console.log("Successfully deleted item: ", response)
                setShowPopup(true)
                setEventMessage(`Deleted ${title}`)
                onRefresh?.();
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
            const isSuccess = await requestItem( itemID, createdAt )
            if (isSuccess) {
                setShowPopup(true)
                setEventMessage(`Borrowed ${title}`)
                onRefresh?.();
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
            }
            else {
                throw new Error("Error borrowing")
            }
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
        <div className="group w-80 bg-light rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-pale-pink hover:border-crimson">
            {/* Image Container */}
            <div className="relative w-full h-48 overflow-hidden bg-blush">
                <img 
                    src={imageSrc} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent h-16"></div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                {/* Title and Creator */}
                <div className="mb-4">
                    <h3 className="font-extrabold text-xl text-maroon mb-2 line-clamp-2 leading-tight">
                        {title}
                    </h3>
                    <p className="font-semibold text-sm text-crimson">
                        by {creator}
                    </p>
                </div>

                {/* Details */}
                <div className="flex-1 mb-4">
                    <p className="text-sm text-maroon/70 line-clamp-3 leading-relaxed">
                        {details}
                    </p>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs mb-4 pb-4 border-b border-pale-pink">
                    <span className="text-maroon/60 font-medium">
                        {createdAtString}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blush text-crimson font-semibold">
                        {tags}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    <button 
                        className="cursor-pointer w-full py-3 px-6 rounded-xl bg-bright-red text-light font-bold text-base hover:bg-maroon transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 transform"
                        onClick={handleBorrow}
                    >
                        Borrow
                    </button>

                    {/* Admin Remove Button */}
                    {user && user.role === "admin" && (
                        <button 
                            className="cursor-pointer w-full py-3 px-6 rounded-xl bg-scarlet text-light font-bold text-base hover:bg-dark-scarlet transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 transform"
                            onClick={handleDelete}
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>

            {showPopup && (
                <PopUp message={eventMessage} />
            )}
        </div>
    )
}

export default Item