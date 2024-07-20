
import React from 'react';

const ResetPassword = () => {

  return (
    <div className="container mx-auto p-4 max-w-screen-md">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={''} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 p-2 rounded"
            value={''}
            onChange={''}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border border-gray-300 p-2 rounded"
            value={''}
            onChange={''}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white font-semibold px-6 py-2 rounded hover:bg-gray-800 transition duration-300">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
