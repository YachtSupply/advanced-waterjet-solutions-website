import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/site.config';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 }, { status: 401 });
  }

  const hooks = siteConfig.outboundWebhooks || [];
  return NextResponse.json({
    configured: hooks.length,
    webhooks: hooks.map((h) => ({
      url: h.url,
      events: h.events,
      hasSecret: !!h.secret,
    })),
  });
}
