'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import MobileSidebar from '@/components/MobileSidebar';

interface Step {
  id: string;
  selector: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export default function NewTour() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>({
    id: '',
    selector: '',
    title: '',
    content: '',
    position: 'bottom'
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const generateUniqueId = () => {
    return `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addStep = () => {
    if (!currentStep.selector || !currentStep.title || !currentStep.content) {
      toast.error('Fill all step fields');
      return;
    }
    
    const newStep = { 
      ...currentStep, 
      id: generateUniqueId()
    };
    
    setSteps([...steps, newStep]);
    setCurrentStep({ id: '', selector: '', title: '', content: '', position: 'bottom' });
    toast.success('Step added');
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const saveTour = async (status: 'draft' | 'active') => {
    if (!title) {
      toast.error('Tour title is required');
      return;
    }
    if (steps.length < 5) {
      toast.error('Tour must have at least 5 steps');
      return;
    }

    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('tours').insert({
      user_id: user?.id,
      title,
      description,
      status,
      steps
    });

    if (error) {
      toast.error('Failed to save tour');
      setSaving(false);
    } else {
      toast.success(`Tour ${status === 'draft' ? 'saved as draft' : 'published'}!`);
      router.push('/dashboard');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Toaster position="top-center" />
      
      {/* Top Bar */}
      <div className="border-b border-[#2a2a2a] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileSidebar currentPage="dashboard" />
          <button 
            onClick={() => router.push('/dashboard')}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Create New Tour</h1>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => saveTour('draft')}
            disabled={saving}
            className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer disabled:opacity-50"
          >
            Save Draft
          </button>
          <button 
            onClick={() => saveTour('active')}
            disabled={saving}
            className="px-4 py-2 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer disabled:opacity-50"
          >
            Publish Tour
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Left: Tour Details */}
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Tour Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tour Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896]"
                  placeholder="Welcome Tour"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] h-24 resize-none"
                  placeholder="Guide new users through your app..."
                />
              </div>
            </div>
          </div>

          {/* Add Step Form */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Add Step</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">CSS Selector</label>
                <input
                  type="text"
                  value={currentStep.selector}
                  onChange={(e) => setCurrentStep({...currentStep, selector: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896]"
                  placeholder="#signup-button"
                />
                <p className="text-xs text-gray-500 mt-1">Target element on your website</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Step Title</label>
                <input
                  type="text"
                  value={currentStep.title}
                  onChange={(e) => setCurrentStep({...currentStep, title: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896]"
                  placeholder="Create Your Account"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  value={currentStep.content}
                  onChange={(e) => setCurrentStep({...currentStep, content: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] h-24 resize-none"
                  placeholder="Click here to sign up and get started..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tooltip Position</label>
                <select
                  value={currentStep.position}
                  onChange={(e) => setCurrentStep({...currentStep, position: e.target.value as any})}
                  className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] cursor-pointer"
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <button 
                onClick={addStep}
                className="w-full px-4 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
              >
                + Add Step
              </button>
            </div>
          </div>
        </div>

        {/* Right: Steps Preview */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Tour Steps ({steps.length}/5 minimum)</h2>
            {steps.length < 5 && (
              <span className="text-red-500 text-sm">Need {5 - steps.length} more steps</span>
            )}
          </div>
          {steps.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No steps added yet. Add at least 5 steps to create a tour.</p>
          ) : (
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.id} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#d4b896] text-black rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <h3 className="font-bold">{step.title}</h3>
                    </div>
                    <button 
                      onClick={() => removeStep(step.id)}
                      className="text-red-500 hover:text-red-400 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{step.content}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>ID: <code className="text-[#d4b896]">{step.id}</code></span>
                    <span>Selector: <code className="text-[#d4b896]">{step.selector}</code></span>
                    <span>Position: {step.position}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
