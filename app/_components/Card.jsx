'use client'

import React, { useEffect, useState } from "react";
import { Heart, Share2, Check, Lock } from "lucide-react";
import {
          doc,
          updateDoc,
          onSnapshot,
          arrayUnion,
          arrayRemove,
          getDoc,
} from "firebase/firestore";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/appwriteConfig";

export default function Card({ post }) {
          const [user, setUser] = useState(null);
          const [userData, setUserData] = useState(null);
          const [posts, setPosts] = useState(post);
          const [copied, setCopied] = useState(null);

          // 🔹 Track logged-in user
          useEffect(() => {
                    const unsubscribe = onAuthStateChanged(auth, (u) => {
                              setUser(u || null);
                    });
                    return () => unsubscribe();
          }, []);

          // 🔹 Real-time updates for posts
          useEffect(() => {
                    const unsubscribers = post.map((item) => {
                              const docRef = doc(db, "posts", item.id);
                              return onSnapshot(docRef, (snapshot) => {
                                        if (snapshot.exists()) {
                                                  setPosts((prev) =>
                                                            prev.map((p) =>
                                                                      p.id === item.id ? { id: item.id, ...snapshot.data() } : p
                                                            )
                                                  );
                                        }
                              });
                    });
                    return () => unsubscribers.forEach((unsub) => unsub());
          }, [post]);

          // 🔹 Like toggle
          const handleLike = async (id, currentLikes, likedBy) => {
                    if (!user) return alert("Please log in to like posts");
                    const docRef = doc(db, "posts", id);
                    const alreadyLiked = likedBy?.includes(user.uid);

                    try {
                              await updateDoc(docRef, {
                                        likes: alreadyLiked ? currentLikes - 1 : currentLikes + 1,
                                        likedBy: alreadyLiked
                                                  ? arrayRemove(user.uid)
                                                  : arrayUnion(user.uid),
                              });
                    } catch (err) {
                              console.error("Error updating likes:", err);
                    }
          };

          // 🔹 Share functionality
          const handleShare = async (item) => {
                    const shareUrl = `${window.location.origin}/posts/${item.id}`;
                    if (navigator.share) {
                              try {
                                        await navigator.share({
                                                  title: item.caption,
                                                  text: item.description || "Check out this post!",
                                                  url: shareUrl,
                                        });
                              } catch (err) {
                                        console.error("Share failed:", err);
                              }
                    } else {
                              await navigator.clipboard.writeText(shareUrl);
                              setCopied(item.id);
                              setTimeout(() => setCopied(null), 2000);
                    }
          };

          // 🔹 Get display image
          const getDisplayImage = (item) => {
                    if (item.file_type === "video") {
                              return item.thumbnailUrl || "/default-thumbnail.jpg";
                    }
                    return item.fileUrl;
          };

          // 🔹 Fetch user Firestore data
          const getUserData = async () => {
                    if (!user) return;
                    const docRef = doc(db, "xinyue_users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                              setUserData(docSnap.data());
                    }
          };

          useEffect(() => {
                    getUserData();
          }, [user]);

          return (
                    <section className="bg-gradient-to-b from-[#fdf9f7] to-[#fffaf8] py-20 px-6 relative">
                              {/* ✅ Toast for share copied */}
                              {copied && (
                                        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-[#e8b3a4] text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 z-50">
                                                  ✅ Link copied to clipboard!
                                        </div>
                              )}

                              <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                        {posts.map((item, idx) => {
                                                  const isLocked =
                                                            item.post_type === "premium" && userData?.isPremium === false;

                                                  return (
                                                            <div
                                                                      key={idx}
                                                                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#f1e7e4] relative"
                                                            >
                                                                      {/* 🔹 Thumbnail or Image */}
                                                                      <div className="relative group">
                                                                                {isLocked ? (
                                                                                          <div className="relative w-full h-64 overflow-hidden">
                                                                                                    <img
                                                                                                              src={getDisplayImage(item)}
                                                                                                              alt={item.caption}
                                                                                                              className="w-full h-full object-cover blur-2xl opacity-60"
                                                                                                    />
                                                                                                    {/* 🔒 Overlay Lock */}
                                                                                                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-white text-center">
                                                                                                              <Lock size={40} className="mb-3" />
                                                                                                              <p className="font-semibold text-lg">
                                                                                                                        Premium Content Locked
                                                                                                              </p>
                                                                                                              <p className="text-sm opacity-90 mt-1">
                                                                                                                        Subscribe to unlock this post 💎
                                                                                                              </p>
                                                                                                    </div>
                                                                                          </div>
                                                                                ) : (
                                                                                          <Link href={`/posts/${item.id}`}>
                                                                                                    <img
                                                                                                              src={getDisplayImage(item)}
                                                                                                              alt={item.caption}
                                                                                                              className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-[1.03]"
                                                                                                    />
                                                                                          </Link>
                                                                                )}
                                                                      </div>

                                                                      <div className="p-6 text-left">
                                                                                <Link href={isLocked ? "#" : `/posts/${item.id}`}>
                                                                                          <h3
                                                                                                    className={`text-lg font-semibold mb-2 ${isLocked ? "text-gray-400" : "text-[#4c3c35]"
                                                                                                              }`}
                                                                                          >
                                                                                                    {item.caption}
                                                                                          </h3>
                                                                                </Link>

                                                                                <p
                                                                                          className={`text-sm mb-4 ${isLocked ? "text-gray-400 line-clamp-2" : "text-[#6b564e]"
                                                                                                    }`}
                                                                                >
                                                                                          {isLocked
                                                                                                    ? "This content is available for premium members only."
                                                                                                    : item.description}
                                                                                </p>

                                                                                {/* 🔹 Tags */}
                                                                                {!isLocked && (
                                                                                          <div className="flex flex-wrap gap-2 mb-4">
                                                                                                    {item.tags?.map((tag, i) => (
                                                                                                              <span
                                                                                                                        key={i}
                                                                                                                        className="bg-[#f5e1db] text-[#6b564e] px-3 py-1 rounded-full text-xs"
                                                                                                              >
                                                                                                                        {tag}
                                                                                                              </span>
                                                                                                    ))}
                                                                                          </div>
                                                                                )}

                                                                                {/* 🔹 Footer (Like + Share) */}
                                                                                <div className="flex items-center justify-between text-[#6b564e] border-t border-[#f2e9e6] pt-3">
                                                                                          {/* Like */}
                                                                                          <div
                                                                                                    className={`flex items-center gap-1 ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                                                                                              }`}
                                                                                                    onClick={() =>
                                                                                                              !isLocked &&
                                                                                                              handleLike(item.id, item.likes || 0, item.likedBy || [])
                                                                                                    }
                                                                                          >
                                                                                                    <Heart
                                                                                                              size={18}
                                                                                                              className={`${item.likedBy?.includes(user?.uid)
                                                                                                                                  ? "text-[#e57373] fill-[#e57373]"
                                                                                                                                  : "text-[#d29d8d]"
                                                                                                                        } transition`}
                                                                                                    />
                                                                                                    <span className="text-sm">{item.likes || 0}</span>
                                                                                          </div>

                                                                                          {/* Share */}
                                                                                          <div
                                                                                                    className={`flex items-center gap-1 ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                                                                                              } hover:text-[#d29d8d] transition`}
                                                                                                    onClick={() => !isLocked && handleShare(item)}
                                                                                          >
                                                                                                    {copied === item.id ? (
                                                                                                              <Check size={16} className="text-[#d29d8d]" />
                                                                                                    ) : (
                                                                                                              <Share2 size={16} />
                                                                                                    )}
                                                                                                    <span className="text-sm">
                                                                                                              {copied === item.id ? "Copied!" : "Share"}
                                                                                                    </span>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  );
                                        })}
                              </div>
                    </section>
          );
}
