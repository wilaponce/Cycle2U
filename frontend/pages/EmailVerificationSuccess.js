import React from 'react';

export default function EmailVerificationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Email Verified</h1>
        <p className="text-gray-700 mb-6">Your email address has been successfully verified. You can now access your account.</p>
        <a href="/login" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Go to Login</a>
      </div>
    </div>
  );
}