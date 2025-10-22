'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/appwriteConfig";

export default function SignupPage() {
          const [name, setName] = useState("");
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [loading, setLoading] = useState(false);
          const router = useRouter();

          const handleSignup = async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {
                              // ✅ Create user in Firebase Auth
                              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                              const user = userCredential.user;

                              // ✅ Update display name (optional)
                              await updateProfile(user, { displayName: name });

                              // ✅ Create user document in Firestore with same UID
                              await setDoc(doc(db, "xinyue_users", user.uid), {
                                        name,
                                        email,
                                        id: user.uid,
                                        isPremium: false,
                                        createdAt: new Date().toISOString(),
                              });

                              console.log("User created successfully:", user.uid);
                              router.push("/home");
                    } catch (error) {
                              console.error("Signup failed:", error);
                              alert(error.message);
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <div className="min-h-screen bg-gradient-to-b from-[#fffaf8] to-[#fcefe8] flex flex-col items-center justify-center px-6">
                              {/* Hero Section */}
                              <div className="text-center mb-10">
                                        <h1 className="text-4xl font-bold text-[#4c3c35] mb-3">
                                                  Join Xinyue’s Exclusive Community 🌸
                                        </h1>
                                        <p className="text-[#7a6b64] max-w-md mx-auto">
                                                  Sign up to unlock exclusive posts, behind-the-scenes moments, and early access to Li Xinyue’s world.
                                        </p>
                              </div>

                              {/* Signup Card */}
                              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-md p-8 w-full max-w-md border border-[#f2d7cf]">
                                        <form className="space-y-5" onSubmit={handleSignup}>
                                                  <div>
                                                            <label className="block text-[#4c3c35] mb-1 font-medium">Full Name</label>
                                                            <input
                                                                      type="text"
                                                                      placeholder="Enter your name"
                                                                      className="w-full px-4 py-3 rounded-md border border-[#f2d7cf] focus:outline-none focus:ring-2 focus:ring-[#e8b3a4] bg-[#fffaf8]"
                                                                      onChange={(e) => setName(e.target.value)}
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <label className="block text-[#4c3c35] mb-1 font-medium">Email Address</label>
                                                            <input
                                                                      type="email"
                                                                      placeholder="you@example.com"
                                                                      className="w-full px-4 py-3 rounded-md border border-[#f2d7cf] focus:outline-none focus:ring-2 focus:ring-[#e8b3a4] bg-[#fffaf8]"
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
                                                                      onChange={(e) => setPassword(e.target.value)}
                                                                      required
                                                            />
                                                  </div>

                                                  <div className="flex items-center space-x-2 mt-3">
                                                            <input type="checkbox" id="terms" className="accent-[#e8b3a4]" required />
                                                            <label htmlFor="terms" className="text-[#7a6b64] text-sm">
                                                                      I agree to the <span className="text-[#e8b3a4] cursor-pointer hover:underline">Terms & Conditions</span>
                                                            </label>
                                                  </div>

                                                  <div className="flex items-center space-x-2">
                                                            <input type="checkbox" id="newsletter" className="accent-[#e8b3a4]" />
                                                            <label htmlFor="newsletter" className="text-[#7a6b64] text-sm">
                                                                      Subscribe to Xinyue’s Newsletter 💌
                                                            </label>
                                                  </div>

                                                  <button
                                                            type="submit"
                                                            disabled={loading}
                                                            className="w-full mt-4 bg-[#e8b3a4] text-[#4c3c35] font-semibold py-3 rounded-md hover:bg-[#e0a597] transition-all duration-200 shadow"
                                                  >
                                                            {loading ? "Creating Account..." : "Join Now →"}
                                                  </button>
                                        </form>

                                        <p className="text-center text-sm text-[#7a6b64] mt-6">
                                                  Already have an account?{" "}
                                                  <a href="/sign-in" className="text-[#e8b3a4] hover:underline">
                                                            Log in here
                                                  </a>
                                        </p>
                              </div>
                    </div>
          );
}
