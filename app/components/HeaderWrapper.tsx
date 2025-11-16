"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function HeaderWrapper() {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200
        ${scrolled ? "bg-black/90 backdrop-blur-md py-2" : "bg-black/60 py-4"}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="text-3xl font-extrabold text-red-600">
          StoryBit
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-6 text-white/80 text-lg">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/trending" className="hover:text-white transition">Trending</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
          <Link href="/my-list" className="hover:text-white transition">My List</Link>
          <Link href="/search" className="hover:text-white transition">Search</Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="relative flex items-center gap-4" ref={ref}>
          {/* PROFILE BUTTON */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition"
          >
            <div className="w-9 h-9 rounded bg-gray-300 flex items-center justify-center text-black font-bold">
              S
            </div>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              className="text-white/80"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>

          {/* DROPDOWN */}
          {profileOpen && (
            <div
              className="absolute right-0 top-12 w-56 bg-zinc-900 border border-white/10 
              rounded-lg shadow-lg animate-dropdown z-50"
            >
              {/* PROFILES */}
              <div className="p-4 border-b border-white/10">
                <p className="text-white/70 text-sm mb-2">Profiles</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-8 h-8 bg-gray-300 rounded-sm" />
                    <span className="text-white group-hover:text-red-400">User 1</span>
                  </div>

                  <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-8 h-8 bg-blue-500 rounded-sm" />
                    <span className="text-white group-hover:text-red-400">Kids</span>
                  </div>

                  <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-8 h-8 bg-green-500 rounded-sm" />
                    <span className="text-white group-hover:text-red-400">Guest</span>
                  </div>
                </div>
              </div>

              {/* OPTIONS */}
              <div className="p-2">
                <Link
                  href="/account"onClick={(e) => e.preventDefault()}
                  className="dropdown-item"
                >
                  Account
                </Link>
                <Link
                  href="/help"onClick={(e) => e.preventDefault()}
                  className="dropdown-item"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="dropdown-item"
                >
                  Kids Mode
                </Link>

                <button className="dropdown-item text-left w-full">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
