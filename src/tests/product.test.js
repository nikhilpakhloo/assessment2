import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 

import ProductCard from '../components/ProductCard';

describe('ProductCard Component', () => {
  const testData = {
    title: 'Test Product',
    category: 'Test Category',
    price: 25.99,
    image: 'https://example.com/test-image.jpg',
  };

  it('renders with dummy data', () => {
    
    const { getByAltText, getByText } = render(<ProductCard data={testData} />);

    expect(getByAltText(testData.title)).toBeInTheDocument();
    expect(getByText(testData.title)).toBeInTheDocument();
    expect(getByText(testData.category)).toBeInTheDocument();
    expect(getByText(`$${testData.price}`)).toBeInTheDocument();
  });
});
