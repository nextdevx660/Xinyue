import Link from "next/link";
import React from "react";

export default function WantMore() {
          return (
                    <section className="bg-gradient-to-b from-[#fdf9f7] to-[#fffaf8] py-24 px-6 text-center">
                              <div className="max-w-3xl mx-auto">
                                        {/* Heading */}
                                        <h2 className="text-3xl md:text-4xl font-bold text-[#4c3c35] mb-4">
                                                  Want More Exclusive Content?
                                        </h2>

                                        {/* Description */}
                                        <p className="text-[#6b564e] text-base md:text-lg mb-8">
                                                  Join my premium membership for behind-the-scenes access,
                                                  exclusive videos, and personal updates
                                        </p>

                                        {/* Button */}
                                        <Link href={'/exclusive'}>
                                                  <button className="bg-[#e7b2a5] hover:bg-[#d29d8d] text-[#4c3c35] font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                                                            Explore Premium Membership
                                                  </button>
                                        </Link>
                              </div>
                    </section>
          );
}
