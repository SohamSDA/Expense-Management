'use client'

import { SignIn } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0d0d1f] via-[#12142d] to-[#1e223e] text-white overflow-hidden">
      {/* Glow effect - subtle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] bg-[#6366f1] rounded-full blur-[180px] z-0"
      />

      {/* Stars background – subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="w-full h-full bg-[url('/stars.svg')] bg-cover bg-center opacity-90 mix-blend-soft-light" />
      </motion.div>

      {/* Sign-in Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10"
        >
          <SignIn
            appearance={{
              elements: {
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-white text-lg font-semibold',
                headerSubtitle: 'text-gray-400',
                socialButtonsBlockButton:
                  'bg-[#1f1f1f] hover:bg-[#2c2c2c] text-white border border-gray-700',
                formFieldInput:
                  'bg-[#121212] text-white border border-gray-700',
                footerActionText: 'text-gray-400',
                footerActionLink: 'text-indigo-400 hover:text-indigo-300',
              },
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
