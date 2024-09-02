// "use client"
// import React, { useState, useEffect } from 'react';
// import { Star, ThumbsUp, BookOpen, Book, BookMarked } from 'lucide-react';

// const categories = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography', 'History', 'Self-Help', 'Business', 'Travel'];

// const dummyBooks = [
//   { id: 1, title: "The Great Gatsby", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Fiction' },
//   { id: 2, title: "Sapiens", cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg', rating: 3.8, category: 'Non-Fiction' },
//   { id: 3, title: "The Da Vinci Code", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Mystery' },
//   { id: 4, title: "Dune", cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg', rating: 3.8, category: 'Sci-Fi' },
//   { id: 5, title: "Pride and Prejudice", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Romance' },
//   { id: 6, title: "Steve Jobs", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Biography' },
//   { id: 7, title: "Guns, Germs, and Steel", cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg', rating: 3.8, category: 'History' },
//   { id: 8, title: "The 7 Habits of Highly Effective People", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Self-Help' },
//   { id: 9, title: "The Lean Startup", cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg', rating: 3.8, category: 'Business' },
//   { id: 10, title: "The Beach", cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg', rating: 3.8, category: 'Travel' }
// ];

// const StarRating = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;
//   return (
//     <div className="flex items-center">
//       {[...Array(5)].map((_, i) => (
//         <Star
//           key={i}
//           size={20}
//           fill={i < fullStars ? "gold" : (i === fullStars && hasHalfStar ? "gold" : "none")}
//           stroke="gold"
//           strokeWidth={2}
//           className={i < fullStars ? "text-yellow-400" : "text-gray-400"}
//         />
//       ))}
//       <span className="ml-2 text-white text-sm">{rating.toFixed(1)}</span>
//     </div>
//   );
// };

// const BookButton = ({ Icon, label }) => (
//   <button className="flex items-center justify-center w-full p-2 bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
//     <Icon size={16} className="mr-2" />
//     {label}
//   </button>
// );

// const NextBookHomepage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredBooks, setFilteredBooks] = useState(dummyBooks);

//   useEffect(() => {
//     const filtered = dummyBooks.filter(book => 
//       (selectedCategory === 'All' || book.category === selectedCategory) &&
//       book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(filtered);
//   }, [selectedCategory, searchTerm]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <div className="flex flex-col items-center pt-10 px-4">
//         <div className="text-6xl font-bold mb-8 text-blue-400">NextBook</div>
//         <div className="w-full max-w-2xl mb-6">
//           <input
//             type="text"
//             placeholder="Search books by title"
//             className="w-full p-4 text-xl rounded-lg shadow-lg bg-gray-800 border-2 border-blue-500 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-wrap justify-center max-w-4xl mb-8">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`m-2 px-4 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${
//                 selectedCategory === category
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-700 text-blue-300 hover:bg-gray-600'
//               } shadow-md`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold mb-6">{selectedCategory} Books</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
//           {filteredBooks.map((book) => (
//             <div key={book.id} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
//               <img
//                 src={book.cover}
//                 alt={`${book.title} cover`}
//                 className="w-full h-auto object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
//                 <div className="flex flex-col items-start">
//                   <h3 className="text-lg font-bold mb-2">{book.title}</h3>
//                   <p className="text-sm mb-2">{book.category}</p>
//                   <StarRating rating={book.rating} />
//                 </div>
//                 <div className="flex flex-col w-full space-y-2 mt-4">
//                   <BookButton Icon={ThumbsUp} label="Recommend" />
//                   <BookButton Icon={BookOpen} label="Want to Read" />
//                   <BookButton Icon={Book} label="Read" />
//                   <BookButton Icon={BookMarked} label="Currently Reading" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


"use client"; // Ensure this is a Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { dummyBooks } from '../app/data/books';
import { Star, ThumbsUp, BookOpen, Book, BookMarked } from 'lucide-react'; // Ensure your icons are correctly imported

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

export default function NextBookHomepage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(dummyBooks);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = dummyBooks.filter(book =>
      (selectedCategory === 'All' || book.category === selectedCategory) &&
      (
        book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.author.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.category.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    setFilteredBooks(filtered);
  }, [selectedCategory, searchTerm]);

  const router = useRouter();

  const handleBookClick = (book) => {
    router.push(`/book/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  return (
    <div className="min-h-scree text-gray-100">
      <div className="flex flex-col items-center pt-10 px-4">
      <div className="text-6xl font-bold mb-8 text-yellow-300">NextBook</div>
      <div className="w-full max-w-2xl mb-6">
          <input
            type="text"
            placeholder="Search books by title, category, or author"
            className="w-full p-4 text-xl rounded-lg shadow-lg bg-gray-800 border-2 border-blue-500 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-center max-w-4xl mb-8">
          {['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography', 'History', 'Self-Help', 'Business', 'Travel'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`m-2 px-4 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-blue-300 hover:bg-gray-600'
              } shadow-md`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">{selectedCategory} Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredBooks.length > 0 ? filteredBooks.map((book) => (
            <div key={book.id} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group" onClick={() => handleBookClick(book)}>
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                  <p className="text-sm mb-2">{book.author} ({book.category})</p>
                  <StarRating rating={book.rating} />
                </div>
                <div className="flex flex-col w-full space-y-2 mt-4">
                  <BookButton Icon={ThumbsUp} label="Recommend" />
                  <BookButton Icon={BookOpen} label="Want to Read" />
                  <BookButton Icon={Book} label="Read" />
                  <BookButton Icon={BookMarked} label="Currently Reading" />
                </div>
              </div>
            </div>
          )) : (
            <div className="text-white text-center">No matches found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
