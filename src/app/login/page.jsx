"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShipmentContext from "@/contexts/ShipmentContext";
import Image from "next/image";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const router = useRouter();

  const { user, setUser, rem, setRem } = useContext(ShipmentContext);

  // Validate form whenever inputs change
  useEffect(() => {
    setFormValid(name.trim() !== "" && password.trim() !== "");
  }, [name, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (password === "") {
      setError("Password is required");
      valid = false;
    }

    if (name === "") {
      setError("Username is required");
      valid = false;
    }

    if (!valid) return;

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/auth/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      if (res.status === 200) {
        setUser(name);
        if (rem) {
          localStorage.setItem("user", name);
        }
        router.push("/admin");
      } else if (res.status === 400) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#f97316]/5 -translate-x-1/2 -translate-y-1/2" style={{ borderRadius: 0 }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#fb923c]/5 translate-x-1/3 translate-y-1/3" style={{ borderRadius: 0 }}></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center">
          <span className="inline-block px-4 py-1 bg-[#f97316]/10 text-[#f97316] font-medium mb-4 text-sm" style={{ borderRadius: 0 }}>
            Admin Portal
          </span>
          <h2 className="mt-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#c2410c]">
            Welcome Back
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 shadow-2xl border-2 border-gray-100 flex flex-col items-center" style={{ borderRadius: 0 }}>
              <div className="flex space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-[#f97316] animate-bounce"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "0.8s",
                      borderRadius: 0,
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-base font-medium text-[#f97316]">Authenticating...</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form
          className="mt-8 space-y-6 bg-white p-8 sm:p-10 shadow-2xl border-2 border-gray-100"
          style={{ borderRadius: 0 }}
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-50 border-2 border-red-300 p-4 mb-4" style={{ borderRadius: 0 }}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="username"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border-2 border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] sm:text-base transition-all"
                  style={{ borderRadius: 0 }}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border-2 border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#f97316] sm:text-base transition-all"
                  style={{ borderRadius: 0 }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#f97316] focus:outline-none transition-colors"
                >
                  {showPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rem}
                onChange={() => setRem(!rem)}
                className="h-5 w-5 text-[#f97316] focus:ring-[#f97316] border-gray-300"
                style={{ borderRadius: 0 }}
              />
              <label
                htmlFor="rememberMe"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Remember me
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !formValid}
              className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-semibold text-white shadow-lg transition-all ${
                formValid
                  ? "bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316] transform hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              style={{ borderRadius: 0 }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="text-center mt-6">
          <div className="bg-gradient-to-r from-[#f97316]/10 to-[#fb923c]/10 p-4 border-2 border-[#f97316]/20" style={{ borderRadius: 0 }}>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-[#f97316]">Need help?</span> Contact your administrator for password recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
