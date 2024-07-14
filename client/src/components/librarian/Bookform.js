import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, initialData }) => {
  const [book, setBook] = useState({ title: '', author: '', isbn: '' });

  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
    setBook({ title: '', author: '', isbn: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {initialData ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;