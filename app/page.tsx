import Image from 'next/image';
import { theme } from "@/app/components/components/Styles";
import Link from "next/link";

// FIX: Imported Show, removed the non-existent SignedIn and SignedOut exports
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#36ADA3]/30">
      
      {/* Hero Section Container - Added bottom padding (pb-20 md:pb-28) to protect layout against footers */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden isolate">
        
        {/* Background decorative element for subtle texture */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.teal.50),white)] opacity-70" />

        {/* Content Container */}
        <div className="px-[5%] md:px-[8%] lg:px-[12%] w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="flex flex-col justify-center text-left">
              <span className="text-[#36ADA3] font-bold uppercase tracking-wider text-sm mb-3 block">
                Welcome to the Hub
              </span>
              
              <h1 className="text-slate-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none mb-6">
                Cultivating Connections, <br />
                <span className="bg-gradient-to-r from-[#36ADA3] to-teal-700 bg-clip-text text-transparent">
                  Harvesting Ideas.
                </span>
              </h1>
              
              <h2 className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                <span className="text-[#36ADA3] font-semibold">Connect, cultivate, and trade:</span>{" "}
                your ultimate hub for sharing farming insights and premier agricultural products.
              </h2>
              
              {/* Action Buttons */}
              <div className="pt-8 flex flex-wrap gap-4 items-center">
                
                {/* FIX: Replaced <SignedOut> with <Show when="signed-out"> */}
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="px-8 py-3 bg-[#36ADA3] text-white font-semibold rounded-full text-base shadow-md shadow-teal-100 hover:bg-teal-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                      Sign In
                    </button>
                  </SignInButton>
                  
                  <SignUpButton mode="modal">
                    <button className="px-8 py-3 border-2 border-slate-200 bg-white text-slate-700 font-semibold rounded-full text-base hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                      Register Account
                    </button>
                  </SignUpButton>
                </Show>

                {/* FIX: Replaced <SignedIn> with <Show when="signed-in"> */}
                <Show when="signed-in">
                  <Link href="/features" className="px-8 py-3 bg-[#36ADA3] text-white font-semibold rounded-full text-base shadow-md shadow-teal-100 hover:bg-teal-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center">
                    Explore Features
                  </Link>
                  
                  <div className="flex items-center gap-3 bg-white border border-slate-200 py-2 px-4 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-slate-600">Account:</span>
                    <UserButton />
                  </div>
                </Show>

              </div>
            </div>
                        
            {/* Right Column: Description & Image Grid */}
            <div className="flex flex-col justify-center w-full">
              
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 border-l-4 border-teal-500 pl-4 lg:max-w-lg">
                Celebrating the journey from the soil (our roots) to a thriving, nourished community (rising together). 
                It highlights both agricultural abundance and human connection.
              </p>

              {/* 2x2 Clean Image Grid - Safe sizing so it lifts up cleanly away from items below it */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full aspect-square max-w-md lg:max-w-lg mx-auto">
                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/pics/download.jpeg"
                    alt="Farming community hub overview"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/pics/images (2).jpeg"
                    alt="Agricultural products showcase"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/pics/download (2).jpeg"
                    alt="Farmers sharing insights"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/pics/images (1).jpeg"
                    alt="Fresh local farm produce"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
              
          </div>
        </div>

      </section>
    </main>
  );
}