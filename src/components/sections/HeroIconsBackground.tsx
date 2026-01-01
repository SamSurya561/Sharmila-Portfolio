'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { PenTool, Palette, Brush, Baseline, Circle, Square, Layout, Component, Layers } from 'lucide-react'
import { useEffect } from 'react';

const icons = [
  { icon: PenTool, position: { top: '10%', left: '15%' }, size: 'w-8 h-8 md:w-10 md:h-10' },
  { icon: Palette, position: { top: '20%', left: '85%' }, size: 'w-10 h-10 md:w-12 md:h-12' },
  { icon: Brush, position: { top: '80%', left: '10%' }, size: 'w-12 h-12 md:w-14 md:h-14' },
  { icon: Baseline, position: { top: '85%', left: '90%' }, size: 'w-8 h-8 md:w-10 md:h-10' },
  { icon: Circle, position: { top: '15%', left: '50%' }, size: 'w-6 h-6 md:w-8 md:h-8' },
  { icon: Square, position: { top: '65%', left: '70%' }, size: 'w-7 h-7 md:w-9 md:h-9' },
  { icon: Layout, position: { top: '40%', left: '5%' }, size: 'w-9 h-9 md:w-11 md:h-11' },
  { icon: Component, position: { top: '60%', left: '95%' }, size: 'w-10 h-10 md:w-12 md:h-12' },
  { icon: Layers, position: { top: '90%', left: '45%' }, size: 'w-8 h-8 md:w-10 md:h-10' },
  { icon: Circle, position: { top: '50%', left: '45%' }, size: 'w-16 h-16 md:w-20 md:h-20', opacity: 'opacity-5' },
  { icon: PenTool, position: { top: '75%', left: '30%' }, size: 'w-6 h-6 md:w-8 mdh-8' },
  { icon: Palette, position: { top: '5%', left: '75%' }, size: 'w-7 h-7 md:w-9 md:h-9' },
];

export default function HeroIconsBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      if (currentTarget instanceof HTMLElement) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        animate(mouseX, x, { duration: 0.1, ease: "linear" });
        animate(mouseY, y, { duration: 0.1, ease: "linear" });
      }
    };
    
    const heroElement = document.getElementById('home');
    if (heroElement) {
        heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
        if (heroElement) {
            heroElement.removeEventListener('mousemove', handleMouseMove);
        }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      {icons.map((item, i) => {
        const Icon = item.icon;
        const parallaxX = useTransform(mouseX, [0, 1], [-20 * (i/3 + 1), 20 * (i/3 + 1)]);
        const parallaxY = useTransform(mouseY, [0, 1], [-20 * (i/3 + 1), 20 * (i/3 + 1)]);

        const randomY = (Math.random() * 2 - 1) * 20;
        const randomX = (Math.random() * 2 - 1) * 20;
        const randomRotate = (Math.random() * 2 - 1) * 25;
        
        return (
          <motion.div
            key={i}
            className={`absolute text-foreground/10 ${item.opacity || ''}`}
            style={{ ...item.position, x: parallaxX, y: parallaxY }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: item.opacity ? 0.05 : 0.1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.5, duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              animate={{
                y: [0, randomY, 0],
                x: [0, randomX, 0],
                rotate: [0, randomRotate, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            >
              <Icon className={item.size} />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  )
}
