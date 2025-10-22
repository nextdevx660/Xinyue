import React from "react";
import { Sparkles, Heart, Camera } from "lucide-react";

export default function WhatIOffer() {
          const offers = [
                    {
                              icon: <Sparkles className="w-6 h-6 text-[#5a3f3c]" />,
                              title: "Exclusive Content",
                              description:
                                        "Access premium galleries, videos, and behind-the-scenes moments",
                    },
                    {
                              icon: <Heart className="w-6 h-6 text-[#5a3f3c]" />,
                              title: "Lifestyle Inspiration",
                              description:
                                        "Discover beauty tips, fashion, and wellness from Shanghai",
                    },
                    {
                              icon: <Camera className="w-6 h-6 text-[#5a3f3c]" />,
                              title: "Daily Updates",
                              description:
                                        "Fresh content, stories, and personal moments shared regularly",
                    },
          ];

          return (
                    <section className="bg-[#faf6f2] py-24 px-6 text-center">
                              {/* Heading */}
                              <h2 className="text-4xl font-bold text-[#4e3b3b] mb-3">What I Offer</h2>
                              <p className="text-[#7a5957] mb-12 text-lg">
                                        Join me on this journey of beauty, style, and authentic living
                              </p>

                              {/* Cards Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                        {offers.map((item, index) => (
                                                  <div
                                                            key={index}
                                                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col items-center text-center border border-[#f0e6e2]"
                                                  >
                                                            <div className="bg-[#fff6f3] p-4 rounded-full shadow-sm mb-4">
                                                                      {item.icon}
                                                            </div>
                                                            <h3 className="text-xl font-semibold text-[#4e3b3b] mb-3">
                                                                      {item.title}
                                                            </h3>
                                                            <p className="text-[#7a5957] text-base leading-relaxed">
                                                                      {item.description}
                                                            </p>
                                                  </div>
                                        ))}
                              </div>
                    </section>
          );
}
