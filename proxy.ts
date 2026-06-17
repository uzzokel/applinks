// 1. FIXED TYPO: Changed 'clkMiddleware' to 'clerkMiddleware'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes must require authentication
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

// 2. FIXED TYPO: Using the correct function name here as well
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // 3. SAFE MATCHER: Standard Next.js paths without the broken regex assets engine
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};



