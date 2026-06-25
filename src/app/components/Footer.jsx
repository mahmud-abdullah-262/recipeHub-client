import { LogoFacebook, LogoLinkedin } from '@gravity-ui/icons';
import { Mail, MapPin, Phone, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative text-secondary mt-12 overflow-hidden min-h-[400px] flex flex-col justify-between">
      {/* Background Image Container */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/images/footer.webp" // আপনার ইমেজের পাথ
          alt="footer background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Main Content Area */}
      {/* মোবাইলে ১ কলাম, বড় স্ক্রিনে আপনার ডিজাইন অনুযায়ী নরমাল ফ্লেক্স/গ্রিড লেআউট */}
      <div className="max-w-6xl w-full mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-1 gap-8">
        
        {/* Column 1: Logo & About */}
        <div className="flex flex-col mx-auto space-y-1 items-center">
          <Image
            src="/images/recipehub_logo_2.png"
            width={140}
            height={50}
            alt="RecipeHub Logo"
            className="object-contain"
          />
          <p className="text-sm text-center max-w-sm text-secondary">
            Your Favorite Recipe Platform
          </p>
        </div>

        {/* Column 2: Quick Links & Contact Info (বড় স্ক্রিনে আপনার দেওয়া পাশাপাশি জোড়া ডিজাইন) */}
        <div className="flex flex-col sm:flex-row mx-auto gap-8 sm:gap-16 items-center sm:items-start text-center sm:text-left">
          
          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <h3 className="text-lg font-bold border-b-2 border-[#f99f1d] pb-1">Quick Links</h3>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="/" className="hover:text-[#f99f1d] transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="/recipes" className="hover:text-[#f99f1d] transition-colors duration-200">Browse Recipes</a>
              </li>
              <li>
                <a href="/profile" className="hover:text-[#f99f1d] transition-colors duration-200">Profile</a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <h3 className="text-lg font-bold border-b-2 border-[#f99f1d] pb-1">Contact Us</h3>
            
            <div className="space-y-2 text-sm flex flex-col items-center sm:items-start">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#f99f1d] shrink-0" />
                <span>1/a, Dhanmondi, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-[#f99f1d] shrink-0" />
                <span>+88 100 000 1445</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-[#f99f1d] shrink-0" />
                <span>support@recipehub.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Social Links (আপনার কোডের মতো আলাদা নিচে এবং মাঝখানে থাকবে) */}
        <div className="flex space-x-4 mx-auto pt-2">
          <a href="#" className="p-2 bg-primary text-white rounded-full hover:bg-[#f99f1d] transition-colors duration-200">
            <LogoFacebook size={18} />
          </a>
          <a href="#" className="p-2 bg-primary text-white rounded-full hover:bg-[#f99f1d] transition-colors duration-200">
            <X size={18} />
          </a>
          <a href="#" className="p-2 bg-primary text-white rounded-full hover:bg-[#f99f1d] transition-colors duration-200">
            <LogoLinkedin size={18} />
          </a>
        </div>
        
      </div>

      {/* Copyright Bottom Bar */}
      <div className="w-full border-t border-gray-200/50 bg-primary text-white py-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;