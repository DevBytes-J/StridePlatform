'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

interface Tour {
  id: string;
  title: string;
  description: string;
  status: string;
  views: number;
  completions: number;
  avg_time: number;
  rating: number;
  is_featured: boolean;
  is_high_priority: boolean;
  created_at: string;
  updated_at: string;
  steps: any[];
}

export default function Dashboard() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tours:', error);
      setTours([]);
    } else {
      setTours(data || []);
    }
    setLoading(false);
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete tour');
    } else {
      toast.success('Tour deleted');
      setTours(tours.filter(t => t.id !== id));
    }
  };

  const handleDuplicate = async (tour: Tour) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('tours').insert({
      user_id: user?.id,
      title: `${tour.title} (Copy)`,
      description: tour.description,
      status: 'draft',
      steps: tour.steps,
    });

    if (error) {
      toast.error('Failed to duplicate tour');
    } else {
      toast.success('Tour duplicated');
      fetchTours();
    }
  };

  const handlePublish = async (id: string) => {
    const { error } = await supabase
      .from('tours')
      .update({ status: 'active' })
      .eq('id', id);

    if (error) {
      toast.error('Failed to publish tour');
    } else {
      toast.success('Tour published');
      fetchTours();
    }
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tour.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalTours = tours.length;
  const activeUsers = tours.reduce((sum, t) => sum + t.views, 0);
  const avgCompletion = tours.length > 0
    ? Math.round(tours.reduce((sum, t) => sum + (t.views > 0 ? (t.completions / t.views) * 100 : 0), 0) / tours.length)
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 14) return '1 week ago';
    return `${Math.floor(days / 7)} weeks ago`;
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
              <button className="text-white border-b-2 border-[#d4b896] pb-1 cursor-pointer">Tours</button>
              <button onClick={() => router.push('/dashboard/analytics')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Analytics</button>
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Tours</h1>
            <p className="text-gray-400">Manage and track your onboarding experiences</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/tours/new')}
            className="px-6 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
          >
            + New Tour
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Tours</p>
            <p className="text-4xl font-bold mb-1">{totalTours}</p>
            <p className="text-gray-500 text-sm">All time</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Views</p>
            <p className="text-4xl font-bold mb-1">{activeUsers.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Across all tours</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Avg Completion</p>
            <p className="text-4xl font-bold mb-1">{avgCompletion}%</p>
            <p className="text-gray-500 text-sm">Across all tours</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] transition-colors"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Tour Cards */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading tours...</div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No tours yet. Create your first tour to get started!</p>
            <button 
              onClick={() => router.push('/dashboard/tours/new')}
              className="px-6 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
            >
              + Create Tour
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{tour.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${
                        tour.status === 'active' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {tour.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                      {tour.is_featured && (
                        <span className="px-2 py-1 bg-[#d4b896]/20 text-[#d4b896] text-xs rounded">Featured</span>
                      )}
                      {tour.is_high_priority && (
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-500 text-xs rounded">High Priority</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{tour.description || 'No description'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div>
                    <p className="text-2xl font-bold">{tour.views > 0 ? tour.views.toLocaleString() : '—'}</p>
                    <p className="text-gray-500 text-sm">views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {tour.views > 0 ? `${Math.round((tour.completions / tour.views) * 100)}%` : '—'}
                    </p>
                    <p className="text-gray-500 text-sm">completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{tour.avg_time > 0 ? formatTime(tour.avg_time) : '—'}</p>
                    <p className="text-gray-500 text-sm">avg time</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{tour.rating > 0 ? tour.rating.toFixed(1) : '—'}</p>
                    <p className="text-gray-500 text-sm">rating</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm">Created: {formatDate(tour.created_at)}</p>
                  <p className="text-gray-500 text-sm">Last edited: {getTimeAgo(tour.updated_at)}</p>
                  <p className="text-gray-500 text-sm">{tour.steps?.length || 0} steps</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => router.push(`/dashboard/tours/${tour.id}/edit`)}
                    className="px-4 py-2 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  {tour.status === 'draft' ? (
                    <button 
                      onClick={() => handlePublish(tour.id)}
                      className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer"
                    >
                      Publish
                    </button>
                  ) : (
                    <button 
                      onClick={() => router.push(`/dashboard/analytics?tour=${tour.id}`)}
                      className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer"
                    >
                      Analytics
                    </button>
                  )}
                  <button 
                    onClick={() => handleDuplicate(tour)}
                    className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer"
                  >
                    Duplicate
                  </button>
                  <button 
                    onClick={() => handleDelete(tour.id)}
                    className="px-4 py-2 border border-red-500/50 text-red-500 rounded-md hover:bg-red-500/10 transition-all cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
