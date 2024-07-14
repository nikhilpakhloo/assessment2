import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; //matcher
import ProductsFilter from '../Utils/ProductsFilter';
describe('ProductsFilter', () => {
  it('renders correctly', () => {
    const filters = [
      { id: 1, type: 'All' },
      { id: 2, type: "men's clothing" },
      { id: 3, type: "women's clothing" },
      { id: 4, type: 'jewelery' },
      { id: 5, type: 'electronics' },
    ];

    const selectedCategory = "men's clothing"; 
    const onSelectCategory = jest.fn(); 

    const { getByText } = render(
      <ProductsFilter selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
    );

   
    filters.forEach((filter) => {
      const buttonElement = getByText(filter.type);
      expect(buttonElement).toBeInTheDocument();
    });
  });

  it('calls onSelectCategory with the correct category when a button is clicked', () => {
    const filters = [
      { id: 1, type: 'All' },
      { id: 2, type: "men's clothing" },
      { id: 3, type: "women's clothing" },
      { id: 4, type: 'jewelery' },
      { id: 5, type: 'electronics' },
    ];

    const onSelectCategory = jest.fn()

    const { getByText } = render(
      <ProductsFilter selectedCategory={''} onSelectCategory={onSelectCategory} />
    );

    filters.forEach((filter) => {
      const buttonElement = getByText(filter.type);
      fireEvent.click(buttonElement);
      expect(onSelectCategory).toHaveBeenCalledWith(filter.type);
    });
  });
});
