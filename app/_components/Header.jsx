"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

export default function Header() {
          const [isScrolled, setIsScrolled] = useState(false);
          const [menuOpen, setMenuOpen] = useState(false);

          useEffect(() => {
                    const handleScroll = () => setIsScrolled(window.scrollY > 0);
                    window.addEventListener("scroll", handleScroll);
                    return () => window.removeEventListener("scroll", handleScroll);
          }, []);

          const navLinks = [
                    { name: "Home", href: "/home" },
                    { name: "About", href: "/about" },
                    { name: "Free Content", href: "/content" },
                    { name: "Contact", href: "/contact" },
                    { name: "Chat", href: "/chat" },
          ];

          return (
                    <header
                              className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                                                  ? "bg-[#faf6f2]/80 backdrop-blur-md"
                                                  : "bg-transparent"
                                        }`}
                    >
                              <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                                        {/* Left logo / brand */}
                                        <div className="flex items-center gap-3">
                                                  <div className="w-8 h-6 bg-[#f5c4b7] rounded-sm" />
                                                  <h1 className="text-[#7a5957] font-medium tracking-wide">
                                                            Li Xinyue
                                                  </h1>
                                        </div>

                                        {/* Desktop Navigation */}
                                        <nav className="hidden md:flex items-center gap-8">
                                                  {navLinks.map((link) => (
                                                            <Link
                                                                      key={link.name}
                                                                      href={link.href}
                                                                      className={`text-[#4e3b3b] font-medium hover:text-[#c7887a] transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#f5c4b7] after:transition-all`}
                                                            >
                                                                      {link.name}
                                                            </Link>
                                                  ))}
                                                  <Link
                                                            href="/exclusive"
                                                            className="bg-[#f5c4b7] text-[#4e3b3b] px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-[#f4b9ac] transition"
                                                  >
                                                            Exclusive Content
                                                  </Link>
                                        </nav>

                                        {/* Mobile Menu Icon */}
                                        <div
                                                  className="md:hidden text-[#4e3b3b] cursor-pointer"
                                                  onClick={() => setMenuOpen(!menuOpen)}
                                        >
                                                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                                        </div>
                              </div>

                              {/* Mobile Dropdown Menu */}
                              {menuOpen && (
                                        <div className="md:hidden bg-[#faf6f2] px-6 py-4 space-y-4 shadow-inner animate-slideDown">
                                                  {navLinks.map((link) => (
                                                            <Link
                                                                      key={link.name}
                                                                      href={link.href}
                                                                      onClick={() => setMenuOpen(false)}
                                                                      className="block text-[#4e3b3b] font-medium hover:text-[#c7887a] transition"
                                                            >
                                                                      {link.name}
                                                            </Link>
                                                  ))}
                                                  <Link
                                                            href="/exclusive"
                                                            onClick={() => setMenuOpen(false)}
                                                            className="block bg-[#f5c4b7] text-[#4e3b3b] px-4 py-2 rounded-xl font-medium text-center hover:bg-[#f4b9ac] transition"
                                                  >
                                                            Exclusive Content
                                                  </Link>
                                        </div>
                              )}
                    </header>
          );
}
