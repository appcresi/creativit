'use client';

import { Star, Quote } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import AnimatedBackground from './AnimatedBackground';

export default function Testimonios() {
  const testimonials = [
    {
      name: "Martín Rodríguez",
      role: "CEO, TechStart",
      initials: "MR",
      text: "Increíble trabajo. La landing que nos hicieron duplicó nuestras conversiones en el primer mes. Súper profesionales y atentos a cada detalle.",
      color: "cyan",
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      name: "Laura Castro",
      role: "Fundadora, LifeStyle Blog",
      initials: "LC",
      text: "No solo nos entregaron un sitio hermoso, nos enseñaron cómo optimizarlo. El nivel de compromiso y seguimiento post-lanzamiento es excepcional.",
      color: "purple",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      name: "Pablo Sánchez",
      role: "Director, Verde Store",
      initials: "PS",
      text: "Entendieron perfectamente nuestra visión y la llevaron al siguiente nivel. El e-commerce que desarrollaron es rápido, intuitivo y nuestras ventas crecen cada mes.",
      color: "emerald",
      gradient: "from-emerald-400 to-green-600"
    }
  ];

  const stats = [
    { value: "100%", label: "Clientes satisfechos" },
    { value: "50+", label: "Proyectos entregados" },
    { value: "5+", label: "Años de experiencia" },
    { value: "24/7", label: "Soporte disponible" }
  ];

  return (
    <section
      id="testimonios"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-950 to-black"
    >
      <AnimatedBackground colors={["purple", "emerald"]} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-2 mb-6 text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-full shadow-lg shadow-purple-500/10"
          >
            TESTIMONIOS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Lo que dicen
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60"
          >
            Resultados reales de personas reales que confiaron en nosotros.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 10 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 10 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(yPct * -10);
    y.set(xPct * 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const borderColorClass = {
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 shadow-cyan-500/10 hover:shadow-cyan-500/30",
    purple: "border-purple-500/30 hover:border-purple-500/60 shadow-purple-500/10 hover:shadow-purple-500/30",
    emerald: "border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/10 hover:shadow-emerald-500/30",
  }[testimonial.color as string];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border ${borderColorClass} transition-colors duration-500 h-full`}
      >
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-br ${testimonial.gradient}`} />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <Quote className={`w-10 h-10 text-${testimonial.color}-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`} />

          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.4 }}
              >
                <Star
                  className={`w-4 h-4 fill-${testimonial.color}-400 text-${testimonial.color}-400`}
                />
              </motion.div>
            ))}
          </div>

          <p className="text-white/80 leading-relaxed mb-6">
            {testimonial.text}
          </p>

          <div className="flex items-center gap-3">
            <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300`}>
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${testimonial.gradient} animate-ping opacity-0 group-hover:opacity-75`} />
              <span className="relative z-10">{testimonial.initials}</span>
            </div>
            <div>
              <p className="text-white font-semibold">{testimonial.name}</p>
              <p className="text-white/50 text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}