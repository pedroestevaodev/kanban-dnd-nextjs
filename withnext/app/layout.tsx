import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { siteMetadata, siteViewport } from "@/config/site";
import { ChildrenProps } from "@/types/nextjs";
import { Providers } from "@/components/providers";
import { cn } from "@/helpers/auxiliary-helpers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

const RootLayout = ({ children }: Readonly<ChildrenProps>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Navbar />

            <main className="relative mt-[12px] flex-grow mix-blend-mode-unset">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
