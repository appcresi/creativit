'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed top-4 inset-x-0 z-50">
        <nav className="max-w-7xl mx-auto px-6">
          <motion.div
            className={`flex items-center justify-between rounded-2xl bg-black/70 backdrop-blur-xl border px-6 py-4 shadow-lg transition-all duration-300 ${isScrolled
                ? 'border-cyan-500/40 shadow-cyan-500/20'
                : 'border-cyan-500/30 shadow-cyan-500/10'
              }`}
            whileHover={{ borderColor: "rgba(34, 211, 238, 0.5)" }}
          >

            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition-all duration-300 overflow-hidden">
                <span className="text-white font-extrabold text-lg relative z-10 group-hover:scale-110 transition-transform duration-300">C</span>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                Creativit
              </span>
            </a>

            {/* Menu Desktop */}
            <ul className="hidden md:flex items-center gap-10 text-sm text-white/70 font-medium">
              {['Inicio', 'Servicios', 'Portafolio', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="relative group hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Desktop */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contacto"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30"
            >
              <span>Empezar proyecto</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            {/* Toggle Mobile */}
            <button
              className="md:hidden text-white relative w-8 h-8 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode='wait'>
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="md:hidden mt-3 mx-6 rounded-2xl bg-black/90 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 overflow-hidden"
            >
              <ul className="flex flex-col gap-6 px-6 py-6 text-white/80 text-lg font-medium">
                {['Inicio', 'Servicios', 'Portafolio', 'Contacto'].map((item) => (
                  <motion.li key={item} variants={itemVariants}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className="block hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}

                <motion.a
                  variants={itemVariants}
                  href="#contacto"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/30"
                >
                  Empezar proyecto
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}