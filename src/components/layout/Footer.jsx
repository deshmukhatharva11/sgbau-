import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiGlobe,
  FiHeart,
  FiArrowUp
} from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IH</span>
              </div>
              <span className="text-xl font-bold">Innovation Hub</span>
            </div>
            <p className="text-secondary-400 mb-6 leading-relaxed">
              Maharashtra's premier innovation platform connecting students, colleges, and investors to build the next generation of successful startups.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <FiFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Students</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/submit-idea" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Submit Your Idea
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/competitions" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Competitions
                </Link>
              </li>
              <li>
                <Link to="/funding" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Funding Opportunities
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  Student Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-primary-400 mt-1 flex-shrink-0" size={18} />
                <div className="text-secondary-400">
                  <p>Innovation Hub Maharashtra</p>
                  <p>Rajiv Gandhi IT Park</p>
                  <p>Hinjawadi, Pune - 411057</p>
                  <p>Maharashtra, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-secondary-400">+91 20 6789 1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-secondary-400">hello@innovationhub.gov.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiGlobe className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-secondary-400">www.innovationhub.maharashtra.gov.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-secondary-400">Get the latest news and updates from Innovation Hub</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-secondary-400"
              />
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-r-lg transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-1 text-secondary-400 mb-4 md:mb-0">
              <span>© 2024 Innovation Hub Maharashtra. Made with</span>
              <FiHeart className="text-red-500" size={16} />
              <span>in Maharashtra</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-secondary-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-secondary-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-secondary-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                title="Back to top"
              >
                <FiArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Government Footer */}
      <div className="bg-secondary-950 border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-secondary-500">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <span>A Government of Maharashtra Initiative</span>
              <span>|</span>
              <span>Department of Information Technology</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Last Updated: January 2024</span>
              <span>|</span>
              <span>Version 1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
