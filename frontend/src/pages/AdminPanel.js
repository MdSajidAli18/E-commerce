import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LuUserCircle2 } from "react-icons/lu";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {

  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()

  useEffect( ()=>{
    if(user?.role !== ROLE.ADMIN) {
      navigate("/")
    }
  }, [user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>

        <h1 className='flex justify-center items-center mt-2 mb-6 text-xl font-semibold'>Admin Panel</h1>
      
        <div className='h-32 flex justify-center items-center flex-col'>

          <div className='text-5xl cursor-pointer relative flex justify-center'>
            {
              user?.profilePic? (
              <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name}/>
              )
              :
              (
              <LuUserCircle2 />
              )
            }
          </div> 

          <p className=' capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-xs'>{user?.role}</p>

        </div>

        {/** navigation */}
        <div className=''>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-16 py-1 font-semibold text-sm border-2 border-black text-black hover:bg-black hover:text-white'>All users</Link>
            <Link to={"all-products"} className='px-16 py-1 my-1 font-semibold text-sm border-2 border-black text-black hover:bg-black hover:text-white '>All products</Link>
          </nav>
        </div>

      </aside>

      <main className='w-full h-full p-2'>
        <Outlet/>
      </main>

    </div>
  )
}

export default AdminPanel
