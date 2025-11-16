// app/ClientLayout.tsx
"use client";

import React from "react";
import Header from "./components/Header";         // Netflix-style header (we created)
import Footer from "./components/Footer";         // your footer component
// optional: if you added SoundPreload earlier, import it or inline it here

// Small non-visible preload for audio files so sound effects load fast
function SoundPreload() {
  return (
    <div style={{ display: "none" }} aria-hidden>
      <audio preload="auto" src="/sounds/hover.mp3" />
      <audio preload="auto" src="/sounds/click.mp3" />
      <audio preload="auto" src="/sounds/play.mp3" />
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SoundPreload />
      {/* main padding here matches header height */}
      <main className="pt-20 px-6 md:px-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
