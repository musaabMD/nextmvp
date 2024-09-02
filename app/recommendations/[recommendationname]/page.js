"use client";

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { dummyAuthors, dummyBooks, dummyRecommendations } from '../../data/books';
import Header from '@/components/Header';

export default function RecommendationDetail() {
  const params = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    const slug = params.recommendationname;
    if (slug) {
      const formattedName = decodeURIComponent(slug).replace(/-/g, ' ');
      const selectedRecommendation = dummyRecommendations.find(r => r.title.toLowerCase() === formattedName.toLowerCase());
      setRecommendation(selectedRecommendation);

      if (selectedRecommendation) {
        const selectedAuthor = dummyAuthors.find(a => a.id === selectedRecommendation.authorId);
        setAuthor(selectedAuthor);

        if (selectedAuthor) {
          const booksByAuthor = dummyBooks.filter(book => book.authorId === selectedAuthor.id);
          setAuthorBooks(booksByAuthor);
        }
      }
    }
  }, [params.recommendationname]);

  if (!recommendation || !author) {
    return <div>Loading...</div>; // Show loading until recommendation and author are found
  }

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="text-gray-100 p-8 flex justify-center items-center">
          <div style={{ width: '50%', textAlign: 'center' }}>
            <img
              src={recommendation.cover}
              alt={`${recommendation.title} cover`}
              style={{ width: '20%', height: 'auto', margin: '0 auto' }}
            />
            <div className="p-4">
              <h1 className="text-5xl font-bold mb-6 font-sans">{recommendation.title}</h1>
              <p className="text-xl mb-4">Author: {author.name}</p>
              <p className="text-xl mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.</p>
              <blockquote className="text-md italic">&quot;Sample quote or description about the recommendation.&quot;</blockquote>
            </div>
          </div>
        </div>
        <div className="text-gray-100 p-8">
          <h2 className="text-3xl font-bold mb-6">More Books by {author.name}</h2>
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
      </Suspense>
    </>
  );
}
