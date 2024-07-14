import React, { useState } from 'react';
import axios from 'axios';

const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axios.get(`http://localhost:3000/api/books?category=${category}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>
      <ul>
        {['fiction', 'juvenile Fiction', 'history', 'science', 'adventure', 'business economics', 'technology & Engineering', 'classics', 'medical'].map(category => (
          <li key={category} onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer' }}>
            {category}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div>
          <h2>Books in {selectedCategory}</h2>
          <ul>
            {books.map(book => (
              <li key={book._id}>
                <h3>{book.title}</h3>
                <p>Author: {book.authors.join(', ')}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Published Date: {book.publishedDate}</p>
                <p>Description: {book.description}</p>
                <p>Page Count: {book.pageCount}</p>
                <p>Main Category: {book.mainCategory}</p>
                <p>Average Rating: {book.averageRating}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Filter;
