import React from 'react';

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Author</th>
            <th className="py-3 px-6 text-left">ISBN</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {books.map((book) => (
            <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{book.title}</td>
              <td className="py-3 px-6 text-left">{book.author}</td>
              <td className="py-3 px-6 text-left">{book.isbn}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(book)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;