'use client';

import { useState, useEffect } from 'react';

export function useTextAnimation(frames: string[], delay: number = 1500) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newIndex = Math.floor(Math.random() * frames.length);
            setIndex(newIndex);
        }, delay);
        return () => clearInterval(interval);
    }, [frames, delay]);

    return frames[index];
}
