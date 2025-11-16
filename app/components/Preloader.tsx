"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Simple Preloader overlay.
 * - shown until window 'load' or a small timeout
 * - flashes briefly on internal page navigation (pathname change)
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // hide when window load fires (real resources loaded)
  useEffect(() => {
    function onLoaded() {
      // keep loader for at least 350ms for smoothness
      setTimeout(() => setVisible(false), 350);
    }

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        onLoaded();
      } else {
        window.addEventListener("load", onLoaded);
        // fallback: if load never fires (rare), hide after 2s
        const fallback = setTimeout(onLoaded, 2000);
        return () => {
          window.removeEventListener("load", onLoaded);
          clearTimeout(fallback);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // show brief flash on internal navigation
  useEffect(() => {
    // don't run on mount if already visible is false (page load done)
    if (!visible) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 600); // show 600ms
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-center">
        <div className="preloader-spinner" aria-hidden />
        <div className="mt-10 text-white text-lg font-bold ">StoryBit</div>
      </div>
    </div>
  );
}
