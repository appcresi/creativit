"use client"
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  ArrowUp
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from './AnimatedBackground';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-black via-neutral-950 to-black text-white overflow-hidden">

      <AnimatedBackground colors={["cyan", "blue"]} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* CTA Section */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-2 mb-6 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-lg shadow-cyan-500/10"
          >
            TRABAJEMOS JUNTOS
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            ¿Creamos algo <span className="text-cyan-400/60">inolvidable</span>?
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-xl mx-auto mb-8"
          >
            Diseñamos productos digitales que se ven bien, funcionan mejor y venden más.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="#contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 group"
            >
              Empezar proyecto
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-500/50 transition-transform hover:scale-110 duration-300">
                C
              </div>
              <span className="text-2xl font-bold">Creativit</span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              No hacemos "páginas web".
              Creamos experiencias digitales que conectan con personas reales.
            </p>
          </motion.div>

          {/* Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold">
              Navegación
            </h4>

            <ul className="space-y-4 text-sm">
              {["Inicio", "Servicios", "Portafolio", "Contacto"].map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-300" />
                    <span className="relative">
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold">
              Qué hacemos
            </h4>

            <ul className="space-y-3 text-sm text-white/60">
              <li className="hover:text-white transition-colors duration-300 cursor-default">Landing Pages de alto impacto</li>
              <li className="hover:text-white transition-colors duration-300 cursor-default">Webs modernas & escalables</li>
              <li className="hover:text-white transition-colors duration-300 cursor-default">Apps & plataformas</li>
              <li className="hover:text-white transition-colors duration-300 cursor-default">Diseño UX/UI</li>
            </ul>
          </motion.div>

          {/* Contacto / redes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold">
              Conectemos
            </h4>

            <div className="flex gap-4 mb-6">
              {[
                { Icon: Facebook, color: 'blue', delay: 0 },
                { Icon: Twitter, color: 'cyan', delay: 100 },
                { Icon: Linkedin, color: 'blue', delay: 200 }
              ].map(({ Icon, color, delay }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + (i * 0.1), duration: 0.4 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-${color}-500/30 hover:bg-gradient-to-br hover:from-${color}-500 hover:to-${color}-600 hover:border-${color}-400/50 flex items-center justify-center shadow-lg shadow-${color}-500/10 hover:shadow-${color}-500/40 transition-all duration-300 group hover:scale-110 hover:rotate-12`}
                >
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-white group-hover:rotate-[-12deg] transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <a
              href="mailto:info@creativit.com"
              className="group inline-flex items-center gap-2 text-white/60 hover:text-cyan-400 text-sm transition-colors duration-300"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative">
                info@creativit.com
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-white/50 text-sm"
          >
            © {new Date().getFullYear()} Creativit — Diseñado con ❤️ en Argentina
          </motion.p>

          <motion.a
            href="#inicio"
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-cyan-400 transition-all duration-300"
          >
            <span className="relative">
              Volver arriba
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.a>
        </div>

      </div>
    </footer>
  );
}