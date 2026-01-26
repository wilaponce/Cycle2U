'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/">Cycle2u</Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pickup">Pickup</Link>
          <Link href="/bag-drop">Bag Drop</Link>
          <Link href="/rewards">Rewards</Link>
          <Link href="/login">Login</Link>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-green-700 px-4 py-2 space-y-2">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pickup">Pickup</Link>
          <Link href="/bag-drop">Bag Drop</Link>
          <Link href="/rewards">Rewards</Link>
          <Link href="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}
