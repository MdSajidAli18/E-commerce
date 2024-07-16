import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common';
import noResultFoundImage from '../assets/noResultFoundImage.jpg'
import Verticalcardd from '../components/Verticalcardd';

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


      <p className='font-semibold text-lg my-3'>Search Results : {data.length}</p>


      {
        !loading && data.length === 0 && (
          
          <div className="bg-white text-center p-6 mb-10 gap-3 flex flex-col items-center justify-center h-60 sm:h-80 md:h-96 lg:h-120">
            <img src={noResultFoundImage} className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 lg:w-60 lg:h-60" />
            <p className="text-sm sm:text-lg md:text-xl lg:text-3xl font-semibold">Sorry, no results found!</p>
            <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-ellipsis text-gray-500">Please check the spelling or try searching for something else</p>
          </div>

        )
      }


      {
        data.length !== 0 && !loading && (
          <Verticalcardd loading={loading}  data={data}/>
        )
      }


    </div>
  )

}

export default SearchProduct
