import React, { useState } from "react"

interface PopupProps {
    message: string;
}

const PopUp: React.FC<PopupProps> = ( { message } ) => {
    
    return (
        <div className="fixed flex w-full h-full justify-center">
            <div className="absolute top-[12vh] bg-light p-1.25 rounded-xl shadow-2xl z-1000">
                <h3>{message}</h3>
            </div>
        </div>
    )
}

export default PopUp