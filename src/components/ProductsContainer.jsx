import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductsFilter from "../Utils/ProductsFilter";
import SearchBar from "../Utils/SearchBar";
import { useProducts } from "../ProductContext";
import Skeleton from "./Skeleton/ProductSkeloton";

export default function ProductsContainer() {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const itemsPerPage = 5;

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize filtered products with all products when products data changes
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
      setLoading(false); // Turn off loading indicator after initial data load
    }
  }, [products]);

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category

    if (category === "All") {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page when searching

    if (searchTerm === "") {
      // If search term is empty, show all products or filtered by category
      if (selectedCategory === "All") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(
          (product) => product.category === selectedCategory
        );
        setFilteredProducts(filtered);
      }
    } else {
      // Filter products by search term
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Calculate current items based on filtered products
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Array to generate multiple skeletons
  const skeletonArray = Array.from({ length: 5 }, (_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <ProductsFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-3 gap-10 place-content-center justify-center">
        {loading ? (
          // Show skeleton loading for 1 second
          <React.Fragment>{skeletonArray}</React.Fragment>
        ) : (
          currentItems.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
