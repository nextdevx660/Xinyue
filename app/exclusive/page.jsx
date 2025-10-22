'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/appwriteConfig";
import { Lock } from "lucide-react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
// import Header from "../_components/Header";
// import Footer from "../_components/Footer";

export default function Page() {
          const [user, setUser] = useState(null);
          const [userData, setUserData] = useState(null);
          const [premiumPosts, setPremiumPosts] = useState([]);
          const [freePosts, setFreePosts] = useState([]);
          const [loading, setLoading] = useState(true);

          // 🔹 Listen to Auth
          useEffect(() => {
                    const unsub = onAuthStateChanged(auth, async (u) => {
                              setUser(u || null);
                              if (u) {
                                        const userRef = doc(db, "xinyue_users", u.uid);
                                        const userSnap = await getDoc(userRef);
                                        setUserData(userSnap.exists() ? userSnap.data() : null);
                              } else setUserData(null);
                    });
                    return () => unsub();
          }, []);

          // 🔹 Fetch posts
          useEffect(() => {
                    const fetchPosts = async () => {
                              setLoading(true);
                              try {
                                        const postsCol = collection(db, "posts");

                                        // Premium posts
                                        const q1 = query(postsCol, where("post_type", "==", "premium"));
                                        const snap1 = await getDocs(q1);
                                        const premium = snap1.docs.map(d => ({ id: d.id, ...d.data() }));

                                        // Free posts
                                        const q2 = query(postsCol, where("post_type", "==", "free"));
                                        const snap2 = await getDocs(q2);
                                        const free = snap2.docs.map(d => ({ id: d.id, ...d.data() }));

                                        setPremiumPosts(premium);
                                        setFreePosts(free);
                              } catch (err) {
                                        console.error("Error fetching posts:", err);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    fetchPosts();
          }, []);

          const getDisplayImage = (p) => p.fileUrl || p.image || p.thumbnailUrl || "/default-thumbnail.jpg";

          if (loading) {
                    return (
                              <div className="w-full flex items-center justify-center py-10">
                                        <p className="text-[#7a6b64]">Loading content...</p>
                              </div>
                    );
          }

          return (
                    <div>
                              <Header />

                              {/* 🌸 HERO SECTION */}
                              <section className="text-center py-24 px-6 bg-gradient-to-b from-[#fdfaf8] to-[#fcf4f1]">
                                        <h1 className="text-4xl font-bold mb-4">Welcome to My Exclusive World ✨</h1>
                                        <p className="text-[#7a6b64] max-w-2xl mx-auto mb-8">
                                                  Step into my world — from daily inspirations to behind-the-scenes moments.
                                        </p>
                                        <Link href="/join">
                                                  <button className="bg-[#e8b3a4] text-[#4c3c35] px-8 py-3 rounded-md hover:bg-[#e0a597] transition-all">
                                                            Become a Member →
                                                  </button>
                                        </Link>
                              </section>

                              {/* 💖 BENEFITS */}
                              <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
                                        {[
                                                  {
                                                            title: "🎬 Behind-the-Scenes Access",
                                                            desc: "Exclusive look into my creative process, shoots, and everyday life in Shanghai.",
                                                  },
                                                  {
                                                            title: "🕊️ Early Access to Posts",
                                                            desc: "Read new blogs, photos, and updates before anyone else.",
                                                  },
                                                  {
                                                            title: "💌 Private Chat & Giveaways",
                                                            desc: "Join private Q&A sessions and monthly giveaways just for members.",
                                                  },
                                        ].map((item, i) => (
                                                  <div key={i} className="bg-[#fffaf8] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                                            <p className="text-[#7a6b64]">{item.desc}</p>
                                                  </div>
                                        ))}
                              </section>


                              {/* 🔒 PREMIUM POSTS SECTION */}
                              <section className="py-20 bg-[#fdf6f3] px-6">
                                        <div className="max-w-6xl mx-auto text-center">
                                                  <h2 className="text-3xl font-bold mb-8">Premium Posts 🔒</h2>
                                                  {premiumPosts.length === 0 ? (
                                                            <p className="text-[#7a6b64] italic">No premium posts yet. Stay tuned 💫</p>
                                                  ) : (
                                                            <div className="grid md:grid-cols-3 gap-6">
                                                                      {premiumPosts.map((p) => {
                                                                                const isLocked = !userData?.isPremium;
                                                                                return (
                                                                                          <div key={p.id} className="relative bg-white rounded-xl overflow-hidden border border-[#f3ebe8] shadow-sm">
                                                                                                    <img
                                                                                                              src={getDisplayImage(p)}
                                                                                                              alt={p.caption}
                                                                                                              className={`w-full h-48 object-cover transition-all ${isLocked ? "blur-2xl" : "hover:scale-105"}`}
                                                                                                    />
                                                                                                    {isLocked && (
                                                                                                              <Link href={'/join'}>
                                                                                                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
                                                                                                                                  <Lock size={32} />
                                                                                                                                  <p className="mt-2 text-sm">Premium Content</p>
                                                                                                                        </div>
                                                                                                              </Link>
                                                                                                    )}
                                                                                                    {!isLocked && (
                                                                                                              <Link href={`/posts/${p.id}`} className="absolute inset-0" aria-hidden="true">
                                                                                                                        <span />
                                                                                                              </Link>
                                                                                                    )}
                                                                                                    <div className="p-4 text-left">
                                                                                                              <h3 className="font-semibold text-[#4c3c35] mb-2">{p.caption || "Untitled"}</h3>
                                                                                                              <p className="text-sm text-[#7a6b64] mb-3">
                                                                                                                        {isLocked ? "Subscribe to unlock this content." : (p.description || "").slice(0, 100)}
                                                                                                              </p>
                                                                                                              {isLocked ? (
                                                                                                                        <Link href="/join" className="text-sm bg-[#e8b3a4] px-3 py-1 rounded-full text-[#4c3c35]">
                                                                                                                                  Unlock →
                                                                                                                        </Link>
                                                                                                              ) : (
                                                                                                                        <Link href={`/posts/${p.id}`} className="text-sm text-[#e8b3a4] hover:underline">
                                                                                                                                  View →
                                                                                                                        </Link>
                                                                                                              )}
                                                                                                    </div>
                                                                                          </div>
                                                                                );
                                                                      })}
                                                            </div>
                                                  )}
                                        </div>
                              </section>

                              {/* 💬 TESTIMONIALS */}
                              <section className="py-20 text-center px-6">
                                        <h2 className="text-3xl font-bold mb-10">What Members Say 💬</h2>
                                        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                                                  {[
                                                            { name: "Elena", text: "It feels like I'm part of her journey — so heartfelt!" },
                                                            { name: "Ming", text: "Behind-the-scenes photos are stunning. Worth it!" },
                                                            { name: "Haru", text: "Feels authentic and beautiful connection." },
                                                  ].map((r, i) => (
                                                            <div key={i} className="bg-[#fffaf8] p-6 rounded-xl shadow-sm hover:shadow-md">
                                                                      <p className="italic mb-3 text-[#7a6b64]">“{r.text}”</p>
                                                                      <p className="font-semibold">— {r.name}</p>
                                                            </div>
                                                  ))}
                                        </div>
                              </section>

                              {/* 🌸 FINAL CTA */}
                              <section className="py-24 text-center bg-gradient-to-b from-[#fcf4f1] to-[#fbeae4]">
                                        <h2 className="text-3xl font-bold mb-4">Join the Inner Circle 🌸</h2>
                                        <p className="text-[#7a6b64] mb-8">Get closer, experience more, and be part of something special.</p>
                                        <Link href="/join">
                                                  <button className="bg-[#e8b3a4] text-[#4c3c35] px-10 py-4 rounded-md font-medium hover:bg-[#e0a597] transition-all shadow">
                                                            Join Now →
                                                  </button>
                                        </Link>
                              </section>

                              <Footer />
                    </div>
          );
}
