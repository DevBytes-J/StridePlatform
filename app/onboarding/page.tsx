'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'there';
    setUserName(name);

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const handleComplete = async () => {
    await supabase.auth.updateUser({
      data: { onboarding_completed: true }
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-20 rounded-full transition-all ${
                  i <= step ? 'bg-[#d4b896]' : 'bg-[#2a2a2a]'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">Step {step} of 3</p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="text-center animate-fadeIn">
            <div className="w-20 h-20 bg-[#d4b896] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {greeting}, <span className="text-[#d4b896]">{userName}</span>!
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Welcome to Stride. Create beautiful onboarding tours in minutes. Let's get you started with a quick walkthrough.
            </p>
            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
            >
              Let's Go
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="text-center animate-fadeIn">
            <div className="w-20 h-20 bg-[#d4b896] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Create Your First Tour</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Use our visual editor to build step-by-step tours. Target any element on your website with CSS selectors.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-[#2a2a2a] text-white font-medium rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="text-center animate-fadeIn">
            <div className="w-20 h-20 bg-[#d4b896] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Track Your Success</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Monitor completion rates, user engagement, and optimize your tours with real-time analytics.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-[#2a2a2a] text-white font-medium rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                className="px-8 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
