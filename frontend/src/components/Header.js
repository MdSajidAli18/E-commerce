import React from 'react'
import Logo from './Logo';

import { GrSearch } from "react-icons/gr";
import { LuUserCircle2 } from "react-icons/lu";
import { PiShoppingCartLight } from "react-icons/pi";

const Header = () => {
  return (

    <header className='h-16 shadow-md'>
      
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">

        <div className=''>
          <Logo w={90} h={50}/>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type="text" placeholder='search product here...' className='w-full outline-none'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
          <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='text-3xl cursor-pointer'>
           <LuUserCircle2 />
          </div>

          <div className='text-3xl relative'>

            <span><PiShoppingCartLight /></span>

            <div className='bg-red-600 text-white w-4 h-4 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2'>
              <p className='text-sm'>0</p>
            </div>

          </div>

          <div>
            <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</button>
          </div>

        </div>


      </div>
      
    </header>

  );

};

export default Header;
