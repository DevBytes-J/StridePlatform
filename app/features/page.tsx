'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Features() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Stride Logo" width={32} height={32} />
            <span className="font-semibold">Stride</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/features" className="text-white">Features</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
        <Link href="/signup">
          <button className="px-5 py-2.5 bg-[#d4b896] text-black text-sm font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer">
            Get Started
          </button>
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 lg:px-12 py-24 text-center">
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">Powerful Features for<br /><span className="text-[#d4b896]">Seamless Onboarding</span></h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">Everything you need to create, manage, and optimize user onboarding experiences</p>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Visual Tour Builder */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#d4b896] transition-all">
            <div className="w-16 h-16 bg-[#d4b896] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Visual Tour Builder</h3>
            <p className="text-gray-400 mb-6">Create stunning onboarding tours with our intuitive drag-and-drop interface. No coding required—just point, click, and customize.</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Drag-and-drop step creation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Real-time preview</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Rich text editor</span>
              </li>
            </ul>
          </div>

          {/* CSS Selector Targeting */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#d4b896] transition-all">
            <div className="w-16 h-16 bg-[#d4b896] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">CSS Selector Targeting</h3>
            <p className="text-gray-400 mb-6">Target any element on your website with precision using CSS selectors. Highlight buttons, forms, menus, and more.</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>ID, class, and attribute selectors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Complex selector support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Element validation</span>
              </li>
            </ul>
          </div>

          {/* Smart Positioning */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#d4b896] transition-all">
            <div className="w-16 h-16 bg-[#d4b896] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Positioning</h3>
            <p className="text-gray-400 mb-6">Tooltips automatically adjust to fit on screen with collision detection. Choose from top, bottom, left, or right positioning.</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Auto-adjusting tooltips</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Collision detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Responsive on all devices</span>
              </li>
            </ul>
          </div>

          {/* Real-Time Analytics */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#d4b896] transition-all">
            <div className="w-16 h-16 bg-[#d4b896] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Real-Time Analytics</h3>
            <p className="text-gray-400 mb-6">Track user engagement, completion rates, and tour performance with detailed analytics and insights.</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>View and completion tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Average time metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>User feedback ratings</span>
              </li>
            </ul>
          </div>

          {/* One-Click Embed */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#d4b896] transition-all">
            <div className="w-16 h-16 bg-[#d4b896] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">One-Click Embed</h3>
            <p className="text-gray-400 mb-6">Deploy your tours instantly with a single line of code. Copy, paste, and you're live in seconds.</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Single script tag integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Works on any website</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>No backend required</span>
              </li>
            </ul>
          </div>

          {/* Multi-Step Tours */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-[#d4b896] transition-all">
            <div className="w-16 h-16 bg-[#d4b896] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Multi-Step Tours</h3>
            <p className="text-gray-400 mb-6">Create comprehensive onboarding flows with unlimited steps. Guide users through complex workflows effortlessly.</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Unlimited tour steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Progress indicators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4b896] mt-1">✓</span>
                <span>Skip and navigation controls</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-24 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">Create your first tour in minutes. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="px-8 py-4 bg-[#d4b896] text-black font-semibold rounded-lg hover:bg-[#c4a886] transition-all hover:scale-110 cursor-pointer">
                Start Free Trial
              </button>
            </Link>
            <Link href="/docs">
              <button className="px-8 py-4 border border-[#2a2a2a] text-white font-semibold rounded-lg hover:bg-[#1a1a1a] transition-all hover:border-[#d4b896] cursor-pointer">
                View Documentation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
