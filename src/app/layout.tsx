import { ReactNode } from 'react';
import Navbar from '@/app/_components/NavBar';
import Provider from '@/app/_components/Provider';
import { cn } from '@/libs/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, 'relative min-h-svh')}
        suppressHydrationWarning
      >
        <Provider>
          <main className="max-h-[calc(100vh-50px)] min-h-[calc(100vh-50px)] overflow-y-auto px-20pxr scrollbar-hide">
            {children}
          </main>
          <Navbar />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
