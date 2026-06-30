import React from 'react';
import Image from 'next/image';
import { 
  Sprout, 
  Target, 
  Activity, 
  Image as ImageIcon, 
  Droplets,
  Truck
} from 'lucide-react';

// 1. Define TypeScript interfaces for our data structure
interface ManagementComponent {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  ongoingActivities: string[];
  imageUrl: string; 
  bgColor: string; // Dynamic background theme color for each individual section
  borderColor: string; // Subtle border color matching the theme
}

// 2. Mock Data for the Agricultural Management Segments
const managementComponents: ManagementComponent[] = [
  {
    id: 'crop-cultivation',
    title: 'Crop Cultivation & Agronomy',
    description: 'Managing soil health, crop selection, and planting schedules to maximize seasonal yield and crop resilience.',
    objectives: [
      'Increase crop yield by 12% using organic bio-fertilizers.',
      'Implement multi-crop rotation schedules across Sector Alpha.',
      'Achieve optimal soil pH levels across all planting fields.'
    ],
    ongoingActivities: [
      'Testing soil nutrient deficiencies in the northern quadrant.',
      'Sowing drought-resistant maize variants.',
      'Applying organic pest control treatments to soybean fields.'
    ],
    imageUrl: '/pics/Agriculture.jpg',
    bgColor: 'bg-emerald-50/60', // Light Emerald background
    borderColor: 'border-emerald-100'
  },
  {
    id: 'irrigation-tech',
    title: 'Smart Irrigation & Water Management',
    description: 'Deploying automated drip systems and real-time moisture monitoring to optimize water conservation and root absorption.',
    objectives: [
      'Reduce water wastage by 25% via smart sensor deployment.',
      'Maintain stable hydration profiles throughout the dry season.',
      'Ensure zero runoff pooling in low-lying zones.'
    ],
    ongoingActivities: [
      'Calibrating automated drip-irrigation schedules.',
      'Replacing faulty water pressure gauges in Sector Beta.',
      'Analyzing real-time soil moisture telemetry data.'
    ],
    imageUrl: '/pics/smartirrigation.jpg',
    bgColor: 'bg-blue-50/60', // Light Blue background
    borderColor: 'border-blue-100'
  },
  {
    id: 'harvest-logistics',
    title: 'Supply Chain & Harvest Logistics',
    description: 'Coordinating efficient post-harvest processing, cold storage stability, and distribution timelines to local marketplaces.',
    objectives: [
      'Keep post-harvest transit loss below a strict 3% threshold.',
      'Optimize temperature metrics in cold storage units.',
      'Secure supply agreements with regional wholesale vendors.'
    ],
    ongoingActivities: [
      'Packing harvested produce into temperature-controlled crates.',
      'Dispatching regional logistics trucks for supermarket delivery.',
      'Reviewing weight and quality metrics at the distribution hub.'
    ],
    imageUrl: '/pics/agriculturalharvest.webp',
    bgColor: 'bg-amber-50/60', // Light Amber background
    borderColor: 'border-amber-100'
  }
];

// 3. Main Component
export default function FarmManagementPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12 lg:pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl flex items-center justify-center gap-3">
            <Sprout className="text-emerald-600 w-10 h-10 animate-pulse" />
            Agricultural Operations Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Monitor cultivation metrics, track real-time resource allocations, and review sustainable farming goals.
          </p>
        </header>

        {/* Segments Section */}
        <div className="space-y-16">
          {managementComponents.map((component, index) => {
            const isEven = index % 2 === 0;
            
            // Map specific icons to their corresponding modules dynamically
            const getSectionIcon = (id: string) => {
              if (id === 'crop-cultivation') return <Sprout className="text-emerald-500 w-8 h-8" />;
              if (id === 'irrigation-tech') return <Droplets className="text-blue-500 w-8 h-8" />;
              return <Truck className="text-amber-500 w-8 h-8" />;
            };

            return (
              <section 
                key={component.id}
                id={component.id} 
                // Added distinct background colors, rounded corners, padding, and subtle borders per section
                className={`flex flex-col gap-10 items-center lg:flex-row p-6 md:p-10 rounded-3xl border ${component.bgColor} ${component.borderColor} transition-all duration-300 shadow-sm ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    {getSectionIcon(component.id)}
                    {component.title}
                  </h2>
                  
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {component.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Objectives */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100/80">
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-emerald-600" />
                        Key Objectives
                      </h3>
                      <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5">
                        {component.objectives.map((obj, idx) => (
                          <li key={idx}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Ongoing Activities */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100/80">
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-3">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        Live Field Activities
                      </h3>
                      <ul className="space-y-2 text-slate-600 text-sm list-disc pl-5">
                        {component.ongoingActivities.map((act, idx) => (
                          <li key={idx}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Picture Section */}
                <div className="flex-1 w-full">
                  <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-md border-4 border-white group">
                    <Image 
                      src={component.imageUrl}
                      alt={component.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index === 0} 
                    />
                    {/* Decorative Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    
                    {/* Picture Tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                      Live Field Camera
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}