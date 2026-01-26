'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        /Cycle2u</Link>
        <div className="hidden md:flex space-x-6">
          /dashboardDashboard</Link>
          /pickupPickup</Link>
          /bag-dropBag Drop</Link>
          /rewardsRewards</Link>
          /loginLogin</Link>
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
          /dashboardDashboard</Link>
          /pickupPickup</Link>
          /bag-dropBag Drop</Link>
          /rewardsRewards</Link>
          /loginLogin</Link>
        </div>
      )}
    </nav>
  );
}