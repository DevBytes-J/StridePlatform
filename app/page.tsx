'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white" style={{ margin: 0, padding: 0 }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-[#1f1f1f] animate-fadeInDown" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1.25rem', paddingBottom: '1.25rem' }}>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Stride Logo" width={32} height={32} className="hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold">Stride</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-gray-400">
            <a href="/features" className="hover:text-white transition-all hover:-translate-y-1">Features</a>
            <a href="/about" className="hover:text-white transition-all hover:-translate-y-1">About</a>
            <a href="/docs" className="hover:text-white transition-all hover:-translate-y-1">Docs</a>
            <a href="/contact" className="hover:text-white transition-all hover:-translate-y-1">Contact</a>
          </nav>
        </div>
        <a href="/signup">
          <button className="px-5 py-2.5 bg-[#d4b896] text-black text-sm font-medium rounded-md hover:bg-[#c4a886] transition-all hover:scale-110 hover:shadow-lg cursor-pointer">
            Sign up
          </button>
        </a>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-24 pb-32" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '6rem', paddingBottom: '8rem' }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight animate-fadeInLeft">
              Guide Your<br />Users, <span className="text-[#d4b896]">Step by<br />Step</span>
            </h1>
            <p className="text-gray-400 text-lg lg:text-xl mb-10 max-w-lg leading-relaxed animate-fadeInLeft delay-200">
              Create beautiful onboarding tours in minutes. No coding required, just
              clean elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInLeft delay-300">
              <Link href="/signup">
                <button className="px-7 py-3.5 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all hover:scale-110 hover:shadow-2xl animate-glow cursor-pointer">
                  Get Started Free
                </button>
              </Link>
              <button className="px-7 py-3.5 border border-[#2a2a2a] text-white font-medium rounded-md hover:bg-[#1a1a1a] transition-all hover:scale-105 hover:border-[#d4b896] cursor-pointer">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative animate-fadeInRight delay-200">
            <div className="w-72 h-96 bg-[#141414] rounded-xl border border-[#2a2a2a] p-6 shadow-2xl hover:border-[#3a3a3a] transition-all animate-float">
              <div className="flex gap-1.5 mb-6">
                <div className="w-3 h-3 bg-[#3a3a3a] rounded-full hover:bg-red-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-[#3a3a3a] rounded-full hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-[#3a3a3a] rounded-full hover:bg-green-500 transition-colors cursor-pointer"></div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="h-3 bg-[#1f1f1f] rounded w-3/4 animate-shimmer"></div>
                <div className="h-3 bg-[#1f1f1f] rounded w-full animate-shimmer delay-100"></div>
                <div className="h-3 bg-[#1f1f1f] rounded w-2/3 animate-shimmer delay-200"></div>
              </div>
              <div className="h-32 bg-[#1f1f1f] rounded-lg mb-4 hover:bg-[#252525] transition-colors"></div>
              <div className="h-3 bg-[#1f1f1f] rounded w-1/2"></div>
              
              <div className="absolute top-24 -right-6 bg-[#d4b896] text-black p-4 rounded-lg shadow-2xl w-40 animate-pulse hover:scale-110 transition-transform cursor-pointer">
                <div className="text-sm font-semibold mb-2">Add New</div>
                <div className="text-xs text-gray-800 leading-relaxed">Click here to create your first tour</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="px-6 lg:px-12 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 animate-fadeInUp">Premium Features</h2>
          <p className="text-gray-400 text-center mb-20 text-lg animate-fadeInUp delay-100">Everything you need to create world-class user experiences</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 hover:border-[#d4b896] transition-all hover:transform hover:scale-110 hover:shadow-2xl group animate-scaleIn delay-200 cursor-pointer">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d4b896] transition-all group-hover:rotate-12">
                <svg className="w-7 h-7 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-lg group-hover:text-[#d4b896] transition-colors">Easy Setup</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Get started in minutes with our intuitive, zero-learning curve interface</p>
            </div>

            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 hover:border-[#d4b896] transition-all hover:transform hover:scale-110 hover:shadow-2xl group animate-scaleIn delay-300 cursor-pointer">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d4b896] transition-all group-hover:rotate-12">
                <svg className="w-7 h-7 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-lg group-hover:text-[#d4b896] transition-colors">Track Progress</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Monitor user engagement and tour completion with real-time insights and live analytics</p>
            </div>

            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 hover:border-[#d4b896] transition-all hover:transform hover:scale-110 hover:shadow-2xl group animate-scaleIn delay-400 cursor-pointer">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d4b896] transition-all group-hover:rotate-12">
                <svg className="w-7 h-7 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-lg group-hover:text-[#d4b896] transition-colors">Light & Fast</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Optimized for speed and built for performance and speed</p>
            </div>

            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 hover:border-[#d4b896] transition-all hover:transform hover:scale-110 hover:shadow-2xl group animate-scaleIn delay-500 cursor-pointer">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d4b896] transition-all group-hover:rotate-12">
                <svg className="w-7 h-7 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                  <circle cx="6.5" cy="11.5" r="1.5"/>
                  <circle cx="9.5" cy="7.5" r="1.5"/>
                  <circle cx="14.5" cy="7.5" r="1.5"/>
                  <circle cx="17.5" cy="11.5" r="1.5"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-lg group-hover:text-[#d4b896] transition-colors">Fully Custom</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Customize every aspect to control over design and workflow</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 animate-fadeInUp">How It Works</h2>
          <p className="text-gray-400 text-center mb-20 text-lg animate-fadeInUp delay-100">Three simple steps to transform your user experience</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group animate-slideInFromBottom delay-200">
              <div className="relative mb-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#d4b896] text-black rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg group-hover:scale-125 transition-transform">
                  1
                </div>
                <div className="w-full h-56 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#2a2a2a] overflow-hidden group-hover:border-[#d4b896] transition-all group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="p-6 h-full flex flex-col justify-center items-center">
                    <div className="w-20 h-20 bg-[#222222] rounded-lg mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#d4b896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </div>
                    <div className="space-y-2 w-full">
                      <div className="h-2 bg-[#222222] rounded w-3/4 mx-auto"></div>
                      <div className="h-2 bg-[#222222] rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-3 text-xl">Create Your Tour</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">Design your tour in our intuitive editor with drag-and-drop simplicity</p>
            </div>

            <div className="text-center group animate-slideInFromBottom delay-400">
              <div className="relative mb-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#d4b896] text-black rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg group-hover:scale-125 transition-transform">
                  2
                </div>
                <div className="w-full h-56 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#2a2a2a] overflow-hidden group-hover:border-[#d4b896] transition-all group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="p-6 h-full flex flex-col justify-center">
                    <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-xs text-left">
                      <div className="text-gray-500 mb-2">// Add to your site</div>
                      <div className="text-[#d4b896]">&lt;script</div>
                      <div className="text-gray-300 ml-4">src=<span className="text-green-400">"stride.js"</span></div>
                      <div className="text-[#d4b896]">&gt;&lt;/script&gt;</div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-3 text-xl">Add to Website</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">One simple line of code and you are good to go</p>
            </div>

            <div className="text-center group animate-slideInFromBottom delay-600">
              <div className="relative mb-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#d4b896] text-black rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg group-hover:scale-125 transition-transform">
                  3
                </div>
                <div className="w-full h-56 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#2a2a2a] overflow-hidden group-hover:border-[#d4b896] transition-all group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="p-6 h-full flex flex-col justify-center items-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-[#222222] rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-[#d4b896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#d4b896] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#d4b896] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-[#d4b896] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-3 text-xl">Users Get Guided</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">Watch your users confidently navigate with expert guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Yourself */}
      <section className="px-6 lg:px-12 py-24 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 animate-fadeInUp">Try It Yourself</h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-fadeInUp delay-100">Experience the magic of Stride in action</p>
          
          <div className="bg-[#111111] border border-[#222222] rounded-2xl p-10 shadow-2xl hover:border-[#d4b896] transition-all animate-scaleIn delay-200">
            <div className="flex gap-2 mb-8">
              <div className="w-3 h-3 bg-[#3a3a3a] rounded-full"></div>
              <div className="w-3 h-3 bg-[#3a3a3a] rounded-full"></div>
              <div className="w-3 h-3 bg-[#3a3a3a] rounded-full"></div>
            </div>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center py-4 border-b border-[#1f1f1f]">
                <span className="text-gray-400 text-sm">Total Users</span>
                <span className="text-3xl font-bold">12,458</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#d4b896] to-[#b89968] w-3/4 rounded-full transition-all duration-1000"></div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-[#1f1f1f]">
                <span className="text-gray-400 text-sm">Tours</span>
                <span className="text-3xl font-bold">23</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#d4b896] to-[#b89968] w-1/4 rounded-full transition-all duration-1000"></div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-[#1f1f1f]">
                <span className="text-gray-400 text-sm">Completion Rate</span>
                <span className="text-3xl font-bold">94%</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#d4b896] to-[#b89968] w-[94%] rounded-full transition-all duration-1000"></div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="px-8 py-4 bg-[#d4b896] text-black font-semibold rounded-lg hover:bg-[#c4a886] transition-all hover:scale-110 shadow-lg animate-glow hover:shadow-2xl cursor-pointer">
                ▶ Start Demo Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-16 border-t border-[#1f1f1f] animate-fadeInUp">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="Stride Logo" width={32} height={32} />
                <span className="font-semibold">Stride</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">Elevating user experiences, one tour at a time</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/docs" className="hover:text-white transition-colors">Docs</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1f1f1f] gap-4">
            <p className="text-sm text-gray-400">© 2025 Stride. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#d4b896] transition-all hover:scale-125 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4b896] transition-all hover:scale-125 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4b896] transition-all hover:scale-125 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
