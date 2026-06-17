import React from 'react'
import { theme } from "@/app/components/components/Styles";
import Link from "next/link";
// 1. Added Next.js Image import to fix the logo image rendering
import Image from "next/image"; 
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const Dashboard = async () => {
    
    // 🔒 Guard clause: Redirects logged-out users to sign-in before rendering anything
    await auth.protect();

    return (
        <div className="flex h-screen w-full bg-gray-50">
            
            {/* 1. SIDEBAR PANE */}
            <aside className="w-64 border-r border-gray-200 bg-white p-6 flex flex-col justify-between">
                <div className="space-y-6">
                    
                    {/* Brand / Logo Area */}
                    <div className="text-xl font-bold text-gray-900 px-2">
                        {/* 2. Removed onClick={handleClick} so it works seamlessly on the server side */}
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Image 
                                src="/pics/images.jpeg" 
                                alt="logo"
                                width={80} 
                                height={80}
                                priority 
                                className="w-12 h-12 rounded-full object-contain " // Adjusted slightly to fit a clean sidebar profile
                            />
                            <span className="text-2xl italic font-bold text-gray-900">
                                <span className="text-gray-400">Appl</span>ication
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col space-y-1">
                        <Link 
                            href="/dashboard" 
                            className="px-4 py-2.5 rounded-lg bg-gray-100 font-medium text-gray-900 transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link 
                            href="/blog" 
                            className="px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* Profile Controls */}
                <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center space-x-3 px-2">
                        <UserButton />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Profile</span>
                            <span className="text-xs text-gray-400">Signed In</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* 2. DASHBOARD PANE */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-6 border-b border-gray-200 pb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                </header>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 min-h-[calc(100vh-12rem)] shadow-sm">
                    <p className="text-gray-600">
                        Your core dashboard layout content goes here.
                    </p>
                </div>
            </main>

        </div>
    )
}

export default Dashboard;










// import React from 'react'
// import { theme } from "@/app/components/components/Styles";
// import Link from "next/link";
// // Update the import to use 'Show' instead of SignedIn/SignedOut
// import { UserButton, Show, SignInButton } from "@clerk/nextjs";

// const Dashboard = () => {
//     return (
//         <div className="flex h-screen w-full bg-gray-50">
            
//             {/* 1. SIDEBAR PANE (Smaller column) */}
//             <aside className="w-64 border-r border-gray-200 bg-white p-6 flex flex-col justify-between">
//                 <div className="space-y-6">
//                     {/* Brand / Logo Area */}
//                     <div className="text-xl font-bold text-gray-900 px-2">
//                         Application
//                     </div>

//                     {/* Navigation Links */}
//                     <nav className="flex flex-col space-y-1">
//                         <Link 
//                             href="/dashboard" 
//                             className="px-4 py-2.5 rounded-lg bg-gray-100 font-medium text-gray-900 transition-colors"
//                         >
//                             Dashboard
//                         </Link>
//                         <Link 
//                             href="/blog" 
//                             className="px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
//                         >
//                             Blog
//                         </Link>
//                     </nav>
//                 </div>

//                 {/* Clerk Auth Section (Bottom of Sidebar) */}
//                 <div className="border-t border-gray-100 pt-4">
//                     {/* Used for signed-in state */}
//                     <Show when="signed-in">
//                         <div className="flex items-center space-x-3 px-2">
//                             <UserButton />
//                             <div className="flex flex-col">
//                                 <span className="text-sm font-medium text-gray-700">Profile</span>
//                                 <span className="text-xs text-gray-400">Signed In</span>
//                             </div>
//                         </div>
//                     </Show>
                    
//                     {/* Used for signed-out state */}
//                     <Show when="signed-out">
//                         <SignInButton mode="modal">
//                             <button className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
//                                 Sign In
//                             </button>
//                         </SignInButton>
//                     </Show>
//                 </div>
//             </aside>

//             {/* 2. DASHBOARD PANE (Larger fluid column) */}
//             <main className="flex-1 p-8 overflow-y-auto">
//                 {/* Dashboard Header */}
//                 <header className="mb-6 border-b border-gray-200 pb-4">
//                     <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//                 </header>
                
//                 {/* Main Content Body */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 min-h-[calc(100vh-12rem)] shadow-sm">
//                     <p className="text-gray-600">
//                         Your core dashboard layout content goes here.
//                     </p>
//                 </div>
//             </main>

//         </div>
//     )
// }

// export default Dashboard