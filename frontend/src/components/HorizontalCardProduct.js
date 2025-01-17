import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({category, heading}) => {

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

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all'  ref={scrollElement}>

                <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'  onClick={scrollLeft}><FaAngleLeft /></button>
                <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block'  onClick={scrollRight}><FaAngleRight /></button>

                {
                    loading? (
                        loadingList.map((product, index)=>{
                            return(
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
    
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                                    </div>
    
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                        <p className=' capitalize text-slate-700 p-1 bg-slate-200 animate-pulse rounded-full '></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 py-1 my-2 rounded-full w-full bg-slate-200 animate-pulse p-1'></button>
                                    </div>
    
                                </div>
                            )
                        })
                    )
                    :
                    (
                        data.map((product, index)=>{
                            return(
                                <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-sm  border border-gray-200 flex'>
    
                                    <div className='bg-slate-50 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                                    </div>
    
                                    <div className='px-4 py-1.5 bg-white'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className=' capitalize text-slate-700 text-sm mt-0.5 mb-0.5'>{product?.category}</p>
                                        <div className='flex flex-col gap-x-1'>
                                            
                                            <p className='text-red-600 font-medium -mb-1.5'>{ displayINRCurrency(product?.sellingPrice)}</p>

                                            <div className='flex flex-row font-medium text-green-700 mb-2 pb-2'>
                                                <p className='text-slate-500 line-through text-xs mt-0.5 py-0.5'>{displayINRCurrency(product?.price)}</p>                                                
                                                <p className='pb-2 mb-2 ml-1'>{Math.round(((product?.price - product?.sellingPrice)/product?.price)*100)+'%'}</p>                                 
                                                <p className='ml-1'>Off</p>
                                            </div>
                                        </div>
                                        <div className='-mt-2.5'>
                                            <button className='text-sm font-semibold bg-black hover:scale-105 transition text-white px-3 py-1 mx-2 my-0 rounded-lg'  onClick={ (e)=>handleAddToCart(e, product?._id) }>Add to Cart</button>
                                        </div>
                                        
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


export default HorizontalCardProduct

