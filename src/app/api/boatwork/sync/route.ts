import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { fetchBoatworkProfile } from '@/lib/boatwork';
import { getProfileSlug, getProfileId } from '@/lib/config';
import fs from 'fs';
import path from 'path';

const REVALIDATE_PATHS = ['/', '/about', '/services', '/portfolio', '/contact'];
const GENERATED_CONTENT_PATH = path.join(process.cwd(), 'src', 'data', 'generated-content.json');

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json({ error: 'CRON_SECRET not configured', status: 500 }, { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 }, { status: 401 });
  }

  const slug = getProfileSlug();
  const profileId = getProfileId();

  // Fetch fresh profile to validate connection
  const profile = await fetchBoatworkProfile(slug, profileId);

  // Clear AI content cache so it regenerates on next build
  try {
    if (fs.existsSync(GENERATED_CONTENT_PATH)) {
      fs.unlinkSync(GENERATED_CONTENT_PATH);
    }
  } catch (err) {
    console.warn('[sync] Could not clear generated-content.json:', err);
  }

  // Revalidate all pages
  for (const p of REVALIDATE_PATHS) {
    revalidatePath(p);
  }

  return NextResponse.json({
    success: true,
    synced_at: new Date().toISOString(),
    profile_found: !!profile,
    revalidated: REVALIDATE_PATHS,
  });
}
