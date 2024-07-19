import React, { useContext, useEffect, useRef, useState } from 'react'
import { GrSearch } from "react-icons/gr";
import { LuUserCircle2 } from "react-icons/lu";
import { PiShoppingCartLight } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {

  const user = useSelector(state => state?.user?.user)
  console.log("user header", user);

  const dispatch = useDispatch()

  const [menuDisplay, setMenuDisplay] = useState(false)

  const context = useContext(Context)

  const navigate = useNavigate()

  const searchInput = useLocation()
 
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")

  const [search, setSearch] = useState(searchQuery)

  const dropdownRef = useRef(null);



  const handleLogout = async() => {

    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  

  const handleSearch = (e)=>{
    const { value } = e.target

    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }

  }
  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);




  return (

    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">

        <div className='flex-shrink-0 hover:border-2 hover:border-black transition duration-300'>
          <Link to={"/"}>
            <p className="text-sm sm:text-lg md:text-xl font-bold bg-white text-black px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg shadow-2xl" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Ecomaxx
            </p>
          </Link>
        </div>

        <div className="flex items-center w-full max-w-xs md:max-w-md border focus-within:shadow-md pl-2">
          <input type="text"
            placeholder='Search product here...' 
            className='w-full outline-none font-semibold text-xs sm:text-base py-1 sm:py-1.5 md:py-2'  
            onChange={handleSearch} 
            value={search}
          />
          <div className="text-sm sm:text-lg min-w-[30px] sm:min-w-[50px] md:min-w-[60px] h-6 sm:h-8 md:h-10 flex items-center justify-center rounded-r-full text-slate-500">
          <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-7'>

          <div className='relative flex justify-center'>

            {
              user?._id && (
                
                <div  className="text-lg sm:text-xl md:text-2xl cursor-pointer relative flex justify-center" onClick={()=> setMenuDisplay(prev=> !prev)}>
                  {
                    user?.profilePic? (
                      <img src={user?.profilePic} className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full" alt={user?.name}/>
                    )
                    :
                    (
                      <LuUserCircle2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
                    )
                  }
              </div>
              )
            }


            {
              menuDisplay && (
                <div ref={dropdownRef} className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {
                    user?.role === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-1 text-sm font-semibold'  onClick={()=> setMenuDisplay(prev=> !prev)}>Admin Panel</Link>
                    )
                  }
                </nav>
              </div>
              )
            }

          </div>

          {
            user?._id && (
              <Link to={"/cart"} className="text-xl sm:text-2xl md:text-3xl relative">

                <span><PiShoppingCartLight /></span>
    
                <div className="bg-red-600 text-white w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2">
                  <p className="text-xs sm:text-sm md:text-base">{context?.cartProductCountt}</p>
                </div>
  
              </Link>
            )
          }   

          <div>
            {
              user?._id  ? (
                <button onClick={handleLogout} className="px-2 mx-1 sm:px-3 py-0.5 sm:py-1 rounded-md font-semibold text-white bg-black hover:scale-105 transition text-sm sm:text-base">Logout</button>
              )
              : (
              <Link to={"/login"} className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-md font-semibold text-white bg-black text-sm sm:text-base">Login</Link>
              )
            }
                    
          </div>

        </div>


      </div>
      
    </header>

  );

};

export default Header;



