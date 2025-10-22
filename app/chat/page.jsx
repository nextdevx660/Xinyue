'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ChatPage() {
          const [messages, setMessages] = useState([
                    { id: 1, sender: 'xinyue', text: '你好~ 💕 Welcome to my world! How are you today?' },
          ]);
          const [newMessage, setNewMessage] = useState('');
          const [loading, setLoading] = useState(false);
          const chatEndRef = useRef(null);

          const handleSend = async (e) => {
                    e.preventDefault();
                    if (!newMessage.trim()) return;

                    const userMsg = { id: Date.now(), sender: 'user', text: newMessage.trim() };
                    setMessages((prev) => [...prev, userMsg]);
                    setNewMessage('');
                    setLoading(true);

                    try {
                              const res = await fetch('/api/chat', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                                  messages: [
                                                            ...messages.map((m) => ({
                                                                      role: m.sender === 'user' ? 'user' : 'assistant',
                                                                      content: m.text,
                                                            })),
                                                            { role: 'user', content: newMessage },
                                                  ],
                                        }),
                              });

                              if (!res.ok) throw new Error(`API error: ${res.status}`);
                              const data = await res.json();

                              const reply = data.reply || '💗 Sorry, I didn’t get that.';
                              setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'xinyue', text: reply }]);
                    } catch (err) {
                              console.error(err);
                              setMessages((prev) => [
                                        ...prev,
                                        { id: Date.now() + 1, sender: 'xinyue', text: '⚠️ Oops! Something went wrong.' },
                              ]);
                    } finally {
                              setLoading(false);
                    }
          };

          useEffect(() => {
                    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, [messages]);

          return (
                    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fff7f4] via-[#fcefe8] to-[#f7dfd2] relative font-sans">
                              {/* Header */}
                              <div className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-[#f2d7cf] px-5 py-4 flex items-center gap-3 z-10">
                                        <img
                                                  src="/xinyue.jpg"
                                                  alt="Li Xinyue"
                                                  className="h-11 w-11 rounded-full border border-[#f2d7cf] shadow-sm"
                                        />
                                        <div className="flex flex-col">
                                                  <h2 className="text-[#4c3c35] font-semibold text-base md:text-lg tracking-wide">
                                                            Li Xinyue 🌸
                                                  </h2>
                                                  <p className="text-xs text-[#7a6b64]">
                                                            {loading ? 'Typing...' : 'Online now'}
                                                  </p>
                                        </div>
                              </div>

                              {/* Chat Window */}
                              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
                                        {messages.map((msg) => (
                                                  <div
                                                            key={msg.id}
                                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                                                      } items-end`}
                                                  >
                                                            {msg.sender === 'xinyue' && (
                                                                      <img
                                                                                src="/xinyue.jpg"
                                                                                alt="Xinyue"
                                                                                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-[#f2d7cf] mr-2 shadow-sm"
                                                                      />
                                                            )}
                                                            <div
                                                                      className={`max-w-[80%] sm:max-w-[65%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed shadow-md transition-all duration-300 ${msg.sender === 'user'
                                                                                          ? 'bg-gradient-to-br from-[#e8b3a4] to-[#e8b3a4]/80 text-white rounded-br-none'
                                                                                          : 'bg-white text-[#4c3c35] border border-[#f2d7cf]/70 rounded-bl-none'
                                                                                }`}
                                                            >
                                                                      {msg.text}
                                                            </div>
                                                  </div>
                                        ))}
                                        {loading && (
                                                  <div className="text-center text-sm text-[#7a6b64] italic animate-pulse">
                                                            李心悦 is typing...
                                                  </div>
                                        )}
                                        <div ref={chatEndRef} />
                              </div>

                              {/* Input Section */}
                              <form
                                        onSubmit={handleSend}
                                        className="sticky bottom-0 bg-white/70 backdrop-blur-md border-t border-[#f2d7cf] px-4 sm:px-6 py-3 flex items-center gap-2 sm:gap-3"
                              >
                                        <input
                                                  type="text"
                                                  value={newMessage}
                                                  onChange={(e) => setNewMessage(e.target.value)}
                                                  placeholder="Write a message to Xinyue..."
                                                  className="flex-1 px-4 py-3 rounded-full border border-[#f2d7cf] bg-[#fffaf8] text-[#4c3c35] focus:outline-none focus:ring-2 focus:ring-[#e8b3a4]/60 transition-all text-sm sm:text-base"
                                        />
                                        <button
                                                  type="submit"
                                                  disabled={loading}
                                                  className="p-3 sm:p-3.5 bg-[#e8b3a4] hover:bg-[#e0a597] text-white rounded-full shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                        </button>
                              </form>
                    </div>
          );
}
