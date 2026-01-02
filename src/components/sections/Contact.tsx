'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'

// Enhanced Glass Effect matching your new Navbar
const GLASS_PANEL_CLASSES = "backdrop-blur-3xl saturate-200 bg-white/60 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10"
// Custom style for inputs to look "pressed" into the glass
const ENGRAVED_INPUT_CLASSES = "bg-white/50 dark:bg-black/20 border-transparent focus:border-primary/50 focus:bg-white/80 dark:focus:bg-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300 placeholder:text-foreground/40"

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000))
    setFormStatus('success')
  }

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 px-4 overflow-hidden">

      {/* Dynamic Background Gradient Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`grid lg:grid-cols-5 gap-8 lg:gap-0 rounded-[3rem] overflow-hidden ${GLASS_PANEL_CLASSES}`}>

          {/* LEFT SIDE: Contact Info & Context */}
          <div className="lg:col-span-2 bg-primary/5 dark:bg-white/5 p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Let's work <br /> <span className="text-primary">together</span></h2>
              <p className="text-foreground/70 text-lg leading-relaxed mb-12">
                Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
              </p>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Email Me</h4>
                  <a href="mailto:hello@sharmila.dev" className="text-foreground/60 hover:text-primary transition-colors">Sharmilasharmi2128@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Location</h4>
                  <p className="text-foreground/60">Chennai, Tamil Nadu, India.</p>
                </div>
              </div>
            </motion.div>

            <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
              <p className="text-sm text-foreground/40 font-medium">© {new Date().getFullYear()} Sharmila S. All rights reserved.</p>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Form */}
          <div className="lg:col-span-3 p-10 md:p-14 bg-white/40 dark:bg-black/40 backdrop-blur-md">
            <AnimatePresence mode='wait'>
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]"
                >
                  <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold">Message Sent!</h3>
                  <p className="text-foreground/60 max-w-md">
                    Thank you for reaching out. I'll get back to you as soon as possible, usually within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setFormStatus('idle')} className="mt-8 rounded-full">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 h-full flex flex-col justify-center"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium ml-1 text-foreground/80">Name</label>
                      <Input
                        id="name"
                        required
                        placeholder="Surya"
                        className={`h-14 rounded-2xl text-base px-6 ${ENGRAVED_INPUT_CLASSES}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium ml-1 text-foreground/80">Email</label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="Surya@example.com"
                        className={`h-14 rounded-2xl text-base px-6 ${ENGRAVED_INPUT_CLASSES}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium ml-1 text-foreground/80">Subject</label>
                    <Input
                      id="subject"
                      placeholder="Project Inquiry"
                      className={`h-14 rounded-2xl text-base px-6 ${ENGRAVED_INPUT_CLASSES}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium ml-1 text-foreground/80">Message</label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Tell me about your project..."
                      className={`min-h-[180px] rounded-2xl text-base p-6 resize-none ${ENGRAVED_INPUT_CLASSES}`}
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      size="lg"
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="group h-14 rounded-full px-8 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}