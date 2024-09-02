"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import { dummyRecommendations } from '../data/books'; // Ensure this import is used in the component

const CustomCursor = () => (
  <style jsx global>{`
    body {
      cursor: pointer !important;
    }
  `}</style>
);

export default function RecommendationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecommendations, setFilteredRecommendations] = useState(dummyRecommendations);
  const router = useRouter();

  useEffect(() => {
    const filteredRecs = dummyRecommendations.filter(rec =>
      rec.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecommendations(filteredRecs);
  }, [searchTerm]);

  const handleRecommendationClick = (rec) => {
    router.push(`/recommendations/${encodeURIComponent(rec.title.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  return (
    <>
      <CustomCursor />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container mx-auto px-4 py-8">
          <input
            type="text"
            placeholder="Search Recommendations"
            className="w-full p-4 text-xl rounded-lg shadow-lg bg-gray-800 border-2 border-blue-500 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredRecommendations.map((rec) => (
              <div key={rec.id} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group" onClick={() => handleRecommendationClick(rec)}>
                <img
                  src={rec.cover}
                  alt={`${rec.title} cover`}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex flex-col items-start">
                    <h3 className="text-lg font-bold mb-2">{rec.title}</h3>
                    <p className="text-sm mb-2">Author: {rec.author}</p>  // Ensure the author detail is included in your data source
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </>
  );
}
