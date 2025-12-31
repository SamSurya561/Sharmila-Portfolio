'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

const LIQUID_GLASS_CLASSES = "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"

const projects = [
  { title: "E-commerce Redesign", tags: ["Mobile App", "UX Research"], span: "md:col-span-2", height: "md:h-80" },
  { title: "SaaS Platform Branding", tags: ["Web Design", "Branding"], span: "md:col-span-1", height: "md:h-80" },
  { title: "Portfolio Website", tags: ["Web Design"], span: "md:col-span-1", height: "md:h-80" },
  { title: "Corporate Identity", tags: ["Branding", "Logo Design"], span: "md:col-span-2", height: "md:h-80" },
];

const ProjectCard = ({ title, tags, span, height }: { title: string, tags: string[], span: string, height: string }) => {
  return (
    <motion.div 
      className={`relative rounded-3xl p-8 overflow-hidden group ${LIQUID_GLASS_CLASSES} ${span} ${height} flex flex-col`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => <Badge key={tag} variant="secondary" className="bg-black/20 dark:bg-white/20 border-none backdrop-blur-sm">{tag}</Badge>)}
          </div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        </div>
        <div className="mt-8">
          <Button variant="outline" className="rounded-full bg-transparent border-foreground/50 hover:bg-foreground/10 text-foreground">
            View Case Study <ArrowRight className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </div>
      {/* Glare Effect */}
      <motion.div 
        className="absolute top-0 left-[-100%] w-[100px] h-full z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['0%', '300%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 3,
          ease: 'linear',
          delay: Math.random() * 5,
        }}
        style={{
          opacity: 0
        }}
        whileHover={{
          opacity: 1
        }}
      />
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto py-24 md:py-32 px-4">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  )
}
