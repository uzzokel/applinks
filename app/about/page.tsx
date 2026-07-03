"use client";

import React, { useState } from "react";

// Explicit theme injection mapping
export const theme = {
  primaryColor: "#121358",
  secondaryColor: "#36ADA3" 
};

// ============================================================================
// COMPONENT 1: AGRICULTURAL METRICS & OBJECTIVES
// Objective: To provide transparency on ecological health and carbon offsets.
// ============================================================================
function SustainableMetrics() {
  const metrics = [
    { label: "Water Saved via Smart Drip", value: "40%", target: "50% by 2028" },
    { label: "Soil Organic Matter", value: "6.5%", target: "Targeting >8.0%" },
    { label: "Carbon Offset Annually", value: "120 Tons", target: "Net-Zero by 2030" },
  ];

  return (
    <section className="bg-slate-100 border-y border-slate-200 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: theme.primaryColor }}>
            Ecological Impact Objectives
          </h2>
          <p className="text-slate-600 text-sm mt-1">Measuring our real-time commitment to regenerative land metrics.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <span className="block text-3xl font-extrabold mb-1" style={{ color: theme.secondaryColor }}>
                {metric.value}
              </span>
              <span className="block font-semibold text-slate-800 text-sm mb-2">{metric.label}</span>
              <span 
                className="inline-block text-xs px-2.5 py-1 rounded-full font-medium" 
                style={{ backgroundColor: `${theme.secondaryColor}15`, color: theme.secondaryColor }}
              >
                {metric.target}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT 2: AGRICULTURAL PROGRAMS
// Objective: To expand regional agronomy networks and field education.
// ============================================================================
function AgriculturalPrograms() {
  const programs = [
    {
      title: "Regenerative Farm Training",
      description: "Empowering regional smallholders with modern, zero-chemical topsoil restoration techniques.",
    },
    {
      title: "Precision Sourcing Hubs",
      description: "Connecting local agrotech sensors directly to regional supply-chains to eliminate distribution waste.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: theme.primaryColor }}>
        Our Field Operations
      </h2>
      <p className="text-slate-600 text-center max-w-xl mx-auto mb-10 text-sm">
        How we activate our community-first mission on the ground every day.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {programs.map((program, idx) => (
          <div 
            key={idx} 
            className="p-6 rounded-2xl border flex flex-col justify-between"
            style={{ backgroundColor: `${theme.secondaryColor}08`, borderColor: `${theme.secondaryColor}25` }}
          >
            <div>
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-4 shadow-sm"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                {idx === 0 ? "🌾" : "📡"}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: theme.primaryColor }}>{program.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{program.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function AboutUsPage() {
  // Contact form hooks
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO SECTION WITH BACKGROUND PICTURE */}
      <section 
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/pics/Agriculture.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cultivating a Sustainable Future
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-medium">
            Bridging traditional agronomy with modern smart-tech. Empowering regional farmers and global eco-systems.
          </p>
        </div>
      </section>

      {/* 2. CORE CONTENT SECTION */}
      <section className="py-16 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: theme.primaryColor }}>Our Farming Mission</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Founded with a deep respect for the earth, our mission is to deliver high-yield, nutrient-dense organic produce while utilizing regenerative agricultural practices that rebuild topsoil health.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We value ecological transparency, field integrity, and zero-waste logistics. We view challenging seasonal climates not as roadblocks, but as opportunities to engineer resilient agricultural solutions.
          </p>
        </div>
        <div 
          className="p-8 rounded-2xl border"
          style={{ backgroundColor: `${theme.secondaryColor}08`, borderColor: `${theme.secondaryColor}20` }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: theme.primaryColor }}>Why Trust Our Yield?</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-center gap-2">
              <span className="font-bold" style={{ color: theme.secondaryColor }}>✓</span> 100% Certified Organic & Non-GMO
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold" style={{ color: theme.secondaryColor }}>✓</span> Smart Sensor Drip Irrigation
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold" style={{ color: theme.secondaryColor }}>✓</span> Direct Cold-Chain Market Delivery
            </li>
          </ul>
        </div>
      </section>

      {/* NEW INTEGRATED COMPONENTS */}
      <SustainableMetrics />
      <AgriculturalPrograms />

      {/* 3. CONTACT US SECTION */}
      <section className="text-white py-16 px-4" style={{ backgroundColor: theme.primaryColor }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12">
          
          {/* Left Column: Context Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Connect With Us</h2>
              <p className="text-slate-200/70">
                Have questions about our distribution, wholesale bulk sourcing, or community farming operations? Leave us a message.
              </p>
            </div>
            
            <div className="space-y-4 text-sm text-slate-200/90">
              <p>📍 123 Harvest Ridge Road, Sector Alpha</p>
              <p>✉️ logistics@yourfarmdomain.com</p>
              <p>📞 +1 (555) 474-Grow</p>
            </div>
          </div>

          {/* Right Column: Contact Form Component */}
          <div className="md:col-span-3 bg-white text-slate-900 p-8 rounded-2xl shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <span className="text-4xl">🌱</span>
                <h3 className="text-2xl font-bold mt-4" style={{ color: theme.secondaryColor }}>Message Dispatched!</h3>
                <p className="text-slate-600 mt-2">Our agricultural consultants will look over your query shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none text-sm transition-shadow"
                    style={{ ["--tw-ring-color" as any]: theme.secondaryColor }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none text-sm transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Inquiry Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none text-sm resize-none transition-shadow"
                    placeholder="How can we assist your agricultural needs?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white font-medium rounded-lg transition-opacity text-sm shadow-sm hover:opacity-90"
                  style={{ backgroundColor: theme.secondaryColor }}
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

{/* hello */}
