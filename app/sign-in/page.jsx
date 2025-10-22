'use client'

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/appwriteConfig";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Firebase Auth Sign-In
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User signed in:", user.uid);
      router.push("/home"); // redirect to homepage or dashboard
    } catch (error) {
      console.error("Sign-In failed:", error.message);
      alert("Invalid credentials or account doesn't exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf8] to-[#fcefe8] flex flex-col items-center justify-center px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#4c3c35] mb-3">
          Welcome Back 🌷
        </h1>
        <p className="text-[#7a6b64] max-w-md mx-auto">
          Sign in to continue exploring Li Xinyue’s exclusive content and fan privileges.
        </p>
      </div>

      {/* Sign In Card */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-md p-8 w-full max-w-md border border-[#f2d7cf]">
        <form className="space-y-5" onSubmit={handleSignin}>
          <div>
            <label className="block text-[#4c3c35] mb-1 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md border border-[#f2d7cf] focus:outline-none focus:ring-2 focus:ring-[#e8b3a4] bg-[#fffaf8]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[#4c3c35] mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-md border border-[#f2d7cf] focus:outline-none focus:ring-2 focus:ring-[#e8b3a4] bg-[#fffaf8]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot password */}
          <div className="flex items-center justify-end text-sm text-[#7a6b64]">
            <a href="/forgot-password" className="text-[#e8b3a4] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#e8b3a4] text-[#4c3c35] font-semibold py-3 rounded-md hover:bg-[#e0a597] transition-all duration-200 shadow"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p className="text-center text-sm text-[#7a6b64] mt-6">
          New here?{" "}
          <a href="/sign-up" className="text-[#e8b3a4] hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
