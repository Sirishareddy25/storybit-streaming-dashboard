"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-20 border-t border-red-700 bg-red-900 text-white/90
">
      {/* Top email signup */}
      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>

        <div className="flex flex-col md:flex-row justify-center gap-3 mt-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 w-full md:w-96 rounded-md bg-zinc-800 text-white outline-none"
          />
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md">
            Get Started
          </button>
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-6xl mx-auto px-6 ">
        <p className="mb-6">Questions? Call <span className="text-white">000-200-300-400</span></p>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Link href="/faq">FAQ</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Help Centre</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Account</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Media Centre</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Investor Relations</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Jobs</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Ways to Watch</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Terms of Use</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Privacy</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Cookie Preferences</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Corporate Information</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Contact Us</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Speed Test</Link>
          <Link href="#" onClick={(e) => e.preventDefault()}>Legal Notices</Link>
        </div>

        

        {/* Region */}
        <p className="mt-6 text-4xl bold">Story-Bit</p>

        {/* Copyright */}
        <p className="mt-2 pb-2 text-xs text-white/60">
          © {year} StoryBit — Inspired by Moviedb 
        </p>
      </div>
    </footer>
  );
}
