import React, { useContext, useState } from 'react';
// import loginIcons from '../assets/assest/signin.gif';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';

import loginImage from '../assets/loginImage.jpg';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const {fetchUserDetails, fetchUserCart} = useContext(Context)


    const handleOnChange = (e) => {
        const {name, value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success) {
            toast.success(dataApi.message);
            navigate("/");
            fetchUserDetails();
            fetchUserCart()
        };

        if(dataApi.error) {
            toast.error(dataApi.message);
        };

    };




    return (

        <section id='login'  className='flex justify-center items-center min-h-screen bg-white'>

            <div className='container mx-auto px-4 mb-28 flex flex-col md:flex-row shadow-md'>

                {/* Left Section (Image and Text) */}
                <div className="bg-white text-center p-6 md:p-0 mb-10 md:mb-0 flex flex-col items-center justify-center w-full md:w-1/2">
                    <img src={loginImage} className="w-24 h-24 md:w-48 md:h-48" alt="Sign Up" />
                    <p className="text-lg md:text-3xl font-semibold mt-4">Welcome back!</p>
                    <p className="text-sm md:text-lg text-gray-500 mt-2">Get access to your Orders, Wishlist and Recommendations</p>
                </div>

                {/* Right Section (Login Form) */}
                <div className='bg-white p-5 w-full md:w-1/2 flex flex-col justify-center items-center'>

                    {/* <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt="login icons"/>
                    </div> */}

                    <p className="text-lg md:text-3xl font-semibold mt-4 mb-8">Login</p>

                    <form className='w-full max-w-md' onSubmit={handleSubmit}>

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
                                <div className='absolute right-3 top-3 text-gray-400 cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <LuEyeOff /> : <LuEye />}
                                </div>
                            </div>

                            <Link to={"/forgot-password"}  className='block w-fit ml-auto hover:underline text-red-800 hover:text-red-900 font-semibold'>
                                Forgot password?
                            </Link>

                        </div>


                        <button className='bg-black text-white hover:scale-105 transition px-6 py-2 rounded-lg w-full mt-4 font-semibold'>Login</button>

                    </form>

                    <p className='my-5 text-center font-semibold'>Don't have an account? <Link to={"/sign-up"}  className='text-red-800 hover:text-red-900 hover:underline'>Sign up</Link></p>

                </div>

            </div>

        </section>

    );

};

export default Login;
