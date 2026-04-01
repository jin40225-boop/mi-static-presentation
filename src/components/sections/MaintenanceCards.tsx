import { motion } from 'motion/react';
import { Heart, ShieldAlert, Scale, Waves, Zap } from 'lucide-react';

const principles = [
  {
    icon: Heart,
    title: '表達同理心',
    eng: 'Express Empathy',
    desc: '無條件接納建立信任，透過反映式傾聽讓案主感受到被理解。',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: ShieldAlert,
    title: '避免爭辯',
    eng: 'Avoid Argumentation',
    desc: '對抗只會激起抗拒，應反映案主觀點並引導對話轉向合作。',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Scale,
    title: '發展矛盾感',
    eng: 'Develop Discrepancy',
    desc: '幫助案主察覺目前行為與個人價值觀或目標之間的落差。',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
  },
  {
    icon: Waves,
    title: '捲動抗拒',
    eng: 'Roll with Resistance',
    desc: '將抗拒視為保護機制與合作機會，順勢理解背後的擔憂。',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
  },
  {
    icon: Zap,
    title: '支持自我效能',
    eng: 'Support Self-efficacy',
    desc: '增強案主對改變的信心，透過肯定努力與拆解目標來培養掌控感。',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  }
];

export default function MaintenanceCards() {
  return (
    <section id="principles" className="py-24 px-6 bg-sand/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-warm-charcoal mb-4">MI 五大原則 (DEARS)</h2>
          <p className="text-warm-stone font-medium">這是 MI 實務的核心指導方針，為助人者提供具體的行動指引。</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-[2rem] p-8 group cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <p.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-warm-charcoal mb-1">{p.title}</h3>
              <p className="text-xs font-black text-linen uppercase tracking-widest mb-4">{p.eng}</p>
              <p className="text-warm-stone font-medium leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
