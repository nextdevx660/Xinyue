import React from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import EmailOrWechat from "../_components/EmailOrWechat";
import Contact from "../_components/Contact";
import BusinessEnquiry from "../_components/BusinessEnquiry";
import Link from "next/link";

export default function page() {
          return (
                    <div>
                              <Header />
                              <section className="bg-gradient-to-b from-[#fdf9f7] to-[#fff7f4] py-24 px-6 text-center">
                                        <div className="max-w-3xl mx-auto">
                                                  {/* Heading */}
                                                  <h2 className="text-3xl md:text-4xl font-bold text-[#4c3c35] mb-6">
                                                            Get In Touch
                                                  </h2>

                                                  {/* Description */}
                                                  <p className="text-[#6b564e] text-base md:text-lg mb-10">
                                                            I'd love to hear from you! Whether it's for collaborations, brand
                                                            partnerships, or just to say hello.
                                                  </p>

                                                  {/* Contact Button */}
                                                  <Link href={'#contact'}>
                                                            <button className="bg-[#e7b2a5] hover:bg-[#d29d8d] text-[#4c3c35] font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                                                                      Contact Me
                                                            </button>
                                                  </Link>
                                        </div>
                              </section>
                              <EmailOrWechat />
                              <Contact />
                              <BusinessEnquiry />
                              <Footer />
                    </div>
          );
}
