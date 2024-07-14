import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (event) => {
    setTitle(event.target.value);
    if (event.target.value.length > 0) { // maybe add debouncing here for performance
      try {
        const response = await axios.get(`http://localhost:4000/books`, {
          params: { title: event.target.value }
        });
        setBooks(response.data.items || []); // Ensure default to empty array if no items
      } catch (error) {
        console.error('Failed to fetch books', error.response || error);
      }
    } else {
      setBooks([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books by title..."
        value={title}
        onChange={handleSearch}
      />
      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <a href={book.selfLink} target="_blank" rel="noopener noreferrer">
                {book.volumeInfo.title} by {(book.volumeInfo.authors || []).join(', ')}
              </a>
              - Published by {book.volumeInfo.publisher}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
