import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#0A192F]">
      {/* Glassmorphism Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-white">BankApp</Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-[#64FFDA] font-semibold">Home</Link>
              <Link to="/about" className="text-white hover:text-[#64FFDA] transition-colors">About</Link>
              <Link to="/contact" className="text-white hover:text-[#64FFDA] transition-colors">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-white hover:text-[#64FFDA] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 text-white hover:text-[#64FFDA] transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#64FFDA] rounded-full"></span>
              </button>
              <Link
                to="/login"
                className="px-6 py-2 bg-[#64FFDA] text-[#0A192F] rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(100,255,218,0.5)] transition-all"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="absolute right-0 top-0 h-full w-64 bg-[#0A192F] shadow-xl">
          <div className="p-6 space-y-4">
            <button onClick={() => setMobileMenuOpen(false)} className="text-white mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link to="/" className="block text-white hover:text-[#64FFDA] py-2">Home</Link>
            <Link to="/about" className="block text-white hover:text-[#64FFDA] py-2">About</Link>
            <Link to="/contact" className="block text-white hover:text-[#64FFDA] py-2">Contact</Link>
            <Link to="/login" className="block w-full text-center px-6 py-2 bg-[#64FFDA] text-[#0A192F] rounded-lg font-semibold mt-4">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://cdn.pixabay.com/video/2022/12/07/142267-779533809_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A192F]/50"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-[#64FFDA] text-xl md:text-2xl font-semibold mb-4">Welcome to the Future of Banking</p>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Secure. Swift. <span className="text-[#64FFDA]">Seamless.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Experience next-generation banking with cutting-edge security, instant transfers, and intelligent financial insights at your fingertips.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 bg-[#64FFDA] text-[#0A192F] text-lg font-bold rounded-lg hover:shadow-[0_0_30px_rgba(100,255,218,0.6)] transform hover:scale-105 transition-all duration-300"
          >
            Experience the Future
          </Link>
        </div>
      </div>
    </div>
  )
}