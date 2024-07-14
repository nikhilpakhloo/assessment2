import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../store/CartSlice/CartSlice";
import Skeleton from "./Skeleton/ProductSkeloton";

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-10" data-testid='cart-item'>
      {isLoading
        ? Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} />
          ))
        : items.map((item) => (
            <div
              key={item.id}
              className="max-w-sm w-full h-full rounded overflow-hidden shadow-lg p-4 flex flex-col mb-4"
            >
              <img
                className="w-full h-60 object-contain hover:scale-110 cursor-pointer transition duration-400 ease-in"
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <div className="px-6 py-4 flex-1">
                <div className="font-bold text-md text-pretty mb-2">
                  {item.name}
                </div>
                <p className="text-gray-700 text-base">{item.category}</p>
                <p className="text-gray-700 font-bold">${item.price}</p>
              </div>
              <button
                className="border border-black p-2 rounded-2xl w-40 self-center"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove item
              </button>
            </div>
          ))}
    </div>
  );
}
