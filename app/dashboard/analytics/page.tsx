'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

function AnalyticsContent() {
  const [tours, setTours] = useState<any[]>([]);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('tours')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    setTours(data || []);
    
    const tourId = searchParams.get('tour');
    if (tourId && data) {
      const tour = data.find(t => t.id === tourId);
      if (tour) setSelectedTour(tour);
    } else if (data && data.length > 0) {
      setSelectedTour(data[0]);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const completionRate = selectedTour?.views > 0 
    ? Math.round((selectedTour.completions / selectedTour.views) * 100) 
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Toaster position="top-center" />
      
      {/* Top Navigation */}
      <nav className="border-b border-[#2a2a2a] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Stride" width={32} height={32} />
              <span className="text-xl font-bold">Stride</span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Tours</button>
              <button className="text-white border-b-2 border-[#d4b896] pb-1 cursor-pointer">Analytics</button>
              <button onClick={() => router.push('/dashboard/settings')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Settings</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
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
      <main className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics</h1>
            <p className="text-gray-400">Track performance and user engagement</p>
          </div>
          <select 
            value={selectedTour?.id || ''}
            onChange={(e) => setSelectedTour(tours.find(t => t.id === e.target.value))}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] cursor-pointer"
          >
            {tours.map(tour => (
              <option key={tour.id} value={tour.id}>{tour.title}</option>
            ))}
          </select>
        </div>

        {selectedTour ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Views</p>
                <p className="text-4xl font-bold mb-1">{selectedTour.views.toLocaleString()}</p>
                <p className="text-gray-500 text-sm">All time</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Completions</p>
                <p className="text-4xl font-bold mb-1">{selectedTour.completions.toLocaleString()}</p>
                <p className="text-green-500 text-sm">{completionRate}% completion rate</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Avg Time</p>
                <p className="text-4xl font-bold mb-1">{formatTime(selectedTour.avg_time)}</p>
                <p className="text-gray-500 text-sm">Per completion</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Rating</p>
                <p className="text-4xl font-bold mb-1">{selectedTour.rating > 0 ? selectedTour.rating.toFixed(1) : '—'}</p>
                <p className="text-gray-500 text-sm">User feedback</p>
              </div>
            </div>

            {/* Tour Details */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">{selectedTour.title}</h2>
              <p className="text-gray-400 mb-6">{selectedTour.description || 'No description'}</p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <span className={`px-3 py-1 text-sm rounded inline-block ${
                    selectedTour.status === 'active' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedTour.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Steps</p>
                  <p className="text-xl font-bold">{selectedTour.steps?.length || 0}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Created</p>
                  <p className="text-xl font-bold">{new Date(selectedTour.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Embed Code */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Embed Code</h2>
              <p className="text-gray-400 text-sm mb-4">Copy and paste this code into your website to display this tour:</p>
              <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 font-mono text-sm">
                <code className="text-[#d4b896]">
                  {`<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/stridecore.js" data-tour-id="${selectedTour.id}"></script>`}
                </code>
              </div>
              <button 
                onClick={() => {
                  const code = `<script src="${window.location.origin}/stridecore.js" data-tour-id="${selectedTour.id}"></script>`;
                  navigator.clipboard.writeText(code);
                  toast.success('Embed code copied!');
                }}
                className="mt-4 px-4 py-2 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
              >
                Copy Code
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            No tours available. Create a tour first!
          </div>
        )}
      </main>
    </div>
  );
}

export default function Analytics() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="w-12 h-12 animate-spin rounded-full border-4 border-[#d4b896] border-t-transparent"></div>
      </div>
    }>
      <AnalyticsContent />
    </Suspense>
  );
}
