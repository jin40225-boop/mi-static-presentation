import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { MessageSquare, ThumbsUp, RotateCcw, ListChecks, Copy, Check } from 'lucide-react';

const oarsData = [
  {
    id: 'open',
    title: '開放式提問',
    eng: 'Open Questions',
    icon: MessageSquare,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    desc: '鼓勵案主多說、表達內在想法與感受，避免是非題。',
    examples: [
      '「你能告訴我更多關於...的事嗎？」',
      '「這件事對你來說意味著什麼？」',
      '「你希望從中得到什麼？」',
    ],
    simulator: {
      type: 'chat',
      content: [
        { role: 'sw', text: '「你最在意小芸未來的什麼部分？」' },
        { role: 'client', text: '「我從來沒想過...我只知道現在每天都好累。」' },
      ]
    }
  },
  {
    id: 'affirm',
    title: '肯定',
    eng: 'Affirmation',
    icon: ThumbsUp,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    desc: '辨識案主的優點、努力與價值觀，並真誠表達認可。',
    examples: [
      '「你願意來談這件事，本身就很不容易。」',
      '「你展現了很大的韌性與對家庭的愛。」',
      '「你對工作負責的態度很令人敬佩。」',
    ],
    simulator: {
      type: 'badge',
      items: ['勇氣', '堅持', '責任感', '愛心']
    }
  },
  {
    id: 'reflect',
    title: '反映式傾聽',
    eng: 'Reflection',
    icon: RotateCcw,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    desc: '將案主所說的內容重新整理後回應，讓對話更清晰。',
    examples: [
      '簡單反映：重複或稍微改寫案主的話。',
      '複雜反映：捕捉案主未明確表達的情感。',
      '雙面反映：呈現案主話語中的矛盾。',
    ],
    simulator: {
      type: 'mirror',
      text: '「一方面你想戒菸，另一方面香菸對你來說是紓壓的方式。」'
    }
  },
  {
    id: 'summary',
    title: '摘要',
    eng: 'Summary',
    icon: ListChecks,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    desc: '統整重要內容，確認理解一致，並引導下一步討論。',
    examples: [
      '「你提到對改變有點害怕，但也希望生活更穩定。」',
      '「我們談到你對改變很有動機，但信心只有 4 分。」',
      '「總結來說，你希望從這週末開始減少飲酒。」',
    ],
    simulator: {
      type: 'list',
      items: ['目前動機：8分', '主要障礙：害怕失敗', '初步計畫：週末減量']
    }
  }
];

export default function OARSModule() {
  const [activeId, setActiveId] = useState('open');
  const [copied, setCopied] = useState<string | null>(null);

  const activeData = oarsData.find(d => d.id === activeId)!;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="oars" className="py-24 px-6 bg-warm-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-warm-charcoal mb-4">OARS 核心溝通技巧</h2>
          <p className="text-warm-stone font-medium max-w-2xl mx-auto">
            這是有效溝通的四大核心策略，幫助建立關係並促進改變。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Navigation Cards */}
          <div className="lg:col-span-4 space-y-4">
            {oarsData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "w-full text-left p-6 rounded-3xl transition-all duration-500 border-2",
                  activeId === item.id 
                    ? "glass-panel border-clay-orange/20 shadow-xl" 
                    : "bg-sand/30 border-transparent hover:bg-sand/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform",
                    activeId === item.id ? `${item.bg} ${item.color} scale-110` : "bg-linen/20 text-linen"
                  )}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-bold transition-colors",
                      activeId === item.id ? "text-warm-charcoal" : "text-warm-stone"
                    )}>
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-linen">
                      {item.eng}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Interactive Detail & Simulator */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-[2.5rem] p-8 md:p-12 h-full flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={cn("w-2 h-8 rounded-full", activeData.color.replace('text', 'bg'))} />
                    <h3 className="text-3xl font-black text-warm-charcoal">{activeData.title}</h3>
                  </div>
                  
                  <p className="text-xl text-warm-stone font-medium leading-relaxed mb-10">
                    {activeData.desc}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Examples List */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-linen uppercase tracking-widest mb-4">常用句型</h4>
                      {activeData.examples.map((ex, i) => (
                        <div 
                          key={i} 
                          className="group relative p-4 rounded-2xl bg-sand/30 border border-linen/10 hover:border-clay-orange/30 transition-all cursor-pointer"
                          onClick={() => handleCopy(ex)}
                        >
                          <p className="text-sm font-medium text-warm-charcoal pr-8">{ex}</p>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-clay-orange">
                            {copied === ex ? <Check size={16} /> : <Copy size={16} />}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Visual Simulator */}
                    <div className="bg-warm-charcoal rounded-3xl p-8 flex flex-col shadow-2xl overflow-hidden relative">
                      {/* Mac Dots */}
                      <div className="flex gap-1.5 mb-6">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>

                      <div className="flex-1 flex flex-col justify-center">
                        {activeData.simulator.type === 'chat' && (
                          <div className="space-y-4">
                            {activeData.simulator.content?.map((msg, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: msg.role === 'sw' ? -10 : 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.3 }}
                                className={cn(
                                  "max-w-[85%] p-4 rounded-2xl text-sm font-mono",
                                  msg.role === 'sw' 
                                    ? "bg-clay-orange/20 text-clay-orange rounded-bl-none" 
                                    : "bg-white/5 text-white/70 ml-auto rounded-br-none"
                                )}
                              >
                                {msg.text}
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {activeData.simulator.type === 'badge' && (
                          <div className="flex flex-wrap gap-3 justify-center">
                            {activeData.simulator.items?.map((item, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: i * 0.1 }}
                                className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-black uppercase tracking-widest"
                              >
                                {item}
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {activeData.simulator.type === 'mirror' && (
                          <div className="text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto text-purple-500">
                              <RotateCcw size={32} />
                            </div>
                            <p className="text-lg font-medium text-white/80 italic leading-relaxed">
                              {activeData.simulator.text}
                            </p>
                          </div>
                        )}

                        {activeData.simulator.type === 'list' && (
                          <div className="space-y-4">
                            {activeData.simulator.items?.map((item, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-3 text-white/60"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span className="text-sm font-mono">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-4 right-6 text-[8px] font-black text-white/10 uppercase tracking-[0.3em]">
                        MI Simulator v1.0
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
