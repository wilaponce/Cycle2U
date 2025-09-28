import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PasswordResetSuccess() {
  return (
    <>
      <Head>
        <title>Password Reset Successful</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Password Reset Successful</h1>
          <p className="text-gray-700 mb-6">
            Your password has been successfully reset. You can now log in with your new credentials.
          </p>
          <Link href="/login">
            <a className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
              Go to Login
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
