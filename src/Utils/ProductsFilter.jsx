import React from "react";

const filters = [
  { id: 1, type: "All" },
  { id: 2, type: "men's clothing" },
  { id: 3, type: "women's clothing" },
  { id: 4, type: "jewelery" },
  { id: 5, type: "electronics" },
];

export default function ProductsFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full flex justify-center mt-4 gap-4">
      {filters.map((item) => (
        <button
          key={item.id}
          className={`rounded-xl px-6 py-1 border-gray-500 border-[1px] ${selectedCategory === item.type ? 'bg-gray-300' : ''}`}
          onClick={() => onSelectCategory(item.type)}
        >
          {item.type}
        </button>
      ))}
    </div>
  );
}
