import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-green-600 text-white p-4 shadow">
        <h1 className="text-xl font-bold">Cycle2u</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-green-600 text-white p-4">
        <p>&copy; {new Date().getFullYear()} Cycle2u. All rights reserved.</p>
      </footer>
    </div>
  );
}