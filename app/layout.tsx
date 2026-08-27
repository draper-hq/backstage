import type { Metadata } from 'next';
import { Archivo_Black, Public_Sans } from 'next/font/google';
import './globals.css';

const archivo = Archivo_Black({
  variable: '--font-display',
  weight: '400',
  subsets: ['latin'],
});

const publicSans = Public_Sans({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Backstage — The meeting behind your deck',
  description: 'An open-source presentation framework with a private second-screen control room.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${publicSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
