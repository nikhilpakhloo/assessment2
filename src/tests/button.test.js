import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react'; // Import act from react
import Button from '../Utils/Button';// Import the Button component

describe('Button Component', () => {
  test('renders the button with correct initial state', () => {
    render(<Button addedToCart={false} handleAddToCart={jest.fn()} />);
    const buttonElement = screen.getByRole('button', { name: /Add to Cart/i });
    
    // Check that the button is rendered and in the document
    expect(buttonElement).toBeInTheDocument();
    // Check that the button text is "Add to Cart"
    expect(buttonElement).toHaveTextContent('Add to Cart');
    // Check that the button has the correct classes
    expect(buttonElement).toHaveClass('bg-white text-black');
    // Check that the button is not disabled
    expect(buttonElement).not.toBeDisabled();
  });

  test('renders the button with added state', () => {
    render(<Button addedToCart={true} handleAddToCart={jest.fn()} />);
    const buttonElement = screen.getByRole('button', { name: /Added to Cart/i });
    
    // Check that the button is rendered and in the document
    expect(buttonElement).toBeInTheDocument();
    // Check that the button text is "Added to Cart"
    expect(buttonElement).toHaveTextContent('Added to Cart');
    // Check that the button has the correct classes
    expect(buttonElement).toHaveClass('bg-black text-white');
    // Check that the button is disabled
    expect(buttonElement).toBeDisabled();
  });

  test('calls handleAddToCart when button is clicked', () => {
    const handleAddToCart = jest.fn();
    render(<Button addedToCart={false} handleAddToCart={handleAddToCart} />);
    const buttonElement = screen.getByRole('button', { name: /Add to Cart/i });

    act(() => {
      fireEvent.click(buttonElement);
    });

    // Check that the handleAddToCart function is called once
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

  test('button is disabled when addedToCart is true', () => {
    const handleAddToCart = jest.fn();
    render(<Button addedToCart={true} handleAddToCart={handleAddToCart} />);
    const buttonElement = screen.getByRole('button', { name: /Added to Cart/i });

    act(() => {
      fireEvent.click(buttonElement);
    });

    // Check that the handleAddToCart function is not called
    expect(handleAddToCart).not.toHaveBeenCalled();
  });
});
