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

    // Convert tours to analytics format with mock data
    const analyticsData: AnalyticsData[] = tours?.map((tour, index) => ({
      tourId: tour.id,
      tourTitle: tour.title,
      totalViews: tour.views || (150 + index * 50), // Mock views
      completions: tour.completions || (100 + index * 30), // Mock completions
      completionRate: tour.views > 0 ? ((tour.completions || 0) / tour.views) * 100 : (65 + index * 5), // Mock rate
      stepAnalytics: tour.steps?.map((step: any, stepIndex: number) => ({
        stepId: step.id,
        stepTitle: step.title,
        views: 150 + index * 50 - stepIndex * 10, // Mock decreasing views per step
        completions: 120 + index * 40 - stepIndex * 15, // Mock decreasing completions
        skips: 10 + stepIndex * 5 // Mock increasing skips
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
      <main className="px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-gray-400">Track tour performance and user engagement</p>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select 
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            className="w-full md:w-auto px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] cursor-pointer"
          >
            <option value="all">All Tours</option>
            {analytics.map(tour => (
              <option key={tour.tourId} value={tour.tourId}>{tour.tourTitle}</option>
            ))}
          </select>
        </div>

        {/* Overview Cards */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 min-w-48">
            <p className="text-gray-400 text-sm mb-2">Total Views</p>
            <p className="text-3xl md:text-4xl font-bold mb-1">{filteredAnalytics.reduce((sum, a) => sum + a.totalViews, 0).toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Across all tours</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 min-w-48">
            <p className="text-gray-400 text-sm mb-2">Total Completions</p>
            <p className="text-3xl md:text-4xl font-bold mb-1">{filteredAnalytics.reduce((sum, a) => sum + a.completions, 0).toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Successfully finished</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 min-w-48">
            <p className="text-gray-400 text-sm mb-2">Avg Completion Rate</p>
            <p className="text-3xl md:text-4xl font-bold mb-1">
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
            <div key={tour.tourId} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-bold">{tour.tourTitle}</h3>
                <div className="flex flex-wrap gap-4 text-sm">
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[#d4b896] text-black rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{step.stepTitle}</span>
                        <span className="text-xs text-gray-500 hidden md:inline">ID: {step.stepId}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-2">
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
