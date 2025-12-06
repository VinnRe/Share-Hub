import { useEffect, useState } from "react";
import ModerateItem from "../components/ModerateItem"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { endpoints } from "../config/config";

interface ListedProps {
    _id: string;
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
    ownerName: string;
}

const ModeratePage = () => {
  const [listed, setListed] = useState<any>(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [shouldRefresh, setShouldRefresh] = useState(false)

  const fetchListed = async () => {
        const response = await fetch(endpoints.fetchUnapproved)
        const json = await response.json()

        console.log(json)
    
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

    useEffect(() => {
        fetchListed()
        return
    }, [])

    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/")
        }
    }, [user, navigate])

    useEffect(() => {
      if(shouldRefresh) {
        fetchListed()
        setShouldRefresh(false)
      }
    }, [shouldRefresh])

  return (
    <main className="bg-light flex flex-col items-center justify-center">
      <section className="w-full max-w-6xl">
        <h1 className="text-4xl text-maroon font-bold text-center mb-8 mt-8">MODERATE</h1>      
        <div className="border-solid border-2 border-dark-red flex min-h-[500px] bg-light-pink shadow-2xl">
            {listed ? (
                listed.map((list: ListedProps) => (
                  <ModerateItem
                    key={list._id}
                    itemID={list._id}
                    title={list.title}
                    creator={list.ownerName}
                    createdAt={new Date(list.createdAt)}
                    details={list.details}
                    media={list.media}
                    tags={list.tags}
                    onRefresh={() => setShouldRefresh(true)}
                  />
                ))
              ) : (
                <div className='text-5xl font-bold text-dark-red text-center w-full h-full flex items-center justify-center'>
                  <p>LOADING ITEMS...</p>
                </div>
            )}
        </div>
      </section>
    </main>
  )
}

export default ModeratePage
