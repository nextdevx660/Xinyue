'use client';

import React, { useEffect, useState } from 'react';
import {
          doc,
          getDoc,
          updateDoc,
          arrayUnion,
          arrayRemove,
} from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
          Loader2,
          Heart,
          Tag,
          CalendarDays,
          Crown,
          Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/appwriteConfig';

export default function PostPage() {
          const { id: postId } = useParams();
          const [post, setPost] = useState(null);
          const [user, setUser] = useState(null);
          const [userData, setUserData] = useState(null);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState('');
          const [likeLoading, setLikeLoading] = useState(false);

          // 🔹 Fetch post data
          const getPostData = async () => {
                    try {
                              const docRef = doc(db, 'posts', postId);
                              const docSnap = await getDoc(docRef);

                              if (docSnap.exists()) setPost({ id: docSnap.id, ...docSnap.data() });
                              else setError('Post not found.');
                    } catch (err) {
                              console.error(err);
                              setError('Failed to load post.');
                    } finally {
                              setLoading(false);
                    }
          };

          // 🔹 Get logged-in Firebase user + userData
          useEffect(() => {
                    const unsubscribe = onAuthStateChanged(auth, async (u) => {
                              setUser(u || null);
                              if (u) {
                                        const userRef = doc(db, 'xinyue_users', u.uid);
                                        const userSnap = await getDoc(userRef);
                                        if (userSnap.exists()) setUserData(userSnap.data());
                              } else {
                                        setUserData(null);
                              }
                    });
                    return () => unsubscribe();
          }, []);

          useEffect(() => {
                    getPostData();
          }, [postId]);

          // 🔹 Like toggle
          const handleLike = async () => {
                    if (!user) return alert('Please login to like this post ❤️');
                    if (!post) return;

                    setLikeLoading(true);

                    const docRef = doc(db, 'posts', post.id);
                    const hasLiked = post.likedBy?.includes(user.uid);

                    try {
                              await updateDoc(docRef, {
                                        likes: hasLiked ? (post.likes || 0) - 1 : (post.likes || 0) + 1,
                                        likedBy: hasLiked
                                                  ? arrayRemove(user.uid)
                                                  : arrayUnion(user.uid),
                              });

                              // Optimistic UI update
                              setPost((prev) => ({
                                        ...prev,
                                        likes: hasLiked ? (prev.likes || 0) - 1 : (prev.likes || 0) + 1,
                                        likedBy: hasLiked
                                                  ? prev.likedBy.filter((id) => id !== user.uid)
                                                  : [...(prev.likedBy || []), user.uid],
                              }));
                    } catch (err) {
                              console.error('Error updating like:', err);
                    } finally {
                              setLikeLoading(false);
                    }
          };

          if (loading)
                    return (
                              <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#fff7f4] to-[#fcefe8]">
                                        <Loader2 className="animate-spin text-[#e8b3a4]" size={32} />
                              </div>
                    );

          if (error)
                    return (
                              <div className="flex justify-center items-center h-screen text-[#4c3c35]">
                                        ❌ {error}
                              </div>
                    );

          if (!post) return null;

          const isVideo =
                    post.file_type === 'video' ||
                    post.fileUrl?.includes('video') ||
                    post.fileUrl?.endsWith('.mp4');

          const hasLiked = post.likedBy?.includes(user?.uid);

          // 🔐 Premium Lock Logic
          const isLocked =
                    post.post_type === 'premium' && userData?.isPremium === false;

          return (
                    <div>
                              <Header />
                              <div className="min-h-screen bg-gradient-to-b from-[#fffaf8] to-[#fcefe8] text-[#4c3c35] px-4 sm:px-8 py-10 pt-20">
                                        <motion.div
                                                  initial={{ opacity: 0, y: 40 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ duration: 0.6 }}
                                                  className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-[#f2d7cf] shadow-[0_8px_25px_rgba(0,0,0,0.05)] overflow-hidden"
                                        >
                                                  {/* 🔹 Responsive Grid Layout */}
                                                  <div className="grid grid-cols-1 lg:grid-cols-2">
                                                            {/* Media Section */}
                                                            <div className="relative h-[500px] lg:h-[100%] overflow-hidden group">
                                                                      {isVideo ? (
                                                                                <video
                                                                                          src={isLocked ? '' : post.fileUrl}
                                                                                          controls={!isLocked}
                                                                                          poster={
                                                                                                    isLocked
                                                                                                              ? post.thumbnailUrl || '/default-thumbnail.jpg'
                                                                                                              : post.thumbnailUrl || '/default-thumbnail.jpg'
                                                                                          }
                                                                                          className={`w-full h-full object-cover transition-all duration-500 ${isLocked ? 'blur-2xl pointer-events-none select-none' : ''
                                                                                                    }`}
                                                                                          loop
                                                                                          controlsList="nodownload noremoteplayback"
                                                                                          disablePictureInPicture
                                                                                          onContextMenu={(e) => e.preventDefault()}
                                                                                />
                                                                      ) : (
                                                                                <Image
                                                                                          src={post.fileUrl}
                                                                                          alt={post.caption}
                                                                                          width={1000}
                                                                                          height={1000}
                                                                                          className={`h-full transition-all duration-500 ${isLocked ? 'blur-2xl pointer-events-none select-none' : ''
                                                                                                    }`}
                                                                                          priority
                                                                                />
                                                                      )}

                                                                      {/* 🔒 Overlay when locked */}
                                                                      {isLocked && (
                                                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10 backdrop-blur-sm">
                                                                                          <Lock size={30} className="mb-3 text-white/90" />
                                                                                          <p className="text-lg font-medium">Premium Content Locked</p>
                                                                                          <p className="text-sm opacity-80 mt-1">
                                                                                                    Subscribe to unlock exclusive posts ✨
                                                                                          </p>
                                                                                </div>
                                                                      )}

                                                                      <div className="absolute top-2 left-4 text-[#7a5b50] drop-shadow-md">
                                                                                <h1 className="text-2xl sm:text-3xl font-bold">{post.caption}</h1>
                                                                                <div className="flex items-center gap-2 mt-1 text-sm opacity-90">
                                                                                          <CalendarDays size={14} />
                                                                                          <span>
                                                                                                    {post.createdAt
                                                                                                              ? new Date(post.createdAt).toLocaleDateString('en-US', {
                                                                                                                        year: 'numeric',
                                                                                                                        month: 'short',
                                                                                                                        day: 'numeric',
                                                                                                              })
                                                                                                              : 'Unknown date'}
                                                                                          </span>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Content Section */}
                                                            <div className="p-6 sm:p-10 flex flex-col justify-between">
                                                                      <div>
                                                                                {/* Description */}
                                                                                <p className="text-base sm:text-lg leading-relaxed mb-6">
                                                                                          {post.description || 'No description provided.'}
                                                                                </p>

                                                                                {/* Tags */}
                                                                                {post.tags && post.tags.length > 0 && (
                                                                                          <div className="flex flex-wrap gap-2 mb-8">
                                                                                                    {post.tags.map((tag, index) => (
                                                                                                              <motion.span
                                                                                                                        key={index}
                                                                                                                        initial={{ opacity: 0, y: 10 }}
                                                                                                                        animate={{ opacity: 1, y: 0 }}
                                                                                                                        transition={{ delay: index * 0.05 }}
                                                                                                                        className="bg-[#fde8e0] text-[#7a5b50] text-sm px-3 py-1 rounded-full flex items-center gap-1"
                                                                                                              >
                                                                                                                        <Tag size={14} /> {tag}
                                                                                                              </motion.span>
                                                                                                    ))}
                                                                                          </div>
                                                                                )}
                                                                      </div>

                                                                      {/* Bottom Section (Like + Type) */}
                                                                      <div className="flex flex-wrap justify-between items-center border-t border-[#f2d7cf] pt-6 gap-4">
                                                                                <div className="flex items-center gap-2">
                                                                                          {post.post_type === 'premium' ? (
                                                                                                    <span className="flex items-center gap-1 bg-[#e8b3a4] text-white px-4 py-1 rounded-full text-sm">
                                                                                                              <Crown size={14} /> Premium Content
                                                                                                    </span>
                                                                                          ) : (
                                                                                                    <span className="bg-[#fde8e0] text-[#7a5b50] px-4 py-1 rounded-full text-sm">
                                                                                                              Free Content
                                                                                                    </span>
                                                                                          )}
                                                                                </div>

                                                                                <motion.button
                                                                                          whileTap={{ scale: 0.9 }}
                                                                                          onClick={handleLike}
                                                                                          disabled={likeLoading || isLocked}
                                                                                          className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition-all ${hasLiked
                                                                                                              ? 'bg-[#e57373] hover:bg-[#ef9a9a]'
                                                                                                              : 'bg-[#e8b3a4] hover:bg-[#e0a597]'
                                                                                                    } text-white ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                                >
                                                                                          <Heart
                                                                                                    size={18}
                                                                                                    className={hasLiked ? 'fill-white' : 'fill-transparent'}
                                                                                          />
                                                                                          {likeLoading ? (
                                                                                                    <Loader2 size={16} className="animate-spin" />
                                                                                          ) : (
                                                                                                    <span>{post.likes || 0}</span>
                                                                                          )}
                                                                                </motion.button>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </motion.div>

                                        {/* Related Section */}
                                        <motion.div
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  transition={{ delay: 0.3 }}
                                                  className="max-w-6xl mx-auto mt-10 text-center"
                                        >
                                                  <h2 className="text-xl font-semibold mb-3">🌸 More from Li Xinyue</h2>
                                                  <p className="text-[#7a6b64]">
                                                            Discover more exclusive stories and moments from her world.
                                                  </p>
                                        </motion.div>
                              </div>
                              <Footer />
                    </div>
          );
}
