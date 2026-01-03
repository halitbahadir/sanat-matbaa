"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Logo() {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href="/" className="flex items-center gap-0 flex-shrink-0 hover:opacity-90 transition">
      {!imageError ? (
        // Logo Image - Görseldeki logoyu kullan
        <div className="relative h-10 sm:h-12 md:h-14 w-auto">
          <Image
            src="/img/sanat-matbaasi-logo.png"
            alt="SM Sanat Matbaası"
            width={200}
            height={60}
            className="h-full w-auto object-contain"
            priority
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        // Fallback Logo - Görsel yoksa bu gösterilir
        <div className="flex items-center gap-0 h-10 sm:h-12 md:h-14">
          {/* Left Section - Black Block with SM (Serif, Gold) */}
          <div className="bg-black px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center justify-center h-full">
            <span 
              className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
              style={{ 
                color: '#D4AF37',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 'bold'
              }}
            >
              SM
            </span>
          </div>
          
          {/* Right Section - White Background with sanatmatbaasi */}
          <div className="bg-white px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 h-full flex items-center">
            <span 
              className="font-sans text-sm sm:text-base md:text-lg lg:text-xl font-medium lowercase tracking-wide"
              style={{ 
                color: '#D4AF37',
                textShadow: '1px 1px 2px rgba(0,0,0,0.4), 0 1px 1px rgba(0,0,0,0.3)',
                letterSpacing: '0.05em',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              sanatmatbaasi
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
