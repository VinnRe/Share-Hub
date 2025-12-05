import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

interface PopupProps {
    message: string;
}

const PopUp: React.FC<PopupProps> = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Trigger animation after mount
        setTimeout(() => setIsVisible(true), 10)
    }, [])

    // Determine if message is success or error based on keywords
    const isSuccess = message.toLowerCase().includes('success') || 
                     message.toLowerCase().includes('borrowed') ||
                     message.toLowerCase().includes('updated')
    const isError = message.toLowerCase().includes('failed') || 
                   message.toLowerCase().includes('error') ||
                   message.toLowerCase().includes("don't match")
    const isDelete = message.toLowerCase().includes('deleted') || 
                    message.toLowerCase().includes('removed')
    
    return createPortal(
        <div className="fixed inset-0 flex h-1/4 justify-center z-[9999] pointer-events-none">
            <div 
                className={`
                    bg-light p-6 rounded-2xl shadow-2xl max-w-md mx-4 w-full
                    border-2 pointer-events-auto
                    transform transition-all duration-300 ease-out
                    ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}
                    ${isSuccess ? 'border-crimson' : ''}
                    ${isError ? 'border-scarlet' : ''}
                    ${isDelete ? 'border-dark-red' : ''}
                    ${!isSuccess && !isError && !isDelete ? 'border-maroon' : ''}
                `}
            >
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                        ${isSuccess ? 'bg-crimson/10' : ''}
                        ${isError ? 'bg-scarlet/10' : ''}
                        ${isDelete ? 'bg-dark-red/10' : ''}
                        ${!isSuccess && !isError && !isDelete ? 'bg-maroon/10' : ''}
                    `}>
                        {isSuccess && (
                            <svg className="w-6 h-6 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {isError && (
                            <svg className="w-6 h-6 text-scarlet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        {isDelete && (
                            <svg className="w-6 h-6 text-dark-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        )}
                        {!isSuccess && !isError && !isDelete && (
                            <svg className="w-6 h-6 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>

                    {/* Message */}
                    <div className="flex-1">
                        <h3 className={`
                            text-lg font-semibold leading-tight
                            ${isSuccess ? 'text-crimson' : ''}
                            ${isError ? 'text-scarlet' : ''}
                            ${isDelete ? 'text-dark-red' : ''}
                            ${!isSuccess && !isError && !isDelete ? 'text-maroon' : ''}
                        `}>
                            {message}
                        </h3>
                    </div>
                </div>

                {/* Progress bar animation */}
                <div className="mt-4 h-1 bg-pale-pink rounded-full overflow-hidden">
                    <div 
                        className={`
                            h-full rounded-full animate-[shrink_5s_linear_forwards]
                            ${isSuccess ? 'bg-crimson' : ''}
                            ${isError ? 'bg-scarlet' : ''}
                            ${isDelete ? 'bg-dark-red' : ''}
                            ${!isSuccess && !isError && !isDelete ? 'bg-maroon' : ''}
                        `}
                        style={{
                            animation: 'shrink 5s linear forwards'
                        }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes shrink {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0%;
                    }
                }
            `}</style>
        </div>,
        document.body
    )
}

export default PopUp