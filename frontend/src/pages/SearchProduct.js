import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common';
import noResultFoundImage from '../assets/noResultFoundImage.jpg'

const SearchProduct = () => {

  const query = useLocation()
  console.log('Queryyy', query.search);

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProduct = async()=>{

    setLoading(true)

    const response = await fetch(SummaryApi.searchProductt.url+query.search)
    const dataResponse = await response.json()

    setLoading(false)

    setData(dataResponse.data)

  }


  useEffect(()=>{
      fetchProduct()
  }, [query])



  return (
    <div className='container mx-auto p-4'>

      {
        loading && (
          <p className='text-lg text-center font-semibold'>Page Loading...</p>
        )
      }

      <p className='font-semibold text-lg'>Search Results : {data.length}</p>

      {
        !loading && data.length === 0 && (
          
          <div className='bg-white text-center p-40 gap-3 flex flex-col items-center justify-center w-full'>
            <img src={noResultFoundImage} className=' w-60 h-60'/>
            <p className=' text-3xl font-semibold'>Sorry, no results found!</p>
            <p className='text-2xl text-ellipsis text-gray-500'>Please check the spelling or try searching for something else</p>
          </div>
        )
      }

    </div>
  )

}

export default SearchProduct
