import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const traps = [
  {
    title: '一問一答陷阱 (Question-Answer Trap)',
    desc: '志工像在審問犯人，案主只能被動回答「是」或「不是」。',
    solution: '多使用開放式提問，並在提問之間加入反映。'
  },
  {
    title: '專家陷阱 (Expert Trap)',
    desc: '志工急於提供建議或解決方案，忽視了案主才是自己生活的專家。',
    solution: '保持好奇心，邀請案主共同探索可能性，而非直接給答案。'
  },
  {
    title: '過早聚焦陷阱 (Premature Focus Trap)',
    desc: '在還沒建立足夠關係前，就急著討論志工認為重要的議題。',
    solution: '先花時間建立聯結 (Engaging)，確認案主目前最在意的點。'
  },
  {
    title: '標籤陷阱 (Labeling Trap)',
    desc: '過度強調診斷名稱或負面標籤（如：酒精成癮者），引發案主防衛。',
    solution: '關注行為與影響，而非標籤。使用中性的語言描述現況。'
  },
  {
    title: '責難陷阱 (Blaming Trap)',
    desc: '案主擔心被責備，或志工無意中流露出評判的態度。',
    solution: '展現無條件接納，將行為與人格分開，創造安全的對話空間。'
  }
];

export default function QAAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="qa" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-warm-charcoal mb-4">常見對話陷阱</h2>
          <p className="text-warm-stone font-medium">識別這些常見的溝通障礙，讓會談更順暢。</p>
        </div>

        <div className="space-y-4">
          {traps.map((trap, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-3xl border transition-all duration-500",
                openIdx === idx ? "glass-panel border-clay-orange/20 shadow-xl" : "bg-sand/30 border-transparent hover:bg-sand/50"
              )}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    openIdx === idx ? "bg-clay-orange text-white" : "bg-linen/20 text-linen"
                  )}>
                    <AlertTriangle size={20} />
                  </div>
                  <span className={cn(
                    "text-lg font-bold transition-colors",
                    openIdx === idx ? "text-clay-orange" : "text-warm-charcoal"
                  )}>
                    {trap.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIdx === idx ? 180 : 0 }}
                  className="text-linen"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-10 space-y-6">
                      <div className="p-6 rounded-2xl bg-warm-cream/50 border border-linen/10">
                        <p className="text-warm-stone font-medium leading-relaxed">
                          {trap.desc}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1 h-auto bg-clay-orange rounded-full" />
                        <div>
                          <p className="text-xs font-black text-clay-orange uppercase tracking-widest mb-1">建議對策</p>
                          <p className="text-warm-charcoal font-bold">{trap.solution}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
