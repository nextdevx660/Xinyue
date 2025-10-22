import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function GetInTouch() {
          return (
                    <section className="bg-gradient-to-b from-[#faf6f1] to-[#fdf8f6] py-28 text-center px-6">
                              {/* Title */}
                              <h2 className="text-4xl font-bold text-[#4e3b3b] mb-4">
                                        Ready to Join My Journey?
                              </h2>

                              {/* Subtitle */}
                              <p className="text-[#7a5957] text-lg max-w-2xl mx-auto mb-10">
                                        Get access to exclusive content, personal updates, and behind-the-scenes
                                        moments
                              </p>

                              {/* Button */}
                              <Link href={'/contact'}>
                                        <button className="inline-flex items-center gap-2 bg-[#f5c4b7] hover:bg-[#f4b9ac] text-[#4e3b3b] font-medium px-8 py-3 rounded-xl transition shadow-sm">
                                                  Get In Touch <Heart className="w-5 h-5" />
                                        </button>
                              </Link>
                    </section>
          );
}
