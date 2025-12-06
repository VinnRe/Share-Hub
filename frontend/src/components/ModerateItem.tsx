import { useState } from 'react';
import PopUp from './PopUp';
import { endpoints } from '../config/config';
import { useAuth } from '../context/AuthContext';

interface ItemProps {
    itemID: string;
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
    onRefresh?: () => void;
}

const ModerateItem: React.FC<ItemProps> = ({ itemID, title, details, media, creator, createdAt, tags, onRefresh }) => {
  const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';
  const [showPopup, setShowPopup] = useState(false)
  const [eventMessage, setEventMessage] = useState("")
  const { token, user } = useAuth();

  const handleApprove = async () => {
      try {
          const response = await fetch(endpoints.approveItem, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({ listId: itemID })
          })
  
          if (response.ok) {
              setShowPopup(true)
              setEventMessage(`Successfully approved item ${title}`)
              onRefresh?.();
              setTimeout(() => {
                  setShowPopup(false)
              }, 5000)
              console.log("Successfully approved item: ", response)
          } else {
              setEventMessage(`Failed to approve ${title}`)
              setShowPopup(true)
              setTimeout(() => {
                  setShowPopup(false)
              }, 5000)
              console.error("Failed to approve item: ", response)
          }
      } catch (error) {
          setEventMessage(`Failed to approve ${title}`)
          setShowPopup(true)
          setTimeout(() => {
              setShowPopup(false)
          }, 5000)
          console.error("Failed to approve item: ", error)
      }
  }

  const handleReject = async () => {
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
              setEventMessage(`Successfully rejected ${title}`)
              setShowPopup(true)
              onRefresh?.();
              setTimeout(() => {
                  setShowPopup(false)
              }, 5000)
              console.log("Successfully reject item: ", response)
          } else {
              setEventMessage(`Failed to reject ${title}`)
              setShowPopup(true)
              setTimeout(() => {
                  setShowPopup(false)
              }, 5000)
              console.error("Failed to reject item: ", response)
          }
      } catch (error) {
          setEventMessage(`Failed to reject ${title}`)
          setShowPopup(true)
          setTimeout(() => {
              setShowPopup(false)
          }, 5000)
          console.error("Failed to reject item: ", error)
      }
  }

  const imageSrc = `/src/assets/images/${media}`
  
  return (
    <div className="m-5 p-2 flex flex-col items-center justify-center border border-maroon w-[300px] h-[400px] shadow-2xl overflow-y-auto bg-blush rounded-xl relative">
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
        <p className="max-h-[9em] overflow-y-auto text-maroon/80 mb-[2vh] leading-relaxed">
          {details}
        </p>
        <p className="text-maroon/70 mb-[1vh] text-sm">Date: {createdAtString}</p>
        <p className="text-maroon text-sm font-medium">Category: {tags}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full px-4">
        <button 
          className="cursor-pointer flex-1 py-3 px-6 rounded-xl bg-crimson text-light font-bold text-lg hover:bg-fire-brick transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          onClick={handleApprove}
        >
          Approve
        </button>
        <button 
          className="cursor-pointer flex-1 py-3 px-6 rounded-xl bg-rose-pink text-dark-red font-bold text-lg hover:bg-light-pink transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>

      {showPopup && (
        <PopUp message={eventMessage} />
      )}
    </div>
  )
}

export default ModerateItem
