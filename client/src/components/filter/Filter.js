import React, { useState } from 'react';
import axios from 'axios';

const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleCategoryClick = async (category, page = 1) => {
    setSelectedCategory(category);
    fetchBooks(category, page);
  };

  const fetchBooks = async (category, page) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/books?category=${category}&page=${page}&limit=10`);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handlePageChange = (page) => {
    fetchBooks(selectedCategory, page);
    setCurrentPage(page);
  };

  return (
    <div>
      <div>
        {['Fiction', 'Juvenile Fiction', 'History', 'Science', 'Adventure', 'Political Science', 'Philosophy', 'Classics', 'Medical'].map(category => (
          <button key={category} onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer' }}>
            {category}
          </button>
        ))}
      </div>
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
          <div>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter;
