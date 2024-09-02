"use client";  // Ensures this component runs on the client-side

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  // Correct import for client components
import Image from 'next/image';
import Header from '@/components/Header';

export default function BookDetailPage() {
  const router = useRouter();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const bookname = router.query.bookname;
    if (bookname) {
      const formattedTitle = decodeURIComponent(bookname.replace(/-/g, ' '));
      // Simulate fetching book details
      const foundBook = { title: formattedTitle, cover: '/path/to/book/cover.jpg' }; // Replace with actual fetch logic
      setBook(foundBook);
    }
  }, [router.query.bookname]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="text-gray-100 p-8 flex justify-center items-center">
        <div style={{ width: '50%', textAlign: 'center' }}>
          <Image
            src={book.cover}
            alt={`${book.title} cover`}
            width={400}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="p-4">
            <h1 className="text-5xl font-bold mb-6 font-sans">{book.title}</h1>
            <p>Category: {book.category}</p>
          </div>
        </div>
      </div>
    </>
  );
}
