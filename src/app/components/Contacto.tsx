'use client';

import { Send, CheckCircle2 } from "lucide-react";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

export default function Contacto() {
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setShowConfetti(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setShowConfetti(false);
        setValues({ name: '', email: '', message: '' });
      }, 4000);
    }, 1500);
  };

  return (
    <section
      id="contacto"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden"
    >
      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

      {/* Background effects */}
      <AnimatedBackground colors={["blue", "cyan"]} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left side - Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="inline-flex px-4 py-2 mb-6 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-lg shadow-cyan-500/10">
              CONTACTO
            </span>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hagamos algo que
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                valga la pena
              </span>
            </h2>

            <p className="text-lg text-white/60 leading-relaxed">
              Si tenés una idea, este es el primer paso para convertirla en algo real.
            </p>
          </motion.div>

          {/* Right side - Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/50 rounded-3xl p-10 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500"
          >

            {/* Success overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/95 to-blue-600/95 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-white mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                  <p className="text-white/80">Te responderemos pronto</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <InputField
                name="name"
                label="¿Cómo te llamás?"
                placeholder="Nombre"
                value={values.name}
                onChange={v => setValues({ ...values, name: v })}
                focused={focused === 'name'}
                setFocused={setFocused}
              />
              <InputField
                name="email"
                type="email"
                label="Tu email"
                placeholder="Email"
                value={values.email}
                onChange={v => setValues({ ...values, email: v })}
                focused={focused === 'email'}
                setFocused={setFocused}
              />
              <InputField
                name="message"
                label="Contanos qué querés crear"
                placeholder="Mensaje"
                value={values.message}
                onChange={v => setValues({ ...values, message: v })}
                focused={focused === 'message'}
                setFocused={setFocused}
                isTextArea
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  focused: boolean;
  setFocused: (name: string | null) => void;
  type?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

function InputField({ name, label, value, onChange, focused, setFocused, type = "text", placeholder, isTextArea = false }: InputFieldProps) {
  const Component = isTextArea ? 'textarea' : 'input';

  return (
    <div className="relative">
      <Component
        type={!isTextArea ? type : undefined}
        rows={isTextArea ? 4 : undefined}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        className={`w-full bg-transparent border-b px-2 py-4 text-lg text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none ${focused ? 'border-cyan-400/60 shadow-lg shadow-cyan-400/20 translate-y-[-2px]' : 'border-cyan-500/20'
          }`}
        placeholder={placeholder}
        required
        aria-label={label}
      />
      <label
        className={`absolute left-2 transition-all duration-300 pointer-events-none ${focused || value ? 'text-xs text-cyan-400 -top-4' : 'text-lg text-white/40 top-4'
          }`}
      >
        {label}
      </label>
    </div>
  );
}

function Confetti() {
  const particles = Array.from({ length: 50 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50 flex justify-center items-center">
      {particles.map((_, i) => (
        <ConfettiParticle key={i} />
      ))}
    </div>
  );
}

function ConfettiParticle() {
  const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 800 - 400; // Spread logic
  const randomY = Math.random() * 800 - 400;

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: randomX,
        y: randomY,
        rotate: Math.random() * 360,
        opacity: 0,
        scale: 0
      }}
      transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
      className="absolute w-3 h-3 rounded-full"
      style={{ backgroundColor: randomColor }}
    />
  );
}