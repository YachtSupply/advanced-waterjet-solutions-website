import type { Metadata } from 'next';
import { Inter, Syne, Syne_Mono } from 'next/font/google';
import './globals.css';
import { getSiteData } from '@/lib/siteData';
import { getProfileSlug } from '@/lib/config';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const syneMono = Syne_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-syne-mono',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();

  return {
    title: {
      template: site.seo.titleTemplate,
      default: site.seo.defaultTitle,
    },
    description: site.seo.description,
    keywords: site.seo.keywords,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://advanced-waterjet-solutions-pro.boatwork.co'),
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: site.seo.defaultTitle,
      description: site.seo.description,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteData();

  const hasPortfolio = site.portfolio.length > 0;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${syneMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href={`https://boatwork.co/api/v1/public/contractors/${getProfileSlug()}/theme.css`}
        />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="font-body antialiased">
        <Navbar
          logoUrl={site.logoUrl}
          name={site.name}
          hasPortfolio={hasPortfolio}
          phone={site.phone}
          boatworkProfileUrl={site.boatworkProfileUrl}
        />
        <main>{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
