import './globals.css';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://banglawebfonts.pages.dev/css/hind-siliguri.min.css" rel="stylesheet" />
        <link href="https://banglawebfonts.pages.dev/css/tiro-bangla.min.css" rel="stylesheet" />
      </head>
      <body>
        <AppHeader />
        <main>{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}