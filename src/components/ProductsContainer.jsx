import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductsFilter from "../Utils/ProductsFilter";
import SearchBar from "../Utils/SearchBar";

export default function ProductsContainer() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // State for filtered products based on category
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");


  // Fetch products from API on initial render
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json); // Initialize filtered products with all products
      });
  }, []);

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category

    if (category === "All") {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate current items based on filtered products
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page when searching

    if (searchTerm === "") {
      // If search term is empty, show all products or filtered by category
      if (selectedCategory === "All") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) => product.category === selectedCategory);
        setFilteredProducts(filtered);
      }
    } else {
      // Filter products by search term
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <ProductsFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
         <SearchBar onSearch={handleSearch} />

      
      <div className="grid grid-cols-3 gap-10 place-content-center justify-center">
        {currentItems.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
