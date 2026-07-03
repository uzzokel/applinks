"use server";

import { prisma as db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Category } from "../generated/prisma";

// Import types from Prisma to fix the implicit "any" errors cleanly
import { Post, Comment, Like } from "../generated/prisma";

// 1. Fetch posts from Neon with full metadata mapping
export async function getPosts() {
  const { userId } = await auth();
  
  const posts = await db.post.findMany({
    include: {
      comments: { orderBy: { createdAt: "asc" } },
      likes: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Configured date formatting options for a clean UI aesthetic
  const dateFormatOptions: Intl.DateTimeFormatOptions = { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  };

  // Added explicit Prisma types to post, like, and c parameters below
  return posts.map((post: Post & { comments: Comment[]; likes: Like[] }) => ({
    id: post.id,
    authorName: post.authorName,
    authorImage: post.authorImage,
    authorId: post.authorId,
    content: post.content,
    category: post.category,
    tags: post.tags,
    likes: post.likes.length,
    likedByMe: userId ? post.likes.some((like: Like) => like.userId === userId) : false,
    createdAt: post.createdAt.toLocaleDateString("en-US", dateFormatOptions),
    comments: post.comments.map((c: Comment) => ({
      id: c.id,
      authorName: c.authorName,
      authorImage: c.authorImage,
      content: c.content,
      createdAt: c.createdAt.toLocaleDateString("en-US", dateFormatOptions),
    }))
  }));
}

// 2. Save a post to Neon
export async function createPost(content: string, category: Category, tagsString: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const tags = tagsString
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0);

  // Construct a clean display name using available Clerk fallback fields
  const fallbackName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : (user.fullName || user.username || "AgriHub Member");

  await db.post.create({
    data: {
      authorId: user.id,
      authorName: fallbackName,
      authorImage: user.imageUrl,
      content,
      category, // Automatically validates against your schema Category enum
      tags,
    }
  });

  revalidatePath("/blog");
}

// 3. Save a comment to Neon
export async function createComment(postId: string, content: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const fallbackName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : (user.fullName || user.username || "AgriHub Member");

  await db.comment.create({
    data: {
      postId,
      content,
      authorName: fallbackName,
      authorImage: user.imageUrl,
    }
  });

  revalidatePath("/blog");
}

// 4. Toggle Like in Neon
export async function toggleLike(postId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existingLike = await db.like.findUnique({
    where: { postId_userId: { postId, userId } }
  });

  if (existingLike) {
    await db.like.delete({ where: { postId_userId: { postId, userId } } });
  } else {
    await db.like.create({ data: { postId, userId } });
  }

  revalidatePath("/blog");
}

// 5. Delete post from Neon (Ensures safety verification)
export async function deletePost(postId: string) {
  const { userId } = await auth();
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post || post.authorId !== userId) throw new Error("Unauthorized");

  await db.post.delete({ where: { id: postId } });
  revalidatePath("/blog");
}