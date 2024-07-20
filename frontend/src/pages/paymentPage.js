
import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const { address } = location.state || {}; // Destructure address from location.state

    // Ensure address is properly accessed from the state
    const addressData = address?.data || {};

    return (
        <div className='container mx-auto p-4 max-w-screen-md'>
            <h2 className='text-2xl font-semibold mb-4'>Payment Details</h2>
            <div className='mb-6'>
                <h3 className='text-xl font-semibold'>Shipping Address</h3>
                <p><strong>Name:</strong> {addressData.name}</p>
                <p><strong>Email:</strong> {addressData.email}</p>
                <p><strong>Address:</strong> {addressData.address}</p>
                <p><strong>City:</strong> {addressData.city}</p>
                <p><strong>State:</strong> {addressData.state}</p>
                <p><strong>Zip Code:</strong> {addressData.zipCode}</p>
                <p><strong>Phone:</strong> {addressData.phone}</p>
            </div>
            <div className='mb-6'>
                {/* Placeholder for payment info */}
                <h3 className='text-xl font-semibold'>Payment Info</h3>
                <p>Payment method will be integrated here in the future.</p>
            </div>
            <button
                type='button'
                className='bg-black text-white font-semibold px-6 py-2 rounded hover:bg-gray-800 transition duration-300'
                onClick={() => alert('Payment feature coming soon!')}
            >
                Complete Payment
            </button>
        </div>
    );
};

export default PaymentPage;

