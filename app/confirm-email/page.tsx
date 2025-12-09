'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';

  return (
    <div className="max-w-md w-full text-center">
      <div className="mb-8">
        <img src="/logo.png" alt="Stride Logo" className="w-12 h-12 mx-auto mb-4" />
        <div className="w-16 h-16 bg-[#d4b896] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">Check Your Email</h1>
        <p className="text-gray-400 mb-2">
          We sent a confirmation link to
        </p>
        <p className="text-[#d4b896] font-medium mb-6">{email}</p>
        <p className="text-gray-400 text-sm">
          Click the link in the email to verify your account and get started.
        </p>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-left">
        <p className="text-sm text-gray-400 mb-3">Didn't receive the email?</p>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>• Check your spam or junk folder</li>
          <li>• Make sure you entered the correct email</li>
          <li>• Wait a few minutes and check again</li>
        </ul>
      </div>

      <p className="text-center text-gray-400 mt-6 text-sm">
        <a href="/login" className="text-[#d4b896] hover:underline">
          Back to login
        </a>
      </p>
    </div>
  );
}

export default function ConfirmEmail() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6">
      <Suspense fallback={
        <div className="max-w-md w-full text-center">
          <div className="w-12 h-12 mx-auto mb-4 animate-spin rounded-full border-4 border-[#d4b896] border-t-transparent"></div>
        </div>
      }>
        <ConfirmEmailContent />
      </Suspense>
    </div>
  );
}
