import React, { useState } from 'react';
import { useCreate } from '../hooks/useCreateList';
import { useFileUpload } from '../hooks/useFileUpload';
import PopUp from '../components/PopUp';
import { useNavigate, useLocation } from 'react-router';

export default function SharePage() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Appliance');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { createList } = useCreate();
  const { uploadFile } = useFileUpload();

  const navigate = useNavigate();
  const location = useLocation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const [showPopup, setShowPopup] = useState(false)
  const [eventMessage, setEventMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!selectedFile) {
          setEventMessage("Please select a file");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);
          return;
      }

      try {
          await uploadFile(selectedFile);

          const isSuccess = await createList(category, itemName, description, selectedFile.name);

          if (isSuccess) {    
            setEventMessage(`Successfully shared ${itemName}. Wait for approval.`);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false)
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            }, 3000);
          }

      } catch (error) {
          setEventMessage(`Failed to share ${itemName}: ${error}`);
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);
          console.error("Failed to share: ", error)
      }
  };

  return (
    <div className="min-h-screen bg-blush flex items-center justify-center p-6">
      {showPopup && (
          <PopUp message={eventMessage} />
      )}
      <div className="w-full max-w-3xl bg-light rounded-2xl shadow-xl border-2 border-pale-pink p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-maroon">
          Share Something!
        </h1>

        <div className="space-y-6">
          {/* Insert Picture and Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Insert Picture */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Insert Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-crimson file:text-light hover:file:bg-fire-brick cursor-pointer"
                />
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label 
                htmlFor="itemName" 
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Name
              </label>
              <input
                id="itemName"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors"
                placeholder="Insert Item Name"
                required
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Details
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors resize-none"
              placeholder="Insert Item Description"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label 
              htmlFor="category" 
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors cursor-pointer"
              required
            >
              <option value="Appliance">Appliance</option>
              <option value="School Supplies">School Supplies</option>
              <option value="Services">Services</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          {/* Create Listing Button */}
          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer py-4 rounded-lg font-bold text-lg text-light bg-crimson hover:bg-fire-brick transition-all hover:shadow-lg"
          >
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
}