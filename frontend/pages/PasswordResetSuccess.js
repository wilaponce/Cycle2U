import React from 'react';

export default function PasswordResetSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Password Reset Successful</h1>
        <p className="text-gray-700 mb-6">Your password has been successfully reset. You can now log in with your new credentials.</p>
        <a href="/login" className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Go to Login</a>
      </div>
    </div>
  );
}