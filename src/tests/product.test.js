import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductCard from '../components/ProductCard';

describe('ProductCard Component', () => {
  const testData = {
    title: 'Test Product',
    category: 'Test Category',
    price: 25.99,
    image: 'https://example.com/test-image.jpg',
  };

  it('renders with dummy data', () => {
    // Create a mock store instance
    const mockStore = configureStore([]);
    const store = mockStore({}); // Initialize with empty state

    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <ProductCard data={testData} />
      </Provider>
    );

    // Assertions
    expect(getByAltText(testData.title)).toBeInTheDocument();
    expect(getByText(testData.title)).toBeInTheDocument();
    expect(getByText(testData.category)).toBeInTheDocument();
    expect(getByText(`$${testData.price.toFixed(2)}`)).toBeInTheDocument();
  });
});
