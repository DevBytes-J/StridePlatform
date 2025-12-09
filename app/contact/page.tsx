'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
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
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/contact" className="text-white">Contact</Link>
          </nav>
        </div>
        <Link href="/login">
          <button className="px-5 py-2.5 bg-[#d4b896] text-black text-sm font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer">
            Sign in
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-400">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-500 font-semibold">Message sent successfully!</p>
                  <p className="text-gray-400 text-sm mt-2">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] transition-colors"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md focus:outline-none focus:border-[#d4b896] transition-colors h-32 resize-none"
                      placeholder="Tell us how we can help..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#d4b896] text-black font-medium rounded-md hover:bg-[#c4a886] transition-all cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4b896] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-400">support@stride.com</p>
                    <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4b896] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live Chat</h3>
                    <p className="text-gray-400">Available Mon-Fri, 9am-5pm EST</p>
                    <button className="text-[#d4b896] text-sm mt-2 hover:underline cursor-pointer">
                      Start a conversation →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4b896] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Documentation</h3>
                    <p className="text-gray-400">Find answers in our docs</p>
                    <a href="/docs" className="text-[#d4b896] text-sm mt-2 hover:underline inline-block">
                      Browse documentation →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-[#0d0d0d] rounded-lg flex items-center justify-center hover:bg-[#d4b896] transition-colors cursor-pointer group">
                    <svg className="w-5 h-5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#0d0d0d] rounded-lg flex items-center justify-center hover:bg-[#d4b896] transition-colors cursor-pointer group">
                    <svg className="w-5 h-5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#0d0d0d] rounded-lg flex items-center justify-center hover:bg-[#d4b896] transition-colors cursor-pointer group">
                    <svg className="w-5 h-5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
