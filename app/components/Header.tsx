"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close profile on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled ? "bg-black/95 backdrop-blur-md py-2" : "bg-black/70 backdrop-blur-sm py-4"
      } border-b border-white/5`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-rose-600 select-none">
              StoryBit
            </span>
          </Link>

          {/* Desktop primary nav (compact like Netflix) */}
          <nav className="hidden lg:flex items-center gap-6 ml-6">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/trending" className="nav-link">
              Trending
            </Link>
            <Link href="/faq" className="nav-link">
              FAQ
            </Link>
            <Link href="/my-list" className="nav-link">
              My List
            </Link>
          </nav>
        </div>

        {/* Center spacer — keeps nav centered-ish */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search icon — links to /search */}
          <Link
            href="/search"
            aria-label="Search"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded hover:bg-white/6 transition text-white/90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Kids label (optional) */}
          <Link
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden md:inline-block px-3 py-1 rounded text-sm font-medium hover:bg-white/6 transition"
          >
            Kids
          </Link>

          {/* Notifications / Bell */}
          <button
            className="hidden md:flex items-center justify-center w-10 h-10 rounded hover:bg-white/6 transition text-white/90"
            aria-label="Notifications"
            title="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.6V11a6 6 0 10-12 0v3.6c0 .538-.214 1.055-.595 1.505L4 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((s) => !s)}
              aria-expanded={profileOpen}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/6 transition"
            >
              {/* circular initial — replace with <Image> if you want an avatar */}
              <div className="w-9 h-9 rounded flex items-center justify-center bg-zinc-200 text-black font-bold">
                S
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/80">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-md shadow-xl transform origin-top-right transition-all ${
                profileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="menu"
            >
              <div className="p-3 border-b border-white/6">
                <p className="text-sm text-white/70">Signed in as</p>
                <p className="font-semibold text-white mt-1">User Name</p>
              </div>

              <div className="p-2 space-y-1">
                <Link href="/account" className="block px-3 py-2 rounded hover:bg-white/5">
                  Account
                </Link>

                <Link href="/profiles" className="block px-3 py-2 rounded hover:bg-white/5">
                  Manage Profiles
                </Link>

                <Link href="/help" className="block px-3 py-2 rounded hover:bg-white/5">
                  Help Center
                </Link>

                <button
                  onClick={() => { /* sign out */ }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/5"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-white/6 transition"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/90">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden bg-black/95 border-t border-white/5 transition-all ${menuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"}`}>
        <div className="px-4 space-y-2">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/trending" className="block py-2">Trending</Link>
          <Link href="/faq" className="block py-2">FAQ</Link>
          <Link href="/my-list" className="block py-2">My List</Link>
          <Link href="/search" className="block py-2">Search</Link>
        </div>
      </div>
    </header>
  );
}
