import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='my-10 flex justify-center'>
      {pages.map(page => (
        <button
          key={page}
       
          onClick={() => onPageChange(page)}
          className={`mx-1 px-4 py-2 rounded  ${
            page === currentPage ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-700 hover:bg-blue-300'
          }`}
      role='button'
        >
          {page}
        </button>
      ))}
    </div>
  );
}
