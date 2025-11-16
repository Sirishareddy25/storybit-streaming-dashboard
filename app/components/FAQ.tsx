"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is StoryBit?",
    answer:
      "StoryBit is a movie discovery dashboard built using Next.js and the TMDB API. You can browse movies, view details, and watch trailers.",
  },
  {
    question: "Where do the movies come from?",
    answer:
      "All movies, posters, and metadata are fetched from The Movie Database (TMDB) API.",
  },
  {
    question: "Can I watch full movies here?",
    answer:
      "No. StoryBit only shows trailers and movie information. Full movies must be watched on legal streaming services.",
  },
  {
    question: "Is StoryBit free to use?",
    answer:
      "Yes! StoryBit is completely free because it only uses public TMDB API data.",
  },
  {
    question: "How does My List work?",
    answer:
      "My List randomly selects movies (or saved movies, if implemented) to simulate a personalized watchlist.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-20 px-4">
      <div className="max-w-8xl mx-auto bg-[#f5f5f5]/20 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">
          Frequently Asked Questions
        </h1>

        <div className="space-y-5">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 hover:bg-white/20 transition rounded-xl p-6 border border-white/10 shadow-lg cursor-pointer"
            >
              <div
                className="flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-xl font-semibold text-white">
                  {item.question}
                </h2>

                <ChevronDown
                  className={`transition-transform duration-300 text-white ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-white/80 leading-relaxed text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
