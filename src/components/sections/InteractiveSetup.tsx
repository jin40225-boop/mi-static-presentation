import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { CheckCircle2, ChevronRight, ChevronLeft, Terminal, Layout, MessageSquare, ClipboardList, Info } from 'lucide-react';

const phases = [
  {
    id: 'engaging',
    title: '融入階段 (Engaging)',
    ttm: '懵懂期：尚未意識到問題',
    description: '建立互相信任和尊重的工作關係。避免掉入「專家陷阱」或「一問一答陷阱」。',
    tasks: [
      '使用「我們」的語言建立夥伴關係',
      '展現同理心與無條件接納',
      '避免過早給予建議',
    ],
    simulator: {
      type: 'chat',
      content: [
        { role: 'sw', text: '「聽起來目前的服務方式不太符合你的需要，我們一起想看看有什麼可以調整的地方。」' },
        { role: 'client', text: '「對啊，我真的覺得壓力很大，沒人懂我...」' },
      ]
    }
  },
  {
    id: 'focusing',
    title: '聚焦階段 (Focusing)',
    ttm: '沉思期：探索矛盾、發展動機',
    description: '與個案合作找出會談方向。運用量尺問句開啟更深入的會談。',
    tasks: [
      '以個案為中心設定會談議題',
      '運用重要性量尺評估動機',
      '協助個案釐清優先順序',
    ],
    simulator: {
      type: 'dashboard',
      items: [
        { label: '照顧壓力', value: 9, color: 'bg-rose-400' },
        { label: '自我照顧', value: 2, color: 'bg-amber-400' },
        { label: '未來焦慮', value: 8, color: 'bg-indigo-400' },
      ]
    }
  },
  {
    id: 'evoking',
    title: '誘發階段 (Evoking)',
    ttm: '準備期：支持決定、制定計畫',
    description: '增加「改變的對話」比例。鬆動抗拒並處理矛盾。',
    tasks: [
      '辨識準備改變的徵兆',
      '引發 DARN-CAT 改變語',
      '強化案主內在的改變力量',
    ],
    simulator: {
      type: 'terminal',
      lines: [
        '> 系統分析：偵測到改變語...',
        '> 需求 (Desire): 「我希望每天能睡四小時」',
        '> 能力 (Ability): 「我以前曾試過找鄰居幫忙」',
        '> 承諾 (Commitment): 「我打算這週去問問看」',
      ]
    }
  },
  {
    id: 'planning',
    title: '發展計畫 (Planning)',
    ttm: '行動期：支持執行、處理挫折',
    description: '協助發展具體行動方案。再次確認承諾。',
    tasks: [
      '設定具體且可執行的目標',
      '擬定改變行動方案',
      '預防復發並建立支持系統',
    ],
    simulator: {
      type: 'checklist',
      items: [
        { text: '預約喘息服務 (已完成)', checked: true },
        { text: '每天下午休息 30 分鐘', checked: false },
        { text: '加入照顧者支持群組', checked: false },
      ]
    }
  }
];

export default function InteractiveSetup() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const activePhase = phases[activeIdx];

  const toggleTask = (task: string) => {
    setCompletedTasks(prev => ({ ...prev, [task]: !prev[task] }));
  };

  return (
    <section id="setup" className="py-24 px-6 bg-sand/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-warm-charcoal mb-4">MI 助人歷程與 TTM 階段</h2>
          <p className="text-warm-stone font-medium max-w-2xl mx-auto">
            「改變是一個循環而非線性的過程。」根據案主所處的階段，採取不同的介入策略。
          </p>
        </div>

        <div className="glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl border-linen/20">
          {/* Phase Tabs */}
          <div className="flex border-b border-linen/20 overflow-x-auto no-scrollbar bg-warm-cream/50">
            {phases.map((phase, idx) => (
              <button
                key={phase.id}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "flex-1 px-8 py-6 text-sm font-black transition-all whitespace-nowrap relative",
                  activeIdx === idx ? "text-clay-orange" : "text-warm-stone hover:text-warm-charcoal"
                )}
              >
                階段 {idx + 1}
                {activeIdx === idx && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-clay-orange"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-8 lg:p-16 border-r border-linen/20 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-clay-orange/10 text-clay-orange text-[10px] font-black uppercase tracking-widest mb-4">
                    <Info size={12} /> {activePhase.ttm}
                  </div>
                  
                  <h3 className="text-4xl font-black text-warm-charcoal mb-4 leading-tight">
                    {activePhase.title}
                  </h3>
                  
                  <p className="text-xl text-warm-stone font-medium leading-relaxed mb-10">
                    {activePhase.description}
                  </p>

                  <div className="space-y-4 mb-12">
                    {activePhase.tasks.map((task) => (
                      <button
                        key={task}
                        onClick={() => toggleTask(task)}
                        className="flex items-center gap-4 w-full text-left group p-4 rounded-2xl hover:bg-clay-orange/5 transition-all border border-transparent hover:border-clay-orange/10"
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all",
                          completedTasks[task] ? "bg-clay-orange border-clay-orange" : "border-linen group-hover:border-clay-orange"
                        )}>
                          {completedTasks[task] && <CheckCircle2 size={18} className="text-white" />}
                        </div>
                        <span className={cn(
                          "text-lg font-bold transition-all",
                          completedTasks[task] ? "text-linen line-through" : "text-warm-charcoal"
                        )}>
                          {task}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      disabled={activeIdx === 0}
                      onClick={() => setActiveIdx(prev => prev - 1)}
                      className="w-14 h-14 rounded-2xl bg-sand text-warm-stone disabled:opacity-30 hover:bg-linen/20 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      disabled={activeIdx === phases.length - 1}
                      onClick={() => setActiveIdx(prev => prev + 1)}
                      className="flex-1 h-14 rounded-2xl bg-clay-orange text-white font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-clay-orange/30 active:scale-[0.98] transition-all"
                    >
                      進入下一階段 <ChevronRight size={24} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Simulator */}
            <div className="p-8 lg:p-16 bg-warm-charcoal flex items-center justify-center min-h-[500px] relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-clay-orange/20 blur-[100px] rounded-full" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: 10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-md z-10"
                >
                  <div className="bg-[#121212] rounded-[2rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Window Header */}
                    <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
                        {activePhase.simulator.type === 'chat' && <MessageSquare size={12} />}
                        {activePhase.simulator.type === 'dashboard' && <Layout size={12} />}
                        {activePhase.simulator.type === 'terminal' && <Terminal size={12} />}
                        {activePhase.simulator.type === 'checklist' && <ClipboardList size={12} />}
                        MI_SIMULATOR_OS
                      </div>
                    </div>

                    {/* Window Content */}
                    <div className="p-8 font-mono text-sm">
                      {activePhase.simulator.type === 'chat' && (
                        <div className="space-y-6">
                          {activePhase.simulator.content?.map((msg, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.4 }}
                              className={cn(
                                "max-w-[85%] p-4 rounded-2xl leading-relaxed",
                                msg.role === 'sw' 
                                  ? "bg-clay-orange/10 text-clay-orange border border-clay-orange/20 rounded-bl-none" 
                                  : "bg-white/5 text-white/60 ml-auto text-right rounded-br-none"
                              )}
                            >
                              {msg.text}
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {activePhase.simulator.type === 'dashboard' && (
                        <div className="space-y-8">
                          {activePhase.simulator.items?.map((item, i) => (
                            <div key={i} className="space-y-3">
                              <div className="flex justify-between text-white/40 text-[10px] font-black uppercase tracking-widest">
                                <span>{item.label}</span>
                                <span>{item.value}/10</span>
                              </div>
                              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.value * 10}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={cn("h-full rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]", item.color)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activePhase.simulator.type === 'terminal' && (
                        <div className="space-y-3 text-green-500/90 leading-relaxed">
                          {activePhase.simulator.lines?.map((line, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.2 }}
                              className="flex gap-3"
                            >
                              <span className="opacity-30">[{i}]</span>
                              <span>{line}</span>
                            </motion.div>
                          ))}
                          <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-2.5 h-5 bg-green-500/90 align-middle ml-1"
                          />
                        </div>
                      )}

                      {activePhase.simulator.type === 'checklist' && (
                        <div className="space-y-5">
                          {activePhase.simulator.items?.map((item, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.2 }}
                              className="flex items-center gap-4 text-white/70 bg-white/5 p-4 rounded-2xl border border-white/5"
                            >
                              <div className={cn(
                                "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
                                item.checked ? "bg-clay-orange border-clay-orange" : "border-white/20"
                              )}>
                                {item.checked && <CheckCircle2 size={12} className="text-white" />}
                              </div>
                              <span className={cn("font-bold", item.checked ? "line-through opacity-30" : "")}>{item.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
