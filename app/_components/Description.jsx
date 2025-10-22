import React from "react";

export default function Description() {
          return (
                    <section className="bg-gradient-to-b from-[#fefaf7] to-[#fffdfc] py-20 px-6 md:px-20 text-[#4e3b3b]">
                              <div className="max-w-5xl mx-auto text-left space-y-8">
                                        {/* Intro text */}
                                        <p className="text-lg md:text-xl leading-relaxed text-[#4e3b3b]/90">
                                                  Hello! I'm <span className="font-semibold">Li Xinyue (李心悦)</span>, a
                                                  22-year-old content creator and influencer based in the vibrant city of
                                                  Shanghai. My journey began with a simple passion for beauty, fashion, and
                                                  sharing authentic moments from my life.
                                        </p>

                                        <p className="text-lg leading-relaxed text-[#4e3b3b]/80">
                                                  What started as a creative outlet has evolved into a platform where I
                                                  connect with hundreds of thousands of people who share my love for
                                                  aesthetics, lifestyle, and inspiration. Through my content, I aim to bring
                                                  a touch of elegance and positivity to your daily life.
                                        </p>

                                        <p className="text-lg leading-relaxed text-[#4e3b3b]/80">
                                                  Living in Shanghai gives me access to the perfect blend of traditional
                                                  Chinese culture and modern innovation. This unique environment inspires my
                                                  content and allows me to share both timeless beauty secrets and
                                                  cutting-edge trends.
                                        </p>
                              </div>

                              {/* Stats Section */}
                              <div className="max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {[
                                                  { label: "Followers" },
                                                  { label: "Content Pieces" },
                                                  { label: "Brand Partners" },
                                                  { label: "Years Creating" },
                                        ].map((item, index) => (
                                                  <div
                                                            key={index}
                                                            className="bg-gradient-to-b from-[#fff8f5] to-[#fefaf7] border border-[#f2e5df] rounded-xl text-center py-6 px-4 shadow-sm hover:shadow-md transition"
                                                  >
                                                            <div className="w-32 h-10 bg-[#f5c4b7] mx-auto mb-3 rounded-sm" />
                                                            <p className="text-[#7a5957] font-medium">{item.label}</p>
                                                  </div>
                                        ))}
                              </div>
                    </section>
          );
}
