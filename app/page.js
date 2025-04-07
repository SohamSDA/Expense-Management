"use client"

import HomePages2 from '../components/HeroSection2';
import HomePages1 from '../components/HeroSection1';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0f1123] via-[#1c1d4a] to-[#331e65] text-white relative overflow-hidden py-16'>
        <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/stars.svg')] opacity-20" />
      </div>
    <HomePages1/>
    <HomePages2/>
    </div>
  );
}
