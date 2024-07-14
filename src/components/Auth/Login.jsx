import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/AuthSlice/AuthSlice";
import useClickOutside from '../../hooks/useClickOutside'

const Login = ({ toggle }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginRef = useClickOutside(() => {

    toggle();
  });

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setEmailError("");
      setPasswordError("");
    }, 2000);

    return () => clearTimeout(errorTimeout);
  }, [emailError, passwordError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "loginemail") {
      setEmail(value);
    } else if (name === "loginpassword") {
      setPassword(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Email is invalid");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(signIn({ email, password })).then(() => toggle());
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-20 z-10">
      <div
        ref={loginRef}
        className="relative bg-white w-[30rem] h-auto p-6 rounded-xl shadow-md flex flex-col items-center justify-evenly"
      >
        <h1 className="text-2xl">Sign in your account</h1>
        <div className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center">
          <CgClose onClick={toggle} />
        </div>

        <form className="flex flex-col w-full" id="signin-form">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <label htmlFor="loginemail">Email:</label>
          <input
            type="email"
            className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1"
            placeholder="Enter your Email.."
            name="loginemail"
            value={email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <label htmlFor="loginpassword">Password:</label>
          <input
            type="password"
            className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1 mb-3"
            placeholder="Enter the Password..."
            name="loginpassword"
            value={password}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <button
            className="bg-black text-white rounded-full py-3 text-sm"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
