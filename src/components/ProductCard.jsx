import React, { useState } from "react";
import { addItemToCart } from "../store/CartSlice/CartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ data }) {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItemToCart(data));
    setAddedToCart(true); 
  };

  return (
    <div className="mt-6 ">
      <div className="max-w-sm w-full h-full rounded overflow-hidden shadow-lg p-4 flex flex-col">
        <img
          className="w-full h-60 object-contain hover:scale-110 cursor-pointer transition duration-400 ease-in"
          src={data.image}
          alt={data.title}
          loading="lazy"
        />
        <div className="px-6 py-4 flex-1">
          <div className="font-bold text-md text-pretty mb-2">{data.title}</div>
          <p className="text-gray-700 text-base ">{data.category}</p>
          <p className="text-gray-700 font-bold">${data.price}</p>
        </div>
        <button
          className={`border border-black p-2 ${addedToCart ? "bg-black text-white":"bg-white text-black"} rounded-2xl w-40 self-center`}
          onClick={handleAddToCart}
          disabled={addedToCart} 
        >
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
