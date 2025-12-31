'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4">
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
        className="mt-12"
      >
        <Button size="lg" className="group rounded-full px-8 py-6 text-lg bg-primary/80 hover:bg-primary text-primary-foreground relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100" asChild>
          <Link href="#projects">
            <span className="absolute inset-0 bg-gradient-to-r from-accent/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></span>
            <span className="relative flex items-center gap-2">
              View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
