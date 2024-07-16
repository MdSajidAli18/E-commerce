import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import Context from '../context';
import addToCart from '../helpers/addToCart';


const ProductDetails = () => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })

  const params = useParams()

  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)

  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({x: 0, y: 0})

  const [zoomImage, setZoomImage] = useState(false)

  console.log("Producttt Id", params);


  const fetchProductDetails = async()=>{

    setLoading(true)

    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })

    setLoading(false)

    const dataResponse = await response.json()

    setData(dataResponse?.data)

    setActiveImage(dataResponse?.data?.productImage[0])

  }

  console.log("Producttt detailsss", data);



  const { fetchUserCart} = useContext(Context)
  const handleAddToCart = async(e, id)=>{
      await addToCart(e, id)
      fetchUserCart()
  }



  useEffect(()=>{
    fetchProductDetails()
  }, [])


  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }


  const handleZoomImage = useCallback((e)=>{

    setZoomImage(true)

    const {left, top, width, height} = e.target.getBoundingClientRect()
    console.log("Coordinates", left, top, width, height);

    const x = (e.clientX - left)/width
    const y = (e.clientY - top)/height

    setZoomImageCoordinate({x, y})

  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }




  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>


        {/** Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>

            <img src={activeImage}  className='h-full w-full object-scale-down mix-blend-multiply'  onMouseMove={handleZoomImage}  onMouseLeave={handleLeaveImageZoom}/>

            {/** The product image zooms in on hovering. */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[500px] bg-slate-200 p-1 -right-[510px] top-0 bottom-0 overflow-hidden'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-150'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x*100}% ${zoomImageCoordinate.y*100}%`
                    }}
                    >
                    
                  </div>
              </div>
              )
            }

          </div>

          <div className='h-full'>
            {
              loading? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map(el=>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse'  key={"loadingImage"}>
                          
                        </div>
                      )
                    })
                  }
                </div>
              )
              :
              (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index)=>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded p-1'  key={imgURL}>
                          <img src={imgURL}  className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer hover:scale-105'  onMouseEnter={ ()=>handleMouseEnterProduct(imgURL) }  onClick={ ()=>handleMouseEnterProduct(imgURL) }/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>

        </div>


        {/** Product details */}
        {
          loading? (
            <div className='flex flex-col gap-3'>

              <p className='bg-slate-200 animate-pulse rounded-full h-6 w-20 inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-36 rounded-full'></h2>
              <p className=' capitalize text-slate-500 bg-slate-200 animate-pulse h-6 w-24 rounded-full'></p>
              <p className=' text-xl bg-slate-200 animate-pulse h-6 w-full rounded-full '></p>

              <div className=' bg-slate-200 animate-pulse h-6 w-30 rounded-full '>
                
              </div>

              <div className='flex items-center gap-2 my-1'>
                <p className='text-2xl lg:text-3xl font-medium'></p>
                <p className='text-slate-500 lg:text-lg line-through'></p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className=' rounded-full  bg-slate-200 animate-pulse h-6 w-28'></button>
                <button className=' rounded-full  bg-slate-200 animate-pulse h-6 w-28'></button>
              </div>

            </div>
          )
          :
          (
            <div className='flex flex-col gap-3'>

              <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit text-lg'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className=' capitalize text-slate-500'>{data?.category}</p>
              <p className=' text-xl '>{data?.description}</p>

              <div className='text-red-600 text-lg flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>

              <div className='flex items-center gap-2 my-1'>
                <p className='text-2xl lg:text-3xl font-medium'>{displayINRCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-500 lg:text-lg line-through'>{displayINRCurrency(data?.price)}</p>
                <div className='flex flex-row font-medium text-green-700'>
                <p className=' ml-1'>{Math.round(((data?.price - data?.sellingPrice)/data?.price)*100)+'%'}</p>                                 
                <p className='ml-1'>Off</p>
                </div>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 rounded text-red-600 font-medium px-3 py-1 min-w-[120px] hover:bg-red-600 hover:text-white  transition'  onClick={ (e)=>handleAddToCart(e, data?._id) }>Add to Cart</button>
                <button className='border-2 border-red-600 rounded font-medium px-3 py-1 min-w-[120px] bg-red-600 text-white hover:bg-white hover:text-red-600  transition'>Buy Now</button>
              </div>

            </div>
          )
        }


      </div>


      {/** Display similar products at the bottom of the page. */}
      {
        data?.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Similar products"}/>
        )
      }

    </div>
  )

}



export default ProductDetails
