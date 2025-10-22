'use client'


import React, { useState } from "react";
import { Send } from "lucide-react"; // install lucide-react if not already: npm i lucide-react
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/appwriteConfig";
import { ID } from "appwrite";

export default function Contact() {
          const [name, setName] = useState('')
          const [email, setEmail] = useState('')
          const [subject, setSubject] = useState('')
          const [message, setMessage] = useState('')


          const sendContact = async (e) => {
                    e.preventDefault()
                    const docRef = doc(db, 'messages', ID.unique())
                    const docSnap = await setDoc(docRef, {
                              name: name,
                              email: email,
                              subject: subject,
                              message: message,
                              createdAt: new Date().toISOString()
                    })
                    console.log(docSnap);
          }
          return (
                    <section className="bg-gradient-to-b from-[#fdfaf8] to-[#fdf6f3] py-20 px-6" id='contact'>
                              <div className="max-w-2xl mx-auto text-center mb-10">
                                        <h2 className="text-3xl font-bold text-[#4c3c35] mb-2">
                                                  Send Me a Message
                                        </h2>
                                        <p className="text-[#7a6b64] text-sm">
                                                  Fill out the form below and I'll respond as soon as possible
                                        </p>
                              </div>

                              <form className="max-w-2xl mx-auto bg-[#fff8f6] border border-[#f2e1dc] rounded-2xl shadow-md p-8 space-y-6">
                                        {/* Row 1 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                  <div>
                                                            <label className="block text-sm font-medium text-[#4c3c35] mb-1">
                                                                      Your Name
                                                            </label>
                                                            <input
                                                                      type="text"
                                                                      name="name"
                                                                      value={name}
                                                                      onChange={(e) => setName(e.target.value)}
                                                                      placeholder="Enter your name"
                                                                      className="w-full px-4 py-2 rounded-md border border-[#f0e3de] bg-[#fdfaf8] text-[#4c3c35] focus:outline-none focus:ring-1 focus:ring-[#d8a597]"
                                                            />
                                                  </div>
                                                  <div>
                                                            <label className="block text-sm font-medium text-[#4c3c35] mb-1">
                                                                      Email Address
                                                            </label>
                                                            <input
                                                                      type="email"
                                                                      name="email"
                                                                      value={email}
                                                                      onChange={(e) => setEmail(e.target.value)}
                                                                      placeholder="your@email.com"
                                                                      className="w-full px-4 py-2 rounded-md border border-[#f0e3de] bg-[#fdfaf8] text-[#4c3c35] focus:outline-none focus:ring-1 focus:ring-[#d8a597]"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                                  <label className="block text-sm font-medium text-[#4c3c35] mb-1">
                                                            Subject
                                                  </label>
                                                  <input
                                                            type="text"
                                                            name="subject"
                                                            value={subject}
                                                            onChange={(e) => setSubject(e.target.value)}
                                                            placeholder="What's this about?"
                                                            className="w-full px-4 py-2 rounded-md border border-[#f0e3de] bg-[#fdfaf8] text-[#4c3c35] focus:outline-none focus:ring-1 focus:ring-[#d8a597]"
                                                  />
                                        </div>

                                        {/* Message */}
                                        <div>
                                                  <label className="block text-sm font-medium text-[#4c3c35] mb-1">
                                                            Message
                                                  </label>
                                                  <textarea
                                                            name="message"
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            placeholder="Tell me more..."
                                                            rows={4}
                                                            className="w-full px-4 py-2 rounded-md border border-[#f0e3de] bg-[#fdfaf8] text-[#4c3c35] focus:outline-none focus:ring-1 focus:ring-[#d8a597]"
                                                  ></textarea>
                                        </div>

                                        {/* Button */}
                                        <button
                                                  type="submit"
                                                  className="w-full flex items-center justify-center gap-2 bg-[#e8b3a4] text-[#4c3c35] font-medium py-3 rounded-md hover:bg-[#e0a597] transition-all duration-200 shadow-sm"
                                                  onClick={sendContact}
                                        >
                                                  <Send className="w-4 h-4" />
                                                  Send Message
                                        </button>
                              </form>
                    </section>
          );
}
