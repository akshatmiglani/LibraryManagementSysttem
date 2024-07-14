import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
    }
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !author) return;
    const book = { title, author };
    if (initialData) {
      onSubmit({ ...book, id: initialData.id });
    } else {
      onSubmit(book);
    }
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter book title"
      />
    </div>
    <div>
      <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter book author"
      />
    </div>
    <button
      type="submit"
      className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
    >
      {initialData ? 'Update Book' : 'Add Book'}
    </button>
  </form>
);
};

export default BookForm;
