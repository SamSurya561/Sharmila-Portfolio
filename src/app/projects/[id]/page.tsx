// NO 'use client' here! This is a Server Component.

import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import ProjectDetailsContent from '@/components/ProjectDetailsContent';

// 1. Generate Static Params (Runs at build time)
export async function generateStaticParams() {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const querySnapshot = await getDocs(collection(db, 'projects'));

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
    }));
}

// 2. The Page Component
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    // Render the Client Component and pass the ID
    return <ProjectDetailsContent id={resolvedParams.id} />;
}