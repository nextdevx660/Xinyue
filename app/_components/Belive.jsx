import React from "react";

export default function Belive() {
          const beliefs = [
                    {
                              title: "Sharing real moments and genuine experiences",
                    },
                    {
                              title: "Finding beauty in simplicity and refinement",
                    },
                    {
                              title: "Motivating others to embrace their best selves",
                    },
          ];

          return (
                    <section className="bg-[#fffaf8] py-20 px-6 sm:px-8">
                              {/* Heading */}
                              <div className="text-center mb-12">
                                        <h2 className="text-3xl md:text-4xl font-[Libre_Baskerville] font-bold text-[#3e2f2e]">
                                                  What I Believe In
                                        </h2>
                                        <p className="text-[#7a6258] mt-3 text-base md:text-lg">
                                                  The values that guide my content and community
                                        </p>
                              </div>

                              {/* Beliefs Grid */}
                              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {beliefs.map((item, index) => (
                                                  <div
                                                            key={index}
                                                            className="bg-gradient-to-br from-[#fff7f4] to-[#fffaf8] border border-[#f4e3dc] rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300"
                                                  >
                                                            <div className="bg-[#efc2b5]/70 h-10 w-44 mx-auto mb-5 rounded-sm" />
                                                            <p className="text-[#5e4a47]/90 text-base md:text-lg leading-relaxed font-medium">
                                                                      {item.title}
                                                            </p>
                                                  </div>
                                        ))}
                              </div>
                    </section>
          );
}
