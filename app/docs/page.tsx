'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Docs() {
  const [copiedCode, setCopiedCode] = useState('');
  const [activeSection, setActiveSection] = useState('introduction');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['introduction', 'installation', 'quickstart', 'tours', 'steps', 'selectors', 'positioning', 'analytics', 'api', 'customization'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

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
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/docs" className="text-white">Docs</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
        <Link href="/login">
          <button className="px-5 py-2.5 bg-[#d4b896] text-black text-sm font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer">
            Sign in
          </button>
        </Link>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-[#1f1f1f] h-screen sticky top-0 overflow-y-auto">
          <nav className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Getting Started</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#introduction" className={`transition-colors ${activeSection === 'introduction' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Introduction</a></li>
                <li><a href="#installation" className={`transition-colors ${activeSection === 'installation' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Installation</a></li>
                <li><a href="#quickstart" className={`transition-colors ${activeSection === 'quickstart' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Quick Start</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Core Concepts</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#tours" className={`transition-colors ${activeSection === 'tours' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Creating Tours</a></li>
                <li><a href="#steps" className={`transition-colors ${activeSection === 'steps' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Tour Steps</a></li>
                <li><a href="#selectors" className={`transition-colors ${activeSection === 'selectors' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>CSS Selectors</a></li>
                <li><a href="#positioning" className={`transition-colors ${activeSection === 'positioning' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Positioning</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Advanced</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#analytics" className={`transition-colors ${activeSection === 'analytics' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Analytics</a></li>
                <li><a href="#api" className={`transition-colors ${activeSection === 'api' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>API Reference</a></li>
                <li><a href="#customization" className={`transition-colors ${activeSection === 'customization' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>Customization</a></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-12 py-12 max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-gray-400 mb-12">Everything you need to create amazing onboarding experiences</p>

          {/* Introduction */}
          <section id="introduction" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Stride is a powerful platform for creating interactive onboarding tours for your website. Guide your users through key features with beautiful, customizable tooltips that appear exactly where you need them.
            </p>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Visual tour builder with drag-and-drop interface</li>
                <li>• CSS selector targeting for precise element positioning</li>
                <li>• Real-time analytics and completion tracking</li>
                <li>• Responsive design that works on all devices</li>
                <li>• One-line embed code for easy integration</li>
              </ul>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Installation</h2>
            <p className="text-gray-400 mb-4">Get started in three simple steps:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">1. Create Your Account</h3>
                <p className="text-gray-400 mb-3">Sign up for a free account at <a href="/signup" className="text-[#d4b896] hover:underline">stride.com/signup</a></p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">2. Create a Tour</h3>
                <p className="text-gray-400 mb-3">Use the dashboard to create your first tour with custom steps</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">3. Add the Embed Code</h3>
                <p className="text-gray-400 mb-3">Copy the embed code from your tour's analytics page and paste it into your website's HTML:</p>
                <div className="relative">
                  <pre className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 overflow-x-auto">
                    <code className="text-[#d4b896] text-sm">{`<script src="https://yoursite.com/stridecore.js" 
        data-tour-id="your-tour-id">
</script>`}</code>
                  </pre>
                  <button
                    onClick={() => copyCode('<script src="https://yoursite.com/stridecore.js" data-tour-id="your-tour-id"></script>', 'embed')}
                    className="absolute top-2 right-2 px-3 py-1 bg-[#1a1a1a] text-sm rounded hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    {copiedCode === 'embed' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quickstart" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
            <p className="text-gray-400 mb-6">Create your first tour in under 5 minutes:</p>
            
            <div className="space-y-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#d4b896] text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Define Your Tour</h3>
                    <p className="text-gray-400 text-sm">Give your tour a name and description that explains its purpose</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#d4b896] text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Add Steps</h3>
                    <p className="text-gray-400 text-sm">For each step, specify a CSS selector, title, content, and tooltip position</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#d4b896] text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Publish & Embed</h3>
                    <p className="text-gray-400 text-sm">Publish your tour and copy the embed code to your website</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Creating Tours */}
          <section id="tours" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Creating Tours</h2>
            <p className="text-gray-400 mb-6">Tours are collections of steps that guide users through your application.</p>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3">Tour Properties</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-2 text-gray-400">Property</th>
                    <th className="text-left py-2 text-gray-400">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-[#2a2a2a]">
                    <td className="py-3"><code className="text-[#d4b896]">title</code></td>
                    <td className="py-3">The name of your tour</td>
                  </tr>
                  <tr className="border-b border-[#2a2a2a]">
                    <td className="py-3"><code className="text-[#d4b896]">description</code></td>
                    <td className="py-3">A brief description of what the tour covers</td>
                  </tr>
                  <tr className="border-b border-[#2a2a2a]">
                    <td className="py-3"><code className="text-[#d4b896]">status</code></td>
                    <td className="py-3">Either "draft" or "active"</td>
                  </tr>
                  <tr>
                    <td className="py-3"><code className="text-[#d4b896]">steps</code></td>
                    <td className="py-3">Array of step objects</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tour Steps */}
          <section id="steps" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Tour Steps</h2>
            <p className="text-gray-400 mb-6">Each step in your tour highlights a specific element on your page.</p>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="font-semibold mb-3">Step Structure</h3>
              <pre className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-400">{`{
  "selector": "#signup-button",
  "title": "Create Your Account",
  "content": "Click here to get started with a free account",
  "position": "bottom"
}`}</code>
              </pre>
            </div>
          </section>

          {/* CSS Selectors */}
          <section id="selectors" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">CSS Selectors</h2>
            <p className="text-gray-400 mb-6">Use CSS selectors to target specific elements on your page.</p>
            
            <div className="space-y-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <code className="text-[#d4b896]">#element-id</code>
                <p className="text-gray-400 text-sm mt-2">Target by ID</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <code className="text-[#d4b896]">.class-name</code>
                <p className="text-gray-400 text-sm mt-2">Target by class</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <code className="text-[#d4b896]">button[data-action="submit"]</code>
                <p className="text-gray-400 text-sm mt-2">Target by attribute</p>
              </div>
            </div>
          </section>

          {/* Positioning */}
          <section id="positioning" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Positioning</h2>
            <p className="text-gray-400 mb-6">Control where tooltips appear relative to the target element.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-center">
                <code className="text-[#d4b896]">top</code>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-center">
                <code className="text-[#d4b896]">bottom</code>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-center">
                <code className="text-[#d4b896]">left</code>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-center">
                <code className="text-[#d4b896]">right</code>
              </div>
            </div>
          </section>

          {/* Analytics */}
          <section id="analytics" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Analytics</h2>
            <p className="text-gray-400 mb-6">Track how users interact with your tours.</p>
            
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="font-semibold mb-3">Metrics Tracked</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong>Views:</strong> Number of times the tour was started</li>
                <li>• <strong>Completions:</strong> Number of users who finished the tour</li>
                <li>• <strong>Avg Time:</strong> Average time to complete the tour</li>
                <li>• <strong>Rating:</strong> User feedback scores</li>
              </ul>
            </div>
          </section>

          {/* API Reference */}
          <section id="api" className="mb-16">
            <h2 className="text-3xl font-bold mb-4">API Reference</h2>
            <p className="text-gray-400 mb-6">Integrate Stride programmatically with our REST API.</p>
            
            <div className="space-y-6">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <h3 className="font-semibold mb-2">Get Tour Data</h3>
                <code className="text-[#d4b896] text-sm">GET /api/tours/[id]</code>
                <p className="text-gray-400 text-sm mt-2">Fetch tour configuration and steps</p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <h3 className="font-semibold mb-2">Track Events</h3>
                <code className="text-[#d4b896] text-sm">POST /api/tours/[id]/track</code>
                <p className="text-gray-400 text-sm mt-2">Send view, completion, and rating events</p>
              </div>
            </div>
          </section>

          {/* Support */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
            <p className="text-gray-400 mb-6">Our team is here to help you succeed</p>
            <a href="mailto:support@stride.com">
              <button className="px-6 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer">
                Contact Support
              </button>
            </a>
          </section>
        </main>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#d4b896] text-black rounded-full shadow-lg hover:bg-[#c4a886] transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
