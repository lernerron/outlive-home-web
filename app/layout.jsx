import './globals.css';
import Script from 'next/script';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Providers } from './providers';

const GTM_ID = 'GTM-NXD2RKXX';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata = {
  title: 'Outlive Homes | The Art and Science of Outliving at Home',
  description:
    'Expert home accessibility solutions for aging in place. Your trusted partner for safe, elegant, independent living.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://outlivehome.com'
  ),
  openGraph: {
    title: 'Outlive Homes | The Art and Science of Outliving at Home',
    description:
      'Expert home accessibility solutions for aging in place. Your trusted partner for safe, elegant, independent living.',
    type: 'website',
    images: ['/assets/outlive-homes-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outlive Homes | The Art and Science of Outliving at Home',
    description:
      'Expert home accessibility solutions for aging in place.',
    images: ['/assets/outlive-homes-og.jpg'],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#1e40af',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Outlive Homes',
  description: 'Expert home accessibility solutions for aging in place. Barrier-free bathroom conversions installed in days, not months.',
  url: 'https://outlivehome.com',
  logo: 'https://outlivehome.com/assets/outlive-homes-og.jpg',
  areaServed: [
    { '@type': 'State', name: 'Florida' },
    { '@type': 'City', name: 'Los Angeles' },
  ],
  serviceType: 'Home Accessibility Modifications',
  foundingDate: '2025',
  slogan: 'The Art and Science of Outliving at Home',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className={dmSans.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
