"use client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Basic validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const fullName = formData.firstName.trim() + " " + formData.lastName.trim();

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("name", fullName);
    urlEncodedData.append("email", formData.email.trim());
    urlEncodedData.append("password", formData.password);

    try {
      const res = await fetch(
        "http://103.119.171.213:3001/api/public/user-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedData.toString(),
        }
      );

      if (res.ok) {
        // Success
        setSuccessMsg("Account created successfully! Redirecting to login...");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Delay redirect so user can see message
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        // Failure - show alert with server message or fallback message
        const data = await res.json();
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Register - The Real Organic Herbs</title>
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-dark bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1602359282019-74e5bb1a3a3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="backdrop-blur-sm bg-glass p-10 rounded-3xl shadow-gold border border-gold w-full max-w-xl">
          <h2 className="text-4xl text-gold font-bold text-center mb-8 tracking-wide font-[Cinzel]">
            Create Your Account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm text-gold mb-1 font-semibold"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-transparent border border-gold text-black placeholder-gold focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm text-gold mb-1 font-semibold"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-transparent border border-gold text-black placeholder-gold focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gold mb-1 font-semibold"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-transparent border border-gold text-black placeholder-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gold mb-1 font-semibold"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-transparent border border-gold text-black placeholder-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gold mb-1 font-semibold"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-transparent border border-gold text-black placeholder-gold focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-center font-semibold">{error}</p>
            )}
            {successMsg && (
              <p className="text-green-400 text-center font-semibold">
                {successMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-dark font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-yellow-300 hover:to-yellow-100"
              }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center text-gold mt-6">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-yellow-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
