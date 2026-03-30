'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import { PlayCircle, MagnifyingGlassPlus } from '@phosphor-icons/react';
import type { PortfolioItem } from '@/lib/siteData';

interface PortfolioGridProps {
  items: PortfolioItem[];
  businessName: string;
}

interface SlideItem {
  type?: 'video';
  src: string;
  title?: string;
  description?: string;
  sources?: Array<{ src: string; type: string }>;
  poster?: string;
}

function VideoThumbnail({
  src,
  poster,
  caption,
  onClick,
}: {
  src: string;
  poster?: string;
  caption: string | null;
  onClick: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbUrl, setThumbUrl] = useState<string | null>(poster || null);

  useEffect(() => {
    if (thumbUrl || !canvasRef.current) return;

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = src;
    video.currentTime = 1;
    video.muted = true;

    video.addEventListener('seeked', () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        try {
          setThumbUrl(canvas.toDataURL('image/jpeg'));
        } catch {
          // CORS blocked
        }
      }
    });

    video.load();
  }, [src, thumbUrl]);

  return (
    <button
      onClick={onClick}
      className="portfolio-item w-full h-full group relative"
      aria-label={`Play video${caption ? `: ${caption}` : ''}`}
    >
      <canvas ref={canvasRef} className="hidden" />
      {thumbUrl ? (
        <Image
          src={thumbUrl}
          alt={caption || 'Video thumbnail'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-full"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
      )}
      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
          <PlayCircle
            className="w-8 h-8"
            style={{ color: 'var(--color-accent)' }}
            weight="fill"
            aria-hidden
          />
        </div>
      </div>
      {caption && (
        <div className="overlay">
          <p className="text-white text-sm font-body">{caption}</p>
        </div>
      )}
    </button>
  );
}

export function PortfolioGrid({ items, businessName }: PortfolioGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const slides: SlideItem[] = items.map((item) => {
    if (item.type === 'video') {
      return {
        type: 'video',
        src: item.src,
        sources: [{ src: item.src, type: 'video/mp4' }],
        poster: item.poster,
        title: item.caption || undefined,
      };
    }
    return {
      src: item.src,
      title: item.caption || undefined,
    };
  });

  return (
    <>
      {/* Responsive grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0">
        {items.map((item, index) => (
          <div key={`${item.src}-${index}`} className="mb-4 break-inside-avoid">
            {item.type === 'video' ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <VideoThumbnail
                  src={item.src}
                  poster={item.poster}
                  caption={item.caption}
                  onClick={() => setLightboxIndex(index)}
                />
              </div>
            ) : (
              <div
                className="portfolio-item rounded-lg overflow-hidden cursor-pointer"
                style={{ aspectRatio: index % 3 === 1 ? '4/5' : '4/3' }}
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(index)}
                aria-label={`View photo${item.caption ? `: ${item.caption}` : ''}`}
              >
                <Image
                  src={item.src}
                  alt={item.caption || `${businessName} portfolio photo`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="overlay">
                  <div className="flex items-end gap-2 w-full">
                    <MagnifyingGlassPlus
                      className="w-5 h-5 text-white flex-shrink-0"
                      weight="bold"
                      aria-hidden
                    />
                    {item.caption && (
                      <p className="text-white text-sm font-body leading-snug line-clamp-2">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides as Parameters<typeof Lightbox>[0]['slides']}
        plugins={[Captions, Video]}
        captions={{ showToggle: true }}
      />
    </>
  );
}
