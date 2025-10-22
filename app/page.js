'use client'

import { Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/appwriteConfig' // ✅ ensure this exports Firebase `auth`
import { useRouter } from 'next/navigation'

export default function Page() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ✅ Watch auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ Logged in → Go to home
        router.push('/home')
      } else {
        // ❌ Not logged in → Go to signup
        router.push('/sign-up')
      }
      setLoading(false)
    })

    // ✅ Cleanup listener on unmount
    return () => unsubscribe()
  }, [router])

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#f2d7cf]">
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon className="animate-spin text-[#7a6b64]" size={70} />
        <h4 className="text-2xl text-[#7a6b64] font-bold">
          Welcome to Xinyue&apos;s World
        </h4>
      </div>
    </div>
  )
}
