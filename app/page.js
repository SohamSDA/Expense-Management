'use client';

import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import GradientText from "../components/reactbits/GradientText/GradientText";
import Card from "../components/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1123] via-[#1c1d4a] to-[#331e65] text-white relative overflow-hidden py-16">

      {/* Purple Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute right-[-180px] top-[-150px] w-[600px] h-[800px] bg-purple-600 rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* Stars BG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/stars.svg')] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative flex justify-around z-10 max-w-7xl mx-auto py-20">
        
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-10 w-fit"
        >
          <GradientText
            colors={["#a855f7", "#6366f1", "#9333ea", "#6366f1"]}
            animationSpeed={3}
            showBorder={false}
            className="text-5xl md:text-8xl"
          >
            Smart Money
            <br />
            Simple Life
          </GradientText>

          <p className="mt-6 pb-8 max-w-lg text-white/80 text-lg">
            Track, save, and grow your wealth with ease. Your all-in-one
            platform for smarter financial decisions.
          </p>

          <Button
            variant="outline"
            className="text-white bg-transparent border-white hover:bg-white/10 hover:text-white py-6 px-6"
          >
            Get Started
          </Button>
        </motion.div>

        {/* Card Component with Slide-in */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.1 }}
        >
          <Card />
        </motion.div>

      </div>
    </div>
  );
}
