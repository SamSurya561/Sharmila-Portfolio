'use client';
import { useState, useEffect } from 'react';
import { onSnapshot, doc, DocumentReference, DocumentData } from 'firebase/firestore';

export function useDocument(docRef: DocumentReference | null) {
    const [data, setData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!docRef) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribe = onSnapshot(
            docRef,
            (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setData({ id: docSnapshot.id, ...docSnapshot.data() });
                } else {
                    setData(null);
                    setError(new Error("Document not found"));
                }
                setLoading(false);
            },
            (err: Error) => {
                console.error("Error fetching document:", err);
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [docRef]);

    return { data, loading, error };
}