import React from 'react'

interface ItemProps {
    itemID: string;
    title: string;
    details: string;
    media: File;
    borrowerName: string;
    borrowerEmail: string;
    creator: string;
    creatorEmail: string;
    createdAt: Date;
    tags: string[];
}

const Receipt: React.FC<ItemProps> = ({ 
    // itemID, 
    title, 
    details, 
    media, 
    borrowerName, 
    borrowerEmail, 
    creator, 
    creatorEmail, 
    createdAt, 
    tags
}) => {
    const createdAtString = createdAt ? new Date(createdAt).toLocaleDateString() : '';
    const imageSrc = `/src/assets/images/${media}`
    
    return (
        <div className="group w-80 bg-light rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-pale-pink hover:border-crimson flex-shrink-0">
            {/* Image Header */}
            <div className="relative w-full h-44 overflow-hidden bg-blush">
                <img 
                    src={imageSrc} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent h-16"></div>
                
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

                {/* Sharer Info */}
                <div className="bg-blush rounded-xl p-3 space-y-1">
                    <p className="text-xs font-bold text-crimson uppercase tracking-wide">Sharer</p>
                    <p className="text-sm font-semibold text-maroon">{creator}</p>
                    <p className="text-xs text-maroon/60">{creatorEmail}</p>
                </div>

                {/* Borrower Info */}
                <div className="bg-pale-pink rounded-xl p-3 space-y-1">
                    <p className="text-xs font-bold text-crimson uppercase tracking-wide">Borrowed by</p>
                    <p className="text-sm font-semibold text-maroon">{borrowerName}</p>
                    <p className="text-xs text-maroon/60">{borrowerEmail}</p>
                </div>

                {/* Category Tag */}
                <div className="flex justify-center pt-2">
                    <span className="px-4 py-1.5 rounded-full bg-crimson/10 text-crimson text-xs font-semibold">
                        {tags}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Receipt