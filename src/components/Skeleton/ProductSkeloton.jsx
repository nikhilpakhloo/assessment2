import React from "react";

const Skeleton = () => {
  return (
    <div className="mt-6" data-testid="skeleton-product">
      <div className="max-w-sm w-full h-full rounded overflow-hidden shadow-lg p-4 flex flex-col bg-gray-200 animate-pulse">
        <div className="w-80 h-60"></div> 
        <div className="px-6 py-4 flex-1">
          <div className="h-6 bg-gray-200 mb-2"></div> 
          <div className="h-4 bg-gray-200"></div>
          <div className="h-4 bg-gray-200"></div> 
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
