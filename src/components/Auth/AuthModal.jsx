import React from "react";
import { CgClose } from "react-icons/cg";
import Button from "../../Utils/Button";

export default function Login({ title, toggle, index }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-20 z-10">
        <div className=" relative bg-white w-[30rem] h-auto p-6 rounded-xl   shadow-md  flex flex-col items-center justify-evenly">
          <h1 className="text-2xl">{title}</h1>
          <div className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center">
            <CgClose onClick={toggle} />
          </div>
          {index === 1 ? (
            <div className=" flex flex-col w-full">
              <label htmlFor="" className="">
                Email:
              </label>
              <input
                type="email"
                className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1"
                placeholder="Enter your Email.."
                name="loginemail"
              />
              <label htmlFor="" className="">
                Password:
              </label>
              <input
                type="email"
                className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1 mb-3 "
                placeholder="Enter the Password..."
                name="loginpassword"
              />
              <Button title="Sign in"/>
            </div>
          ) : (
            <div className=" flex flex-col w-full">
              <label htmlFor="" className="">
                Name:
              </label>
              <input
                type="text"
                className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1"
                placeholder="Enter your Name.."
                name="username"
              />
              <label htmlFor="" className="">
                Email:
              </label>
              <input
                type="email"
                className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1"
                placeholder="Enter your Email.."
                name="signupemail"
              />
              <label htmlFor="" className="">
                Password:
              </label>
              <input
                type="email"
                className="rounded-md p-2 border placeholder:text-sm placeholder:text-gray-300 mt-1 mb-2 "
                placeholder="Enter the Password..."
                name="signuppassword"
              />

              <Button title="Sign up"/>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
