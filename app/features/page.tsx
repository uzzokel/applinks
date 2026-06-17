"use client";

import React, { useState, useTransition } from 'react';
import { createProductAction } from "@/app/actions/products"; 
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Image from 'next/image';
import { uploadFileAction } from './actions/upload';

export default function FeaturesPage() {
  const [isPending, startTransition] = useTransition();
  const { isLoaded, isSignedIn } = useAuth();

  const [items, setItems] = useState([
    {
      id: "1",
      name: "Premium Cassava Starch",
      description: "High-grade industrial starch optimized for processing pipelines.",
      price: 45.00,
      imageUrl: ""
    }
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createProductAction(formData);
      if (result.success) {
        alert("🎉 Product successfully saved to Neon!");
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return alert('Please enter at least a name and price.');

    const imageUrl = formData.image ? URL.createObjectURL(formData.image) : '';

    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl,
    };

    setItems((prev) => [newItem, ...prev]);
    setFormData({ name: '', description: '', price: '', image: null });
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEditing = (item: any) => {
    setEditingId(item.id);
    setEditFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
    });
  };

  const handleUpdateItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: editFormData.name,
              description: editFormData.description,
              price: parseFloat(editFormData.price) || 0,
            }
          : item
      )
    );
    setEditingId(null);
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-400 text-sm animate-pulse">Initializing session...</div>
      </div>
    );
  }

  return (
    <>
      {/* 🔒 GATEWAY (SIGN OUT VIEW) */}
      {!isSignedIn && (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center">
            <div className="w-12 h-12 bg-[#36ADA3]/10 text-[#36ADA3] rounded-xl flex items-center justify-center mx-auto text-xl font-bold mb-4">
              A
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#121358] tracking-tight">
              Access Restricted
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 mb-6 max-w-xs mx-auto">
              Please authenticate your session using your credentials to access the internal platform management hub.
            </p>
            
            <SignInButton mode="modal">
              <button className="w-full py-2.5 px-4 rounded-lg bg-[#36ADA3] hover:bg-[#2c968c] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#36ADA3]/10 hover:shadow-lg">
                Sign In to Account
              </button>
            </SignInButton>
          </div>
        </div>
      )}

      {/* 🔓 WORKSPACE (SIGN IN VIEW) */}
      {isSignedIn && (
        <div className="flex flex-col-reverse lg:flex-row min-h-screen bg-slate-50/50">
          
          {/* MAIN DASHBOARD CONTENT AREA */}
          <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <header className="mb-6 lg:mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121358] tracking-tight">
                  Management Hub
                </h1>
                <p className="text-slate-500 mt-1 text-xs sm:text-sm lg:text-base">
                  View your current listings, adjust asset descriptions, or process updates live in the internal system array.
                </p>
              </header>

              {/* TWO COLUMN INTERACTIVE INTERFACE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                
                {/* A. Local Inflow Input Form */}
                <div className="md:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-sm sm:text-base font-bold text-[#121358] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-[#36ADA3] rounded-full"></span>
                    Local Creation Pane
                  </h2>
                  <form onSubmit={handleCreateItem} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Item Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Item name..."
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#36ADA3] focus:ring-2 focus:ring-[#36ADA3]/10 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Provide details..."
                        rows={3}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#36ADA3] focus:ring-2 focus:ring-[#36ADA3]/10 transition resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Price (USD)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#36ADA3] focus:ring-2 focus:ring-[#36ADA3]/10 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Product Media</label>
                      <input
                        type="file"
                        key={formData.image ? formData.image.name : 'empty-file-input'}
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#36ADA3]/10 file:text-[#36ADA3] hover:file:bg-[#36ADA3]/20 cursor-pointer"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-lg bg-[#36ADA3] hover:bg-[#2c968c] text-white font-medium text-sm transition shadow-sm mt-2"
                    >
                      Add to Hub View
                    </button>
                  </form>
                </div>

                {/* B. Live Inventory Grid Display */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-bold text-[#121358] flex items-center gap-2">
                      <span className="w-1.5 h-3 bg-[#36ADA3] rounded-full"></span>
                      Active Pipeline View ({items.length})
                    </h2>
                  </div>

                  {items.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl h-[30vh] md:h-[40vh] flex flex-col items-center justify-center text-slate-400 text-sm bg-white p-6 text-center">
                      <p className="font-medium">No assets registered in local memory.</p>
                      <p className="text-xs text-slate-400 mt-1">Fill out the creation form to generate records.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {items.map((item) => {
                        const isEditing = editingId === item.id;
                        return (
                          <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:border-slate-300 transition duration-150">
                            
                            {/* Image Frame */}
                            <div className="h-40 w-full relative bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center p-4">
                                  <span className="block text-xl mb-1">📦</span> No Image Uploaded
                                </div>
                              )}
                            </div>

                            {/* Content Body */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                              {isEditing ? (
                                <div className="space-y-2.5 flex-1 mb-3">
                                  <input
                                    type="text"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full px-2 py-1 text-sm bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800 focus:outline-none focus:border-[#36ADA3]"
                                    placeholder="Edit name"
                                  />
                                  <textarea
                                    value={editFormData.description}
                                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                    className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-600 resize-none focus:outline-none focus:border-[#36ADA3]"
                                    rows={2}
                                    placeholder="Edit description"
                                  />
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-slate-400">$</span>
                                    <input
                                      type="number"
                                      value={editFormData.price}
                                      onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                                      className="w-24 px-2 py-0.5 text-xs bg-slate-50 border border-slate-300 rounded font-medium text-slate-800 focus:outline-none focus:border-[#36ADA3]"
                                      placeholder="Price"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex-1 mb-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1">{item.name}</h3>
                                    <span className="text-xs sm:text-sm font-bold text-[#36ADA3] shrink-0 bg-[#36ADA3]/10 px-2 py-0.5 rounded">
                                      ${item.price.toFixed(2)}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 h-8">
                                    {item.description || "No description provided."}
                                  </p>
                                </div>
                              )}

                              {/* Action Footer */}
                              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                                {isEditing ? (
                                  <>
                                    <button
                                      onClick={() => setEditingId(null)}
                                      className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 rounded transition font-medium"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleUpdateItem(item.id)}
                                      className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow-sm transition font-medium"
                                    >
                                      Save changes
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => startEditing(item)}
                                      className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded transition font-medium"
                                    >
                                      Update
                                    </button>
                                    <button
                                      onClick={() => handleDelete(item.id)}
                                      className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded transition font-medium"
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </main>

          {/* SIDEBAR PANE LAYER - ADJUSTED RESPONSIBILITY GRID */}
          <aside className="w-full lg:w-[380px] bg-white border-b lg:border-b-0 lg:border-l border-slate-200/80 p-5 sm:p-6 lg:p-8 shadow-md lg:shadow-2xl flex flex-col justify-between lg:min-h-screen shrink-0">
            <div>
              <div className="mb-5 pb-4 border-b border-slate-100">
                <h2 className="text-lg sm:text-xl font-bold text-[#121358] tracking-tight flex items-center gap-2">
                  <span className="w-2 h-5 bg-[#36ADA3] rounded-full inline-block"></span>
                  Add New Product
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  Sync a new asset line directly to the live storage cluster.
                </p>
              </div>
              
              <form action={clientAction} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-[#121358]/80 uppercase tracking-wider mb-1.5">
                    Product Name
                  </label>
                  <input 
                    type="text" 
                    name="productName" 
                    placeholder="e.g., Premium Cassava Starch" 
                    required 
                    className="w-full px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#36ADA3] focus:ring-2 focus:ring-[#36ADA3]/10 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#121358]/80 uppercase tracking-wider mb-1.5">
                    Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2 text-slate-400 text-sm">$</span>
                    <input 
                      type="number" 
                      name="price" 
                      step="0.01" 
                      placeholder="0.00" 
                      required 
                      className="w-full pl-8 pr-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#36ADA3] focus:ring-2 focus:ring-[#36ADA3]/10 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#121358]/80 uppercase tracking-wider mb-1.5">
                      Initial Stock
                    </label>
                    <input 
                      type="number" 
                      name="quantity" 
                      defaultValue="10" 
                      className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#36ADA3] focus:ring-2 focus:ring-[#36ADA3]/10 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#121358]/80 uppercase tracking-wider mb-1.5">
                      Alert Limit
                    </label>
                    <input 
                      type="number" 
                      name="lowStockAt" 
                      defaultValue="2" 
                      className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#36ADA3] focus:ring-2 focus:ring-[#36ADA3]/10 transition-all duration-200"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#36ADA3] hover:bg-[#2c968c] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#36ADA3]/10 hover:shadow-lg disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {isPending ? "Uploading to Neon..." : "Upload to Neon"}
                </button>
              </form>
            </div>

            {/* Branded Footer Container */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                Channel Active
              </span>
              <UserButton fallbackRedirectUrl="/features" />
            </div>
          </aside>
          
        </div>
      )}
    </>
  );
}