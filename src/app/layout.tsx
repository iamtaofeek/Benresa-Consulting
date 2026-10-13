import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { DemoWorkspaceProvider } from '@/context/DemoWorkspaceContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { KeyboardShortcutsModal } from '@/components/KeyboardShortcutsModal';
import { GuidedDemoTour } from '@/components/GuidedDemoTour';

export const metadata: Metadata = {
  title: 'Benresa Consult Limited — HR, Tax & Business Consulting | Modern Experience',
  description: 'A fintech-grade corporate redesign of Benresa Consult Limited and an interactive client operations workspace demonstrating connected advisory workflows.',
  keywords: ['Human Resources', 'Tax Management', 'Talent Acquisition', 'Outsourcing', 'Compliance', 'Business Consulting', 'Lagos Nigeria'],
  icons: {
    icon: '/favicon.ico',
    apple: '/benresa-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="technical-grid-bg min-h-screen flex flex-col antialiased bg-slate-50 dark:bg-[#070d1a] text-slate-900 dark:text-slate-100 transition-colors duration-150"
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('benresa-theme');
                var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (t === 'dark' || (!t && d) || (t === 'system' && d)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch(e) {}
            })()`
          }}
        />
        <ThemeProvider>
          <DemoWorkspaceProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CommandPalette />
            <KeyboardShortcutsModal />
            <GuidedDemoTour />
          </DemoWorkspaceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
