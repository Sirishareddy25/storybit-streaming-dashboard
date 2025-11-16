// app/layout.tsx (your RootLayout)
import "./globals.css";
import React from "react";
import ClientLayout from "./ClientLayout"; // client wrapper

export const metadata = {
  title: "StoryBit Streaming Dashboard",
  description: "A Netflix-style dashboard using Next.js 16+",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-neutral-900 text-white"
        suppressHydrationWarning={true}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
