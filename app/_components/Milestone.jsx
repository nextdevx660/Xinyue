import React from "react";
import { Award } from "lucide-react";

export default function Milestone() {
          const milestones = [
                    {
                              year: "2019",
                              title: "Started My Journey",
                              desc: "Began sharing my passion for beauty and lifestyle",
                    },
                    {
                              year: "2021",
                              title: "100K Followers",
                              desc: "Reached a major milestone on social media",
                    },
                    {
                              year: "2023",
                              title: "Brand Collaborations",
                              desc: "Partnered with leading luxury brands",
                    },
                    {
                              year: "2024",
                              title: "Growing Community",
                              desc: "Building a global audience of inspired individuals",
                    },
          ];

          return (
                    <section className="bg-[#fefaf7] py-16 px-4 sm:px-6 overflow-x-hidden">
                              {/* Header */}
                              <div className="flex justify-center mb-5">
                                        <span className="bg-[#fae9e2] text-[#b47b6a] text-sm px-4 py-1 rounded-full flex items-center gap-2">
                                                  <Award className="w-4 h-4" />
                                                  My Journey
                                        </span>
                              </div>

                              <h2 className="text-3xl md:text-4xl font-[Libre_Baskerville] text-center text-[#3e2f2e] font-semibold mb-12">
                                        Milestones & Achievements
                              </h2>

                              {/* Timeline */}
                              <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
                                        {/* Vertical Line */}
                                        <div className="absolute left-8 top-0 bottom-0 w-[1.5px] bg-[#f4d6cb] sm:left-10" />

                                        <div className="flex flex-col gap-10 sm:gap-12 relative z-10">
                                                  {milestones.map((item, index) => (
                                                            <div
                                                                      key={index}
                                                                      className="relative flex items-start gap-4 sm:gap-6 pl-14 sm:pl-16"
                                                            >
                                                                      {/* Icon */}
                                                                      <div className="absolute left-0 top-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#f4d6cb] flex items-center justify-center shadow-sm">
                                                                                <Award className="w-5 h-5 text-[#b47b6a]" />
                                                                      </div>

                                                                      {/* Card */}
                                                                      <div className="flex-1 bg-white rounded-xl border border-[#f3e5de] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                                                                                <p className="text-[#c28c7b] font-semibold text-sm mb-1">
                                                                                          {item.year}
                                                                                </p>
                                                                                <h3 className="text-lg sm:text-xl font-semibold text-[#3e2f2e] mb-1 font-[Libre_Baskerville]">
                                                                                          {item.title}
                                                                                </h3>
                                                                                <p className="text-[#5e4a47]/90 text-sm sm:text-base leading-relaxed break-words">
                                                                                          {item.desc}
                                                                                </p>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </section>
          );
}
