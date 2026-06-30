// app/blog/page.tsx
import { auth } from "@clerk/nextjs/server";
import { getPosts } from "./actions";
import BlogFeedClient from "./components/BlogFeedClient";

export default async function BlogPage() {
  // 1. Fetch authentication state securely on the server
  const { userId } = await auth();
  
  // 2. Fetch live data directly from Neon during render (No API endpoints or client spinning needed!)
  const initialPosts = await getPosts();

  // 3. Mount the interface and pass initial database snapshots directly down
  return <BlogFeedClient initialPosts={initialPosts} currentUserId={userId} />;
}
