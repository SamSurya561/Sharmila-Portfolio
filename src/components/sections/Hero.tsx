'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import Link from 'next/link'
import HeroIconsBackground from './HeroIconsBackground'

// 1. The Corner Handles for the Figma Box
const SelectionCorner = ({ className }: { className: string }) => (
  <div className={`absolute w-2.5 h-2.5 bg-primary border border-background z-20 ${className}`} />
)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // 2. Cursor Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={heroRef}
      id="home"
      className={`relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden ${isHovering ? 'cursor-none' : ''}`}
    >
      <HeroIconsBackground />

      {/* 3. Custom "Portfolio" Pill Cursor */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none z-50 will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 12,
          translateY: 12,
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Portfolio
        </div>
      </motion.div>

      {/* 4. The Figma Selection Box Wrapper */}
      <motion.div
        className="relative border-2 border-primary/50 p-8 md:p-12" // Added padding to give breathing room inside the box
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* The 4 Corners */}
        <SelectionCorner className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <SelectionCorner className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <SelectionCorner className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <SelectionCorner className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

        {/* Label Tag on top of the box (Optional, adds to the effect) */}
        <div className="absolute -top-3 left-4 px-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
          Selected
        </div>

        {/* 5. YOUR ORIGINAL CONTENT */}
        <motion.h2
          className="text-base md:text-xl uppercase tracking-[0.3em] text-foreground/60 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          UI/UX & Graphic Designer
        </motion.h2>

        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          SHARMILA S
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center" // Ensure buttons are centered
        >
          <Button size="lg" className="group rounded-full px-8 py-6 text-lg bg-primary/80 hover:bg-primary text-primary-foreground relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100" asChild>
            <Link href="#projects">
              <span className="absolute inset-0 bg-gradient-to-r from-accent/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></span>
              <span className="relative flex items-center gap-2">
                View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group rounded-full px-8 py-6 text-lg bg-transparent hover:bg-foreground/10 border-foreground/30 hover:border-foreground/50 transition-all duration-300 hover:scale-105 active:scale-100" asChild>
            <Link href="#contact">
              <span className="relative flex items-center gap-2">
                <Mail className="w-5 h-5" /> Contact Me
              </span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}