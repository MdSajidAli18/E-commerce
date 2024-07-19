import React, { useState } from 'react';
// import loginIcons from '../assets/assest/signin.gif';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

import userSignUpImage from '../assets/userSignUpImage.jpeg'

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    console.log("signup data", data);

    const handleUploadPic = async(e) => {
        const file = e.target.files[0]
        const imagePic = await imageToBase64(file)
        setData((prev) => {
            return{
                ...prev,
                profilePic: imagePic
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.password === data.confirmPassword) {

            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
    
            const dataApi = await dataResponse.json()

            if(dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login");
            }

            if(dataApi.error) {
                toast.error(dataApi.message)
            }
                
        }else {
            toast.error("Please check your password and confirm password again")
        }
        
    }
   



    return (

        <section id='signup' className='flex justify-center items-center min-h-screen bg-white'>

            <div className='container mx-auto px-4 flex flex-col md:flex-row shadow-lg'>

                {/* <div className="bg-white text-center p-6 mb-10 gap-3 flex flex-col items-center justify-center h-60 sm:h-80 md:h-96 lg:h-120">
                    <img src={userSignUpImage} className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 lg:w-60 lg:h-60" />
                    <p className="text-sm sm:text-lg md:text-xl lg:text-3xl font-semibold">Looks like you're new here!</p>
                    <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-ellipsis text-gray-500">Please sign up to get started</p>
                </div> */}

                {/* Left Section (Image and Text) */}
                <div className="bg-white text-center p-6 md:p-0 mb-10 md:mb-0 flex flex-col items-center justify-center w-full md:w-1/2">
                    <img src={userSignUpImage} className="w-24 h-24 md:w-48 md:h-48" alt="Sign Up" />
                    <p className="text-lg md:text-3xl font-semibold mt-4">Looks like you're new here!</p>
                    <p className="text-sm md:text-lg text-gray-500 mt-2">Please sign up to get started</p>
               </div>


                {/* Right Section (Signup Form) */}
                <div className='bg-white p-5 w-full md:w-1/2 flex flex-col justify-center items-center'>

                    <div className='w-24 h-24 mx-auto relative overflow-hidden rounded-full mb-4'>
                        <div>
                            {/* <img src={data.profilePic || loginIcons} alt="login icons"/> */}
                            <img src={data.profilePic || userSignUpImage} alt="Profile Pic" className="object-cover w-full h-full" />
                        </div>
                        <form>
                            <label >
                                <div className='block text-xs bg-opacity-80 bg-gray-200 pb-2 pt-1 px-2 text-center absolute bottom-0 w-full cursor-pointer font-semibold'>
                                    Upload photo
                                </div>
                                <input type="file" className='hidden' onChange={handleUploadPic}/>
                            </label>
                        </form>
                    </div>

                    <form className='w-full max-w-md' onSubmit={handleSubmit}>

                        <div className='mb-4'>
                            <label className='font-semibold'>Name:</label>
                            <input
                                type="text"
                                placeholder='Enter your name'
                                name='name'
                                value={data.name}
                                onChange={handleOnChange}
                                required={true}
                                className='w-full px-3 py-2 mt-1 outline-none bg-gray-100 rounded-lg'
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='font-semibold'>Email: </label>
                            
                            <input 
                                type="email"
                                placeholder='Enter email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                required={true}
                                className='w-full px-3 py-2 mt-1 outline-none bg-gray-100 rounded-lg'
                            />
                            
                        </div>

                        <div className='mb-4'>
                            <label className='font-semibold'>Password: </label>
                            <div className='relative'>
                                <input 
                                    type={showPassword? "text" : "password"} 
                                    placeholder='Enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required={true} 
                                    className='w-full px-3 py-2 mt-1 outline-none bg-gray-100 rounded-lg'
                                />
                                <div className='absolute right-3 top-3 text-gray-400 cursor-pointer'  onClick={()=> setShowPassword((prev) => !(prev))}>  
                                    {showPassword ? <LuEyeOff /> : <LuEye />}
                                </div>
                            </div>
                        </div>

                        <div className='mb-6'>
                            <label className='font-semibold'>Confirm password: </label>
                            <div className='relative'>
                                <input 
                                    type={showConfirmPassword? "text" : "password"} 
                                    placeholder='Confirm password'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required={true} 
                                    className='w-full px-3 py-2 mt-1 outline-none bg-gray-100 rounded-lg'
                                />
                                <div className='absolute right-3 top-3 text-gray-400 cursor-pointer' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                    {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                                </div>
                            </div>
                        </div>


                        <button className='bg-black text-white hover:scale-105 transition px-6 py-2 rounded-lg w-full mt-4 font-semibold'>Sign Up</button>

                    </form>

                    <p className='my-5 text-center font-semibold'>Already have an account? <Link to={"/login"}  className='text-red-800 hover:text-red-900 hover:underline font-semibold'>Login</Link></p>

                </div>

            </div>

        </section>

    );
};

export default SignUp;
