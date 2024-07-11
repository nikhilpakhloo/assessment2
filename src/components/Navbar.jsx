import React, { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice/AuthSlice";

import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { Link } from "react-router-dom";


export default function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userInfo);
  const { stsTokenManager, email, uid } = userData || {};
  const accessToken = stsTokenManager?.accessToken;

  const { totalQuantity } = useSelector((state) => state.cart); 


  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenLoginModal = () => {
    setIsShowLogin(!isShowLogin);
  };

  const handleOpenSignUpModal = () => {
    setIsShowRegister(!isShowRegister);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (accessToken && email && uid) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken, email, uid]);

  return (
    <>
      {isShowLogin && <Login toggle={handleOpenLoginModal} />}
      {isShowRegister && <Register toggle={handleOpenSignUpModal} />}
      <nav className="w-full h-16 flex items-center justify-between px-8 shadow-lg sticky top-0  bg-white">
        <div className="flex items-center space-x-4">
      
          <p className="font-semibold text-3xl">
          <Link to="/">     Collections <span className="text-2xl text-red-700">.</span>{" "}</Link>
          </p>
        </div>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="cart">
              <div className="flex gap-2 border p-2 rounded-xl">
              {totalQuantity} items <BsCart size={24} className="cursor-pointer" />
              </div>
              </Link>
              <div className="avatar cursor-pointer flex items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{`${email.slice(0, 6)}`}</span>
              </div>
              <button
                className="rounded-full px-5 py-1 border text-sm bg-black text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-full px-5 py-1 border text-sm  bg-black text-white"
                onClick={handleOpenLoginModal}
              >
                Login
              </button>
              <button
                className="rounded-full px-5 py-1 border text-sm  bg-black text-white"
                onClick={handleOpenSignUpModal}
              >
                SignUp
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
