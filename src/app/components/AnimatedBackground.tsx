'use client';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useMouseParallax } from './MouseParallax';

const GLOW_PRIMARY: Record<string, string> = {
    cyan: "bg-cyan-500/20",
    blue: "bg-blue-500/20",
    purple: "bg-purple-500/20",
    emerald: "bg-emerald-500/20",
    orange: "bg-orange-500/20",
};

const GLOW_SECONDARY: Record<string, string> = {
    cyan: "bg-cyan-500/10",
    blue: "bg-blue-500/10",
    purple: "bg-purple-500/10",
    emerald: "bg-emerald-500/10",
    orange: "bg-orange-500/10",
};

export default function AnimatedBackground({
    colors = ["cyan", "blue"]
}: {
    colors?: string[]
}) {
    const primaryGlow = GLOW_PRIMARY[colors[0]] ?? GLOW_PRIMARY.cyan;
    const secondaryGlow = GLOW_SECONDARY[colors[1] ?? colors[0]] ?? GLOW_SECONDARY.blue;

    const { mouseX, mouseY } = useMouseParallax();

    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const backgroundX = useTransform(smoothX, [-1000, 1000], [-30, 30]);
    const backgroundY = useTransform(smoothY, [-1000, 1000], [-30, 30]);
    const backgroundXInverse = useTransform(smoothX, [-1000, 1000], [30, -30]);
    const backgroundYInverse = useTransform(smoothY, [-1000, 1000], [30, -30]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Glows with parallax */}
            <motion.div
                className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${primaryGlow} rounded-full blur-[120px] mix-blend-screen`}
                style={{ x: backgroundX, y: backgroundY }}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${secondaryGlow} rounded-full blur-[120px] mix-blend-screen`}
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
