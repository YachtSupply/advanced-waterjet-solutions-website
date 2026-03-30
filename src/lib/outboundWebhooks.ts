import crypto from 'crypto';
import { siteConfig } from '@/site.config';

export type BoatworkEventType =
  | 'profile.updated'
  | 'review.created'
  | 'reviews.new'
  | 'verification.updated'
  | 'verification.badge'
  | 'photo.added'
  | 'photo.deleted'
  | 'video.added'
  | 'video.deleted'
  | 'badge.awarded'
  | 'badge.revoked'
  | 'social.post.published'
  | 'social.subscription.updated';

export async function fireOutboundWebhooks(
  event: BoatworkEventType,
  slug: string,
  data?: Record<string, unknown>,
): Promise<void> {
  const hooks = siteConfig.outboundWebhooks;
  if (!hooks || hooks.length === 0) return;

  const timestamp = Date.now();
  const payload = JSON.stringify({ event, slug, data, timestamp });

  const requests = hooks
    .filter((hook) => hook.events.includes('*') || hook.events.includes(event))
    .map(async (hook) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Boatwork-Event': event,
        'X-Timestamp': String(timestamp),
      };

      if (hook.secret) {
        const sig = crypto.createHmac('sha256', hook.secret).update(payload).digest('hex');
        headers['X-Signature'] = `sha256=${sig}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        await fetch(hook.url, {
          method: 'POST',
          headers,
          body: payload,
          signal: controller.signal,
        });
      } catch (err) {
        console.warn(`[outboundWebhooks] Failed to fire to ${hook.url}:`, err);
      } finally {
        clearTimeout(timeoutId);
      }
    });

  await Promise.allSettled(requests);
}
