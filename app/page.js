"use client";
import React, { useState, useEffect } from 'react';
// Removed unused imports

import { useRouter } from 'next/navigation';
import SearchBox from "@/components/Searchbox";
import { Star } from 'lucide-react';
import { dummyBooks } from './data/books';
import Header from "@/components/Header";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < fullStars ? "gold" : (i === fullStars && hasHalfStar ? "gold" : "none")}
          stroke="gold"
          strokeWidth={2}
          className={i < fullStars ? "text-yellow-400" : "text-gray-400"}
        />
      ))}
      <span className="ml-2 text-white text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

const CustomCursor = () => (
  <style jsx global>{`
    body {
      cursor: pointer !important;
    }
  `}</style>
);

export default function Page() {
  const [filteredBooks, setFilteredBooks] = useState(dummyBooks);
  const router = useRouter();

  useEffect(() => {
    const filtered = dummyBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm]);

  const handleBookClick = (book) => {
    router.push(`/book/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  return (
    <>
      <CustomCursor />
      <Header />
      <SearchBox />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">{selectedCategory}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group" onClick={() => handleBookClick(book)}>
              <Image
                src={book.cover}
                alt={`${book.title} cover`}
                layout="responsive"
                width={500}
                height={750}
              />
              <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                  <p className="text-sm mb-2">{book.author}</p>
                  <StarRating rating={book.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
