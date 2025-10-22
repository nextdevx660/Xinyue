'use client'

import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import Card from "../_components/Card";
import Footer from "../_components/Footer";
import WantMore from "../_components/WantMore";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/appwriteConfig";
import { Loader2Icon } from "lucide-react";

export default function page() {
          const [posts, setPosts] = useState([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
                    // Firestore real-time listener
                    const unsubscribe = onSnapshot(
                              collection(db, 'posts'),
                              (snapshot) => {
                                        const fetchedPosts = snapshot.docs.map((doc) => ({
                                                  id: doc.id,        // 🔥 Firestore document ID
                                                  ...doc.data(),     // actual post fields
                                        }));
                                        setPosts(fetchedPosts);
                                        setLoading(false);
                              },
                              (error) => {
                                        console.error('Error fetching posts:', error);
                                        setLoading(false);
                              }
                    );

                    return () => unsubscribe(); // cleanup listener
          }, []);

          if (loading) {
                    return (
                              <div className="flex justify-center items-center">
                                        
                              </div>
                    );
          }


          return (
                    <div>
                              <Header />
                              <section className="bg-gradient-to-b from-[#fdf9f7] to-[#fffaf8] py-24 px-6 text-center">
                                        {/* Rectangle Accent */}
                                        <div className="flex justify-center mb-8">
                                                  <div className="h-20 w-64 bg-[#eab9aa] rounded-md" />
                                        </div>

                                        {/* Text */}
                                        <p className="text-[#6b564e] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                                  Explore my latest posts, photos, and lifestyle inspiration — all available for free
                                        </p>
                              </section>
                              <Card post={posts} />
                              <WantMore />
                              <Footer />
                    </div>
          );
}
