// File: nextmvp/app/page.js

"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ButtonSignin from "@/components/ButtonSignin";
import SearchBox from "@/components/Searchbox";
import { Star } from 'lucide-react';
import { categories, dummyBooks } from './data/books';
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(dummyBooks);
  const router = useRouter();

  useEffect(() => {
    const filtered = dummyBooks.filter(book =>
      (selectedCategory === 'All' || book.category === selectedCategory) &&
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [selectedCategory, searchTerm]);

  const handleBookClick = (book) => {
    router.push(`/book/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  return (
    <>
    <h1> hi</h1>
      <CustomCursor />
      <Header/>
      <SearchBox/>

      {/* Rest of your component */}
    </>
  );
}