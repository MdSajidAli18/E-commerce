import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async()=>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }

  useEffect( ()=>{
    fetchAllProduct()
  }, [])


  return (

    <div>

      <div className='bg-white px-4 py-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all px-3 py-1 rounded-full'  onClick={ ()=>setOpenUploadProduct(true) }>Upload Product</button>
      </div>

      {/** All Product */}
      <div className='flex items-center gap-5 py-4'>
        {
          allProduct.map( (product, index)=>{
            return(
              <AdminProductCard data={product} key={index + "allProduct"}  fetchdata={fetchAllProduct}/>
            )
          })
        }
      </div>


      {/** upload product component */}
      {
        openUploadProduct && (
          <UploadProduct  onClose={ ()=>setOpenUploadProduct(false) }/>
        )
      }

    </div>
  )
}

export default AllProducts
