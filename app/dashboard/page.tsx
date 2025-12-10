'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import MobileSidebar from '@/components/MobileSidebar';
import Modal from '@/components/Modal';

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
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, tourId: string, tourTitle: string}>({
    isOpen: false, tourId: '', tourTitle: ''
  });
  const [logoutModal, setLogoutModal] = useState(false);
  const router = useRouter();

  const totalTours = tours.length;
  const activeUsers = tours.reduce((sum, tour) => sum + tour.views, 0);
  const avgCompletion = tours.length > 0 
    ? Math.round(tours.reduce((sum, tour) => sum + (tour.views > 0 ? (tour.completions / tour.views) * 100 : 0), 0) / tours.length)
    : 0;

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (tour.description && tour.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || tour.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      toast.error('Failed to fetch tours');
    } else {
      setTours(data || []);
    }
    setLoading(false);
  };

  const handleGenerateEmbed = (tour: Tour) => {
    const embedCode = `<!-- Stride Tour Widget -->
<script src="https://stridecore.vercel.app/embed.js" data-tour-id="${tour.id}"></script>`;
    
    navigator.clipboard.writeText(embedCode);
    toast.success('Embed code copied to clipboard!');
  };

  const handleDelete = async (tourId: string) => {
    const { error } = await supabase.from('tours').delete().eq('id', tourId);
    if (error) {
      toast.error('Failed to delete tour');
    } else {
      toast.success('Tour deleted');
      fetchTours();
    }
    setDeleteModal({isOpen: false, tourId: '', tourTitle: ''});
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    setLogoutModal(false);
  };

  const handlePublish = async (tourId: string) => {
    const { error } = await supabase
      .from('tours')
      .update({ status: 'active' })
      .eq('id', tourId);
    
    if (error) {
      toast.error('Failed to publish tour');
    } else {
      toast.success('Tour published');
      fetchTours();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return '1 week ago';
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Toaster position="top-center" />
      
      {/* Top Navigation */}
      <nav className="border-b border-[#2a2a2a] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src="/logo.png" alt="Stride" className="w-8 h-8" />
            <div className="hidden md:flex gap-6">
              <button className="text-white border-b-2 border-[#d4b896] pb-1 cursor-pointer">Tours</button>
              <button onClick={() => router.push('/dashboard/analytics')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Analytics</button>
              <button onClick={() => router.push('/dashboard/settings')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Settings</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <button 
                onClick={() => setLogoutModal(true)}
                className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
            <MobileSidebar currentPage="dashboard" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Tours</h1>
              <p className="text-gray-400">Manage and track your onboarding experiences</p>
            </div>
          </div>
          <button 
            onClick={() => router.push('/dashboard/tours/new')}
            className="w-full md:w-auto px-6 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
          >
            + New Tour
          </button>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 min-w-48">
            <p className="text-gray-400 text-sm mb-2">Total Tours</p>
            <p className="text-4xl font-bold mb-1">{totalTours}</p>
            <p className="text-gray-500 text-sm">All time</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 min-w-48">
            <p className="text-gray-400 text-sm mb-2">Total Views</p>
            <p className="text-4xl font-bold mb-1">{activeUsers.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Across all tours</p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 min-w-48">
            <p className="text-gray-400 text-sm mb-2">Avg Completion</p>
            <p className="text-4xl font-bold mb-1">{avgCompletion}%</p>
            <p className="text-gray-500 text-sm">Across all tours</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              <div key={tour.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold truncate">{tour.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded whitespace-nowrap ${
                        tour.status === 'active' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {tour.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{tour.description || 'No description'}</p>
                  </div>
                  <button 
                    onClick={() => setDeleteModal({isOpen: true, tourId: tour.id, tourTitle: tour.title})}
                    className="text-red-500 hover:text-red-400 cursor-pointer p-1 flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xl font-bold truncate">{tour.views > 0 ? tour.views.toLocaleString() : '—'}</p>
                    <p className="text-gray-500 text-sm">views</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold truncate">
                      {tour.views > 0 ? `${Math.round((tour.completions / tour.views) * 100)}%` : '—'}
                    </p>
                    <p className="text-gray-500 text-sm">completed</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold truncate">{tour.avg_time > 0 ? formatTime(tour.avg_time) : '—'}</p>
                    <p className="text-gray-500 text-sm">avg time</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold truncate">{tour.rating > 0 ? tour.rating.toFixed(1) : '—'}</p>
                    <p className="text-gray-500 text-sm">rating</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="flex flex-col md:flex-row gap-2 text-gray-500 text-sm">
                    <span>Created: {formatDate(tour.created_at)}</span>
                    <span>Last edited: {getTimeAgo(tour.updated_at)}</span>
                    <span>{tour.steps?.length || 0} steps</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => router.push(`/dashboard/tours/${tour.id}/edit`)}
                    className="px-4 py-2 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleGenerateEmbed(tour)}
                    className="px-4 py-2 border border-[#d4b896] text-[#d4b896] rounded-md hover:bg-[#d4b896]/10 transition-all cursor-pointer"
                  >
                    Get Embed Code
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
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({isOpen: false, tourId: '', tourTitle: ''})}
        onConfirm={() => handleDelete(deleteModal.tourId)}
        title="Delete Tour"
        message={`Are you sure you want to delete "${deleteModal.tourTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="bg-red-500 hover:bg-red-600"
      />

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
    </div>
  );
}
