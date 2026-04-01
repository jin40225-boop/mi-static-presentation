import { motion, Variants } from 'motion/react';
import { ChevronDown, Sparkles, Quote } from 'lucide-react';

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl text-center z-10"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-clay-orange/10 text-clay-orange text-sm font-semibold mb-8">
          <Sparkles size={16} />
          <span>志工培訓系列課程</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black tracking-tight text-warm-charcoal mb-8 leading-[1.05]">
          激勵改變，<br />
          <span className="text-gradient">與抗拒共舞</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="relative max-w-3xl mx-auto mb-12">
          <Quote className="absolute -top-6 -left-8 text-linen/30 w-16 h-16 -z-10" />
          <p className="text-xl md:text-3xl text-warm-stone font-medium leading-relaxed italic">
            「動機式晤談不是說服技巧，而是協助個案探索自身改變動機的方法。」
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 rounded-2xl bg-clay-orange text-white font-bold text-xl shadow-xl shadow-clay-orange/20 hover:scale-105 active:scale-95 transition-all"
          >
            進入互動教學
          </button>
          <div className="text-left border-l-2 border-linen/30 pl-6 py-1">
            <p className="text-xs font-black text-linen uppercase tracking-widest mb-1">課程講師</p>
            <p className="text-lg font-bold text-warm-charcoal">林彥宇 督導</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Text Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-warm-charcoal/[0.02] select-none pointer-events-none whitespace-nowrap">
        MOTIVATIONAL
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-linen flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">向下捲動</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
