import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../Utils/SearchBar';

describe('SearchBar Component', () => {
  it('calls onSearch with the entered search term', () => {
    // Mock onSearch function
    const mockOnSearch = jest.fn();

    // Render the SearchBar component with mock function
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);

    // Get the input field by its placeholder text
    const inputElement = getByPlaceholderText('Search by Name');

    // Simulate user typing into the input field
    fireEvent.change(inputElement, { target: { value: 'test' } });

    // Check if handleChange updates the searchTerm state and calls onSearch
    expect(inputElement.value).toBe('test');
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});
