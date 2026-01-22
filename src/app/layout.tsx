import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '¡Aprende Español! - Application d\'apprentissage de l\'espagnol',
  description: 'Apprenez l\'espagnol de A0 à C2 avec des leçons interactives, des quiz et un système de progression',
  manifest: '/manifest.json',
  themeColor: '#10B981',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '¡Aprende Español!',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <body className={`${dmSans.className} bg-background text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
