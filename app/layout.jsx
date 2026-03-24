import './globals.css';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Providers } from './providers';

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
    'Expert home accessibility solutions for aging in place. South Florida\'s trusted partner for safe, elegant, independent living.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://outlivehome.com'
  ),
  openGraph: {
    title: 'Outlive Homes | The Art and Science of Outliving at Home',
    description:
      'Expert home accessibility solutions for aging in place. South Florida\'s trusted partner for safe, elegant, independent living.',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
