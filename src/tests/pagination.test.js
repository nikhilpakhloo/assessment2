import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const totalPages = 5;
  const currentPage = 3;
  const onPageChange = jest.fn();

  it('renders pagination buttons correctly', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(totalPages);

    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());

      if (index + 1 === currentPage) {
        expect(button).toHaveClass('bg-blue-600 text-white');
      } else {
        expect(button).toHaveClass('bg-blue-200 text-blue-700 hover:bg-blue-300');
      }

      fireEvent.click(button); // Example: simulate click event
      expect(onPageChange).toHaveBeenCalledWith(index + 1); // Example: assert onPageChange was called with correct page number
    });
  });
});
