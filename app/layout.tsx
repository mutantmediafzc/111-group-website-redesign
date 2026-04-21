import type { Metadata } from "next";
import { ThemeProvider } from "./components/ThemeProvider";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "111 Group — Global Mobility, Citizenship & Private Wealth",
  description:
    "A Dubai-based legal partnership for citizenship by investment, residence by investment, private wealth and global mobility. Your trusted partner in legal matters.",
  icons: { icon: "/brand/favicon.png" },
};

// Prevent dark-mode flash: run before React hydrates
const themeScript = `
(function(){try{
  if(typeof window==="undefined")return;
  var t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  if(t==='dark')document.documentElement.classList.add('dark');
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain antialiased">
        <ThemeProvider>
          <Navigation />
          <main className="relative z-0">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
