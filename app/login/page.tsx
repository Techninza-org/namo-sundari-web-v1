"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LuxuryLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/public/user-login`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { token, user } = response.data;
      console.log(user);
      if (token) {
        Cookies.set("token", token, { expires: 7 }); // Save token for 7 days
        Cookies.set("role", user.role, { expires: 7 });
        alert("Login successful");
        router.push("/profile"); // Redirect to home page
      } else {
        alert("Login failed: token not received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: Invalid credentials or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 53, 15, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Main Card */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

              <div className="relative z-10">
                <h2 className="text-3xl font-light text-white text-center mb-2 tracking-wide">
                  Welcome Back
                </h2>
                <p className="text-center text-gray-400 mb-8 font-light">
                  Enter your credentials to continue
                </p>

                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-gray-300">
                      <input
                        type="checkbox"
                        className="mr-2 rounded border-gray-600 bg-gray-700 text-yellow-400 focus:ring-yellow-400"
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-xl shadow-lg hover:from-yellow-300 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse" />
                    )}
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-black/40 text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/ragister"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                  >
                    Create Account
                  </a>
                </p>
              </div>
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
