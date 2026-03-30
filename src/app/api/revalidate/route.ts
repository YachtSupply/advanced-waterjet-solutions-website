import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const ALL_PATHS = ['/', '/about', '/services', '/portfolio', '/contact'];

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET not configured', status: 500 }, { status: 500 });
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret', status: 401 }, { status: 401 });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, ts: Date.now() });
  }

  // No path provided — revalidate all known paths (matches v1 caller behavior)
  ALL_PATHS.forEach((p) => revalidatePath(p));
  return NextResponse.json({ revalidated: true, paths: ALL_PATHS, ts: Date.now() });
}
