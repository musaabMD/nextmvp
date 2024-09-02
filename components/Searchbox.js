"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Star, ThumbsUp, BookOpen, Book, BookMarked } from 'lucide-react';
import { dummyBooks, dummyRecommendations, dummyAuthors } from '../app/data/books';
import Header from '@/components/Header';
import Image from 'next/image';

const placeholderImage = '/authorthumbnail.webp';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
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

const BookButton = ({ Icon, label }) => (
  <button className="flex items-center justify-center w-full p-2 bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
    <Icon size={16} className="mr-2" />
    {label}
  </button>
);

const AuthorCard = ({ author, bookCount, onClick }) => (
  <div 
    className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group cursor-pointer" 
    onClick={onClick}
  >
    <Image
      src={author.image || placeholderImage}
      alt={`${author.name}`}
      width={400}
      height={600}
      className="w-full h-auto object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">{author.name}</h3>
      <p className="text-sm mb-2">{bookCount} {bookCount === 1 ? 'Book' : 'Books'}</p>
    </div>
  </div>
);

const RecommendationCard = ({ recommendation, onClick }) => {
  const author = dummyAuthors.find(author => author.id === recommendation.authorId);
  const book = dummyBooks.find(book => book.id === recommendation.bookId);
  return (
    <div 
      key={recommendation.id}
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
      onClick={() => onClick(recommendation)}
    >
      <Image
        src={recommendation.cover}
        alt={`${recommendation.title} cover`}
        width={400}
        height={600}
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-2">{recommendation.title}</h3>
          <p className="text-sm mb-2">{author?.name} ({book?.category})</p>
          <StarRating rating={recommendation.rating} />
        </div>
        <div className="flex flex-col w-full space-y-2 mt-4">
          <BookButton Icon={ThumbsUp} label="Recommend" />
          <BookButton Icon={BookOpen} label="Want to Read" />
          <BookButton Icon={Book} label="Read" />
          <BookButton Icon={BookMarked} label="Currently Reading" />
        </div>
      </div>
    </div>
  );
};

// Additional JSX here
