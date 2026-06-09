'use client';
import { useState, useEffect } from "react";
import Link from "next/link"; 
import Image from "next/image";
import { FaUserGraduate } from "react-icons/fa";
import "bootstrap-icons/font/bootstrap-icons.css";
import { HiMenu, HiX } from "react-icons/hi"; 
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
// ADDED: Import modern Clerk components
import { SignInButton, UserButton, Show } from '@clerk/nextjs';

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Blog", path: "/blog" }
];

const socialMedia = [
  { label: "Facebook", url: "https://facebook.com/yourprofile", icon: FaFacebook },
  { label: "Twitter", url: "https://twitter.com/yourprofile", icon: FaTwitter },
  { label: "LinkedIn", url: "https://linkedin.com/in/yourprofile", icon: FaLinkedin },
  { label: "Instagram", url: "https://instagram.com/yourprofile", icon: FaInstagram }
];

export default function Navbar() {
  const [activeMenuItem, selectActiveItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    selectActiveItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="left-0 w-full z-50 bg-white transition-all duration-500 border shadow-md top-0 p-2 rounded-xl border-gray-100 shadow-sm">
      <div className="flex justify-between items-center px-[8%] lg:px-[5%] py-4">
        
        {/* Logo Section */}
        <div className="flex flex-col leading-tight z-50">
          {/* FIXED: Removed the nested <button> tag to avoid invalid HTML hydration errors */}
          <Link href="/" onClick={handleClick} className="flex items-center gap-2 font-semibold">
            <Image 
              src="/pics/images (1).jpg" 
              alt="logo"
              width={80} // Adjusted to a more standard navbar size
              height={80}
              priority 
              className="w-15 h-15 object-contain"
            />
            <span className="text-2xl italic font-bold">
              <span className="text-cyan-400">Agri</span>Hub
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex text-lg items-center gap-5 cursor-pointer text-gray-500 font-medium Sync">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link 
                href={item.path} 
                onClick={() => selectActiveItem(item.label)} 
                className={`relative nav-menu transition-all duration-300 cursor-pointer ${
                  activeMenuItem === item.label ? "active-nav text-cyan-400" : "text-gray-500 hover:text-[#36ADA3]"
                }`}
              >
                {item.label}
              </Link>   
            </li>
          ))}
        </ul>

        {/* Right Action side: Socials & Auth */}
        <div className="flex items-center gap-4 z-50">
          <ul className="hidden lg:flex items-center gap-5">
            {socialMedia.map((site, i) => {
              const IconComponent = site.icon; 
              return (
                <li key={i}>
                  <a 
                    href={site.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={site.label} 
                    className="text-blue-500 hover:text-[#36ADA3] transition-colors duration-300 transform hover:-translate-y-2 block"
                  >
                    <IconComponent size={24} />
                  </a>
                </li>
              );
            })}
          </ul>         

          {/* CHANGED: Desktop Authentication Flow */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hidden sm:flex border items-center gap-2 rounded-full px-4 py-1.5 border-gray-300 text-black hover:bg-gray-100 transition-colors cursor-pointer font-medium text-sm">
                <FaUserGraduate />
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <div className="hidden sm:block">
              <UserButton />
            </div>
          </Show>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="text-gray-700 text-3xl lg:hidden focus:outline-none transition-transform duration-300 hover:scale-110"
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle menu"
          >
            <i className={`bi ${menuOpen ? "bi-x" : "bi-list"}`}></i>
          </button>
          
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      <div className={`fixed inset-0 top-0 left-0 h-screen w-full bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full pt-24 px-6 gap-6 text-xl font-medium">
          {menuItems.map((item, i) => (
            <Link 
              key={i}
              href={item.path} 
              onClick={() => {
                selectActiveItem(item.label);
                setMenuOpen(false); 
              }} 
              className={`border-b pb-3 ${activeMenuItem === item.label ? "text-cyan-400" : "text-gray-600"}`}
            >
              {item.label}
            </Link> 
          ))}
          
          {/* CHANGED: Mobile Authentication Flow */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button 
                onClick={() => setMenuOpen(false)}
                className="flex sm:hidden items-center gap-2 text-cyan-400 mt-4 font-semibold cursor-pointer"
              >
                <FaUserGraduate /> Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <div className="flex sm:hidden items-center gap-3 mt-4 border-t pt-4" onClick={() => setMenuOpen(false)}>
              <UserButton />
              <span className="text-base text-gray-600 font-medium">Manage Account</span>
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}