'use client';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedBackground({
    colors = ["cyan", "blue"]
}: {
    colors?: string[]
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const backgroundX = useTransform(smoothX, [-1000, 1000], [-30, 30]);
    const backgroundY = useTransform(smoothY, [-1000, 1000], [-30, 30]);
    const backgroundXInverse = useTransform(smoothX, [-1000, 1000], [30, -30]);
    const backgroundYInverse = useTransform(smoothY, [-1000, 1000], [30, -30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate mouse position relative to the center of the viewport
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX - innerWidth / 2);
            mouseY.set(clientY - innerHeight / 2);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Glows with parallax */}
            <motion.div
                className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-${colors[0]}-500/20 rounded-full blur-[120px] mix-blend-screen`}
                style={{ x: backgroundX, y: backgroundY }}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-${colors[1] || colors[0]}-500/10 rounded-full blur-[120px] mix-blend-screen`}
                style={{ x: backgroundXInverse, y: backgroundYInverse }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Grid overlay */}
            <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.5) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    x: useTransform(smoothX, (x) => x * 0.02),
                    y: useTransform(smoothY, (y) => y * 0.02),
                }}
            />
        </div>
    );
}
