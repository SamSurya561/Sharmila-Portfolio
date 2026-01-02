'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/providers/theme-provider";
import LenisProvider from "@/components/providers/lenis-provider";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Preloader from '@/components/Preloader';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="font-body antialiased overflow-x-hidden">
        {isLoading ? (
          <Preloader />
        ) : (
          <FirebaseClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <LenisProvider>
                <GridBackground />
                <Navbar />
                {children}
                <Footer />
                <Toaster />
              </LenisProvider>
            </ThemeProvider>
          </FirebaseClientProvider>
        )}
      </body>
    </html>
  );
}
