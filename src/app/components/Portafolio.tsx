'use client';

import { ArrowUpRight, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';

export default function Portafolio() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [iframeError, setIframeError] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const projects = [
    {
      title: "CrESI",
      description: "Plataforma Educativa con juegos interactivos, recursos descargables.",
      tags: ["React", "Tailwind"],
      bgFrom: "from-cyan-400",
      bgTo: "to-blue-600",
      border: "cyan",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      url: "https://cresi.com.ar", // Reemplaza con tu URL real
      features: ["Diseño responsive", "Optimización SEO", "Animaciones fluidas"]
    },
    {
      title: "Festivo Eventos",
      description: "Plataforma de organización de eventos con pagos a través de Mercado Pago.",
      tags: ["TypeScript", "Mercado Pago"],
      bgFrom: "from-orange-400",
      bgTo: "to-red-600",
      border: "orange",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      url: "https://festivoeventos.com.ar", // Reemplaza con tu URL real
      features: ["Dashboard en tiempo real", "Colaboración en equipo", "Integraciones API"]
    },
    {
      title: "Paola Galante Abogada",
      description: "Landing Page para estudio jurídico",
      tags: ["Next.js", "Tailwind"],
      bgFrom: "from-emerald-400",
      bgTo: "to-green-600",
      border: "emerald",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
      url: "https://paolagalanteabogada.com.ar", // Reemplaza con tu URL real
      features: ["CMS headless", "Comentarios en tiempo real", "Newsletter integrado"]
    }
  ];

  const handlePrevProject = () => {
    if (selectedProject === null) return;
    setIframeError(false);
    setSelectedProject(selectedProject === 0 ? projects.length - 1 : selectedProject - 1);
  };

  const handleNextProject = () => {
    if (selectedProject === null) return;
    setIframeError(false);
    setSelectedProject(selectedProject === projects.length - 1 ? 0 : selectedProject + 1);
  };

  const currentProject = selectedProject !== null ? projects[selectedProject] : null;

  return (
    <section
      id="portafolio"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-50 mix-blend-difference flex items-center justify-center bg-white rounded-full text-black font-bold text-xs"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%"
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: cursorVisible ? 1 : 0,
          opacity: cursorVisible ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        VER
      </motion.div>

      <AnimatedBackground colors={["purple", "cyan"]} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-2 mb-6 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-lg shadow-cyan-500/10"
          >
            PORTAFOLIO
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Trabajos que hablan
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              por nosotros
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60"
          >
            Proyectos reales diseñados para impactar, comunicar y convertir.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              setCursorVisible={setCursorVisible}
              onClick={() => setSelectedProject(index)}
            />
          ))}
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
            ¿Querés ver más proyectos o iniciar el tuyo?
          </p>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 group"
          >
            Hablemos de tu proyecto
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-[90vh] bg-neutral-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative z-20 flex items-center justify-between p-6 border-b border-white/10 bg-neutral-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentProject.bgFrom} ${currentProject.bgTo}`} />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentProject.title}</h3>
                    <p className="text-sm text-white/60">{currentProject.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Navigation Buttons */}
                  <button
                    onClick={handlePrevProject}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-300"
                    title="Proyecto anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextProject}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-300"
                    title="Proyecto siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Open in New Tab */}
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${currentProject.bgFrom} ${currentProject.bgTo} text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir proyecto
                  </a>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="relative h-[calc(100%-88px)] overflow-hidden">
                {!iframeError ? (
                  <div className="relative w-full h-full">
                    {/* Loading Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full border-4 border-t-transparent animate-spin bg-gradient-to-r ${currentProject.bgFrom} ${currentProject.bgTo}`} 
                             style={{ WebkitMaskImage: 'linear-gradient(transparent 50%, black 50%)' }}
                        />
                        <p className="text-white/60">Cargando vista previa...</p>
                      </div>
                    </div>

                    {/* Iframe */}
                    <iframe
                      src={currentProject.url}
                      className="absolute inset-0 w-full h-full bg-white"
                      title={currentProject.title}
                      onError={() => setIframeError(true)}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                ) : (
                  // Fallback when iframe fails
                  <div className="flex items-center justify-center h-full p-12">
                    <div className="text-center max-w-2xl">
                      <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden border border-white/10">
                        <img
                          src={currentProject.image}
                          alt={currentProject.title}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${currentProject.bgFrom} ${currentProject.bgTo} opacity-20`} />
                      </div>

                      <h4 className="text-2xl font-bold text-white mb-4">
                        Vista previa no disponible
                      </h4>
                      <p className="text-white/60 mb-8">
                        Este proyecto no puede mostrarse en el modal por restricciones de seguridad.
                        Podés ver el proyecto completo en una nueva ventana.
                      </p>

                      {/* Features */}
                      <div className="mb-8">
                        <h5 className="text-sm font-semibold text-white/80 mb-3">Características destacadas:</h5>
                        <div className="flex flex-wrap justify-center gap-3">
                          {currentProject.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href={currentProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r ${currentProject.bgFrom} ${currentProject.bgTo} text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                      >
                        <ExternalLink className="w-5 h-5" />
                        Ver proyecto completo
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ 
  project, 
  index, 
  setCursorVisible,
  onClick 
}: { 
  project: any, 
  index: number, 
  setCursorVisible: (v: boolean) => void,
  onClick: () => void
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 10 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 10 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    setCursorVisible(false);
  };

  const borderColorClass = {
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 shadow-cyan-500/10 hover:shadow-cyan-500/30",
    purple: "border-purple-500/30 hover:border-purple-500/60 shadow-purple-500/10 hover:shadow-purple-500/30",
    orange: "border-orange-500/30 hover:border-orange-500/60 shadow-orange-500/10 hover:shadow-orange-500/30",
    emerald: "border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/10 hover:shadow-emerald-500/30",
  }[project.border as string] || "border-white/10";

  const tagBgClass = {
    cyan: "bg-cyan-500/10 border-cyan-500/30",
    purple: "bg-purple-500/10 border-purple-500/30",
    orange: "bg-orange-500/10 border-orange-500/30",
    emerald: "bg-emerald-500/10 border-emerald-500/30"
  }[project.border as string] || "bg-white/10 border-white/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.button
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setCursorVisible(true)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`block group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border ${borderColorClass} transition-colors duration-500 h-full w-full text-left cursor-pointer`}
      >
        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-br ${project.bgFrom} ${project.bgTo} z-10 pointer-events-none`} />

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end z-20">
            <div className="p-6 text-white font-medium inline-flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Ver proyecto
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/60 text-sm mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className={`px-3 py-1 text-xs font-semibold rounded-full text-white/70 border ${tagBgClass}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}