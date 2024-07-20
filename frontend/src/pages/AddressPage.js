import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AddressPage = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.userAddresss.url, {
                method: SummaryApi.userAddresss.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                navigate('/payment', {
                    state: {
                        address: {
                            data
                        }
                    }
                }); // Redirect to payment page after successful form submission and show the address details on the payment page
            } else {
                toast.error(result.message);
            }

        } catch (error) {
            toast.error('An error occurred while submitting the form.');
            console.error('Form submission error:', error);
        }
    };



    return (
        <div className='container mx-auto p-4 max-w-screen-md'>
            <h2 className='text-2xl font-semibold mb-4'>Shipping Address</h2>
            <form onSubmit={handleFormSubmit} className='space-y-4'>
                {Object.keys(data).map((key) => (
                    <div key={key} className='flex flex-col'>
                        <label htmlFor={key} className='mb-2 font-medium'>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                            id={key}
                            name={key}
                            className='border border-gray-300 p-2 rounded'
                            value={data[key]}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                ))}
                <button
                    type='submit'
                    className='bg-black text-white font-semibold px-6 py-2 rounded hover:bg-gray-800 transition duration-300'>
                    Continue to Payment
                </button>
            </form>
        </div>
    );
};

export default AddressPage;
