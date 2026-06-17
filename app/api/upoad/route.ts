// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File; // 💡 Looking for the key "file"

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // 💡 Returns: { url: "https://xxxx.public.blob.vercel-storage.com/image.jpg" }
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Vercel Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}




// // app/api/upload/route.ts
// import { put } from '@vercel/blob';
// import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';

// // 💡 FORCE NEXT.JS TO TREAT THIS ROUTE AS DYNAMIC (Bypasses compilation caching)
// export const dynamic = 'force-dynamic';

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     // 1. Authenticate user
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     // 2. Fetch the write token manually right now
//     const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
//     if (!blobToken) {
//       console.error("❌ BLOB ERROR: BLOB_READ_WRITE_TOKEN is missing from your .env file!");
//       return NextResponse.json({ error: 'Storage token configuration missing' }, { status: 500 });
//     }

//     // 3. Extract file payload
//     const formData = await request.formData();
//     const file = formData.get('file') as File;

//     if (!file) {
//       return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//     }

//     // 4. Stream directly to Vercel using the dynamic token variable
//     const blob = await put(file.name, file, {
//       access: 'public',
//       token: blobToken, // 💡 Explicitly inject the token here so Vercel never guesses
//     });

//     // 5. Send back the secure live file link
//     return NextResponse.json(blob);
//   } catch (error) {
//     console.error('CRITICAL Vercel Blob Upload Failure:', error);
//     return NextResponse.json({ error: 'Failed to upload image to Vercel' }, { status: 500 });
//   }
// }

// // app/api/upload/route.ts
// import { put } from '@vercel/blob';
// import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';

// export async function POST(request: Request): Promise<NextResponse> {
//   // 1. Guard the route with Clerk authentication
//   const { userId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as File;
    
//     if (!file) {
//       return NextResponse.json({ error: 'No file found' }, { status: 400 });
//     }

//     // 2. Upload file to permanent storage
//     const blob = await put(`products/${Date.now()}-${file.name}`, file, {
//       access: 'public',
//     });

//     return NextResponse.json({ url: blob.url });
//   } catch (error) {
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }