export const TEMPLATE_VERSION = '2.0.0';

export interface ServiceConfig {
  name: string;
  description: string;
  icon: string;
  keywords?: string[];
  benefits?: string[];
  priceRange?: string;
  typicalDuration?: string;
}

export interface ReviewConfig {
  id: string | null;
  author: string;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
  response: string | null;
  responseDate: string | null;
}

export interface PortfolioItemConfig {
  src: string;
  caption?: string;
}

export interface VideoConfig {
  src: string;
  poster?: string;
  caption?: string;
}

export interface OutboundWebhookConfig {
  url: string;
  secret?: string;
  events: string[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  about: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  city: string;
  state: string;
  logoUrl: string;

  boatwork: {
    profileSlug: string;
    profileId: string;
    profileUrl: string;
    logoUrl: string;
    useLiveReviews: boolean;
    staticReviews: ReviewConfig[];
  };

  services: ServiceConfig[];
  commonProjects: string[];
  portfolio: PortfolioItemConfig[];
  videos: VideoConfig[];
  serviceArea: string[];
  serviceAreaDescription: string;

  seo: {
    titleTemplate: string;
    defaultTitle: string;
    description: string;
    keywords: string[];
  };

  hoursOfOperation: Record<string, string>;

  social: {
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    youtube: string | null;
  };

  badge: { profileUrl: string } | null;

  resend: {
    fromEmail: string;
    toEmail: string;
  };

  outboundWebhooks: OutboundWebhookConfig[];
}

export const siteConfig: SiteConfig = {
  name: 'Advanced Waterjet Solutions',
  tagline: 'Your home for waterjet and laser cutting solutions in South Florida',
  description:
    "We are Advanced Waterjet Solutions, Fort Lauderdale's premier provider of precision waterjet and laser cutting services for the marine industry and beyond.",
  about:
    'Advanced Waterjet Solutions has served South Florida\'s marine and industrial community from our Fort Lauderdale facility at 3309 SW 11th Ave for over two decades. We specialize in precision waterjet cutting, laser cutting, and custom metal fabrication -- delivering tight tolerances and fast turnarounds to boat builders, yacht manufacturers, and marine repair shops across Broward and Miami-Dade counties. Whether you need a one-off custom bracket, production runs of hull components, or intricate stainless deck hardware, our team brings the same level of craftsmanship to every job. We work with aluminum, stainless steel, mild steel, and non-metallic materials, and our facility is equipped to handle everything from small prototypes to large production orders.',
  phone: '1-954-533-2464',
  email: 'jacob@sailplan.com',
  address: '3309 SW 11th Ave, Fort Lauderdale, FL 33315',
  location: '3309 SW 11th Ave, Fort Lauderdale, FL 33315, USA',
  city: 'Fort Lauderdale',
  state: 'FL',
  logoUrl: 'https://boatwork-images.s3.us-east-1.amazonaws.com/4bc1a9e8-3141-45c2-a328-ac3cbf360e2e.png',

  boatwork: {
    profileSlug: 'advanced-waterjet-solutions',
    profileId: 'ababf6d2-ec4a-4c04-8a48-42c83cda8bfd',
    profileUrl: 'https://boatwork.co/pro/advanced-waterjet-solutions/',
    logoUrl: '/boatwork-logo.svg',
    useLiveReviews: true,
    staticReviews: [],
  },

  services: [
    {
      name: 'Welding & Fabrication',
      description:
        'Advanced Waterjet Solutions offers professional welding & fabrication services in Fort Lauderdale, FL. Precision waterjet and laser cutting for marine and industrial applications.',
      icon: 'wrench',
      keywords: ['waterjet cutting', 'laser cutting', 'metal fabrication', 'marine fabrication'],
      benefits: ['Same-day service', 'Precision CNC cutting', 'Marine-grade materials'],
      typicalDuration: 'Same day',
    },
  ],

  commonProjects: [
    'Custom marine bracket fabrication',
    'Aluminum hull component cutting',
    'Stainless steel deck hardware',
    'Swim platform parts',
    'Laser engraving for vessel ID',
    'Custom tumblers & promotional items',
  ],

  portfolio: [
    { src: 'https://awjsolutions.com/wp-content/uploads/2023/12/Image11.png', caption: 'Waterjet cutting precision work' },
    { src: 'https://awjsolutions.com/wp-content/uploads/2023/10/photo-66.jpg', caption: 'Marine fabrication project' },
    { src: 'https://awjsolutions.com/wp-content/uploads/2023/10/BRUCE-rotated.jpg', caption: 'Custom metal components' },
    { src: 'https://awjsolutions.com/wp-content/uploads/2023/10/miami-3.jpg', caption: 'Marine metalwork' },
    { src: 'https://awjsolutions.com/wp-content/uploads/2023/12/gen3.jpg', caption: 'Advanced waterjet solutions' },
  ],

  videos: [],

  serviceArea: [
    'Fort Lauderdale',
    'Fort Lauderdale, FL',
    'South Florida',
    'Broward County',
    'Miami-Dade County',
  ],
  serviceAreaDescription:
    'Based in Fort Lauderdale, FL, we serve a 60 mile radius across South Florida including Broward and Miami-Dade counties.',

  seo: {
    titleTemplate: '%s | Advanced Waterjet Solutions',
    defaultTitle: 'Advanced Waterjet Solutions | Marine Services in Fort Lauderdale, FL',
    description:
      'Advanced Waterjet Solutions provides Welding & Fabrication in Fort Lauderdale, FL. Precision waterjet and laser cutting for marine industry. Request a quote today.',
    keywords: [
      'waterjet cutting Fort Lauderdale',
      'laser cutting Fort Lauderdale',
      'marine fabrication South Florida',
      'metal fabrication Fort Lauderdale',
      'welding fabrication Fort Lauderdale',
      'marine metalwork Florida',
    ],
  },

  hoursOfOperation: {
    Monday: '8 AM – 4 PM',
    Tuesday: '8 AM – 4 PM',
    Wednesday: '8 AM – 4 PM',
    Thursday: '8 AM – 4 PM',
    Friday: '8 AM – 4 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },

  social: {
    facebook: 'https://www.facebook.com/share/1KhFKCqXTA/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/advancedwaterjet?igsh=OGdkeDcwbHg2ZDJ5',
    linkedin: null,
    youtube: null,
  },

  badge: null,

  resend: {
    fromEmail: 'noreply@boatwork.co',
    toEmail: 'jacob@sailplan.com',
  },

  outboundWebhooks: [],
};
