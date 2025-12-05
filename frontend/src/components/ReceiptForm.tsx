import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Request from "./Request";
import Receipt from "./Receipt";
import { endpoints } from "../config/config";

interface PostFormProps {
  onClose: () => void;
}

interface RequestProp {
    _id: string;
    list: {
      creator: {
        name: string;
      };
    };
    listCreator: string;
    listInfo: {
      createdAt: string;
      details: string;
      media: File;
      tags: string[];
      title: string;
      _id: string;
    };
    requester: {
      name: string;
      email: string;
      _id: string;
    };
}

interface ReceiptProp {
    _id: string;
    sharer: {
      name: string;
      email: string;
    }
    listInfo: {
      createdAt: string;
      details: string;
      media: File;
      tags: string[];
      title: string;
      _id: string;
    };
    requester: {
      name: string;
      email: string;
      _id: string;
    };
}

const ReceiptForm: React.FC<PostFormProps> = ({ onClose }) => {
  const [requested, setRequested] = useState<any>(null)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const { token, user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const requests = async () => {
      try {

          const payload = {
              userId: user?._id
          };

          const response = await fetch(endpoints.fetchRequests, {
              method: "POST",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }

          const json = await response.json();
          console.log("JSON:", json);

          const requestData = json.map((item: any) => ({
              ...item
          }));
          setRequested(requestData);
          console.log("Request Data: ", requestData)
      } catch (error) {
          console.error("Error fetching requests:", error);
      }
  };
  
  const receipts = async () => {
      try {
          const payload = {
              userId: user?._id
          };

          const response = await fetch(endpoints.fetchReceipts, {
              method: "POST",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }

          const json = await response.json();
          console.log("JSON:", json);

          const receiptData = json.map((item: any) => ({
              ...item
          }));
          setReceiptData(receiptData);
          console.log("Receipt Data: ", receiptData)
      } catch (error) {
          console.error("Error fetching requests:", error);
      }
  };

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  useEffect(() => {
    requests()
    receipts()
  }, [])

  useEffect(() => {
    requests()
    receipts()
    setShouldRefresh(false);
  }, [shouldRefresh])

  return (
    <>
      {/* Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black z-999 transition-opacity duration-300 ease-in-out
          ${isVisible ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/* Receipt Container */}
      <div className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        p-5 z-1000 flex flex-col
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-8 right-16 text-5xl text-maroon hover:text-crimson cursor-pointer transition-colors duration-200 z-10 leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Receipts Content */}
        <div className="bg-light w-[90vw] h-[90vh] rounded-3xl shadow-[0_0_5rem_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
          
          {/* Requests Section */}
          <div className="flex-1 flex flex-col px-8 pt-6 overflow-hidden">
            <h1 className="text-3xl font-extrabold text-maroon text-center mb-4">
              REQUESTS
            </h1>
            <div className="flex flex-wrap gap-4 overflow-y-auto h-[35vh] pb-4 px-2">
              {requested && requested.length > 0 ? (
                requested.map((request: RequestProp) => (
                  <Request
                    key={request._id}
                    itemID={request._id}
                    userID={request.listCreator}
                    title={request.listInfo.title}
                    borrowerName={request.requester.name}
                    borrowerEmail={request.requester.email}
                    createdAt={new Date(request.listInfo.createdAt)}
                    details={request.listInfo.details}
                    media={request.listInfo.media}
                    tags={request.listInfo.tags}
                    onRefresh={() => setShouldRefresh(true)}
                  />
                ))
              ) : (
                <div className="w-full flex items-center justify-center h-32">
                  <p className="text-maroon/60 text-lg">You have no requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-pale-pink mx-8" />

          {/* Receipts Section */}
          <div className="flex-1 flex flex-col px-8 pt-6 pb-8 overflow-hidden">
            <h1 className="text-3xl font-extrabold text-maroon text-center mb-4">
              RECEIPTS
            </h1>
            <div className="flex flex-wrap gap-4 overflow-y-auto h-[35vh] pb-4 px-2">
              {receiptData && receiptData.length > 0 ? (
                receiptData.map((receipt: ReceiptProp) => (
                  <Receipt
                    key={receipt._id}
                    itemID={receipt._id}
                    title={receipt.listInfo.title}
                    creator={receipt.sharer.name}
                    creatorEmail={receipt.sharer.email}
                    borrowerName={receipt.requester.name}
                    borrowerEmail={receipt.requester.email}
                    createdAt={new Date(receipt.listInfo.createdAt)}
                    details={receipt.listInfo.details}
                    media={receipt.listInfo.media}
                    tags={receipt.listInfo.tags}

                  />
                ))
              ) : (
                <div className="w-full flex items-center justify-center h-32">
                  <p className="text-maroon/60 text-lg">You have no receipts</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptForm;