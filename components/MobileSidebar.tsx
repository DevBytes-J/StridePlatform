'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Modal from './Modal';

interface MobileSidebarProps {
  currentPage: 'landing' | 'about' | 'dashboard';
}

export default function MobileSidebar({ currentPage }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    setIsOpen(false);
    setLogoutModal(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-white hover:text-[#d4b896] transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#d4b896] transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-black flex justify-between items-center">
          <img src="/logo.png" alt="Stride Logo" width={32} height={32} />
          <button onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {currentPage === 'dashboard' ? (
            <>
              <Link 
                href="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md bg-black text-[#d4b896]"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/tours/new" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md text-black hover:bg-[#c4a886]"
              >
                Create Tour
              </Link>
              <Link 
                href="/dashboard/analytics" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md text-black hover:bg-[#c4a886]"
              >
                Analytics
              </Link>
              <Link 
                href="/dashboard/settings" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md text-black hover:bg-[#c4a886]"
              >
                Settings
              </Link>
              <button 
                onClick={() => setLogoutModal(true)}
                className="w-full text-left px-4 py-2 rounded-md text-black hover:bg-[#c4a886]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md text-black hover:bg-[#c4a886]"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md bg-black text-[#d4b896]"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        confirmColor="bg-[#d4b896] hover:bg-[#c4a886]"
      />
    </>
  );
}
