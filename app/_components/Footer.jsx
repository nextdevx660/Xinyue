import React from "react";
import { Instagram, MessageCircle, Youtube, Heart } from "lucide-react";
import { FaThreads } from "react-icons/fa6";

export default function Footer() {
          return (
                    <footer className="bg-[#faf6f2] text-[#4e3b3b] pt-16 pb-8 px-6 border-t border-[#f0e6e2]">
                              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
                                        {/* Left Section */}
                                        <div>
                                                  <div className="w-24 h-4 bg-[#f5c4b7] mb-6 rounded" />
                                                  <p className="text-[#7a5957] leading-relaxed">
                                                            Welcome to my world of beauty, lifestyle, and inspiration. Follow me
                                                            on this journey through Shanghai's vibrant culture.
                                                  </p>
                                        </div>

                                        {/* Quick Links */}
                                        <div>
                                                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                                  <ul className="space-y-2 text-[#7a5957]">
                                                            <li>
                                                                      <a href="/home" className="hover:text-[#4e3b3b] transition">
                                                                                Home
                                                                      </a>
                                                            </li>
                                                            <li>
                                                                      <a href="/about" className="hover:text-[#4e3b3b] transition">
                                                                                About
                                                                      </a>
                                                            </li>
                                                            <li>
                                                                      <a href="/content" className="hover:text-[#4e3b3b] transition">
                                                                                Free Content
                                                                      </a>
                                                            </li>
                                                            <li>
                                                                      <a href="/contact" className="hover:text-[#4e3b3b] transition">
                                                                                Contact
                                                                      </a>
                                                            </li>
                                                            <li>
                                                                      <a href="/chat" className="hover:text-[#4e3b3b] transition">
                                                                                Chat
                                                                      </a>
                                                            </li>
                                                  </ul>
                                        </div>

                                        {/* Connect Section */}
                                        <div>
                                                  <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                                                  <div className="flex gap-4 mb-4">
                                                            <a
                                                                      href="https://www.instagram.com/real_xinyue_"
                                                                      className="bg-[#f5c4b7]/40 hover:bg-[#f5c4b7]/60 transition p-3 rounded-full"
                                                            >
                                                                      <Instagram className="w-5 h-5 text-[#4e3b3b]" />
                                                            </a>
                                                            <a
                                                                      href="https://www.threads.com/@real_xinyue_"
                                                                      className="bg-[#f5c4b7]/40 hover:bg-[#f5c4b7]/60 transition p-3 rounded-full"
                                                            >
                                                                      <FaThreads className="w-5 h-5 text-[#4e3b3b]" />
                                                            </a>
                                                  </div>
                                                  <p className="text-[#7a5957] text-sm">
                                                            Stay updated with exclusive content and behind-the-scenes moments.
                                                  </p>
                                        </div>
                              </div>

                              {/* Bottom Bar */}
                              <div className="border-t border-[#f0e6e2] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#7a5957]">
                                        <p>© 2025 Li Xinyue. All rights reserved.</p>
                                        <p className="flex items-center gap-1 mt-2 md:mt-0">
                                                  Made with <Heart className="w-4 h-4 text-[#f5c4b7]" /> in Shanghai
                                        </p>
                              </div>
                    </footer>
          );
}
