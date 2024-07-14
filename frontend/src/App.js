// import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch = useDispatch()

  const [cartProductCountt, setCartProductCountt] = useState(0)  // Intentionally I have given the one extra 't' for the naming.

  const fetchUserDetails = async()=>{

    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }

    console.log("data-user", dataResponse);

  }

  const fetchUserCart = async()=>{

    const dataResponse = await fetch(SummaryApi.cartProductCount.url, {
      method: SummaryApi.cartProductCount.method,
      credentials: 'include'
    }) 

    const dataApi = await dataResponse.json()

    console.log("dataApiiiiiii", dataApi);

    setCartProductCountt(dataApi?.data?.count)

  }

  useEffect(()=>{
    fetchUserDetails()
    fetchUserCart()
  }, [])


  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCountt,
        fetchUserCart
      }}>

        <ToastContainer
          position='top-center'
        />
        
        <Header/>

        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>

        <Footer/>

      </Context.Provider>
    </>
  );

};

export default App;
