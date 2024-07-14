import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from '../../hooks/useClickOutside'


import { signUp } from "../../store/AuthSlice/AuthSlice";

export default function Register({ toggle }) {
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const registerRef = useClickOutside(() => {

    toggle();
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
   
      case "signupemail":
        setEmail(value);
        break;
      case "signuppassword":
        setPassword(value);
        break;
      default:
        break;
    }
  };
    // Validate email format
    const validateEmail = (email) => {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    };
  
    // Validate password length
    const validatePassword = (password) => {
      return password.length >= 6;
    };
      // Clear errors after 2 seconds
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setEmailError("");
      setPasswordError("");
    }, 2000);

    return () => clearTimeout(errorTimeout);
  }, [emailError, passwordError]);
  
    const onSubmit = async (e) => {
      e.preventDefault();
    
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);
    
      if (!isEmailValid) {
        setEmailError("Email is invalid");
      } else {
        setEmailError(""); // Clear error message if email is valid
      }
    
      if (!isPasswordValid) {
        setPasswordError("Password must be at least 6 characters");
      } else {
        setPasswordError(""); // Clear error message if password is valid
      }
    
      if (isEmailValid && isPasswordValid) {
        try {
          await dispatch(signUp({ email, password }));
          toggle();
        } catch (error) {
          if (error.response && error.response.status === 409) {
            console.error("Email already exists.");
          } else {
            console.error("Authentication Error:", error);
          }
        }
      }
    };
    

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-20 z-10">
      <div className="relative bg-white w-[30rem] h-auto p-6 rounded-xl shadow-md flex flex-col items-center justify-evenly" ref={registerRef}>
        <h1 className="text-2xl">Create a new Account</h1>
        <div className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center">
          <CgClose onClick={toggle} />
        </div>

        <form
          className="flex flex-col w-full"
          id="signup-form"
          onSubmit={onSubmit}
        >
          <label htmlFor="signupemail">Email:</label>
          <input
            type="email"
            className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1 mb-2"
            placeholder="Enter your Email..."
            name="signupemail"
            value={email}
            onChange={handleInputChange}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}

          <label htmlFor="signuppassword">Password:</label>
          <input
            type="password"
            className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1 mb-2"
            placeholder="Enter the Password..."
            name="signuppassword"
            value={password}
            onChange={handleInputChange}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <button
            type="submit"
            className="bg-black text-white rounded-full py-3 text-sm"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        </form>
      </div>
    </div>
  );
}
