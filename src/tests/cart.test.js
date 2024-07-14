import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "../components/Cart"

// Mock Redux store setup
const mockStore = configureStore([]);

describe("Cart Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          {
            id: 1,
            name: "Product 1",
            category: "Category 1",
            price: 10.99,
            image: "product1.jpg",
          },
      
        ],
      },
    });
  });

  it("renders loading skeleton initially and then renders items", async () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const skeletonElements = screen.getAllByTestId("skeleton-product");
    expect(skeletonElements.length).toBe(5);

   
    await waitFor(() => {
      const loadedItems = screen.queryAllByTestId("cart-item");
      expect(loadedItems.length).toBe(1);
    });
  });
});
