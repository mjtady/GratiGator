import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import axios from "axios"; // Import Axios

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook for redirection

  // Handle login logic
  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://127.0.0.1:8000/api/login/", {
              username: emailOrUsername, // Use the actual input value
              password: password,
          });

          console.log("Login successful:", response.data);

          // Store token (if backend sends one)
          localStorage.setItem("token", response.data.token);

          // Redirect to dashboard or homepage
          navigate("/dashboard");
      } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message);
          setError("Invalid username or password"); // Display error to user
      }
  };


  return (
    <div className="min-h-screen min-w-full flex flex-col bg-slate-900 items-center justify-center">
      <div className="inline-flex h-36 w-36 rounded-full mb-7 bg-emerald-500"></div>

      <div className="min-w-full flex items-center justify-center">
        {/* loading in google icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>

        <div className="text-center">
          <h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300">
            Log-in
          </h1>

          <form onSubmit={handleLogin}>
            <div className="bg-slate-800 px-1 rounded-md mt-5 w-80 text-left flex items-center">
              <span className="material-icons md-light m-1 md-18 py-1">
                person
              </span>
              <input
                type="text"
                placeholder="username or email"
                className="px-2 bg-slate-800 text-white outline-none w-full"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>
            <div className="bg-slate-800 px-1 rounded-md mt-3 w-80 text-left flex items-center">
              <span className="material-icons md-light m-1 md-18 py-1">
                key
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="px-2 w-64 bg-slate-800 text-white outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="material-icons md-light m-1 md-18 py-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <p className="mt-3">
              <a href="/" className="noto-sans text-emerald-500 text-sm underline">
                forgot password?
              </a>
            </p>

            <div className="h-20">
              <button
                type="submit"
                className="mt-3 p-1 px-8 bg-emerald-500 rounded-full text-slate-950 font-bold border-slate-950 border-2
                hover:px-10 hover:py-2 hover:bg-slate-900 hover:border-emerald-500 hover:border-2 hover:transition-all hover:text-emerald-500
                active:bg-emerald-500 active:transition-all"
              >
                Log-in
              </button>
            </div>

            <p className="text-white text-sm">
              No account?{" "}
              <Link to="/register" className="text-emerald-500 text-sm underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
