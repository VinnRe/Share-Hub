import React from 'react'
import LogoBig from './assets/logo_big.png'
import { FaTools } from "react-icons/fa";
import { FaMagnifyingGlass, FaCarSide } from "react-icons/fa6";
import { MdDevices, MdOutlineDensitySmall } from "react-icons/md";
import { GiClothes } from "react-icons/gi";

const App = () => {

  const handleCategoryFilter = async (tags: string[]) => {
      // setIsLoading(true);
      // await filterItems(tags.join(","));
      // filterResources(filteredItems)
      // setIsLoading(false);
  }
  return (
    <main className="w-full h-full bg-light">
      {/* NavBar */}
      {/* Hero Section */}
      <section className='flex flex-row items-center justify-between container mx-auto px-20 h-screen'>
        <div>
          <div className='flex flex-col'>
            <text className='text-[35px] font-semibold text-dark-red'>Discover the joy of sharing</text>
            <text className='text-[35px] font-semibold text-dark-red'>Borrow or Share from a variety of items</text>
            <text className='text-[20px] text-dark-red font-medium'>Share More, Own Less!</text>
          </div>
          {/* Search Bar here */}
          <div className='mt-8 w-full max-w-2xl'>
            <div className='relative group'>
              {/* Search Input Container */}
              <div className='relative flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-crimson'>
                {/* Search Icon */}
                <div className='absolute left-6 pointer-events-none'>
                  <svg 
                    className='w-6 h-6 text-crimson' 
                    fill='none' 
                    stroke='currentColor' 
                    viewBox='0 0 24 24'
                  >
                    <path 
                      strokeLinecap='round' 
                      strokeLinejoin='round' 
                      strokeWidth={2} 
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' 
                    />
                  </svg>
                </div>
                
                {/* Input Field */}
                <input
                  type='text'
                  placeholder='Search for items to borrow or share...'
                  className='w-full py-4 pl-16 pr-32 text-lg text-dark placeholder-gray-400 bg-transparent rounded-full focus:outline-none'
                />
                
                {/* Search Button */}
                <button className='absolute right-2 px-8 py-3 bg-bright-red hover:bg-red cursor-pointer text-white font-semibold rounded-full transition-colors duration-300 shadow-md hover:shadow-lg'>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-end text-right'>
          <text className='text-9xl font-bold text-maroon'>SHARE</text>
          <text className='text-9xl font-bold text-red'>HUB</text>
        </div>
      </section>
      <section className="content">
        <div className="flex flex-col">
          <div className="text-center w-full text-2xl mb-8">
            <h2 className='text-maroon text-4xl font-semibold'>Categories</h2>
          </div>
          <div className="flex items-center justify-evenly m-2.5 text-center">
            <button
              className="border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["Appliance"])}
            >
              <MdDevices fontSize="5rem" className="mt-1 text-dark-red hover:text-white category-icon" />
              <p className="text-maroon text-base font-extrabold">Appliances</p>
            </button>
            <button
              className="border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["Tool"])}
            >
              <FaTools fontSize="5rem" className="mt-1 text-dark-red hover:text-white category-icon" />
              <p className="text-maroon text-base font-extrabold">Tools</p>
            </button>
            <button
              className="border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["Service"])}
            >
              <FaCarSide fontSize="5rem" className="mt-1 text-dark-red hover:text-white category-icon" />
              <p className="text-maroon text-base font-extrabold">Services</p>
            </button>
            <button
              className="border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["Clothing"])}
            >
              <GiClothes fontSize="5rem" className="mt-1 text-dark-red hover:text-white category-icon" />
              <p className="text-maroon text-base font-extrabold">Clothing</p>
            </button>
            <button className="border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center">
              <MdOutlineDensitySmall fontSize="5rem" className="mt-1 text-dark-red hover:text-white category-icon" />
              <p className="text-maroon text-base font-extrabold">All Categories</p>
            </button>
          </div>
        </div>

          {/* FOR YOU */}
          <div className="for-you">
              <div className="for-you-header">
                  <h2>For You</h2>
              </div>
              {/* <div className="listings">
                  {listed && listed.length > 0 ? (
                      listed.map((list: ListedProps) => (
                          <Item
                              key={list._id}
                              itemID={list._id}
                              title={list.title}
                              creator={list.ownerName}
                              createdAt={new Date(list.createdAt)}
                              details={list.details}
                              media={list.media}
                              tags={list.tags}
                              requesterID={user.data._id}
                          />
                      ))
                  ) : (
                      <div className="no-items-container">
                          <h1 className='no-items'>NO ITEMS ARE BEING SHARED CURRENTLY</h1>
                      </div>
                  )
                  }
                  {!listed && <p className='loading-items'>Loading resources...</p>}
              </div> */}
          </div>
      </section>
    </main>
  )
}

export default App
