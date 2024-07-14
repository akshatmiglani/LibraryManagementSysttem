import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import BookForm from './Bookform';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (book) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      const newBook = await response.json();
      setBooks([...books, newBook]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const response = await fetch(`/api/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      const result = await response.json();
      setBooks(books.map((book) => (book.id === result.id ? result : book)));
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manage Books</h2>
      <BookForm onSubmit={editingBook ? updateBook : addBook} initialData={editingBook} />
      <BookList books={books} onEdit={setEditingBook} onDelete={deleteBook} />
    </div>
  );
};

export default BookManagement;
