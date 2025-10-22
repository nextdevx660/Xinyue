"use client";

import React, { useState, useEffect } from "react";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { auth, db } from "@/lib/appwriteConfig"; // your firebase setup
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Page() {
          const [selectedPlan, setSelectedPlan] = useState(null);
          const [user, setUser] = useState(null);
          const router = useRouter()

          // ✅ Detect logged-in user
          useEffect(() => {
                    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                              setUser(currentUser);
                    });
                    return () => unsubscribe();
          }, []);

          const plans = [
                    { title: "☕ Tip Jar", price: 3, desc: "A small gesture of love.", button: "Send a Tip", durationDays: 0 },
                    { title: "💐 Monthly Supporter", price: 9, desc: "Join my monthly circle.", button: "Join Monthly", durationDays: 30 },
                    { title: "🌸 Premium Membership", price: 29, desc: "Unlock all exclusive posts.", button: "Become Premium", highlight: true, durationDays: 30 },
                    { title: "🎁 Yearly Subscription", price: 299, desc: "Best value for long-term supporters.", button: "Subscribe Yearly", durationDays: 365 },
                    { title: "💎 Lifetime Access", price: 999, desc: "One-time support for a lifetime.", button: "Join for Life", durationDays: 9999 },
          ];

          // ✅ Update user document after successful payment
          const handlePaymentSuccess = async (plan) => {
                    if (!user) {
                              alert("Please sign in to continue ❤️");
                              return;
                    }

                    try {
                              const userRef = doc(db, "xinyue_users", user.uid);
                              const userSnap = await getDoc(userRef);

                              if (userSnap.exists()) {
                                        // Calculate expiry date
                                        const purchaseDate = new Date();
                                        let expiryDate = null;
                                        if (plan.durationDays > 0 && plan.durationDays < 9999) {
                                                  expiryDate = new Date(purchaseDate);
                                                  expiryDate.setDate(purchaseDate.getDate() + plan.durationDays);
                                        }

                                        await updateDoc(userRef, {
                                                  isPremium: true,
                                                  planType: plan.title,
                                                  purchaseDate: purchaseDate.toISOString(),
                                                  expiryDate: expiryDate ? expiryDate.toISOString() : null,
                                        });

                                        router.replace('/exclusive')
                                        setSelectedPlan(null);
                              } else {
                                        console.log("User record not found.");
                              }
                    } catch (err) {
                              console.error(err);
                    }
          };

          // ✅ Auto-expire logic: run once when user logs in
          useEffect(() => {
                    const checkExpiry = async () => {
                              if (!user) return;
                              const userRef = doc(db, "xinyue_users", user.uid);
                              const userSnap = await getDoc(userRef);

                              if (userSnap.exists()) {
                                        const data = userSnap.data();
                                        if (data.expiryDate && new Date(data.expiryDate) < new Date()) {
                                                  await updateDoc(userRef, { isPremium: false });
                                        }
                              }
                    };

                    checkExpiry();
          }, [user]);

          return (
                    <div>
                              <Header />
                              <div className="bg-gradient-to-b from-[#fdfaf8] to-[#fcf4f1] text-[#4c3c35] min-h-screen pb-20">
                                        {/* Hero Section */}
                                        <section className="text-center py-20 px-6">
                                                  <h1 className="text-4xl font-bold mb-4">Join & Support My Journey 💖</h1>
                                                  <p className="text-[#7a6b64] max-w-2xl mx-auto">
                                                            Whether you’d like to offer a small tip or become a supporter, every contribution helps me continue creating meaningful stories.
                                                  </p>
                                        </section>

                                        {/* Plans */}
                                        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
                                                  {plans.map((plan, index) => (
                                                            <div
                                                                      key={index}
                                                                      className={`bg-gradient-to-b from-[#fdebe7] to-[#fffaf8] rounded-3xl shadow-sm p-8 flex flex-col justify-between border border-[#f2d7cf] transition-all duration-300 ${plan.highlight ? "md:scale-105 md:shadow-lg" : ""
                                                                                }`}
                                                            >
                                                                      <div>
                                                                                <h3 className="text-2xl font-semibold mb-3">{plan.title}</h3>
                                                                                <p className="text-3xl font-bold mb-2">${plan.price}</p>
                                                                                <p className="text-[#7a6b64] mb-6">{plan.desc}</p>
                                                                      </div>
                                                                      <button
                                                                                onClick={() => setSelectedPlan(plan)}
                                                                                className="mt-auto bg-[#e8b3a4] text-[#4c3c35] w-full py-3 rounded-md font-medium hover:bg-[#e0a597] transition-all duration-200"
                                                                      >
                                                                                {plan.button} →
                                                                      </button>
                                                            </div>
                                                  ))}
                                        </section>

                                        {/* PayPal Modal */}
                                        {selectedPlan && (
                                                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                            <div className="bg-white rounded-2xl p-8 w-[400px] text-center">
                                                                      <h2 className="text-xl font-bold mb-4">{selectedPlan.title}</h2>
                                                                      <p className="mb-4">
                                                                                You’re supporting with <strong>${selectedPlan.price}</strong>
                                                                      </p>

                                                                      <PayPalButtons
                                                                                style={{ layout: "vertical" }}
                                                                                createOrder={(data, actions) => {
                                                                                          return actions.order.create({
                                                                                                    purchase_units: [
                                                                                                              {
                                                                                                                        description: selectedPlan.title,
                                                                                                                        amount: { value: selectedPlan.price.toString() },
                                                                                                              },
                                                                                                    ],
                                                                                          });
                                                                                }}
                                                                                onApprove={(data, actions) => {
                                                                                          return actions.order.capture().then(() => {
                                                                                                    handlePaymentSuccess(selectedPlan);
                                                                                          });
                                                                                }}
                                                                                onCancel={() => setSelectedPlan(null)}
                                                                      />

                                                                      <button
                                                                                onClick={() => setSelectedPlan(null)}
                                                                                className="mt-4 text-sm text-gray-600 hover:text-gray-900"
                                                                      >
                                                                                Cancel
                                                                      </button>
                                                            </div>
                                                  </div>
                                        )}
                              </div>
                              <Footer />
                    </div>
          );
}
