// proxy.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. Define your protected dashboard/forum routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

// 2. Define your public routes so Clerk doesn't intercept or obscure them
const isPublicRoute = createRouteMatcher(['/api/neon-data(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // If it matches our Neon API path, let it pass right through without check
  if (isPublicRoute(req)) {
    return;
  }

  // Otherwise, enforce protection on dashboard/forum
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Safe matcher: Exclude next internals, static files, and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Always execute the proxy file for API and TRPC paths
    '/(api|trpc)(.*)',
  ],
};