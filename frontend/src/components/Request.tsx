import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PopUp from './PopUp';
import { endpoints } from '../config/config';

interface ItemProps {
    itemID: string;
    userID: string
    title: string;
    details: string;
    media: File;
    borrowerName: string;
    borrowerEmail: string;
    createdAt: Date;
    tags: string[];
    onRefresh?: () => void;
}

const Request: React.FC<ItemProps> = ({ 
    itemID, 
    userID, 
    title, 
    details, 
    media, 
    borrowerName, 
    borrowerEmail, 
    createdAt, 
    tags,
    onRefresh
}) => {
    const createdAtString = createdAt ? new Date(createdAt).toLocaleDateString() : '';
    const [showPopup, setShowPopup] = useState(false)
    const [eventMessage, setEventMessage] = useState("")

    const { token, user } = useAuth();

    const handleApprove = async () => {
        try {
            const response = await fetch(endpoints.listAccept, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ requestId: itemID })
            })
    
            if (response.ok) {
                setShowPopup(true)
                setEventMessage(`Successfully approved ${title}`)
                onRefresh?.();
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.log("Successfully approved item: ", response)
            } 
        } catch (error) {
            setShowPopup(true)
            setEventMessage(`Failed to approve ${title}`)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
            console.error("Failed to approve item: ", error)
        }
    }

    const handleReject = async () => {
        try {
            console.log(itemID)
            const response = await fetch(endpoints.listReject, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ requestId: itemID })
            })
    
            if (response.ok) {
                setShowPopup(true)
                setEventMessage(`Successfully rejected ${title}`)
                onRefresh?.();
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.log("Successfully rejected item: ", response)
            } else {
                setShowPopup(true)
                setEventMessage(`Failed to reject ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.error("Failed to reject item: ", response)
            }
        } catch (error) {
            setShowPopup(true)
            setEventMessage(`Failed to reject ${title}`)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
            console.error("Failed to reject item: ", error)
        }
    }

    const imageSrc = `/src/assets/images/${media}`

    return user && user._id === userID && (
        <div className="group w-80 bg-light rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-crimson/30 hover:border-crimson flex-shrink-0">
            {/* Image Header */}
            <div className="relative w-full h-44 overflow-hidden bg-blush">
                <img 
                    src={imageSrc} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent h-16"></div>
                
                {/* Pending Badge */}
                <div className="absolute top-3 left-3 bg-crimson px-3 py-1 rounded-full shadow-md">
                    <p className="text-xs font-bold text-light uppercase tracking-wide">Pending</p>
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 right-3 bg-light/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                    <p className="text-xs font-semibold text-maroon">{createdAtString}</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <div className="border-b border-pale-pink pb-3">
                    <h3 className="font-extrabold text-xl text-maroon line-clamp-2 leading-tight">
                        {title}
                    </h3>
                </div>

                {/* Details */}
                <div className="space-y-1">
                    <p className="text-sm text-maroon/70 line-clamp-3 leading-relaxed min-h-[3.75rem]">
                        {details}
                    </p>
                </div>

                {/* Requester Info */}
                <div className="bg-crimson/5 border-l-4 border-crimson rounded-lg p-3 space-y-1">
                    <p className="text-xs font-bold text-crimson uppercase tracking-wide">Requesting to borrow</p>
                    <p className="text-sm font-semibold text-maroon">{borrowerName}</p>
                    <p className="text-xs text-maroon/60">{borrowerEmail}</p>
                </div>

                {/* Category Tag */}
                <div className="flex justify-center">
                    <span className="px-4 py-1.5 rounded-full bg-pale-pink text-crimson text-xs font-semibold">
                        {tags}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <button 
                        className="cursor-pointer flex-1 py-3 px-4 rounded-xl bg-crimson text-light font-bold text-base hover:bg-dark-red transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 transform"
                        onClick={handleApprove}
                    >
                        Approve
                    </button>
                    <button 
                        className="cursor-pointer flex-1 py-3 px-4 rounded-xl bg-maroon text-light font-bold text-base hover:bg-dark-scarlet transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 transform"
                        onClick={handleReject}
                    >
                        Reject
                    </button>
                </div>
            </div>

            {showPopup && (
                <PopUp message={eventMessage} />
            )}
        </div>
    )
}

export default Request