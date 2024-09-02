export const categories = [
    'All', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography', 'History', 'Self-Help', 'Business', 'Travel'
  ];
  
  export const dummyAuthors = [
    { id: 1, name: "F. Scott Fitzgerald", image: 'https://static.tvtropes.org/pmwiki/pub/images/danbrown1.jpg', books: 5 },
    { id: 2, name: "Yuval Noah Harari", image: 'https://static.tvtropes.org/pmwiki/pub/images/danbrown1.jpg', books: 3 },
    { id: 3, name: "Dan Brown", image: 'https://static.tvtropes.org/pmwiki/pub/images/danbrown1.jpg', books: 7 },
    { id: 4, name: "Frank Herbert", image: 'https://static.tvtropes.org/pmwiki/pub/images/danbrown1.jpg', books: 6 },
    { id: 5, name: "Jane Austen", image: '', books: 4 },
    // Add more authors here
  ];
  
  export const dummyBooks = [
    { id: 1, title: "The Great Gatsby", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Fiction', authorId: 1, description: "A novel set in the Roaring Twenties that tells the story of the mysterious millionaire Jay Gatsby." },
    { id: 2, title: "Sapiens", cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg', rating: 3.8, category: 'Non-Fiction', authorId: 2, description: "A brief history of humankind, exploring how Homo sapiens became the dominant species." },
    { id: 3, title: "The Da Vinci Code", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Mystery', authorId: 3, description: "A mystery thriller that follows symbologist Robert Langdon in a quest to uncover a religious secret." },
    { id: 4, title: "Dune", cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg', rating: 3.8, category: 'Sci-Fi', authorId: 4, description: "A science fiction epic set on the desert planet Arrakis, focusing on politics, religion, and power." },
    { id: 5, title: "Pride and Prejudice", cover: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg', rating: 4.5, category: 'Romance', authorId: 5, description: "A classic novel that explores issues of class, marriage, and morality in 19th century England." },
    // Add more books here
  ];
  
  export const dummyRecommendations = [
    { id: 1, title: "1984", cover: 'https://static.tvtropes.org/pmwiki/pub/images/danbrown1.jpg', authorId: 1, books: 8, description: "A dystopian novel set in a totalitarian society under constant surveillance." },
    { id: 2, title: "To Kill a Mockingbird", cover: 'https://static.tvtropes.org/pmwiki/pub/images/danbrown1.jpg', authorId: 2, books: 4, description: "A novel about racial injustice in the Deep South, seen through the eyes of a child." },
    // Add more recommendations here
  ];
  