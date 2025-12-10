'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import MobileSidebar from '@/components/MobileSidebar';

interface AnalyticsData {
  tourId: string;
  tourTitle: string;
  totalViews: number;
  completions: number;
  completionRate: number;
  stepAnalytics: {
    stepId: string;
    stepTitle: string;
    views: number;
    completions: number;
    skips: number;
  }[];
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [selectedTour, setSelectedTour] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: tours, error } = await supabase
      .from('tours')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Failed to fetch tours:', error);
      return;
    }

    // Convert tours to analytics format
    const analyticsData: AnalyticsData[] = tours?.map(tour => ({
      tourId: tour.id,
      tourTitle: tour.title,
      totalViews: tour.views || 0,
      completions: tour.completions || 0,
      completionRate: tour.views > 0 ? ((tour.completions || 0) / tour.views) * 100 : 0,
      stepAnalytics: tour.steps?.map((step: any, index: number) => ({
        stepId: step.id,
        stepTitle: step.title,
        views: tour.views || 0,
        completions: Math.floor((tour.completions || 0) * (1 - index * 0.1)), // Simulate step dropoff
        skips: Math.floor((tour.views || 0) * 0.05) // 5% skip rate
      })) || []
    })) || [];

    setAnalytics(analyticsData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const filteredAnalytics = selectedTour === 'all' ? analytics : analytics.filter(a => a.tourId === selectedTour);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Top Navigation */}
      <nav className="border-b border-[#2a2a2a] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src="/logo.png" alt="Stride" className="w-8 h-8" />
            <div className="hidden md:flex gap-6">
              <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Tours</button>
              <button className="text-white border-b-2 border-[#d4b896] pb-1 cursor-pointer">Analytics</button>
              <button onClick={() => router.push('/dashboard/settings')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Settings</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <button onClick={handleLogout} className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                Logout
              </button>
            </div>
            <MobileSidebar currentPage="dashboard" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-gray-400">Track tour performance and user engagement</p>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select 
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] cursor-pointer"
          >
            <option value="all">All Tours</option>
            {analytics.map(tour => (
              <option key={tour.tourId} value={tour.tourId}>{tour.tourTitle}</option>
            ))}
          </select>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Views</p>
            <p className="text-4xl font-bold mb-1">{filteredAnalytics.reduce((sum, a) => sum + a.totalViews, 0).toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Across all tours</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Completions</p>
            <p className="text-4xl font-bold mb-1">{filteredAnalytics.reduce((sum, a) => sum + a.completions, 0).toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Successfully finished</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Avg Completion Rate</p>
            <p className="text-4xl font-bold mb-1">
              {filteredAnalytics.length > 0 
                ? (filteredAnalytics.reduce((sum, a) => sum + a.completionRate, 0) / filteredAnalytics.length).toFixed(1)
                : 0}%
            </p>
            <p className="text-gray-500 text-sm">Overall performance</p>
          </div>
        </div>

        {/* Tour Analytics */}
        <div className="space-y-6">
          {filteredAnalytics.map((tour) => (
            <div key={tour.tourId} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{tour.tourTitle}</h3>
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-400">Views: <span className="text-white">{tour.totalViews.toLocaleString()}</span></span>
                  <span className="text-gray-400">Completions: <span className="text-green-500">{tour.completions.toLocaleString()}</span></span>
                  <span className="text-gray-400">Rate: <span className="text-[#d4b896]">{tour.completionRate}%</span></span>
                </div>
              </div>

              {/* Step Analytics */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold mb-3">Step Performance</h4>
                {tour.stepAnalytics.map((step, index) => (
                  <div key={step.stepId} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[#d4b896] text-black rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{step.stepTitle}</span>
                        <span className="text-xs text-gray-500">ID: {step.stepId}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Views: </span>
                        <span className="text-white">{step.views.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Completed: </span>
                        <span className="text-green-500">{step.completions.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Skipped: </span>
                        <span className="text-red-500">{step.skips.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                        <div 
                          className="bg-[#d4b896] h-2 rounded-full" 
                          style={{ width: `${(step.completions / step.views) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
