'use client';

import { Rocket, Building2, ShoppingCart, Zap, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedBackground from './AnimatedBackground';

export default function Servicios() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section
      id="servicios"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-950 to-black"
    >
      <AnimatedBackground colors={["cyan", "blue"]} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex px-4 py-2 mb-6 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-lg shadow-cyan-500/10"
          >
            SERVICIOS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Soluciones digitales
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              que impulsan tu negocio
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/60"
          >
            Diseñamos y desarrollamos productos digitales pensados para crecer.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Card 1 - Cyan */}
          <ServiceCard
            icon={Rocket}
            title="Landing Pages"
            description="Diseñadas para captar atención y convertir visitas en clientes reales."
            color="cyan"
            gradient="from-cyan-400 to-blue-600"
            variants={itemVariants}
          />

          {/* Card 2 - Purple */}
          <ServiceCard
            icon={Building2}
            title="Web Corporativa"
            description="Sitios profesionales que fortalecen tu marca y generan confianza."
            color="purple"
            gradient="from-purple-400 to-pink-600"
            variants={itemVariants}
          />

          {/* Card 3 - Orange */}
          <ServiceCard
            icon={ShoppingCart}
            title="E-commerce"
            description="Tiendas online escalables con pagos, envíos y gestión completa."
            color="orange"
            gradient="from-orange-400 to-red-600"
            variants={itemVariants}
          />

          {/* Card 4 - Emerald */}
          <ServiceCard
            icon={Zap}
            title="Aplicaciones Web"
            description="Soluciones a medida con tecnología moderna y alto rendimiento."
            color="emerald"
            gradient="from-emerald-400 to-green-600"
            variants={itemVariants}
          />
        </motion.div>

      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, description, color, gradient, variants }: { icon: any, title: string, description: string, color: string, gradient: string, variants: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    x.set((mouseY - centerY) / 20);
    y.set((centerX - mouseX) / 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useSpring(x, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(y, { stiffness: 150, damping: 15 });

  const borderColorClass = {
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 shadow-cyan-500/10 hover:shadow-cyan-500/30",
    purple: "border-purple-500/30 hover:border-purple-500/60 shadow-purple-500/10 hover:shadow-purple-500/30",
    orange: "border-orange-500/30 hover:border-orange-500/60 shadow-orange-500/10 hover:shadow-orange-500/30",
    emerald: "border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/10 hover:shadow-emerald-500/30",
  }[color];

  const shadowColorClass = `shadow-${color}-500/50`;

  return (
    <motion.div
      variants={variants}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border shadow-lg transition-colors duration-500 ${borderColorClass}`}
      >
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition duration-500 bg-gradient-to-br ${gradient}`} />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <div className={`w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${shadowColorClass} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/60 leading-relaxed mb-6">
            {description}
          </p>
          <div className="inline-flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition duration-300">
            Saber más
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}