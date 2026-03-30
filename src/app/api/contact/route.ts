import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { siteConfig } from '@/site.config';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  message: z.string().min(1, 'Message is required').max(2000),
});

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured', status: 500 }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body', status: 400 }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errorMessage = parsed.error.errors[0]?.message || 'Invalid input';
    return NextResponse.json({ error: errorMessage, status: 400 }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { fromEmail, toEmail } = siteConfig.resend;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F5F2EE;">
  <div style="background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E5DDD5;">
    <div style="background: #1B4F5C; padding: 32px 24px; text-align: center;">
      <p style="color: #E8673A; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">New Message</p>
      <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700;">${siteConfig.name}</h1>
    </div>
    <div style="padding: 32px 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #F5F2EE; color: #666; font-size: 14px; width: 80px;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #F5F2EE; font-size: 14px; color: #1A1A1A;">${name}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #F5F2EE; color: #666; font-size: 14px;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #F5F2EE; font-size: 14px;"><a href="mailto:${email}" style="color: #1B4F5C;">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #F5F2EE; color: #666; font-size: 14px;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #F5F2EE; font-size: 14px;"><a href="tel:${phone}" style="color: #1B4F5C;">${phone}</a></td></tr>` : ''}
      </table>
      <div style="background: #F5F2EE; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
        <p style="color: #1A1A1A; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
      <a href="mailto:${email}" style="display: inline-block; background: #E8673A; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ${name}</a>
    </div>
    <div style="background: #F5F2EE; padding: 16px 24px; text-align: center; border-top: 1px solid #E5DDD5;">
      <p style="color: #999; font-size: 12px; margin: 0;">Sent via <a href="https://boatwork.co" style="color: #1B4F5C; text-decoration: none;">Boatwork</a></p>
    </div>
  </div>
</body>
</html>
`;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New message from ${name} — ${siteConfig.name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.', status: 500 }, { status: 500 });
  }
}
