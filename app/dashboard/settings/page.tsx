'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

export default function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setEmail(user.email || '');
      setName(user.user_metadata?.full_name || '');
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name }
    });

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated!');
      localStorage.setItem('userName', name);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Toaster position="top-center" />
      
      {/* Top Navigation */}
      <nav className="border-b border-[#2a2a2a] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Stride" className="w-8 h-8" />
              <span className="text-xl font-bold">Stride</span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Tours</button>
              <button onClick={() => router.push('/dashboard/analytics')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Analytics</button>
              <button className="text-white border-b-2 border-[#d4b896] pb-1 cursor-pointer">Settings</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              Logout
            </button>
            <button 
              onClick={() => router.push('/dashboard/settings')}
              className="w-10 h-10 bg-[#d4b896] rounded-md hover:bg-[#c4a886] transition-colors cursor-pointer flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400 mb-8">Manage your account and preferences</p>

        {/* Profile Settings */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md opacity-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <button 
              onClick={updateProfile}
              disabled={loading}
              className="px-6 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* API Key */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">API Access</h2>
          <p className="text-gray-400 text-sm mb-4">Use this endpoint to integrate with your widget:</p>
          <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 font-mono text-sm mb-4">
            <code className="text-[#d4b896]">{typeof window !== 'undefined' ? window.location.origin : ''}/api/tours/[tour-id]</code>
          </div>
          <p className="text-xs text-gray-500">Replace [tour-id] with your actual tour ID from the dashboard</p>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#1a1a1a] border border-red-500/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Danger Zone</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sign Out</p>
                <p className="text-sm text-gray-400">Sign out of your account</p>
              </div>
              <button 
                onClick={handleSignOut}
                className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
            <div className="border-t border-[#2a2a2a] pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-500">Delete Account</p>
                  <p className="text-sm text-gray-400">Permanently delete your account and all tours</p>
                </div>
                <button 
                  onClick={() => toast.error('Contact support to delete account')}
                  className="px-4 py-2 border border-red-500/50 text-red-500 rounded-md hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
