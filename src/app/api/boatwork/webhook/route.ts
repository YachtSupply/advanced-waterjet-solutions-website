import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { fireOutboundWebhooks, type BoatworkEventType } from '@/lib/outboundWebhooks';
import { getSiteUrl } from '@/lib/config';

const PROFILE_UPDATE_EVENTS = new Set([
  'profile.updated',
  'review.created',
  'reviews.new',
  'verification.updated',
  'verification.badge',
  'photo.added',
  'photo.deleted',
  'video.added',
  'video.deleted',
  'badge.awarded',
  'badge.revoked',
]);

function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = `sha256=${crypto.createHmac('sha256', secret).update(body).digest('hex')}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-boatwork-signature') || '';
  const webhookSecret = process.env.BOATWORK_WEBHOOK_SECRET;

  if (webhookSecret) {
    if (!signature || !verifySignature(rawBody, signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid signature', status: 401 }, { status: 401 });
    }
  }

  let payload: { event?: string; slug?: string; data?: Record<string, unknown>; timestamp?: number };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON', status: 400 }, { status: 400 });
  }

  const { event, slug, data } = payload;

  if (!event || !slug) {
    return NextResponse.json({ error: 'Missing event or slug', status: 400 }, { status: 400 });
  }

  // Fire outbound webhooks first (non-blocking)
  if (event) {
    fireOutboundWebhooks(event as BoatworkEventType, slug, data).catch(console.error);
  }

  // Trigger sync if it's a profile-impacting event
  if (PROFILE_UPDATE_EVENTS.has(event)) {
    const siteUrl = getSiteUrl();
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret) {
      fetch(`${siteUrl}/api/boatwork/sync`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cronSecret}`,
          'Content-Type': 'application/json',
        },
      }).catch((err) => console.error('[webhook] Failed to trigger sync:', err));
    }
  }

  return NextResponse.json({ received: true, event });
}
