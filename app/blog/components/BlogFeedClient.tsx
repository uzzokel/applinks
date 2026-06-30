"use client";

import React, { useState, useTransition } from 'react';
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { createPost, createComment, toggleLike, deletePost, getPosts } from "../actions";

const theme = {
  primaryColor: "#121358", // Midnight Navy
  secondaryColor: "#36ADA3" // Teal
};

interface BlogFeedClientProps {
  initialPosts: any[];
  currentUserId: string | null;
}

export default function BlogFeedClient({ initialPosts, currentUserId }: BlogFeedClientProps) {
  const [activeTab, setActiveTab] = useState<"feed" | "my-posts" | "create">("feed");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Initialize with server data
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const [isPending, startTransition] = useTransition();
  
  // Creation States
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<"General" | "Crops" | "Livestock" | "AgriTech" | "Marketplace">("General");
  
  // Reply Engine States
  const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();

  // Refresh data when state-mutating actions happen
  const refreshFeed = async () => {
    const updated = await getPosts();
    setPosts(updated);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    startTransition(async () => {
      await createPost(newPostContent, newPostCategory, newPostTags);
      setNewPostContent("");
      setNewPostTags("");
      setNewPostCategory("General");
      setActiveTab("feed");
      await refreshFeed();
    });
  };

  const handleToggleLike = async (postId: string) => {
    startTransition(async () => {
      await toggleLike(postId);
      await refreshFeed(); 
    });
  };

  const handleAddReply = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!replyContent.trim() || !user) return;

    startTransition(async () => {
      await createComment(postId, replyContent);
      setReplyContent("");
      setActiveReplyBox(null);
      await refreshFeed(); 
    });
  };

  const handleDeletePost = async (postId: string) => {
    startTransition(async () => {
      await deletePost(postId);
      await refreshFeed(); 
    });
  };

  const toggleCommentsView = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const baseFiltered = activeTab === "my-posts" 
    ? posts.filter(post => post.authorId === currentUserId) 
    : posts;

  const filteredPosts = selectedCategory === "All" 
    ? baseFiltered 
    : baseFiltered.filter(post => post.category === selectedCategory);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-72px)] mt-[72px] w-full overflow-hidden bg-slate-50 text-slate-800">
      {/* MOBILE HEADER */}
      <header className="flex lg:hidden items-center justify-between bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-black text-xl tracking-tight" style={{ color: theme.primaryColor }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: theme.primaryColor }}>🌾</div>
          <span>Agri<span style={{ color: theme.secondaryColor }}>Hub</span></span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            {isSidebarOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
          </svg>
        </button>
      </header>

      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed top-[72px] bottom-0 left-0 w-64 border-r border-slate-200 bg-white p-6 flex flex-col justify-between z-40 transform transition-transform duration-300 ease-in-out lg:top-[72px] lg:translate-x-0 lg:relative lg:inset-auto lg:h-[calc(100vh-72px)] flex-shrink-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="space-y-6">
          <div className="hidden lg:block font-black text-2xl tracking-tight px-2" style={{ color: theme.primaryColor }}>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base shadow-xs" style={{ backgroundColor: theme.primaryColor }}>🌾</div>
              <span>Agri<span style={{ color: theme.secondaryColor }}>Hub</span></span>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => { setActiveTab("feed"); setIsSidebarOpen(false); }}
              className="px-4 py-2.5 rounded-xl font-semibold text-left text-sm transition-colors"
              style={{ 
                backgroundColor: activeTab === "feed" ? `${theme.primaryColor}10` : "transparent",
                color: activeTab === "feed" ? theme.primaryColor : "#475569"
              }}
            >
              Community Exchange
            </button>
            
            {currentUserId && (
              <button 
                onClick={() => { setActiveTab("my-posts"); setIsSidebarOpen(false); }}
                className="px-4 py-2.5 rounded-xl font-semibold text-left text-sm transition-colors"
                style={{ 
                  backgroundColor: activeTab === "my-posts" ? `${theme.primaryColor}10` : "transparent",
                  color: activeTab === "my-posts" ? theme.primaryColor : "#475569"
                }}
              >
                My Shared Insights
              </button>
            )}

            {currentUserId ? (
              <button 
                onClick={() => { setActiveTab("create"); setIsSidebarOpen(false); }}
                className="mt-4 w-full px-4 py-2.5 text-white rounded-xl text-sm font-bold text-center shadow-xs transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: theme.primaryColor }}
                disabled={isPending}
              >
                {/* 2. FIXED: Invalid xmlns value */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {isPending ? "Publishing..." : "Publish Entry"}
              </button>
            ) : (
              <div className="pt-4 px-2">
                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 text-white font-semibold text-sm rounded-xl transition-all" style={{ backgroundColor: theme.primaryColor }}>
                    Sign In to Contribute
                  </button>
                </SignInButton>
              </div>
            )}
          </nav>
        </div>

        {/* PROFILE FOOTER */}
        <div className="border-t border-slate-100 pt-4">
          {currentUserId && user ? (
            <div className="flex items-center space-x-3 px-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              {/* 1. FIXED: Removed fallbackRedirectUrl inline prop */}
              <UserButton />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-800 truncate">{user.fullName || 'Farmer Profile'}</span>
                <span className="text-[11px] text-slate-400 truncate font-mono">{user.primaryEmailAddress?.emailAddress}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-center text-slate-400 font-medium py-1">Guest Mode</p>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT SPACE */}
      <main className="flex-1 h-full p-4 sm:p-8 overflow-y-auto">
        <header className="mb-4 border-b border-slate-200 pb-4 max-w-3xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {activeTab === "feed" && "Community Timeline"}
            {activeTab === "my-posts" && "Your Hub Logs"}
            {activeTab === "create" && "Compose Ecosystem Update"}
          </h1>
        </header>

        {/* TOPIC / CATEGORY SELECTOR SYSTEM */}
        {activeTab !== "create" && (
          <div className="max-w-3xl mx-auto mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {["All", "General", "Crops", "Livestock", "AgriTech", "Marketplace"].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all"
                  style={{
                    backgroundColor: isSelected ? theme.secondaryColor : "#ffffff",
                    color: isSelected ? "#ffffff" : "#475569",
                    borderColor: isSelected ? theme.secondaryColor : "#e2e8f0"
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
        
        <div className="max-w-3xl mx-auto min-h-[calc(100vh-12rem)]">
          {/* ACTION SUBMISSION PORTAL PANEL */}
          {activeTab === "create" && currentUserId && user && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
                  <img src={user.imageUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{user.fullName}</h3>
                    <p className="text-xs text-slate-400">Publishing to collective feed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Discussion Category</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white text-slate-700 outline-hidden"
                    >
                      <option value="General">General Discussion</option>
                      <option value="Crops">Crops & Cultivation</option>
                      <option value="Livestock">Livestock Management</option>
                      <option value="AgriTech">AgriTech & Automation</option>
                      <option value="Marketplace">Marketplace Exchange</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Context Tags</label>
                    <input 
                      type="text"
                      value={newPostTags}
                      onChange={(e) => setNewPostTags(e.target.value)}
                      placeholder="organic, soil, sensors (comma separated)"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Update Narrative</label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share updates on crop cycles, livestock reports, market pricing, or technology trials..."
                    rows={5}
                    className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-700 outline-hidden resize-none leading-relaxed"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setActiveTab("feed")} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 text-sm font-bold text-white rounded-xl shadow-xs"
                    style={{ backgroundColor: theme.primaryColor }}
                    disabled={isPending}
                  >
                    {isPending ? "Publishing..." : "Publish Post"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STREAM VIEW CONTAINER CARDS */}
          {(activeTab === "feed" || activeTab === "my-posts") && (
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
                  <p className="text-slate-400 text-sm font-medium">No discussions active under this selection parameters.</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs transition-all hover:border-slate-300">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={post.authorImage} alt={post.authorName} className="w-10 h-10 rounded-full border border-slate-100 object-cover" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{post.authorName}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold tracking-wide"
                                  style={{ backgroundColor: `${theme.secondaryColor}15`, color: theme.secondaryColor }}>
                              {post.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 font-medium">{post.createdAt}</p>
                        </div>
                      </div>

                      {currentUserId && post.authorId === currentUserId && (
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag: string, i: number) => (
                          <span key={i} className="text-xs bg-slate-100 font-bold text-slate-500 px-2.5 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-slate-100 pt-2 flex items-center gap-4">
                      <button 
                        onClick={() => handleToggleLike(post.id)}
                        className="flex items-center gap-1.5 text-xs font-bold transition-all px-2.5 py-1.5 rounded-lg"
                        style={{
                          backgroundColor: post.likedByMe ? "#fff1f2" : "transparent",
                          color: post.likedByMe ? "#e11d48" : "#64748b"
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={post.likedByMe ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        {post.likes}
                      </button>

                      <button 
                        onClick={() => {
                          if (!currentUserId) return;
                          setActiveReplyBox(activeReplyBox === post.id ? null : post.id);
                        }}
                        disabled={!currentUserId}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-all px-2.5 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50 ${!currentUserId && "opacity-50 cursor-not-allowed"}`}
                      >
                        {/* 3. FIXED: Adjusted a missing quote break inside target SVG template */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.596.596 0 01-.548-.547 5.004 5.004 0 01.405-2.42c-.712-.892-1.118-1.975-1.118-3.128 0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        Reply Direct
                      </button>

                      {post.comments && post.comments.length > 0 && (
                        <button 
                          onClick={() => toggleCommentsView(post.id)}
                          className="ml-auto text-xs font-bold hover:underline"
                          style={{ color: theme.secondaryColor }}
                        >
                          {expandedComments[post.id] ? "Hide Replies" : `Show Replies (${post.comments.length})`}
                        </button>
                      )}
                    </div>

                    {activeReplyBox === post.id && currentUserId && (
                      <form onSubmit={(e) => handleAddReply(e, post.id)} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <img src={user?.imageUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a direct answer to this discussion log..."
                            rows={2}
                            className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-700 outline-hidden bg-white resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setActiveReplyBox(null)} className="px-2.5 py-1 text-[11px] font-bold text-slate-500">
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="px-3 py-1 text-[11px] font-bold text-white rounded-md shadow-xs"
                              style={{ backgroundColor: theme.primaryColor }}
                            >
                              Post Reply
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {expandedComments[post.id] && post.comments && post.comments.length > 0 && (
                      <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 space-y-3 mt-2">
                        {post.comments.map((comment: any) => (
                          <div key={comment.id} className="flex gap-3 text-xs items-start border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                            <img src={comment.authorImage} alt={comment.authorName} className="w-6 h-6 rounded-full object-cover" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-bold text-slate-800">{comment.authorName}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{comment.createdAt}</span>
                              </div>
                              <p className="text-slate-600 leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}