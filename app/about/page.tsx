'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-[#1f1f1f] animate-fadeInDown">
        <div className="flex items-center gap-12">
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:rotate-180 transition-transform duration-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0d0d0d"/>
                <path d="M2 17L12 22L22 17" stroke="#0d0d0d" strokeWidth="2"/>
              </svg>
            </div>
            <span className="font-semibold">TourGuide</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition-all hover:-translate-y-1">Home</a>
            <a href="#" className="hover:text-white transition-all hover:-translate-y-1">Features</a>
            <a href="#" className="hover:text-white transition-all hover:-translate-y-1">Pricing</a>
            <a href="#" className="hover:text-white transition-all hover:-translate-y-1">Docs</a>
          </nav>
        </div>
        <button className="px-5 py-2.5 bg-[#d4b896] text-black text-sm font-medium rounded-md hover:bg-[#c4a886] transition-all hover:scale-110 hover:shadow-lg">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fadeInUp">
            About TourGuide
          </h1>
          <p className="text-gray-400 text-xl lg:text-2xl leading-relaxed animate-fadeInUp delay-100">
            We're on a mission to make user onboarding simple, beautiful, and effective for everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeInLeft">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              TourGuide was born from a simple frustration: creating user onboarding tours was too complicated, too time-consuming, and required too much technical knowledge.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              We believed there had to be a better way. A way that would let anyone create beautiful, engaging tours without writing a single line of code.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Today, thousands of companies trust TourGuide to help their users discover and love their products.
            </p>
          </div>
          <div className="animate-fadeInRight delay-200">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-[#2a2a2a] p-12 hover:border-[#d4b896] transition-all hover:scale-105">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="animate-scaleIn delay-300">
                  <div className="text-5xl font-bold text-[#d4b896] mb-2">10K+</div>
                  <div className="text-gray-400">Active Users</div>
                </div>
                <div className="animate-scaleIn delay-400">
                  <div className="text-5xl font-bold text-[#d4b896] mb-2">500+</div>
                  <div className="text-gray-400">Companies</div>
                </div>
                <div className="animate-scaleIn delay-500">
                  <div className="text-5xl font-bold text-[#d4b896] mb-2">1M+</div>
                  <div className="text-gray-400">Tours Created</div>
                </div>
                <div className="animate-scaleIn delay-600">
                  <div className="text-5xl font-bold text-[#d4b896] mb-2">98%</div>
                  <div className="text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 lg:px-12 py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fadeInUp">Our Mission</h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-12 animate-fadeInUp delay-100">
            To empower every product team to create exceptional user experiences through intuitive, beautiful onboarding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 hover:border-[#d4b896] transition-all hover:scale-105 animate-slideInFromBottom delay-200">
              <div className="w-16 h-16 bg-[#d4b896] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We believe powerful tools should be simple to use. No complexity, just results.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 hover:border-[#d4b896] transition-all hover:scale-105 animate-slideInFromBottom delay-300">
              <div className="w-16 h-16 bg-[#d4b896] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We're constantly pushing boundaries to deliver cutting-edge solutions.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 hover:border-[#d4b896] transition-all hover:scale-105 animate-slideInFromBottom delay-400">
              <div className="w-16 h-16 bg-[#d4b896] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">User-First</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every decision we make starts with one question: How does this help our users?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-6 animate-fadeInUp">Meet Our Team</h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-fadeInUp delay-100">
            The passionate people behind TourGuide
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group animate-scaleIn delay-200">
              <div className="w-32 h-32 bg-gradient-to-br from-[#d4b896] to-[#b89968] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Sarah Johnson</h3>
              <p className="text-gray-400 text-sm mb-2">CEO & Founder</p>
              <p className="text-gray-500 text-xs">Building the future of onboarding</p>
            </div>

            <div className="text-center group animate-scaleIn delay-300">
              <div className="w-32 h-32 bg-gradient-to-br from-[#d4b896] to-[#b89968] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Michael Chen</h3>
              <p className="text-gray-400 text-sm mb-2">CTO</p>
              <p className="text-gray-500 text-xs">Engineering excellence</p>
            </div>

            <div className="text-center group animate-scaleIn delay-400">
              <div className="w-32 h-32 bg-gradient-to-br from-[#d4b896] to-[#b89968] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Emily Rodriguez</h3>
              <p className="text-gray-400 text-sm mb-2">Head of Design</p>
              <p className="text-gray-500 text-xs">Crafting beautiful experiences</p>
            </div>

            <div className="text-center group animate-scaleIn delay-500">
              <div className="w-32 h-32 bg-gradient-to-br from-[#d4b896] to-[#b89968] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">David Kim</h3>
              <p className="text-gray-400 text-sm mb-2">Head of Product</p>
              <p className="text-gray-500 text-xs">Driving product vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fadeInUp">Join Us on Our Journey</h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-10 animate-fadeInUp delay-100">
            Be part of the revolution in user onboarding. Start creating amazing tours today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-200">
            <button className="px-8 py-4 bg-[#d4b896] text-black font-semibold rounded-lg hover:bg-[#c4a886] transition-all hover:scale-110 shadow-lg animate-glow">
              Get Started Free
            </button>
            <button className="px-8 py-4 border border-[#2a2a2a] text-white font-semibold rounded-lg hover:bg-[#1a1a1a] transition-all hover:scale-105 hover:border-[#d4b896]">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-16 border-t border-[#1f1f1f] animate-fadeInUp">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0d0d0d"/>
                    <path d="M2 17L12 22L22 17" stroke="#0d0d0d" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-semibold">TourGuide</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">Elevating user experiences, one tour at a time</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1f1f1f] gap-4">
            <p className="text-sm text-gray-400">© 2025 TourGuide. All rights reserved.</p>
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
