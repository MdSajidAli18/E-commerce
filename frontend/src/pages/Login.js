import React, { useState } from 'react';
import loginIcons from '../assets/assest/signin.gif';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Login = () => {

    //s
    const [showPassword, setShowPassword] = useState(false);
    //p


    //s
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        });
    };

    console.log("login data", data);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    //p




    return (

        <section id='login'>

            <div className='mx-auto container p-4'>

                <div className='bg-white p-5  w-full max-w-sm mx-auto rounded-lg'>

                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt="login icons"/>
                    </div>

                    <form className='pt-6' onSubmit={handleSubmit}>

                        <div className='grid'>
                            <label >Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type="email"
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label >Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showPassword? "text" : "password"} 
                                    placeholder='enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange} 
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl'  onClick={()=> setShowPassword((prev) => !(prev))}>
                                    <span>
                                        {
                                            showPassword? (
                                                <LuEyeOff />
                                            )
                                            :
                                            (
                                                <LuEye />
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={"/forgot-password"}  className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password?
                            </Link>
                        </div>


                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>

                    <p className='my-5'>Don't have an account? <Link to={"/sign-up"}  className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>

                </div>

            </div>

        </section>

    );

};

export default Login;
