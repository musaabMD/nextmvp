"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { dummyBooks } from '../../data/books';
import Header from '@/components/Header';

export default function BookDetail() {
  const params = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const slug = params.bookname; // Ensure this matches your dynamic route segment name
    if (slug) {
      const formattedTitle = decodeURIComponent(slug).replace(/-/g, ' ');
      const selectedBook = dummyBooks.find(b => b.title.toLowerCase() === formattedTitle.toLowerCase());
      setBook(selectedBook);
    }
  }, [params.bookname]);

  if (!book) {
    return <div>Loading...</div>; // Show loading until book is found
  }

  return (
    <>
      <Header />
      <h1> hi</h1>
      <div className="  text-gray-100 p-8 flex justify-center items-center">
        <div style={{ width: '50%', textAlign: 'center' }}> {/* Adjusted width and text alignment */}
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            style={{ width: '20%', height: 'auto', margin: '0 auto' }}  // Adjusted for center alignment
          />
          <div className="p-4">
            <h1 className="text-5xl font-bold mb-6 font-sans">{book.title}</h1>
            <p>{book.description || "No description available."}</p>
            <p>Category: {book.category}</p>
          </div>
        </div>
      </div>
    </>
  );
}
