import { NextResponse } from 'next/server';
import { TEMPLATE_VERSION } from '@/site.config';

export async function GET() {
  return NextResponse.json({
    template: 'marine-pro-website-template-v2',
    version: TEMPLATE_VERSION,
    timestamp: new Date().toISOString(),
  });
}
