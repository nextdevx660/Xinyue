'use client';
import React, { useState, useEffect } from 'react';
import { db, storage } from '@/lib/appwriteConfig'; // Appwrite storage still used for uploads
import { ID } from 'appwrite';
import { Upload, Loader2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // ✅ Firebase Auth

export default function UploadPage() {
          const [file, setFile] = useState(null);
          const [preview, setPreview] = useState('');
          const [caption, setCaption] = useState('');
          const [description, setDescription] = useState('');
          const [tags, setTags] = useState('');
          const [type, setType] = useState('normal');
          const [loading, setLoading] = useState(false);
          const [message, setMessage] = useState('');
          const [fileType, setFileType] = useState('image');
          const [user, setUser] = useState(null);

          // ✅ Get logged-in user
          useEffect(() => {
                    const auth = getAuth();
                    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                              if (currentUser) setUser(currentUser);
                              else setUser(null);
                    });
                    return () => unsubscribe();
          }, []);

          // ✅ Handle File Selection
          const handleFileChange = (e) => {
                    const selected = e.target.files[0];
                    if (selected) {
                              setFile(selected);
                              setPreview(URL.createObjectURL(selected));
                              setFileType(selected.type.startsWith('video') ? 'video' : 'image');
                    }
          };

          // ✅ Generate Video Thumbnail
          const generateVideoThumbnail = (videoFile) => {
                    return new Promise((resolve, reject) => {
                              const video = document.createElement('video');
                              video.src = URL.createObjectURL(videoFile);
                              video.crossOrigin = 'anonymous';
                              video.currentTime = 1;

                              video.addEventListener('loadeddata', () => {
                                        const canvas = document.createElement('canvas');
                                        canvas.width = 640;
                                        canvas.height = 360;
                                        const ctx = canvas.getContext('2d');
                                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.8);
                              });

                              video.addEventListener('error', (err) => reject(err));
                    });
          };

          // ✅ Handle Upload
          const handleUpload = async (e) => {
                    e.preventDefault();
                    if (!user) {
                              setMessage('⚠️ Please log in to upload content.');
                              return;
                    }
                    if (!file || !caption.trim()) {
                              setMessage('⚠️ Please fill all required fields.');
                              return;
                    }

                    setLoading(true);
                    setMessage('');

                    try {
                              // 🔹 Upload main file to Appwrite Storage
                              const uploadedFile = await storage.createFile(
                                        '68f7507400041e2e4af0',
                                        ID.unique(),
                                        file
                              );

                              const fileUrl = `https://nyc.cloud.appwrite.io/v1/storage/buckets/68f7507400041e2e4af0/files/${uploadedFile.$id}/view?project=68f5fb99002efe4b86cd`;

                              let thumbnailUrl = '';

                              // 🔹 Generate thumbnail for videos
                              if (fileType === 'video') {
                                        const thumbnailBlob = await generateVideoThumbnail(file);
                                        const thumbnailFile = new File([thumbnailBlob], `${file.name}-thumb.jpg`, {
                                                  type: 'image/jpeg',
                                        });

                                        const uploadedThumb = await storage.createFile(
                                                  '68f7507400041e2e4af0',
                                                  ID.unique(),
                                                  thumbnailFile
                                        );
                                        thumbnailUrl = `https://nyc.cloud.appwrite.io/v1/storage/buckets/68f7507400041e2e4af0/files/${uploadedThumb.$id}/view?project=68f5fb99002efe4b86cd`;
                              }

                              // 🔹 Save metadata to Firestore
                              const postId = ID.unique(); // You can also use push ID or random string
                              const postRef = doc(db, 'posts', postId);
                              await setDoc(postRef, {
                                        caption,
                                        description,
                                        fileUrl,
                                        thumbnailUrl: thumbnailUrl || fileUrl,
                                        tags: tags.split(',').map((t) => t.trim()),
                                        likes: 0,
                                        likedBy: [],
                                        post_type: type,
                                        file_type: fileType,
                                        createdAt: new Date().toISOString(),
                                        userId: user.uid, // ✅ Link post to Firebase user
                                        userEmail: user.email || '',
                              });

                              setMessage('✅ Content uploaded successfully!');
                              setFile(null);
                              setPreview('');
                              setCaption('');
                              setDescription('');
                              setTags('');
                              setType('normal');
                    } catch (err) {
                              console.error('Upload Error:', err);
                              setMessage(`❌ Upload failed: ${err.message || 'Please try again.'}`);
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <div className="min-h-screen bg-gradient-to-b from-[#fff7f4] to-[#fcefe8] px-4 sm:px-8 py-10">
                              <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-10 border border-[#f2d7cf]">
                                        <h1 className="text-2xl sm:text-3xl font-semibold text-[#4c3c35] mb-6">
                                                  🌸 Upload New Content
                                        </h1>

                                        <form onSubmit={handleUpload} className="space-y-5">
                                                  {/* Title */}
                                                  <div>
                                                            <label className="block text-[#7a6b64] mb-2 font-medium">
                                                                      Title *
                                                            </label>
                                                            <input
                                                                      type="text"
                                                                      value={caption}
                                                                      onChange={(e) => setCaption(e.target.value)}
                                                                      className="w-full p-3 border border-[#f2d7cf] rounded-lg bg-[#fffaf8] focus:ring-2 focus:ring-[#e8b3a4] outline-none"
                                                                      placeholder="Enter content title"
                                                            />
                                                  </div>

                                                  {/* Description */}
                                                  <div>
                                                            <label className="block text-[#7a6b64] mb-2 font-medium">
                                                                      Description
                                                            </label>
                                                            <textarea
                                                                      value={description}
                                                                      onChange={(e) => setDescription(e.target.value)}
                                                                      rows={4}
                                                                      className="w-full p-3 border border-[#f2d7cf] rounded-lg bg-[#fffaf8] focus:ring-2 focus:ring-[#e8b3a4] outline-none"
                                                                      placeholder="Describe your content"
                                                            ></textarea>
                                                  </div>

                                                  {/* Tags */}
                                                  <div>
                                                            <label className="block text-[#7a6b64] mb-2 font-medium">
                                                                      Tags (comma separated)
                                                            </label>
                                                            <input
                                                                      type="text"
                                                                      value={tags}
                                                                      onChange={(e) => setTags(e.target.value)}
                                                                      className="w-full p-3 border border-[#f2d7cf] rounded-lg bg-[#fffaf8] focus:ring-2 focus:ring-[#e8b3a4] outline-none"
                                                                      placeholder="fashion, vlog, shanghai, beauty..."
                                                            />
                                                  </div>

                                                  {/* Content Type */}
                                                  <div>
                                                            <label className="block text-[#7a6b64] mb-2 font-medium">
                                                                      Content Type
                                                            </label>
                                                            <select
                                                                      value={type}
                                                                      onChange={(e) => setType(e.target.value)}
                                                                      className="w-full p-3 border border-[#f2d7cf] rounded-lg bg-[#fffaf8] focus:ring-2 focus:ring-[#e8b3a4] outline-none"
                                                            >
                                                                      <option value="normal">Normal (Free)</option>
                                                                      <option value="premium">Premium (Exclusive)</option>
                                                                      <option value="donation">Donation</option>
                                                                      <option value="subscription">Subscription</option>
                                                                      <option value="tip">Tip-Based</option>
                                                            </select>
                                                  </div>

                                                  {/* File Upload */}
                                                  <div>
                                                            <label className="block text-[#7a6b64] mb-2 font-medium">
                                                                      Upload File
                                                            </label>
                                                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                                                      <label className="cursor-pointer flex items-center justify-center gap-2 px-5 py-3 border border-dashed border-[#e8b3a4] bg-[#fffaf8] rounded-xl hover:bg-[#fcefe8] transition">
                                                                                <Upload size={20} />
                                                                                <span>Select File</span>
                                                                                <input
                                                                                          type="file"
                                                                                          accept="image/*,video/*"
                                                                                          className="hidden"
                                                                                          onChange={handleFileChange}
                                                                                />
                                                                      </label>

                                                                      {preview && (
                                                                                <div className="w-32 h-32 rounded-lg overflow-hidden border border-[#f2d7cf]">
                                                                                          {fileType === 'video' ? (
                                                                                                    <video src={preview} controls className="w-full h-full object-cover" />
                                                                                          ) : (
                                                                                                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                                                                          )}
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* Submit */}
                                                  <div className="pt-4">
                                                            <button
                                                                      type="submit"
                                                                      disabled={loading}
                                                                      className="w-full flex items-center justify-center gap-2 bg-[#e8b3a4] hover:bg-[#e0a597] text-white py-3 rounded-xl shadow-md transition-all disabled:opacity-50"
                                                            >
                                                                      {loading ? <Loader2 size={20} className="animate-spin" /> : '🚀 Publish Content'}
                                                            </button>
                                                  </div>
                                        </form>

                                        {message && <p className="text-center text-sm mt-4 text-[#4c3c35]">{message}</p>}
                              </div>
                    </div>
          );
}
