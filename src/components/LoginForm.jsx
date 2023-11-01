import React, { useState } from "react";

export default function AuthModal() {
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
      newErrors.email = "Email is invalid";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && !/\w+/.test(formData.username))
      newErrors.username = "Username is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div class="w-full bg-gray-800 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
          {isLogin ? "Login" : "Register"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {!isLogin && (
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username (optional)"
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
            <label for="email" class="block mb-2 text-md font-medium">
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
            <label for="password" class="block mb-2 text-md font-medium">
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
          <p class="text-sm font-light text-gray-300 dark:text-gray-400">
            {isLogin
              ? "Don't have an account yet? "
              : "Already have an account? "}
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              class="font-medium text-white hover:underline dark:text-primary-500"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
