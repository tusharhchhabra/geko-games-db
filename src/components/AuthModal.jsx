import { AuthContext } from "@/context/AuthContext";
import { Router } from "next/router";
import React, { useContext, useState } from "react";

export default function AuthModal() {
  const { closeModal } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && !/\w+/.test(formData.username) && formData.username != "")
      newErrors.username = "Please enter a valid username";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("validated");
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(await response.json());
        closeModal();
      } else {
        console.log("Login failed");
      }
    }
  };

  return (
    <div className="bg-gray-800 relative w-full max-w-md rounded-2xl shadow-2xl shadow-gray-900 border border-gray-700 md:mt-0 xl:p-0">
      <button
        onClick={closeModal}
        className="w-9 h-9 rounded-full flex items-center justify-center absolute right-4 top-5"
      >
        X
      </button>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
          {isLogin ? "Login" : "Register"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {!isLogin && (
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-md font-medium"
              >
                Username{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="janedoe"
                className="border border-gray-700 rounded-lg bg-gray-900 w-full p-2.5"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="mt-1 text-red-500">{errors.username}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-md font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="jane@doe.com"
              className="border border-gray-700 rounded-lg bg-gray-900 w-full p-2.5"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="mt-1 text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border border-gray-700 rounded-lg bg-gray-900 w-full p-2.5"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="mt-1 text-red-500">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary px-5 py-2">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-sm font-light text-gray-300 dark:text-gray-400">
          {isLogin
            ? "Don't have an account yet? "
            : "Already have an account? "}
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="font-medium text-white hover:underline dark:text-primary-500"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
          .
        </p>
      </div>
    </div>
  );
}
