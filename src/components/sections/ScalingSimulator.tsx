import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { MessageCircle, Lightbulb, Info } from 'lucide-react';

const scalingData = {
  importance: {
    title: '重要性量尺 (Importance)',
    question: '改變行為對你來說有多重要？',
    responses: [
      { min: 0, max: 2, sw: '「1分也代表它對你來說不是完全不重要。是什麼讓你至少有1分，而不是0分呢？」', tip: '探索案主僅存的一點點動機。' },
      { min: 3, max: 5, sw: '「你給了5分，代表這對你來說有一定的重要性。能分享一下為什麼給這個分數嗎？」', tip: '引導案主說出想改變的理由。' },
      { min: 6, max: 8, sw: '「8分已經很高了！這背後代表什麼價值觀對你來說很重要？」', tip: '連結案主的核心價值觀。' },
      { min: 9, max: 10, sw: '「10分非常重要！你已經準備好要面對什麼改變了嗎？」', tip: '準備進入行動計畫。' },
    ]
  },
  confidence: {
    title: '信心量尺 (Confidence)',
    question: '你有多大的信心能做到這個改變？',
    responses: [
      { min: 0, max: 2, sw: '「1分代表你不是完全沒信心。是什麼讓你覺得還能嘗試看看？」', tip: '尋找微小的自我效能感。' },
      { min: 3, max: 5, sw: '「你給了中等的分數，有什麼讓你有些信心，又有什麼讓你猶豫呢？」', tip: '處理矛盾感與障礙。' },
      { min: 6, max: 8, sw: '「有7分代表你其實有不錯的底氣。過去有哪些成功經驗能幫助你？」', tip: '回顧成功經驗。' },
      { min: 9, max: 10, sw: '「這麼有信心太棒了！想好第一步要怎麼開始了嗎？」', tip: '強化行動意圖。' },
    ]
  }
};

export default function ScalingSimulator() {
  const [activeTab, setActiveTab] = useState<'importance' | 'confidence'>('importance');
  const [value, setValue] = useState(5);

  const currentData = scalingData[activeTab];
  const currentResponse = currentData.responses.find(r => value >= r.min && value <= r.max);

  return (
    <section id="workflow" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-warm-charcoal mb-4">量尺式問句模擬器</h2>
          <p className="text-warm-stone font-medium">分數只是起點，重點是背後的故事。試著滑動量尺，看看志工如何回應。</p>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-8 md:p-12">
          {/* Tabs */}
          <div className="flex bg-sand/50 p-1.5 rounded-2xl mb-12">
            {(['importance', 'confidence'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setValue(5); }}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab ? "bg-white text-clay-orange shadow-sm" : "text-warm-stone hover:text-warm-charcoal"
                )}
              >
                {scalingData[tab].title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {/* Slider Area */}
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="text-xl font-bold text-warm-charcoal">{currentData.question}</h3>
                <span className="text-5xl font-black text-clay-orange">{value}</span>
              </div>

              <div className="relative h-12 flex items-center">
                <div className="absolute inset-0 h-3 my-auto bg-sand rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-linear-to-r from-clay-orange to-golden-sand"
                    animate={{ width: `${value * 10}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={value}
                  onChange={(e) => setValue(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {/* Scale Ticks */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-1">
                  {[...Array(11)].map((_, i) => (
                    <span key={i} className="text-[10px] font-bold text-linen">{i}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interaction Result */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${value}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-5 gap-6 pt-8 border-t border-linen/20"
              >
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-clay-orange uppercase tracking-widest">
                    <MessageCircle size={14} />
                    志工回應
                  </div>
                  <p className="text-xl font-medium text-warm-charcoal leading-relaxed">
                    {currentResponse?.sw}
                  </p>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="p-6 rounded-3xl bg-golden-sand/10 border border-golden-sand/20">
                    <div className="flex items-center gap-2 text-xs font-black text-golden-sand uppercase tracking-widest mb-3">
                      <Lightbulb size={14} />
                      技巧提示
                    </div>
                    <p className="text-sm text-warm-stone font-medium leading-relaxed">
                      {currentResponse?.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4 p-6 rounded-3xl bg-warm-charcoal text-white/80">
          <div className="w-10 h-10 rounded-full bg-clay-orange flex items-center justify-center flex-shrink-0">
            <Info size={20} className="text-white" />
          </div>
          <p className="text-sm font-medium leading-relaxed">
            <span className="text-white font-bold">核心觀念：</span>
            量尺分數不重要，重要的是「為什麼不是更低的分數」。這能引導案主說出自己的優點與動機。
          </p>
        </div>
      </div>
    </section>
  );
}
