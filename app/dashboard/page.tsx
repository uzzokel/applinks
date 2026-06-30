"use client"; // 👈 Crucial: This allows interaction and state switching

import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image"; 
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Define how many rows you want to show at once
const ITEMS_PER_PAGE = 10;

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<"overview" | "database" | "analytics">("overview");
    const [dbData, setDbData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 📱 Mobile sidebar state
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    
    const { isLoaded, userId } = useAuth();
    const router = useRouter();

    // 🔒 Guard clause on client side
    useEffect(() => {
        if (isLoaded && !userId) {
            router.push("/sign-in");
        }
    }, [isLoaded, userId, router]);

    // Fetch data when database or analytics tabs are loaded
    useEffect(() => {
        if (activeTab === "database" || activeTab === "analytics") {
            setLoading(true);
            fetch('/api/neon-data')
                .then(res => res.json())
                .then(data => {
                    setDbData(data.records || []);
                    setLoading(false);
                    setCurrentPage(1); // Reset to page 1 on fresh fetch
                })
                .catch(() => setLoading(false));
        }
    }, [activeTab]);

    // Simple print handler
    const handlePrint = () => {
        window.print();
    };

    if (!isLoaded || !userId) return <div className="p-8">Loading session...</div>;

    // --- DATA AGGREGATION & ANALYTICS LOGIC ---
    
    // 1. Total Unique Users
    const uniqueUsers = new Set(dbData.map(item => item.user_id || item.userId || item.id).filter(Boolean));
    const totalUsers = uniqueUsers.size;

    // 2. Aggregate Data by Product / Crop Name
    const productAggregates = dbData.reduce((acc: { [key: string]: { totalQty: number; count: number } }, item) => {
        const name = item.product_name || item.productName || "Unknown Crop";
        const qty = Number(item.quantity) || 0;
        
        if (!acc[name]) {
            acc[name] = { totalQty: 0, count: 0 };
        }
        acc[name].totalQty += qty;
        acc[name].count += 1;
        return acc;
    }, {});

    const chartData = Object.entries(productAggregates).map(([name, data]) => ({
        name,
        quantity: data.totalQty,
        frequency: data.count
    }));

    // Sizing factors for visual normalization
    const maxQuantity = Math.max(...chartData.map(d => d.quantity), 1);
    const totalRecordEntries = dbData.length || 1;

    // Fixed color palette for Crop Type Distribution
    const colorPalette = [
        "bg-emerald-500 text-emerald-500 border-emerald-200",
        "bg-amber-500 text-amber-500 border-amber-200",
        "bg-indigo-500 text-indigo-500 border-indigo-200",
        "bg-rose-500 text-rose-500 border-rose-200",
        "bg-cyan-500 text-cyan-500 border-cyan-200"
    ];

    // --- PAGINATION SLICING ---
    const totalItems = dbData.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = dbData.slice(startIndex, endIndex);

    return (
        // FIXED: Added h-screen and overflow-hidden to the top-level container to contain desktop scrolling correctly
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-gray-50">
            
            {/* MOBILE TOP BAR NAVIGATION HEADER */}
            <header className="flex lg:hidden items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-50 print:hidden">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Image 
                        src="/pics/images.jpeg" 
                        alt="logo"
                        width={40} 
                        height={40}
                        priority 
                        className="w-8 h-8 rounded-full object-contain" 
                    />
                    <span className="text-xl italic font-bold text-gray-900">
                        <span className="text-gray-400">Appl</span>ication
                    </span>
                </Link>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-hidden"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        {isSidebarOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        )}
                    </svg>
                </button>
            </header>

            {/* SIDEBAR BACKDROP OVERLAY FOR MOBILE */}
            {/* CHANGED: Adjusted top offset position to top-[73px] so the mask overlay sits nicely below the top header bar */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-x-0 bottom-0 top-[73px] bg-gray-900/40 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR PANE */}
            {/* CHANGED: Replaced inset-y-0 with top-[73px] bottom-0 for the mobile fluid wrapper frame layout */}
            {/* SIDEBAR PANE */}
            <aside className={`fixed top-[104px] bottom-0 left-0 w-64 border-r border-gray-200 bg-white p-6 flex flex-col justify-between z-40 transform transition-transform duration-300 ease-in-out lg:top-[96px] lg:translate-x-0 lg:relative lg:inset-auto lg:h-[calc(100vh-96px)] flex-shrink-0 print:hidden ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="space-y-6">
                    
                    {/* Brand / Logo Area (Desktop Hidden version inside Sidebar) */}
                    <div className="hidden lg:block text-xl font-bold text-gray-900 px-2">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Image 
                                src="/pics/images.jpeg" 
                                alt="logo"
                                width={80} 
                                height={80}
                                priority 
                                className="w-12 h-12 rounded-full object-contain" 
                            />
                            <span className="text-2xl italic font-bold text-gray-900">
                                <span className="text-gray-400">Appl</span>ication
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col space-y-1">
                        <button 
                            onClick={() => { setActiveTab("overview"); setIsSidebarOpen(false); }}
                            className={`px-4 py-2.5 rounded-lg font-medium text-left transition-colors ${
                                activeTab === "overview" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <span className="flex items-center gap-2">Overview</span>
                        </button>
                        
                        <button 
                            onClick={() => { setActiveTab("database"); setIsSidebarOpen(false); }}
                            className={`px-4 py-2.5 rounded-lg font-medium text-left transition-colors flex items-center gap-2 ${
                                activeTab === "database" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <span className={`h-2 w-2 rounded-full ${activeTab === "database" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></span>
                            Neon Database
                        </button>

                        <button 
                            onClick={() => { setActiveTab("analytics"); setIsSidebarOpen(false); }}
                            className={`px-4 py-2.5 rounded-lg font-medium text-left transition-colors flex items-center gap-2 ${
                                activeTab === "analytics" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v16.5M21 19.5H3.75M6.75 12v3m3.75-6v6m3.75-9v9M18 6.75v12.75" />
                            </svg>
                            Database Analytics
                        </button>

                        {/* PRINT BUTTON */}
                        {activeTab === "database" && (
                            <button 
                                onClick={handlePrint}
                                className="mt-2 px-4 py-2.5 rounded-lg font-medium text-left transition-colors text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 border border-dashed border-indigo-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.82l-.024-.03c-1.167-1.469-1.33-3.546-.388-5.184l.206-.358m10.74 5.572l.025-.03c1.167-1.469 1.33-3.546.387-5.184l-.206-.358M7.5 19.5h9a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-9A1.5 1.5 0 006 12v6a1.5 1.5 0 001.5 1.5zm.75-12h7.5A1.5 1.5 0 0017.25 6V4.5A1.5 1.5 0 0015.75 3H8.25A1.5 1.5 0 006.75 4.5V6A1.5 1.5 0 008.25 7.5z" />
                                </svg>
                                Print Database Table
                            </button>
                        )}
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

            {/* MAIN PANE */}
            <main className="flex-1 h-full pt-[104px] p-4 sm:p-8 lg:pt-[96px] overflow-y-auto print:overflow-visible print:p-0">
        <header className="mb-6 border-b border-gray-200 pb-4 print:hidden">
         <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "database" && "Neon Database Cluster"}
            {activeTab === "analytics" && "Cluster Graphical Insights"}
        </h1>
        </header>
                
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 min-h-[calc(100vh-10rem)] shadow-sm print:border-none print:shadow-none print:p-0">
                    
                    {/* OVERVIEW TAB */}
                    {activeTab === "overview" && (
                        <p className="text-gray-600 text-sm sm:text-base">
                            Welcome! Access your direct cluster rows under **Neon Database**, or view charts under **Database Analytics**.
                        </p>
                    )}

                    {/* GRAPHICS & ANALYTICS TAB */}
                    {activeTab === "analytics" && (
                        <div>
                            {loading ? (
                                <p className="text-sm text-gray-400 animate-pulse">Calculating real-time graphical models...</p>
                            ) : chartData.length === 0 ? (
                                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
                                    [ No live dataset entries detected to structure visuals ]
                                </div>
                            ) : (
                                <div className="space-y-6 sm:space-y-8">
                                    
                                    {/* 1. TOTAL USERS STAT BOX */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                        <div className="p-5 sm:p-6 bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl text-white shadow-md relative overflow-hidden">
                                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Total Unique Cluster Users</p>
                                            <p className="text-3xl sm:text-4xl font-mono font-bold mt-2">{totalUsers}</p>
                                            <div className="absolute right-4 bottom-4 text-slate-700/40 pointer-events-none hidden sm:block">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* VISUAL CHARTS ROW GRID */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                                        
                                        {/* 2. CROP TYPE DISTRIBUTION (Pie Chart Substitution) */}
                                        <div className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-slate-50/50">
                                            <div className="mb-4">
                                                <h3 className="text-base font-bold text-gray-800">Crop Allocation Share</h3>
                                                <p className="text-xs text-gray-500">Distribution proportion based on entry frequency counts.</p>
                                            </div>
                                            
                                            {/* SEGMENTED COMPOSITE PROGRESS LINE */}
                                            <div className="w-full flex h-4 rounded-full overflow-hidden mb-6 shadow-sm border border-gray-200">
                                                {chartData.map((item, idx) => {
                                                    const percent = (item.frequency / totalRecordEntries) * 100;
                                                    const currentPalette = colorPalette[idx % colorPalette.length].split(" ")[0];
                                                    return (
                                                        <div 
                                                            key={idx} 
                                                            className={`${currentPalette} h-full transition-all`} 
                                                            style={{ width: `${percent}%` }}
                                                            title={`${item.name}: ${percent.toFixed(1)}%`}
                                                        />
                                                    );
                                                })}
                                            </div>

                                            {/* CHART PIE LEGEND DISTRIBUTION BREAKDOWN */}
                                            <div className="space-y-2">
                                                {chartData.map((item, idx) => {
                                                    const percent = (item.frequency / totalRecordEntries) * 100;
                                                    const colorClasses = colorPalette[idx % colorPalette.length].split(" ");
                                                    return (
                                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm bg-white p-2.5 border border-gray-100 rounded-lg gap-1 sm:gap-0 shadow-2xs">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`w-3 h-3 rounded-full flex-none ${colorClasses[0]}`}></span>
                                                                <span className="font-medium text-gray-700 truncate">{item.name}</span>
                                                            </div>
                                                            <span className="text-xs font-mono font-semibold text-gray-500 pl-5 sm:pl-0">
                                                                {item.frequency} entries ({percent.toFixed(1)}%)
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* 3. QUANTITIES METRIC (Pure Tailwind Custom Bar Chart Layout) */}
                                        <div className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-slate-50/50">
                                            <div className="mb-4">
                                                <h3 className="text-base font-bold text-gray-800">Total Quantity Volumes</h3>
                                                <p className="text-xs text-gray-500">Summed gross inventory numbers calculated per distinct item profile.</p>
                                            </div>

                                            <div className="space-y-4">
                                                {chartData.map((item, idx) => {
                                                    const fillPct = (item.quantity / maxQuantity) * 100;
                                                    return (
                                                        <div key={idx} className="space-y-1.5">
                                                            <div className="flex flex-col sm:flex-row justify-between text-xs font-medium text-gray-600 gap-0.5 sm:gap-0">
                                                                <span className="truncate">{item.name}</span>
                                                                <span className="font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-bold self-start sm:self-auto">{item.quantity} units</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 h-5 rounded-md overflow-hidden shadow-inner">
                                                                <div 
                                                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-md transition-all duration-700 ease-out"
                                                                    style={{ width: `${fillPct}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* DATABASE TAB */}
                    {activeTab === "database" && (
                        <div>
                            <p className="text-gray-600 text-xs sm:text-sm mb-4 print:hidden">
                                Live streaming key observation records from your database. Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} entries.
                            </p>
                            
                            {loading ? (
                                <p className="text-sm text-gray-400 animate-pulse">Querying cloud rows...</p>
                            ) : dbData.length === 0 ? (
                                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400 print:hidden">
                                    [ No data returned or API route setup required ]
                                </div>
                            ) : (
                                <div className="flex flex-col justify-between min-h-[500px]">
                                    
                                    {/* Responsive table wrapper */}
                                    <div className="w-full overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
                                        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-4 sm:px-6 py-4 font-semibold text-gray-900">User ID</th>
                                                    <th scope="col" className="px-4 sm:px-6 py-4 font-semibold text-gray-900">Product Name</th>
                                                    <th scope="col" className="px-4 sm:px-6 py-4 font-semibold text-gray-900">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {paginatedData.map((row: any, index: number) => {
                                                    const rawUserId = String(row.user_id || row.userId || row.id || "");
                                                    const shortenedUserId = rawUserId.length > 10 
                                                        ? `${rawUserId.substring(0, 6)}...${rawUserId.substring(rawUserId.length - 4)}`
                                                        : rawUserId;

                                                    return (
                                                        <tr key={row.id || index} className="hover:bg-gray-50/70 transition-colors">
                                                            <td className="whitespace-nowrap px-4 sm:px-6 py-4 font-mono text-xs font-medium text-gray-900" title={rawUserId}>
                                                                {shortenedUserId || "—"}
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-gray-600 text-xs sm:text-sm">
                                                                {row.product_name || row.productName || "—"}
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-gray-600 font-mono text-xs sm:text-sm">
                                                                {row.quantity ?? "0"}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* PAGINATION CONTROLS */}
                                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 sm:px-6 mt-4 print:hidden">
                                        <div className="flex flex-1 justify-between sm:hidden">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
                                                    <span className="font-semibold text-gray-900">{totalPages}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                    <button
                                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                        disabled={currentPage === 1}
                                                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        &larr;
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                        disabled={currentPage === totalPages}
                                                        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        &rarr;
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}