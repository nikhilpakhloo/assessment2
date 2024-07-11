import React from "react";

export default function ProductCard({ data }) {


 
  return (
    <div className="mt-6 ">
      <div className="max-w-sm w-full h-full rounded overflow-hidden shadow-lg p-4 flex flex-col">
        <img
          className="w-full h-60 object-contain"
          src={data.image}
          alt={data.title}
        />
        <div className="px-6 py-4 flex-1">
          <div className="font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">{data.category}</p>
          {/* <p className="text-gray-700 text-base">{data.description}</p> */}
          <p className="text-gray-700 font-bold">${data.price}</p>
        </div>
   
      </div>
    </div>
  );
}
