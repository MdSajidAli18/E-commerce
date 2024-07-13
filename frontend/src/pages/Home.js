import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct  category={"airpodes"}  heading={"Top Airpodes"}/>
      <HorizontalCardProduct  category={"earphones"}  heading={"Best of Earphones"}/>
      <HorizontalCardProduct  category={"watches"}  heading={"Popular Watches"}/>
      <VerticalCardProduct  category={"mobiles"}  heading={"Mobiles"}/>
      <VerticalCardProduct  category={"televisions"}  heading={"Telivisions"}/>
      <VerticalCardProduct  category={"speakers"}  heading={"Speakers"}/>
      <VerticalCardProduct  category={"refrigerator"}  heading={"Refrigerators"}/>
      <VerticalCardProduct  category={"trimmers"}  heading={"Trimmers"}/>
      <VerticalCardProduct  category={"camera"}  heading={"Cameras"}/>
      <VerticalCardProduct  category={"Mouse"}  heading={"Mouse"}/>
      <VerticalCardProduct  category={"processor"}  heading={"Processors"}/>
      <VerticalCardProduct  category={"printers"}  heading={"Printers"}/>
    </div>
  );
};

export default Home;
