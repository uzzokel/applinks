import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Project | share ideas",
  description: "One Stop Shop for Farm Products",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          
          <main className="flex-grow flex-1">
            {children} {/* <-- This slot automatically handles your page.tsx */}
          </main>
          
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html
//         lang="en"
//         className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//       >
//         <body className="min-h-screen flex flex-col bg-slate-50">
//           <Navbar />
          
//           {/* This slot dynamically renders your page.tsx file content exactly once */}
//           <main className="flex-grow flex-1">
//             {children}
//           </main>
          
//           <Footer />
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
