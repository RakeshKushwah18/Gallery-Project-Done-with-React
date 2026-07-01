import React, { useEffect, useState  }  from 'react'
import axios from "axios"
import InfiniteScroll from 'react-infinite-scroll-component';

import { MoveUpRight, Share } from 'lucide-react';

// import from "react";

const App = () => {

  const [userData, setUserData] = useState([])
  const [Index, setIndex] = useState(1)
  const [Loading, setLoading] = useState(false)


  const getData = async () => {
    setLoading (true);
    try {
      const respons = await axios.get(`https://picsum.photos/v2/list?page=${Index}&limit=15`)
    setUserData((prev)=>[...prev,...respons.data])
    }
    catch (error) {
      console.error("Error fetching data:",error);
    }
    finally{
      setLoading(false)
    }
    // console.log(respons.data.author);
    // console.log(userData.download_url);
  }
  useEffect(() => {
    return () => {
       getData()
    }
  }, [])
  useEffect(() => {
    return () => {
       getData()
    }
  }, [Index])
  
 

  return (
    <div className=''>
      <div className='main columns-1 lg:columns-4  p-3 break-inside-avoid  '>
        {userData.map((elem, idx) => (
          <div  key={elem.id}
    className="break-inside-avoid mb-4">

         
          <div className='group transition-opacity  delay-200 duration-800  relative w-full cursor-pointer hover:opacity-85 mb-4 overflow-hidden  '><img className='object-cover rounded-xl ' src={elem.
            download_url
          } alt="" onDoubleClick={elem.url} key={elem.id}  />


            <div className='lg:opacity-0 group-hover:opacity-100'>
              <button onClick={() => { }} className='py-3 px-4 absolute top-1.5 right-2 text-lg  font-semibold rounded-2xl  tracking-wider active:scale-95 cursor-pointer hover:bg-red-600  bg-red-500 text-white'>Save</button>
              
              <div className="bottom px-2 py-1.5 absolute bottom-11.5 left-0 right-0  flex justify-between items-center">
              <a href={elem.url}>
                <button onClick={() => { }} className='py-2 px-4 flex justify-center items-center text-lg  font-semibold rounded-xl   active:scale-95 cursor-pointer hover:bg-gray-200 bg-white'><MoveUpRight size={18} color="#000000" strokeWidth={1.75} /> <h2 className=' ml-2'> Visit site</h2></button></a>
                
                  <Share onClick={() => { }} className='p-3  rounded-xl active:scale-95 cursor-pointer hover:bg-gray-200 bg-white' size={40} color="#000000" strokeWidth={2.4} />
              </div>
            </div>
          <div className='flex items-end justify-end pt-1.5 mr-2  '>
            <h3 className='text-center  font-bold tracking-wider   rounded-xl cursor-pointer hover:bg-gray-200 bg-white  py-2 px-3' >...</h3>
          </div>

          </div>
        </div>
        ))}

       

        {/* onClick={() => { }} className='py-2 px-4  text-lg  font-semibold rounded-2xl active:scale-95 cursor-pointer hover:scale-98 bg-white' */}


      </div>

    
         <div className="buttn flex gap-5 w-full h-20 justify-center">
          <button onClick={() => {if (Index>1) {
            setIndex(Index-1)
            console.log(Index);
            
          }
           }} className='bg-green-500 py-4 px-9 active:scale-95 hover:scale-98 cursor-pointer text-2xl font-medium' >
          Prev
        </button>
        <div className=' p-4 rounded-full font-medium text-5xl m-5'>{Index}</div>
        <button onClick={() => {setIndex(Index+1) ;console.log(Index) }} className='bg-green-500 py-4 px-9 active:scale-95 hover:scale-98 cursor-pointer text-2xl font-medium' >
          Next
        </button>
        </div>
    </div>
    
  )
}

export default App