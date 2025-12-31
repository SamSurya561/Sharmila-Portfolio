'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const LIQUID_GLASS_CLASSES = "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"

export default function Contact() {
  return (
    <section id="contact" className="w-full max-w-3xl mx-auto py-24 md:py-32 px-4">
      <motion.div 
        className={`rounded-3xl p-8 md:p-12 text-center ${LIQUID_GLASS_CLASSES}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-foreground/70 mb-8">Have a project in mind? I'd love to hear from you.</p>
        <form className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" className="bg-transparent border-none rounded-xl engraved-input h-14 text-base"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" className="bg-transparent border-none rounded-xl engraved-input h-14 text-base"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." className="bg-transparent border-none rounded-xl engraved-input min-h-[150px] text-base"/>
          </div>
          <div className="text-center pt-4">
            <Button size="lg" type="submit" className="group rounded-full px-10 py-7 text-lg bg-primary/80 hover:bg-primary text-primary-foreground relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100">
                <span className="absolute inset-0 bg-gradient-to-r from-accent/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></span>
                <span className="relative">Send Message</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
