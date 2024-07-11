import React, { useState } from "react";
import { BsCart } from "react-icons/bs";
import AuthModal from "./Auth/AuthModal";

export default function Navbar() {
 
  const [isShow, setIsShow] = useState(false)
  const [id , setId] = useState(null)

  const handleOpenModal = (id)=>{
    setIsShow(!isShow)
    setId(id)
  }
  return (
    <>
    {isShow && <AuthModal title={id===1 ?"Sign in your account":"Register your account"} toggle={handleOpenModal} index={id}/>}
      <nav className="w-full  text- h-16 flex items-center justify-between px-8 shadow-lg">
        <div className="flex items-center space-x-4">
          <p className=" font-semibold  text-3xl">
            Collections <span className="text-2xl text-red-700">.</span>{" "}
          </p>
        </div>
       
        <div className="flex items-center space-x-6">
          <BsCart size={24} className="cursor-pointer" />

          <button className="rounded-full px-5 py-1 border text-sm  " onClick= {() => handleOpenModal(1)}>
            Login
          </button>
          <button className="rounded-full px-5 py-1 border text-sm " onClick= {() => handleOpenModal(2)}>
            SignUp
          </button>
        </div>
      </nav>
    </>
  );
}
