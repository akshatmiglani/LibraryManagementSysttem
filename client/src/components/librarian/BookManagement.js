import React, { useState } from 'react';
import BookList from './BookList';
import BookForm from './Bookform';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
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