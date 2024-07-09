import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({
    data,
    fetchdata
}) => {

    const [editProduct, setEditProduct] = useState(false)



    return (

        <div className='bg-white p-4 rounded'>

            <div className='w-40'>
                
                <img src={data?.productImage[0]} width={120} height={120} className='w-fit mx-auto'/>
                <h1>{data.productName}</h1>

                <div>

                    <div>
                        {data.sellingPrice}
                    </div>

                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'  onClick={()=>setEditProduct(true) }>
                        <MdEdit />
                    </div>

                </div>

            </div>

            {
                editProduct && (
                    <AdminEditProduct  productData={data}  onClose={ ()=>setEditProduct(false) }  fetchdata={fetchdata}/>
                )
            }

        </div>

    )
}

export default AdminProductCard
