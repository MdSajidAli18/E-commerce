import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordRequest = () => {
    
    const navigate = useNavigate()
    const handleSubmitButton = ()=>{
        navigate("/reset-password")
    }

    
  return (
    <div className="container mx-auto p-4 max-w-screen-md">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <p className="mb-4">
        Enter your registered email address, and we'll send you a link to reset your password.
      </p>
      <form onSubmit={''} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 p-2 rounded"
            value={''}
            onChange={''}
            required
          />
        </div>
        <button
          onClick={handleSubmitButton}
          type="submit"
          className="bg-black text-white font-semibold px-6 py-2 rounded hover:bg-gray-800 transition duration-300">
          Request Password Reset
        </button>
      </form>
      <p className="mt-4">
        Check your email for the reset link. If you don't receive it, check your spam folder or contact support.
      </p>
    </div>
  );
};

export default ForgotPasswordRequest;
