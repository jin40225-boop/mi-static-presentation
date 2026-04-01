import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { MessageCircle, Lightbulb, ArrowRight, User, Phone } from 'lucide-react';

const caseSteps = [
  {
    id: 'intro',
    title: '案例背景：小芸媽',
    desc: '45 歲，全職主要照顧者，育有一名 13 歲自閉症合併精神障礙兒。情緒反覆、睡眠混亂，習慣「一肩扛起」，雖打電話求助，但反覆抱怨後拒絕所有建議。',
    context: '小芸媽再次來電，語氣疲憊且充滿挫折感。',
    quote: '「我真的快撐不下去了，每天都像在打仗，沒人能幫我...」',
    options: [
      { text: '「你可以試試看申請喘息服務啊。」', type: 'trap', feedback: '這是「專家陷阱」，過早提供建議會引發防衛。' },
      { text: '「聽起來你感到精疲力竭，覺得自己孤立無援。」', type: 'mi', feedback: '這是「反映式傾聽」，能建立聯結並讓案主感到被理解。' },
    ]
  },
  {
    id: 'scaling',
    title: '運用量尺工具',
    desc: '在建立初步聯結後，我們試著評估她的改變動機。',
    context: '志工詢問：「在這麼辛苦的情況下，照顧好自己對你來說有多重要？（0-10分）」',
    quote: '「大概... 6 分吧。我知道很重要，但我真的沒時間。」',
    options: [
      { text: '「為什麼只有 6 分？不是 10 分？」', type: 'trap', feedback: '這會讓案主開始辯解為什麼「不重要」，強化了維持現狀的理由。' },
      { text: '「是什麼讓你至少有 6 分，而不是更低的分數呢？」', type: 'mi', feedback: '這能引導案主說出「為什麼重要」，激發內在動機。' },
    ]
  },
  {
    id: 'darn',
    title: '辨識改變對話 (DARN)',
    desc: '小芸媽開始流露出一些想改變的跡象。',
    context: '小芸媽說：「我希望至少每天能安靜睡個四小時，不然我怕我會對孩子失控。」',
    quote: '「我真的很想改變現在這種混亂的狀態。」',
    options: [
      { text: '「那你就應該照我說的去做。」', type: 'trap', feedback: '這是「命令式對話」，會破壞夥伴關係。' },
      { text: '「你很在意孩子的安全，也渴望找回生活的掌控感。」', type: 'mi', feedback: '這是「價值觀反映」，強化了她的改變需求 (Need)。' },
    ]
  }
];

export default function CaseStudyModule() {
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentStep = caseSteps[stepIdx];

  const handleNext = () => {
    setStepIdx(prev => prev + 1);
    setSelectedOption(null);
  };

  return (
    <section id="case-study" className="py-24 px-6 bg-sand/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-warm-charcoal mb-4">實務案例演練</h2>
          <p className="text-warm-stone font-medium">透過真實案例，練習如何在對話中做出正確的抉擇。</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Narrative */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-clay-orange/10 text-clay-orange text-xs font-black uppercase tracking-widest">
              Step {stepIdx + 1} of {caseSteps.length}
            </div>
            
            <h3 className="text-3xl font-black text-warm-charcoal leading-tight">
              {currentStep.title}
            </h3>
            
            <p className="text-lg text-warm-stone font-medium leading-relaxed">
              {currentStep.desc}
            </p>

            <div className="p-6 rounded-3xl bg-white/50 border border-linen/20 shadow-sm italic text-warm-charcoal">
              <div className="flex items-center gap-2 text-[10px] font-black text-linen uppercase tracking-widest mb-3 not-italic">
                <MessageCircle size={12} /> 情境描述
              </div>
              {currentStep.context}
            </div>

            {stepIdx < caseSteps.length - 1 && selectedOption !== null && caseSteps[stepIdx].options[selectedOption].type === 'mi' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleNext}
                className="flex items-center gap-2 text-clay-orange font-bold group"
              >
                進入下一個情境 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </div>

          {/* Right: Interactive Phone Simulator */}
          <div className="relative mx-auto w-full max-w-[320px]">
            {/* Phone Frame */}
            <div className="relative aspect-[9/19] bg-warm-charcoal rounded-[3rem] p-3 shadow-2xl border-[6px] border-[#333]">
              {/* Screen */}
              <div className="h-full w-full bg-warm-cream rounded-[2.2rem] overflow-hidden flex flex-col relative">
                {/* Status Bar */}
                <div className="h-8 flex justify-between items-center px-6 pt-2">
                  <span className="text-[10px] font-bold">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full border border-black/20" />
                    <div className="w-3 h-3 rounded-full bg-black/20" />
                  </div>
                </div>

                {/* App Header */}
                <div className="p-4 border-b border-linen/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">小芸媽</p>
                    <p className="text-[8px] text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> 通話中...
                    </p>
                  </div>
                  <div className="ml-auto w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white">
                    <Phone size={14} />
                  </div>
                </div>

                {/* Chat Content */}
                <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">
                  <div className="max-w-[85%] p-3 rounded-2xl bg-white shadow-sm text-xs font-medium text-warm-charcoal leading-relaxed">
                    {currentStep.quote}
                  </div>

                  {selectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "max-w-[85%] p-3 rounded-2xl ml-auto text-xs font-medium text-white shadow-md",
                        currentStep.options[selectedOption].type === 'mi' ? "bg-clay-orange" : "bg-warm-stone"
                      )}
                    >
                      {currentStep.options[selectedOption].text}
                    </motion.div>
                  )}
                </div>

                {/* Interaction Footer */}
                <div className="p-4 bg-sand/30 border-t border-linen/10">
                  <p className="text-[10px] font-black text-linen uppercase tracking-widest mb-3 text-center">
                    請選擇志工的回應
                  </p>
                  <div className="space-y-2">
                    {currentStep.options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={selectedOption !== null}
                        onClick={() => setSelectedOption(i)}
                        className={cn(
                          "w-full p-3 rounded-xl text-[10px] font-bold text-left transition-all border",
                          selectedOption === i 
                            ? (opt.type === 'mi' ? "bg-clay-orange/10 border-clay-orange text-clay-orange" : "bg-warm-stone/10 border-warm-stone text-warm-stone")
                            : "bg-white border-linen/20 hover:border-clay-orange/50"
                        )}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Overlay */}
                <AnimatePresence>
                  {selectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-0 left-0 right-0 p-6 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-t-[2rem] z-20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className={currentStep.options[selectedOption].type === 'mi' ? "text-emerald-500" : "text-amber-500"} />
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          currentStep.options[selectedOption].type === 'mi' ? "text-emerald-500" : "text-amber-500"
                        )}>
                          {currentStep.options[selectedOption].type === 'mi' ? '正確示範' : '對話陷阱'}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-warm-charcoal leading-relaxed">
                        {currentStep.options[selectedOption].feedback}
                      </p>
                      <button 
                        onClick={() => setSelectedOption(null)}
                        className="mt-4 w-full py-2 rounded-lg bg-sand text-[10px] font-bold text-warm-stone"
                      >
                        重新嘗試
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Decorative Shadow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-warm-charcoal/10 blur-2xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
