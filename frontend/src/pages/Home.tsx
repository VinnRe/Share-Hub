import React, { useEffect, useState } from 'react'
import { FaBookOpen } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa6";
import { MdDevices, MdOutlineDensitySmall } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';
import { useListedSearch } from '../hooks/useListedSearch';
import { useFilter } from '../hooks/useFilter';
import Item from '../components/Item';
import { endpoints } from '../config/config';

interface ListedProps {
    _id: string;
    title: string;
    details: string;
    media: string;
    creator: string;
    createdAt: Date;
    tags: string[];
    ownerName: string;
}

const Home = () => {
    const [search, setSearch] = useState('')
    const [listed, setListed] = useState<any>(null)
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const { searchListed, searchResults, setIsLoadingS } = useListedSearch()
    const { filterItems, setIsLoading, filteredItems } = useFilter()
    const { user } = useAuth();

    const filterResources = async (filterValue: any) => {
        const filtered = filterValue;
    
        console.log(filtered);
        if (filtered) {
          const listedData = filtered.map((item: any) => {
            return {
              ...item.listData,
              ownerName: item.ownerInfo.name,
            };
          });
          setListed(listedData);
          return listedData;
        } else {
          setListed(null);
          return null;
        }
      };

    const fetchListed = async () => {
        const response = await fetch(endpoints.fetchApproved)
        const json = await response.json()
    
        console.log(json)
        if (response.ok) {
          const listingData = json.map((item: any) => {
            console.log(item)
            return {
                ...item.listData,
                ownerName: item.ownerInfo.name
            }
          })
          setListed(listingData)
          console.log(listingData)
        }
    }

    const handleSearch = async () => {
        setIsLoadingS(true)
        
        try {
            if (search === "") {
                fetchListed();
            } else {
                await searchListed(search);
                // const searched = await searchResults;
                console.log("SEARCH RESULTS:", searchResults)
                filterResources(searchResults);
            }
        } catch (error) {
            console.error("Error searching for resources:", error);
        } finally {
            setIsLoadingS(false)
        }
    }

    const handleCategoryFilter = async (tags: string[]) => {
        setIsLoading(true);
        await filterItems(tags.join(","));
        filterResources(filteredItems)
        setIsLoading(false);
    }

    useEffect(() => {
        fetchListed()
        return
    }, [])

    useEffect(() => {
      if(shouldRefresh) {
        fetchListed();
        setShouldRefresh(false);
      }
    }, [shouldRefresh])

    useEffect(() => {
        if (search !== "") {
            handleSearch();
        } else {
            fetchListed();
        }
    }, [search])
    
    useEffect(() => {
        filterResources(searchResults);
    }, [searchResults])

    useEffect(() => {
        filterResources(filteredItems);
    }, [filteredItems])

  return (
    <main className="w-full h-full bg-light">
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
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                
                {/* Search Button */}
                <button 
                  onClick={handleSearch}
                  className='absolute right-2 px-8 py-3 bg-red hover:bg-dark-red cursor-pointer text-white font-semibold rounded-full transition-colors duration-300 shadow-md hover:shadow-lg'
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-end text-right'>
          <text className='text-9xl font-bold text-red'>SHARE</text>
          <text className='text-9xl font-bold text-maroon'>HUB</text>
        </div>
      </section>
      <section className="content">
        <div className="flex flex-col">
          <div className="text-center w-full text-2xl mb-8">
            <h2 className='text-maroon text-4xl font-semibold'>Categories</h2>
          </div>
          <div className="flex items-center justify-evenly m-2.5 text-center">
            <button
              className="group border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["Appliance"])}
            >
              <MdDevices fontSize="5rem" className="mt-1 text-dark-red group-hover:text-white category-icon" />
              <p className="text-maroon group-hover:text-white text-base font-extrabold">Appliances</p>
            </button>
            <button
              className="group border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["School Supplies"])}
            >
              <FaBookOpen fontSize="5rem" className="mt-1 text-dark-red group-hover:text-white category-icon" />
              <p className="text-maroon group-hover:text-white text-base font-extrabold">School Supplies</p>
            </button>
            <button
              className="group border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["Service"])}
            >
              <FaCarSide fontSize="5rem" className="mt-1 text-dark-red group-hover:text-white category-icon" />
              <p className="text-maroon group-hover:text-white text-base font-extrabold">Services</p>
            </button>
            <button
              className="group border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleCategoryFilter(["Clothing"])}
            >
              <GiClothes fontSize="5rem" className="mt-1 text-dark-red group-hover:text-white category-icon" />
              <p className="text-maroon group-hover:text-white text-base font-extrabold">Clothing</p>
            </button>
            <button className="group border-4 rounded-xl w-[12vw] h-[20vh] border-crimson shadow-[0_0.3rem_1rem_rgba(0,0,0,0.4)] text-dark-red hover:bg-cherry-red hover:text-white cursor-pointer flex flex-col items-center justify-center"
              onClick={fetchListed}
            >
              <MdOutlineDensitySmall fontSize="5rem" className="mt-1 text-dark-red group-hover:text-white category-icon" />
              <p className="text-maroon group-hover:text-white text-base font-extrabold">All Categories</p>
            </button>
          </div>
        </div>

          {/* FOR YOU */}
          <div className="mt-8 mb-8">
              <div className="text-center">
                  <h2 className='text-maroon text-4xl font-semibold'>For You</h2>
              </div>
              <div className="flex flex-wrap gap-6 border-solid border-dark-red border-3 mx-8 p-5">
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
                              requesterID={user?._id}
                              onRefresh={() => setShouldRefresh(true)}
                          />
                      ))
                  ) : (
                      <div className="w-screen h-100 text-center flex items-center justify-center">
                          <h1 className='text-2xl text-maroon font-bold'>NO ITEMS ARE BEING SHARED CURRENTLY</h1>
                      </div>
                  )
                  }
                  {!listed && <p className='text-2xl text-maroon font-bold'>Loading resources...</p>}
              </div>
          </div>
      </section>
    </main>
  )
}

export default Home 
