"use client";

import React, { useState, useEffect } from "react";

export default function AddToListButton({ movie }: { movie: any }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("myList") ?? "[]";
    const list = JSON.parse(raw);
    setIsAdded(list.some((m: any) => m.id === movie.id));
  }, [movie.id]);

  function addToList() {
    try {
      const raw = localStorage.getItem("myList") ?? "[]";
      let list = JSON.parse(raw);

      if (list.some((m: any) => m.id === movie.id)) {
        setIsAdded(true);
        return;
      }

      list.push(movie);
      localStorage.setItem("myList", JSON.stringify(list));
      setIsAdded(true);
    } catch (err) {
      console.error("Failed to update localStorage", err);
    }
  }

  return (
    <button
      onClick={addToList}
      className={`px-3 py-1 rounded text-sm mt-2 ${
        isAdded ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {isAdded ? "Added ✓" : "Add to My List ❤️"}
    </button>
  );
}
