'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, animate } from 'framer-motion';

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [from, to, duration, suffix]);

  return <div ref={nodeRef} />;
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for background effects
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const backgroundX = useTransform(smoothX, [-1000, 1000], [-20, 20]);
  const backgroundY = useTransform(smoothY, [-1000, 1000], [-20, 20]);
  const backgroundXInverse = useTransform(smoothX, [-1000, 1000], [20, -20]);
  const backgroundYInverse = useTransform(smoothY, [-1000, 1000], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="inicio" className="relative min-h-screen pt-20 overflow-hidden bg-[#0a0f1a]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1420] to-[#0a0f1a]"></div>

        {/* Animated glows with parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]"
          style={{ x: backgroundX, y: backgroundY }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px]"
          style={{ x: backgroundXInverse, y: backgroundYInverse }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Grid overlay */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            x: useTransform(smoothX, (x) => x * 0.05),
            y: useTransform(smoothY, (y) => y * 0.05),
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Main headline */}
          <div className="space-y-8 lg:space-y-10 z-10">
            {/* Big headline */}
            <div className="space-y-2 overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
              >
                <span className="block">Páginas web que</span>
                <span className="block mt-2">convierten visitas</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  en clientes
                </span>
              </motion.h1>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex gap-12 pt-4"
            >
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent flex">
                  <Counter from={0} to={10} suffix="+" />
                </div>
                <p className="text-sm text-gray-400">Proyectos</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent flex">
                  <Counter from={0} to={98} suffix="%" />
                </div>
                <p className="text-sm text-gray-400">Satisfacción</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent flex">
                  <Counter from={0} to={3} suffix="+ años" />
                </div>
                <p className="text-sm text-gray-400">Experiencia</p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Description and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-10 lg:pl-8 z-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-sm text-cyan-300 shadow-lg shadow-cyan-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Diseño & desarrollo web
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed">
              Creamos experiencias digitales de alto impacto. Branding, diseño UX/UI
              y desarrollo web pensados para crecer tu negocio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <a
                  href="#contacto"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300"
                >
                  Empezar proyecto
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#portafolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 shadow-lg shadow-cyan-500/10 transition-all duration-300"
              >
                Ver trabajos
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // Reduced intensity for better UX
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: useSpring(x, springConfig), y: useSpring(y, springConfig) }}
    >
      {children}
    </motion.div>
  );
}