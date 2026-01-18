import { useToast } from '../context/ToastContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotifications } from '../context/NotificationContext'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', accountType: '', message: '' })
  const { showToast } = useToast()
  const { addNotification } = useNotifications()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNotification({
      type: 'info',
      title: 'Support Ticket Submitted',
      message: `${formData.name ? formData.name + ' - ' : ''}${formData.accountType ? '[' + formData.accountType + '] ' : ''}${formData.message}`
    })
    showToast({ title: 'Ticket Submitted', message: 'Support ticket submitted successfully.', type: 'success' })
    setFormData({ name: '', accountType: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-white">BankApp</Link>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-[#64FFDA] transition-colors">Home</Link>
              <Link to="/about" className="text-white hover:text-[#64FFDA] transition-colors">About</Link>
              <Link to="/contact" className="text-[#64FFDA] font-semibold">Contact</Link>
              <Link to="/login" className="px-6 py-2 bg-[#64FFDA] text-[#0A192F] rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(100,255,218,0.5)] transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Customer Support</h1>
            <p className="text-xl text-gray-300">We're here to help 24/7</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-[#64FFDA] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Address</h4>
                      <p className="text-gray-300">123 Financial District, Nairobi, Ngong Moringa 10004</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-[#64FFDA] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-semibold mb-1">24/7 Support Line</h4>
                      <p className="text-gray-300">+1 (800) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-[#64FFDA] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email</h4>
                      <p className="text-gray-300">support@bankapp.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Ticket Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Submit a Support Ticket</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Account Type</label>
                  <select
                    value={formData.accountType}
                    onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                  >
                    <option value="" className="bg-[#0A192F]">Select account type</option>
                    <option value="personal" className="bg-[#0A192F]">Personal</option>
                    <option value="business" className="bg-[#0A192F]">Business</option>
                    <option value="premium" className="bg-[#0A192F]">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="5"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                    placeholder="Describe your issue..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#64FFDA] text-[#0A192F] rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(100,255,218,0.5)] transition-all"
                >
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}