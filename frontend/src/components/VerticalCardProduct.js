import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { BsArrowDown } from 'react-icons/bs'

const VerticalCardProduct = ({category, heading}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserCart} = useContext(Context)
    const handleAddToCart = async(e, id)=>{
        await addToCart(e, id)
        fetchUserCart()
    }

    const fetchData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    }, [])


    const scrollRight = ()=>{
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -= 300
    }



    return (
        <div className='container mx-auto px-4 my-0 relative bg-white shadow-lg'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'  ref={scrollElement}>

                <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'  onClick={scrollLeft}><FaAngleLeft /></button>
                <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block'  onClick={scrollRight}><FaAngleRight /></button>

                {
                    loading? (
                        loadingList.map((product, index)=>{
                            return(
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
    
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                    </div>
    
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                        <p className=' capitalize text-slate-700 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                        <div className='flex gap-3'>
                                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        </div>
                                        <button className='text-sm text-white px-6  mx-3 my-3 rounded-full bg-slate-200 animate-pulse py-2'></button>
                                    </div>
    
                                </div>
                            )
                        })
                    )
                    :
                    (
                        data.map((product, index)=>{
                            return(
                                <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm border border-gray-200'>
    
                                    <div className='bg-slate-50 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                                    </div>
    
                                    <div className='p-4 grid gap-2 bg-white'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className=' capitalize text-slate-700'>{product?.category}</p>
                                        <div className='flex gap-3'>                                            
                                            <p className='text-red-600 font-medium mt-0.5'>{ displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through mt-0.5'>{displayINRCurrency(product?.price)}</p>
                                            <div className='flex flex-row font-medium md:text-lg text-green-700 mb-2 pb-2'>
                                                
                                                <p className='pb-2 mb-2'>{Math.round(((product?.price - product?.sellingPrice)/product?.price)*100)+'%'}</p>
                                                {/* <BsArrowDown className='mt-1'/> */}
                                                <p className='ml-1'>Off</p>
                                            </div>
                                        </div>
                                        <button className='text-sm bg-black hover:scale-105 transition font-semibold text-white px-6 py-2 mx-3 my-3 rounded-md'  onClick={ (e)=>handleAddToCart(e, product?._id) }>Add to Cart</button>
                                    </div>
    
                                </Link>
                            )
                        })
                    )
                }

            </div>

        </div>
    )

}


export default VerticalCardProduct
