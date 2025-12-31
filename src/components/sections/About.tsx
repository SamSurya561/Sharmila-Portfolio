'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const LIQUID_GLASS_CLASSES = "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"

export default function About() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-pic');

  return (
    <section id="about" className="w-full max-w-6xl mx-auto py-24 md:py-32 px-4">
      <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
        <motion.div
          className="md:col-span-2"
          style={{ perspective: '1000px' }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`rounded-3xl overflow-hidden ${LIQUID_GLASS_CLASSES}`}
            whileHover={{ rotateY: 10, rotateX: -5, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                width={800}
                height={1000}
                className="object-cover w-full h-full scale-105"
              />
            )}
          </motion.div>
        </motion.div>
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Clean, functional, and emotional design.</h2>
          <div className="space-y-4 text-foreground/80 text-base md:text-lg">
            <p>
              I'm Sharmila S, a passionate UI/UX and Graphic Designer dedicated to crafting experiences that are not only beautiful but also deeply functional and emotionally resonant.
            </p>
            <p>
              My design philosophy centers on clean aesthetics and intuitive usability. I believe that great design is invisible, seamlessly guiding users and solving problems without getting in the way.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
