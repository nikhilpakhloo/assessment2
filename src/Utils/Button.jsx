import React from 'react'

export default function Button({addedToCart,handleAddToCart}) {
  return (
    <button
    className={`border border-black p-2 ${addedToCart ? "bg-black text-white":"bg-white text-black"} rounded-2xl w-40 self-center`}
    onClick={handleAddToCart}
    disabled={addedToCart} 
  >
    {addedToCart ? "Added to Cart" : "Add to Cart"}
  </button>
  )
}
