import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToastProvider } from "@/components/toast-provider";
import { getSession } from "@/lib/dal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "BookNook | A little more room for wonder",
    template: "BookNook | %s",
  },
  description:
    "Discover a good story, borrow it for a while, and pass the feeling along. Welcome to Book Nook, a small online library for curious minds.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ToastProvider>
          <SiteHeader initialUser={session?.user ?? null} />
          <div className="page-content">{children}</div>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
