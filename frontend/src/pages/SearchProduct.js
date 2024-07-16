import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common';

const SearchProduct = () => {

    const query = useLocation()
    console.log('Queryyy', query.search);

    const fetchProduct = async()=>{
        const response = await fetch(SummaryApi.searchProductt.url+query.search)
        const detailsResponse = await response.json()

        console.log("Detailss Responsee", detailsResponse);
    }


    useEffect(()=>{
        fetchProduct()
    }, [query])



  return (
    <div>
      SearchProduct
      SearchProduct
    </div>
  )
}

export default SearchProduct
