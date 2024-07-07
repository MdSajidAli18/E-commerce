import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  return (

    <div>

      <div className='bg-white px-4 py-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all px-3 py-1 rounded-full'  onClick={ ()=>setOpenUploadProduct(true) }>Upload Product</button>
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
