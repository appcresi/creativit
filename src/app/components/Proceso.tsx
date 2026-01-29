'use client';

import { Lightbulb, Palette, Code, Rocket, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

export default function Proceso() {
  const steps = [
    {
      number: 1,
      title: "Descubrimiento",
      description: "Analizamos tu negocio, objetivos y audiencia. Investigamos a tu competencia y definimos una estrategia clara antes de tocar una línea de código.",
      icon: Lightbulb,
      color: "cyan",
      gradient: "from-cyan-400 to-blue-600",
      side: "left"
    },
    {
      number: 2,
      title: "Diseño UX/UI",
      description: "Creamos prototipos interactivos y diseños pixel-perfect. Iteramos contigo hasta lograr una interfaz que enamore y convierta.",
      icon: Palette,
      color: "purple",
      gradient: "from-purple-400 to-pink-600",
      side: "right"
    },
    {
      number: 3,
      title: "Desarrollo",
      description: "Código limpio, optimizado y escalable. Usamos las últimas tecnologías y mejores prácticas para garantizar velocidad y rendimiento.",
      icon: Code,
      color: "orange",
      gradient: "from-orange-400 to-red-600",
      side: "left"
    },
    {
      number: 4,
      title: "Lanzamiento & Soporte",
      description: "Testeamos todo exhaustivamente antes del lanzamiento. Después seguimos contigo para ajustes, mejoras y soporte continuo.",
      icon: Rocket,
      color: "emerald",
      gradient: "from-emerald-400 to-green-600",
      side: "right"
    }
  ];

  return (
    <section
      id="proceso"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-950 to-black"
    >
      <AnimatedBackground colors={["cyan", "purple"]} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-2 mb-6 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-lg shadow-cyan-500/10"
          >
            NUESTRO PROCESO
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Cómo llevamos tu idea
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              de cero a realidad
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60"
          >
            Un proceso probado que garantiza resultados excepcionales en cada proyecto.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - animated */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-emerald-500/50"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.side === "left";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="relative grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Content - Left side for odd, right for even */}
                  <div className={`${isLeft ? 'md:text-right order-2 md:order-1' : 'order-2'}`}>
                    <div className={`inline-block ${isLeft ? 'md:block' : ''}`}>
                      <div className={`inline-flex items-center gap-3 mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-${step.color}-500/50`}>
                          {step.number}
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className={`text-white/60 leading-relaxed max-w-md ${isLeft ? 'md:ml-auto' : ''}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon - Right side for odd, left for even */}
                  <div className={`${isLeft ? 'order-1 md:order-2' : 'order-1'}`}>
                    <div className={`flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} items-center gap-4`}>
                      {!isLeft && (
                        <div className="hidden md:block">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "8rem" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className={`h-px bg-gradient-to-l from-${step.color}-500/50 to-transparent`}
                          />
                        </div>
                      )}

                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        className={`group relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-${step.color}-500/50 hover:shadow-${step.color}-500/70 relative z-10`}
                      >
                        {/* Pulse ring */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 animate-ping`} />
                        <Icon className="w-8 h-8 text-white relative z-10 transition-transform duration-300" />
                      </motion.div>

                      {isLeft && (
                        <div className="hidden md:block">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "8rem" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className={`h-px bg-gradient-to-r from-${step.color}-500/50 to-transparent`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className="text-white/60 mb-6">
            ¿Querés ver este proceso en acción?
          </p>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 group"
          >
            Empezar mi proyecto
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}