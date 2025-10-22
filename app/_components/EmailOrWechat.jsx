import React from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react"; // install lucide-react if not already: npm i lucide-react

export default function EmailOrWechat() {
          return (
                    <section className="bg-gradient-to-b from-[#fdf9f7] to-[#fff7f4] py-16 px-6">
                              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Email Card */}
                                        <div className="bg-[#fff8f6] border border-[#f2e1dc] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col md:flex-row items-start gap-6">
                                                  <div className="bg-[#faece8] p-3 rounded-full flex items-center justify-center">
                                                            <Mail className="text-[#4c3c35] w-6 h-6" />
                                                  </div>
                                                  <div>
                                                            <h3 className="text-lg font-semibold text-[#4c3c35] mb-1">
                                                                      Email Me
                                                            </h3>
                                                            <p className="text-[#6b564e] text-sm mb-2">
                                                                      lixinyue@gmail.com
                                                            </p>
                                                            <a
                                                                      href="mailto:lixinyue@gmail.com"
                                                                      className="text-[#d79b8d] text-sm font-medium hover:underline"
                                                            >
                                                                      Send Email →
                                                            </a>
                                                  </div>
                                        </div>

                                        {/* WeChat Card */}
                                        <div className="bg-[#fff8f6] border border-[#f2e1dc] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col md:flex-row items-start gap-6">
                                                  <div className="bg-[#faece8] p-3 rounded-full flex items-center justify-center">
                                                            <Instagram className="text-[#4c3c35] w-6 h-6" />
                                                  </div>
                                                  <div>
                                                            <h3 className="text-lg font-semibold text-[#4c3c35] mb-1">
                                                                      Instagram
                                                            </h3>
                                                            <p className="text-[#6b564e] text-sm mb-2">
                                                                      Scan QR code or add: @real_xinyue_
                                                            </p>
                                                            <a
                                                                      href="https://www.instagram.com/real_xinyue_"
                                                                      className="text-[#d79b8d] text-sm font-medium hover:underline"
                                                            >
                                                                      Add on Instagram →
                                                            </a>
                                                  </div>
                                        </div>
                              </div>
                    </section>
          );
}
