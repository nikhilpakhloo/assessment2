import React from "react";

export default function Button({ title }) {
  return (
    <button className="bg-black text-white rounded-full py-3 text-sm">
      {title}
    </button>
  );
}
