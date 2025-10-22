import Link from "next/link";
import React from "react";

export default function BusinessEnquiry() {
          return (
                    <section className="bg-gradient-to-b from-[#fdfaf8] to-[#fdf6f3] py-20 px-6 text-center">
                              <div className="max-w-3xl mx-auto">
                                        {/* Title */}
                                        <h2 className="text-3xl font-bold text-[#4c3c35] mb-4">
                                                  Business Inquiries
                                        </h2>

                                        {/* Subtitle */}
                                        <p className="text-[#7a6b64] text-base mb-8">
                                                  Interested in collaborations, sponsored content, or brand partnerships? <br />
                                                  I'd love to work together!
                                        </p>

                                        {/* Button / Call to action */}
                                        <div className="flex justify-center">
                                                  <Link href={'https://www.instagram.com/real_xinyue_'}>
                                                            <button className="bg-[#e8b3a4] text-[#4c3c35] font-medium px-8 py-3 rounded-md hover:bg-[#e0a597] transition-all duration-200 shadow-sm">
                                                                      Contact for Collaboration
                                                            </button>
                                                  </Link>
                                        </div>
                              </div>
                    </section>
          );
}
