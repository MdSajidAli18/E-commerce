import React from 'react'
import { useSelector } from 'react-redux'
import { LuUserCircle2 } from "react-icons/lu";

const AdminPanel = () => {

  const user = useSelector(state => state?.user?.user)

  return (
    <div className='min-h-[calc(100vh-120px)] flex'>

        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        
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
                <p className='text-sm'>{user?.role}</p>

            </div>

        </aside>

      <main>
        main
      </main>

    </div>
  )
}

export default AdminPanel
