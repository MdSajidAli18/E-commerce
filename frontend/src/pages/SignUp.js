import React, { useState } from 'react';
import loginIcons from '../assets/assest/signin.gif';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';

const SignUp = () => {

    //s
    const [showPassword, setShowPassword] = useState(false);
    //p

    //s
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    //p


    //s
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
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

    console.log("signup data", data);

    const handleUploadPic = async(e) => {
        const file = e.target.files[0];
        const imagePic = await imageToBase64(file);
        setData((prev) => {
            return{
                ...prev,
                profilePic: imagePic
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    //p



    return (

        <section id='signup'>

            <div className='mx-auto container p-4'>

                <div className='bg-white p-5  w-full max-w-sm mx-auto rounded-lg'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt="login icons"/>
                        </div>
                        <form>
                            <label >
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer'>
                                    Upload photo
                                </div>
                                <input type="file" className='hidden' onChange={handleUploadPic}/>
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                        <div className='grid'>
                            <label >Name : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type="name"
                                    placeholder='enter your name' 
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required={true}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='grid'>
                            <label >Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type="email"
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required={true}
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
                                    required={true} 
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
                        </div>

                        <div>
                            <label >Confirm password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showConfirmPassword? "text" : "password"} 
                                    placeholder='enter confirm password'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required={true} 
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl'  onClick={()=> setShowConfirmPassword((prev) => !(prev))}>
                                    <span>
                                        {
                                            showConfirmPassword? (
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
                        </div>


                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

                    </form>

                    <p className='my-5'>Already have an account? <Link to={"/login"}  className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

                </div>

            </div>

        </section>

    );
};

export default SignUp;
