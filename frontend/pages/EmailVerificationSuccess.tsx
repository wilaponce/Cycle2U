import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function EmailVerificationSuccess() {
  return (
    <>
      <Head>
        <title>Email Verified - Cycle2U</title>
        <meta name="description" content="Your email has been successfully verified." />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Email Verified</h1>
          <p className="text-gray-700 mb-6">
            Your email address has been successfully verified. You can now access your account.
          </p>
          /login
            <a className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Go to Login
            </a></Link>
        </div>
      </main>
    </>
  );
}
