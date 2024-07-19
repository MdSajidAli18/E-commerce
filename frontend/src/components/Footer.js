
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5 my-5">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 lg:space-x-10">
        {/* Brand Section */}
        <div className="mb-8 lg:mb-0">
          <h2 className="text-2xl lg:text-3xl font-bold">Ecomaxx</h2>
          <p className="text-sm lg:text-base mt-2">Your one-stop shop for everything!</p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col lg:flex-row gap-56">
          {/* <div>
            <h3 className="font-semibold text-lg lg:text-xl">Shop</h3>
            <ul className="mt-2 space-y-2 text-sm lg:text-base">
              <li><a href="#" className="hover:underline">Men</a></li>
              <li><a href="#" className="hover:underline">Women</a></li>
              <li><a href="#" className="hover:underline">Kids</a></li>
              <li><a href="#" className="hover:underline">Accessories</a></li>
            </ul>
          </div> */}
          <div>
            <h3 className="font-semibold text-lg lg:text-xl">About</h3>
            <ul className="mt-2 space-y-2 text-sm lg:text-base">
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg lg:text-xl">Help</h3>
            <ul className="mt-2 space-y-2 text-sm lg:text-base">
              <li><a href="#" className="hover:underline">Customer Service</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Order Tracking</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 lg:mt-0">
          <h3 className="font-semibold text-lg lg:text-xl">Follow Us</h3>
          <div className="flex space-x-6 mt-2 text-sm lg:text-base">
            <a href="#" className="hover:underline">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="hover:underline">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="hover:underline">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" className="hover:underline">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm lg:text-base">
        &copy; 2024 Ecomaxx. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
