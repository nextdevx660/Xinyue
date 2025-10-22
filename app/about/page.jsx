import React from "react";
import { MapPin, Heart } from "lucide-react";
import Description from "../_components/Description";
import Milestone from "../_components/Milestone";
import Belive from "../_components/Belive";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

export default function AboutPage() {
          return (
                    <div>
                              <Header />
                              <section className="relative h-screen w-full bg-[url('/about.jpg')] bg-cover bg-center flex items-center justify-center">
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />

                                        {/* Content */}
                                        <div className="relative text-center z-10 flex flex-col items-center space-y-6">
                                                  {/* Tag */}
                                                  <div className="flex items-center justify-center gap-2 bg-[#f5c4b7]/30 text-[#4e3b3b] px-4 py-1 rounded-full shadow-sm backdrop-blur-sm">
                                                            <Heart size={14} className="text-[#c7887a]" />
                                                            <span className="text-sm font-medium">About Me</span>
                                                  </div>

                                                  {/* Image placeholder */}
                                                  <div className="w-48 h-32 bg-[#f5c4b7] rounded-md shadow-md" />

                                                  {/* Name */}
                                                  <h1 className="text-2xl font-serif text-[#4e3b3b]">Li Xinyue</h1>

                                                  {/* Info line */}
                                                  <div className="flex items-center justify-center gap-3 text-[#7a5957] font-medium">
                                                            <div className="flex items-center gap-1">
                                                                      <MapPin size={16} className="text-[#c7887a]" />
                                                                      <span>Shanghai, China</span>
                                                            </div>
                                                            <span>•</span>
                                                            <span>Age 22</span>
                                                  </div>
                                        </div>
                              </section>
                              <Description />
                              <Milestone />
                              <Belive />
                              <Footer />
                    </div>
          );
}
