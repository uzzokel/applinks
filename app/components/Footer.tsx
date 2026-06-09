"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-[5%] md:px-[8%] lg:px-[12%] py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Branding */}
          <div className="md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight">
              <span className="bg-gradient-to-r from-[#36ADA3] to-teal-500 w-3 h-6 rounded-sm block" />
              The Hub
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              From the soil to a thriving community. Your definitive platform for agricultural exchange, marketplace trading, and local updates.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/marketplace" className="hover:text-[#36ADA3] transition-colors">Marketplace</Link></li>
              <li><Link href="/insights" className="hover:text-[#36ADA3] transition-colors">Farming Insights</Link></li>
              <li><Link href="/features" className="hover:text-[#36ADA3] transition-colors">Hub Features</Link></li>
              <li><Link href="/pricing" className="hover:text-[#36ADA3] transition-colors">Premium Trade</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/guides" className="hover:text-[#36ADA3] transition-colors">Crop Guides</Link></li>
              <li><Link href="/weather" className="hover:text-[#36ADA3] transition-colors">Regional Weather</Link></li>
              <li><Link href="/support" className="hover:text-[#36ADA3] transition-colors">Help & Support</Link></li>
              <li><Link href="/community" className="hover:text-[#36ADA3] transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Stay Harvested</h3>
            <p className="text-sm mb-4">Get notifications on agricultural trading trends and community tips.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#36ADA3] w-full"
                required 
              />
              <button type="submit" className="bg-[#36ADA3] hover:bg-teal-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Divider and Copyright section */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 Agricultural Hub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}