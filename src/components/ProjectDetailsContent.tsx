'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import { useDocument, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

const LIQUID_GLASS_CLASSES = "backdrop-blur-xl saturate-180 bg-white/5 dark:bg-black/10 border border-white/10 shadow-lg shadow-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]";

// This component receives the ID as a simple prop
export default function ProjectDetailsContent({ id }: { id: string }) {
    const firestore = useFirestore();

    const docRef = useMemo(() => {
        return firestore && id ? doc(firestore, 'projects', id) : null;
    }, [firestore, id]);

    const { data: project, loading } = useDocument(docRef);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Project not found</h1>
                <Button asChild>
                    <Link href="/projects">Back to Projects</Link>
                </Button>
            </div>
        );
    }

    const { title, categories, imageUrl, pills, summary, description, date, link } = project;
    const allTags = [...(categories || []), ...(pills || [])];

    return (
        <main className="w-full min-h-screen pb-24">
            {/* Hero Image Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

                <div className="absolute top-8 left-4 md:left-8 z-20">
                    <Button variant="outline" className="group rounded-full bg-background/20 backdrop-blur-md border-white/10 hover:bg-background/40" asChild>
                        <Link href="/projects">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to All Projects
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 -mt-32 relative z-10">
                <motion.div
                    className={`rounded-3xl p-8 md:p-12 ${LIQUID_GLASS_CLASSES}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col gap-6">
                        {/* Header Info */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none text-sm py-1 px-3">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{title}</h1>

                            <div className="flex flex-wrap items-center gap-6 text-foreground/60 text-sm md:text-base">
                                {date && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(date.seconds * 1000).toLocaleDateString()}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    <span>{categories?.[0] || "Portfolio Item"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 my-4" />

                        {/* Main Description */}
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed text-foreground/90">
                                <h3 className="text-2xl font-bold">Overview</h3>
                                <p>{summary}</p>

                                {description && (
                                    <div className="mt-8 whitespace-pre-wrap">
                                        {description}
                                    </div>
                                )}
                            </div>

                            {/* Sidebar / Actions */}
                            <div className="space-y-8">
                                {link && (
                                    <div className={`p-6 rounded-2xl ${LIQUID_GLASS_CLASSES}`}>
                                        <h4 className="font-bold mb-4 flex items-center gap-2">
                                            <ExternalLink className="w-5 h-5" /> Project Link
                                        </h4>
                                        <Button className="w-full rounded-full" asChild>
                                            <a href={link} target="_blank" rel="noopener noreferrer">
                                                Visit Live Site
                                            </a>
                                        </Button>
                                    </div>
                                )}

                                <div className={`p-6 rounded-2xl ${LIQUID_GLASS_CLASSES}`}>
                                    <h4 className="font-bold mb-4">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {pills?.map((tech: string) => (
                                            <span key={tech} className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}