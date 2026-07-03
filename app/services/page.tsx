import Image from 'next/image';
import Link from 'next/link';

// --- Static Data Definitions (Agricultural Context) ---
const SERVICES = [
  {
    id: 1,
    title: 'Marketplace Trading',
    description: 'Connect directly with wholesale buyers and distributors to secure the best seasonal market prices for your harvest.',
    icon: '🚜',
  },
  {
    id: 2,
    title: 'Agronomy Insights',
    description: 'Access crop data analytics, soil health telemetry, and sustainable yield planning metrics engineered for scaling.',
    icon: '🌱',
  },
  {
    id: 3,
    title: 'Resource Sharing',
    description: 'A community nexus for tertiary agricultural students and local farmers to exchange modern tools, research, and insights.',
    icon: '🌾',
  },
];

const STAFF = [
  {
    name: 'Sarah Jenkins',
    role: 'Lead Agronomist',
    bio: 'Sarah has 12 years of experience specializing in sustainable crop science and predictive yield optimization.',
    avatar: '/pics/femaleaverter.jpg',
  },
  {
    name: 'Michael Adebayo',
    role: 'Platform Operations Manager',
    bio: 'Michael oversees marketplace infrastructure, regional supplier chains, and safe network compliance pipelines.',
    avatar: '/pics/manavata.avif',
  },
];

const UPDATES = [
  {
    title: 'Dry Season Irrigation Framework Complete',
    date: 'June 15, 2026',
    description: 'Successfully deployed solar-powered drip telemetry loops across our community test sectors to stabilize water tables.',
    image: '/pics/smartirrigation.jpg',
  },
  {
    title: 'Maize Crop Distribution Phase Finalized',
    date: 'June 28, 2026',
    description: 'The first major regional marketplace trade pool has been fulfilled and safely distributed to terminal hubs.',
    image: '/pics/corncobs.webp',
  },
];

// --- Main Page Component ---
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50/60 text-slate-700 font-sans">
      
      {/* Hero Section */}
              <section className="bg-gradient-to-b from-teal-900 via-teal-800 to-teal-950 border-b border-teal-400/40 pt-24 pb-20 relative overflow-hidden shadow-[inset_0_2px_20px_rgba(255,255,255,0.3)]">
            {/* Lightened Background Image Wrapper */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-teal-900">
              <Image 
                src="/pics/strawberry.avif" 
                alt="Agricultural background" 
                fill
                priority
                /* Boosted opacity to 65% and set brightness higher */
                className="object-cover opacity-65 scale-105 contrast-110 brightness-110" 
              />
              {/* Soft, vibrant teal color wash overlay - removed heavy dark colors and mix-blends */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/60 via-cyan-800/40 to-transparent pointer-events-none" />
              {/* Clean gradient fade to secure text contrast at the bottom without turning pitch black */}
              <div className="absolute inset-0 bg-gradient-to-b from-teal-950/20 via-teal-950/40 to-teal-950/80 pointer-events-none" />
            </div>

            {/* Enhanced High-Gloss Light Reflection Line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-white/10 pointer-events-none transform -skew-y-12 origin-top-left scale-150 mix-blend-overlay z-10" />
            
            {/* Brighter Radial Backlit Glow for maximum pop */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-cyan-400/40 rounded-full blur-[100px] pointer-events-none z-10" />

            <div className="container mx-auto px-6 text-center relative z-20">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-extrabold bg-white/25 text-white border border-white/50 backdrop-blur-md shadow-sm mb-4 tracking-wider uppercase">
                Ecosystem Platform
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-[0_4px_16px_rgba(2,44,38,0.6)]">
                Agricultural Insights & Market Dynamics
              </h1>
              <p className="text-sm sm:text-base text-cyan-50 max-w-2xl mx-auto mt-4 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(2,44,38,0.5)]">
                Discover optimized supply lines, engage with qualified experts driving soil yield strategies, and track real-time field progress updates step-by-step.
              </p>
            </div>
          </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-[#121358] mb-12 text-center tracking-tight">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#36ADA3]/10 text-[#36ADA3] flex items-center justify-center text-2xl mb-5">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#121358] mb-2">{service.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Staff Profiles Section */}
      <section className="bg-slate-100/50 border-y border-slate-200/60 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-[#121358] mb-12 text-center tracking-tight">
            Meet Our Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {STAFF.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row">
                {/* Image Wrapper Container with Next.js Image configuration */}
                <div className="relative w-full sm:w-1/3 h-48 sm:h-auto bg-slate-100 border-b sm:border-b-0 sm:border-r border-slate-200/60 min-h-[180px]">
                  <Image 
                    src={member.avatar} 
                    alt={`Avatar of ${member.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#121358]">{member.name}</h3>
                  <p className="text-[#36ADA3] text-xs font-bold uppercase tracking-wider mt-0.5 mb-3">{member.role}</p>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Updates Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-[#121358] mb-12 text-center tracking-tight">
          Field Operations & Progress
        </h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {UPDATES.map((update, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden md:flex">
              {/* Image Wrapper Container with Next.js Image configuration */}
              <div className="relative w-full md:w-2/5 h-52 md:h-auto bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200/60 min-h-[208px]">
                <Image 
                  src={update.image} 
                  alt={`Progress visual for: ${update.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                <span className="text-[10px] bg-[#36ADA3]/10 text-[#36ADA3] font-bold uppercase px-2.5 py-1 rounded-full w-max">
                  {update.date}
                </span>
                <h3 className="text-xl font-bold text-[#121358] mt-3 mb-2">{update.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-5">{update.description}</p>
                <Link href="/portfolio" className="text-[#36ADA3] hover:text-[#2da198] text-xs sm:text-sm font-semibold flex items-center gap-1 transition w-max">
                  View Insight Gallery &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}