import React, { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
// import { useLogout } from "../hooks/useLogout";
// import { useAccountUpdate } from "../hooks/useAccountUpdate";
// import ReceiptForm from "../components/ReceiptForm";
import PopUp from "../components/PopUp";

const AccountSettings: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [displayUserName, setDisplayUserName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailEditable, setEmailEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [emailChange, setEmailChange] = useState("CHANGE");
  const [passwordChange, setPasswordChange] = useState("CHANGE");
//   const { updateAccount } = useAccountUpdate();
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [eventMessage, setEventMessage] = useState("");

//   const { logout } = useLogout();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const storedUserDataString = localStorage.getItem("user");
//         if (!storedUserDataString) return;

//         const storedUserData = JSON.parse(storedUserDataString);
//         const token = storedUserData.token;

//         if (!token) return;

//         const response = await fetch("/api/user/fetch", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.ok) {
//           const userData = await response.json();
//           setDisplayUserName(userData.name);
//           setDisplayEmail(userData.email);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
    
//     fetchUser();
//   }, []);

  const toggleForm = () => setShowForm((prev) => !prev);

//   const handleLogout = () => logout();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setEventMessage("Passwords don't match!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      return;
    }
    try {
      const dataToUpdate: { name?: string; email?: string } = {};
      if (userName && userName !== displayUserName) dataToUpdate.name = userName;
      if (email && email !== displayEmail) dataToUpdate.email = email;
      // await updateAccount(dataToUpdate);

      if (dataToUpdate.name) setDisplayUserName(dataToUpdate.name);
      if (dataToUpdate.email) setDisplayEmail(dataToUpdate.email);

      setEventMessage("Successfully Updated Account");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setEventMessage("Error Updating Account");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      console.error("Error updating account:", error);
    }
  };

  const toggleEmailEdit = () => {
    setEmailChange(emailChange === "CHANGE" ? "CANCEL" : "CHANGE");
    setEmailEditable((prev) => !prev);
  };

  const togglePasswordEdit = () => {
    setPasswordChange(passwordChange === "CHANGE" ? "CANCEL" : "CHANGE");
    setPasswordEditable((prev) => !prev);
  };

  return (
    <section className="min-h-screen bg-blush py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-extrabold text-4xl md:text-5xl text-maroon">Account Settings</h1>
          <button
          //   onClick={handleLogout}
            className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 font-extrabold text-base md:text-lg text-crimson border-2 border-crimson rounded-xl bg-light hover:bg-crimson hover:text-light transition-colors"
            type="button"
          >
            Logout <IoIosLogOut className="text-xl" />
          </button>
        </div>

        {/* Main Container */}
        <div className="bg-light rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Panel - Form Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* General Information */}
              <div>
                <h2 className="font-bold text-2xl md:text-3xl text-maroon mb-3">General Information</h2>
                <p className="font-semibold text-sm md:text-base text-maroon/80 mb-6">
                  Setup your account, edit your profile details, and change your password
                </p>
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full h-12 rounded-lg bg-blush shadow-md border-none px-4 text-base focus:outline-none focus:ring-2 focus:ring-crimson"
                />
              </div>

              {/* Account Information */}
              <div>
                <h2 className="font-bold text-2xl md:text-3xl text-maroon mb-3">Account Information</h2>
                <p className="font-semibold text-sm md:text-base text-maroon/80 mb-6">
                  Change your email and password
                </p>
                
                {/* Email Section */}
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={!emailEditable}
                      className={`w-full h-12 rounded-lg shadow-md border-none px-4 text-base focus:outline-none focus:ring-2 focus:ring-crimson transition-colors ${
                        emailEditable ? "bg-blush text-maroon" : "bg-dark-red text-light placeholder:text-light/70"
                      }`}
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={toggleEmailEdit}
                        className="cursor-pointer font-bold text-sm text-maroon hover:text-crimson transition-colors"
                      >
                        {emailChange}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly={!passwordEditable}
                    className={`w-full h-12 rounded-lg shadow-md border-none px-4 text-base focus:outline-none focus:ring-2 focus:ring-crimson transition-colors ${
                      passwordEditable ? "bg-blush text-maroon" : "bg-dark-red text-light placeholder:text-light/70"
                    }`}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    readOnly={!passwordEditable}
                    className={`w-full h-12 rounded-lg shadow-md border-none px-4 text-base focus:outline-none focus:ring-2 focus:ring-crimson transition-colors ${
                      passwordEditable ? "bg-blush text-maroon" : "bg-dark-red text-light placeholder:text-light/70"
                    }`}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={togglePasswordEdit}
                      className="cursor-pointer font-bold text-sm text-maroon hover:text-crimson transition-colors"
                    >
                      {passwordChange}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Profile Section */}
            <div className="flex flex-col items-center justify-start space-y-6 lg:border-l lg:border-pale-pink lg:pl-8">
              <button
                // onClick={toggleForm}
                className="cursor-pointer w-full max-w-xs h-12 bg-crimson text-light rounded-full shadow-md font-semibold text-base hover:bg-dark-red transition-colors"
                type="button"
              >
                Receipts
              </button>
              {/* {showForm && <ReceiptForm onClose={toggleForm} />} */}
              
              <div className="flex flex-col items-center py-6">
                <MdAccountCircle className="text-crimson text-[12rem] mb-4" />
                <h3 className="text-xl font-semibold text-maroon">{displayUserName || "Guest User"}</h3>
                <p className="text-base text-maroon/70">{displayEmail || "user@example.com"}</p>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleSubmit}
                  className="w-screen max-w-xs h-12 cursor-pointer bg-crimson text-light rounded-full shadow-md font-semibold text-base hover:bg-dark-red transition-colors"
                >
                  Save Changes
                </button>
              </div>  
            </div>
          </div>

          {/* Save Button */}
          
        </div>
      </div>

      {/* Overlay and Popup */}
      {showForm && <div className="fixed inset-0 bg-black/40 z-40" onClick={toggleForm} />}
      {showPopup && <PopUp message={eventMessage} />}
    </section>
  );
};

export default AccountSettings;