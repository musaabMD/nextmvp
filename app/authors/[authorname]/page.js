"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { dummyAuthors, dummyBooks } from '../../data/books';
import Header from '@/components/Header';

export default function AuthorDetail() {
  const params = useParams();
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    const slug = params.authorname;
    if (slug) {
      const formattedName = decodeURIComponent(slug).replace(/-/g, ' ');
      const selectedAuthor = dummyAuthors.find(a => a.name.toLowerCase() === formattedName.toLowerCase());
      setAuthor(selectedAuthor);

      if (selectedAuthor) {
        const booksByAuthor = dummyBooks.filter(book => book.authorId === selectedAuthor.id);
        setAuthorBooks(booksByAuthor);
      }
    }
  }, [params.authorname]);

  if (!author) {
    return <div>Loading...</div>; // Show loading until author is found
  }

  return (
    <>
      <Header />
      <div className="text-gray-100 p-8 flex justify-center items-center">
        <div style={{ width: '50%', textAlign: 'center' }}>
          <img
            src={author.image || '/authorthumbnail.webp'}
            alt={`${author.name}`}
            style={{ width: '20%', height: 'auto', margin: '0 auto' }}
          />
          <div className="p-4">
            <h1 className="text-5xl font-bold mb-6 font-sans">{author.name}</h1>
            <p className="text-xl mb-4">Number of Books: {authorBooks.length}</p>
            <p className="text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.</p>
            <blockquote className="text-md italic">"Sample quote or description about the author."</blockquote>
          </div>
        </div>
      </div>
      <div className="text-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-6">Books by {author.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {authorBooks.map(book => (
            <div key={book.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                <p className="text-sm mb-2">{book.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
