import React, { useState } from 'react';

export default function SharePage() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Appliance');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Listing created:', { itemName, description, category, selectedFile });
  };

  return (
    <div className="min-h-screen bg-blush flex items-center justify-center p-6">
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
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Sports">Sports</option>
              <option value="Tools">Tools</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Create Listing Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-lg font-bold text-lg text-light bg-crimson hover:bg-fire-brick transition-all hover:shadow-lg"
          >
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
}