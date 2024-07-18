import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaStar } from 'react-icons/fa'
import { FaRegStarHalfStroke } from 'react-icons/fa6'
import { MdDelete } from "react-icons/md";
import { BsArrowDown } from "react-icons/bs";
import yourCartIsEmptyimage from '../assets/yourCartIsEmptyimage.jpg'

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCountt).fill(null)

    const fetchData = async()=>{

        const response = await fetch(SummaryApi.cartProductView.url, {
            method: SummaryApi.cartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            }

        })

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }

    }

    const handleLoading = async()=>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])


    const increaseQty = async(id, qty)=>{
        const response = await fetch(SummaryApi.updateCartProductt.url, {
            method: SummaryApi.updateCartProductt.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty+1
            })

        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }

    }


    const decreaseQty = async(id, qty)=>{
        if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProductt.url, {
                method: SummaryApi.updateCartProductt.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty-1
                })
    
            })
    
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()
            }

        }

    }


    const deleteProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProductt.url, {
            method: SummaryApi.deleteCartProductt.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserCart()
        }

    }
    
    

    const totalQty = data.reduce((previousValue, currentValue)=>previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((prev, curr)=> prev + (curr?.quantity * curr?.productId?.price), 0 )
    const totalSellingPrice = data.reduce((prev, curr)=> prev + (curr?.quantity * curr?.productId?.sellingPrice), 0)


    const handlePayment = async()=>{
        // const response = await fetch(SummaryApi.paymentt.url, {
        //     method: SummaryApi.paymentt.method,
        //     credentials: 'include',
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         cartItems: data
        //     })
        // })

        // const responseData = await response.json()

        // console.log("responseDattaa", responseData);

        alert("I will add the payment feature in the future")

    }




    return(
        <div className='container mx-auto'>

            <div className='my-4 -mb-3 ml-2.5 px-2 pb-0.5 text-ellipsis text-lg lg:text-xl bg-red-600 text-white rounded-md w-fit'>
                My Cart
            </div>

            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        // <p className='bg-white py-5'>Your cart is empty!</p>
                        <div className="bg-white text-center p-6 mb-10 mt-10 gap-3 flex flex-col items-center justify-center h-60 sm:h-80 md:h-96 lg:h-120">
                        <img src={yourCartIsEmptyimage} className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 lg:w-60 lg:h-60" />
                        <p className="text-sm sm:text-lg md:text-xl lg:text-3xl font-semibold">Your cart is empty!</p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-ellipsis text-gray-500">Looks like you have not added anything to your cart. Go ahead & explore top categories.</p>
                        </div>
                        
                    )
                }
            </div>


            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-2'>

                {/** view cart product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading? (
                            loadingCart.map((el, index) =>{
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                
                                    </div>
                                )
                            })
                        )
                        :
                        (
                            data.map((product, index)=>{
                                return(
                                    <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-36 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>

                                        <div className='w-36 h-36 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]}  className='w-full h-full object-scale-down mix-blend-multiply'/>
                                        </div>

                                        <div className='px-7 py-2 relative'>

                                            {/** remove/delete the product from cart */}
                                            <div className='absolute right-0 text-xl text-red-600 rounded-full p-1.5 hover:bg-red-600 hover:text-white cursor-pointer'>
                                                <MdDelete  onClick={()=>deleteProduct(product?._id)}/>
                                            </div>

                                            
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-600'>{product?.productId?.category}</p>
                                            <div className='text-sm text-red-600 flex items-center gap-1'>
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaRegStarHalfStroke />
                                            </div>
                                            <div className='flex items-center gap-1.5 mt-1 p-0.5'>
                                                <button className='  border-2 font-semibold border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-5 h-5 flex justify-center items-center rounded'  onClick={ ()=>decreaseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className=' border-2 font-semibold border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-5 h-5 flex justify-center items-center rounded'  onClick={ ()=>increaseQty(product?._id, product?.quantity) }>+</button>
                                            </div>
                                            <div className='flex flex-row gap-2 mt-1 mb-0.5'>                                               
                                                <p className='line-through text-slate-600 text-sm mt-0.5'>{displayINRCurrency(product?.productId?.price * product?.quantity)}</p>
                                                <p className='font-semibold'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                                <div className='flex flex-row font-semibold text-lg text-green-700 -mt-1'>
                                                    <BsArrowDown className='mt-1'/>
                                                    <p className='pb-2 mb-2'>{Math.round(((product?.productId?.price - product?.productId?.sellingPrice)/product?.productId?.price)*100)+'%'}</p>
                                                </div>
                                            </div>
                                            <div className='flew flex-row gap-1'>
                                                
                                                
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                </div>


                {/** Price Details */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading? (
                                <div className='h-36 bg-slate-200 border border-slate-200 animate-pulse'>
                                    
                                </div>
                            )
                            :
                            (
                                // data.map((product, index)=>{
                                //     return(
                                        <div className='h-80 bg-white shadow-md'>
                                            <h2 className='text-white bg-red-600 lg:text-xl px-4 py-1 font-semibold'>PRICE DETAILS</h2>
                                            <div className='flex justify-between items-center lg:text-lg px-4 py-1.5 gap-2 font-semibold'>
                                                <p>Price ({context?.cartProductCountt} items)</p>
                                                {/* <p>{totalQty}</p> */}
                                                <p>{displayINRCurrency(totalPrice)}</p>
                                            </div>
                                            <div className='flex justify-between items-center lg:text-lg px-4 py-1.5 gap-2 font-semibold'>
                                                <p>Discount</p>
                                                <div className='flex flex-row gap-1 lg:text-lg text-green-700'>
                                                    <p className=''>−</p>
                                                    <p>{displayINRCurrency(totalPrice - totalSellingPrice)}</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-between items-center lg:text-lg px-4 py-1.5 gap-2 font-semibold border-b border-dashed'>
                                                <p>Delivery Charges</p>
                                                <p className='text-green-700'>Free</p>
                                            </div>
                                            <div className='flex justify-between items-center text-lg lg:text-xl p-4 font-semibold border-b border-dashed'>
                                                <p>Total Amount</p>
                                                <p>{displayINRCurrency(totalSellingPrice)}</p>
                                            </div>
                                            <div className='flex justify-between items-center lg:text-lg px-4 py-1.5 gap-2 font-semibold'>
                                                <p className='text-green-700'>You will save {displayINRCurrency(totalPrice - totalSellingPrice)} on this order</p>
                                            </div>
                                            <div>
                                                <button className='bg-red-600 text-white font-semibold px-6 py-2 flex justify-center items-center mx-20 my-2 rounded-sm hover:bg-red-700'  onClick={handlePayment}>Payment</button>
                                            </div>
                                        </div>
                                    //)
                                // })
                            )
                        }
                        </div>
                    )
                }


            </div>


        </div>
    )

}

export default Cart
