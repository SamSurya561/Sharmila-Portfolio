'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useCollection, useFirestore } from '@/firebase'
import { collection, query, orderBy, DocumentData, limit } from 'firebase/firestore'
import Link from 'next/link'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'

export default function Projects() {
  const firestore = useFirestore();
  const projectsQuery = firestore ? query(collection(firestore, 'projects'), orderBy('date', 'desc'), limit(5)) : null;
  const { data: projects, loading } = useCollection(projectsQuery);

  const bentoItems = projects?.map((project, i) => ({
    ...project,
    className: i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1",
    header: (
      <div className="relative w-full h-full">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
    ),
  })) || [];

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
      
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-96 rounded-3xl bg-white/5 dark:bg-black/10 animate-pulse"></div>
          <div className="h-96 rounded-3xl bg-white/5 dark:bg-black/10 animate-pulse"></div>
          <div className="h-96 rounded-3xl bg-white/5 dark:bg-black/10 animate-pulse"></div>
          <div className="md:col-span-2 h-96 rounded-3xl bg-white/5 dark:bg-black/10 animate-pulse"></div>
        </div>
      )}
      
      {!loading && projects && (
        <BentoGrid className="max-w-7xl mx-auto">
          {bentoItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.summary}
              header={item.header}
              className={item.className}
            />
          ))}
        </BentoGrid>
      )}

      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Button size="lg" className="group rounded-full px-8 py-6 text-lg bg-primary/80 hover:bg-primary text-primary-foreground relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100" asChild>
          <Link href="/projects">
            <span className="absolute inset-0 bg-gradient-to-r from-accent/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></span>
            <span className="relative flex items-center gap-2">
              View All Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
