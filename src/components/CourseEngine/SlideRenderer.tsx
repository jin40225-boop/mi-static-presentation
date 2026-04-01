import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Lightbulb,
  MessageSquare,
  Target,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Slide } from '../../curriculumData';
import { BranchingScenario } from './BranchingScenario';
import { LiveDashboard } from '../Mechanisms/LiveDashboard';
import { FlipCards } from '../Mechanisms/FlipCards';
import { DistanceEvaluation } from '../Mechanisms/DistanceEvaluation';

interface SlideRendererProps {
  slide: Slide;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  const [reflectionScore, setReflectionScore] = useState(5);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Unable to copy text:', error);
    }
  };

  const renderFallback = (message: string) => (
    <div className="flex items-center justify-center min-h-[420px]">
      <div className="text-center p-10 bg-sand/40 rounded-[2rem] border border-warm-stone/10">
        <p className="text-warm-stone font-bold">{message}</p>
      </div>
    </div>
  );

  const content = slide.content ?? {};

  const renderContent = () => {
    switch (slide.type) {
      case 'intro':
        return (
          <div className="text-center space-y-10 py-16 md:py-24">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-white/80 text-clay-orange rounded-full text-sm font-extrabold uppercase tracking-[0.25em] shadow-lg shadow-clay-orange/10"
            >
              <span className="w-2 h-2 rounded-full bg-clay-orange" />
              Motivational Interviewing
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="display-title text-5xl md:text-7xl lg:text-8xl font-black text-warm-charcoal leading-[0.95]"
            >
              {content.subtitle}
            </motion.h1>

            {content.description && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-warm-stone max-w-3xl mx-auto font-medium leading-relaxed"
              >
                {content.description}
              </motion.p>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-8 flex flex-col items-center gap-2"
            >
              <div className="text-xs font-black uppercase tracking-[0.3em] text-warm-stone">Speaker</div>
              <div className="text-2xl font-black text-warm-charcoal">{content.instructor}</div>
              <div className="text-sm text-warm-stone">{content.organization}</div>
            </motion.div>
          </div>
        );

      case 'reflection':
        return (
          <div className="max-w-3xl mx-auto space-y-12 py-10">
            <div className="text-center space-y-4">
              <h2 className="display-title text-4xl md:text-5xl font-black text-warm-charcoal leading-tight">
                {content.question}
              </h2>
              {content.hint && <p className="text-warm-stone font-medium italic">{content.hint}</p>}
            </div>

            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] space-y-10">
              <div className="relative h-4 bg-sand rounded-full overflow-hidden border border-warm-stone/10">
                <div
                  className="absolute inset-y-0 left-0 bg-clay-orange transition-all duration-500"
                  style={{ width: `${reflectionScore * 10}%` }}
                />
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={reflectionScore}
                  onChange={(e) => setReflectionScore(parseInt(e.target.value, 10))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
              </div>

              <div className="flex justify-between text-3xl md:text-4xl font-black text-warm-stone/30">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <span
                    key={value}
                    className={cn(value === reflectionScore && 'text-clay-orange scale-125 transition-transform')}
                  >
                    {value}
                  </span>
                ))}
              </div>

              <div className="text-center p-6 md:p-8 bg-clay-orange/5 rounded-3xl border border-clay-orange/10">
                <p className="text-lg md:text-xl font-bold text-clay-orange leading-relaxed">
                  {reflectionScore <= 3
                    ? '這是一個很真實的起點，先從看見自己現在的位置開始就很好。'
                    : reflectionScore <= 7
                      ? '你已經不是完全沒動力了，接下來可以更聚焦支持你前進的力量。'
                      : '你其實離行動不遠了，現在最重要的是把想法整理成一個可行的小步驟。'}
                </p>
              </div>
            </div>

            <div className="text-center">
              {content.cta && <p className="text-xl md:text-2xl font-bold text-warm-charcoal mb-8">{content.cta}</p>}
              <button
                onClick={onNext}
                className="px-10 py-5 bg-clay-orange text-white rounded-full font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-clay-orange/20"
              >
                下一頁
              </button>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="max-w-5xl mx-auto space-y-10 py-8">
            {content.paragraphs && (
              <div className="space-y-6 mb-10">
                {content.paragraphs.map((paragraph: string, index: number) => (
                  <motion.p
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="text-xl md:text-2xl text-warm-charcoal font-medium leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            )}

            <div
              className={cn(
                'grid gap-8',
                content.items?.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-2',
              )}
            >
              {content.core && (
                <div className="glass-panel p-8 rounded-[2rem] space-y-6">
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <Lightbulb className="text-clay-orange" /> 核心重點
                  </h3>
                  <ul className="space-y-4">
                    {content.core.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-3 font-medium text-lg">
                        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.scope && (
                <div className="glass-panel p-8 rounded-[2rem] space-y-6">
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <Target className="text-clay-orange" /> 應用範圍
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {content.scope.map((item: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-sand rounded-xl font-bold text-warm-stone">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {content.items?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="glass-panel p-8 md:p-9 rounded-[2rem] space-y-4 hover:border-clay-orange/30 transition-colors group"
                >
                  {item.icon && (
                    <div className="w-14 h-14 bg-clay-orange/10 text-clay-orange rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon size={26} />
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-warm-charcoal">{item.title}</h3>
                  <div className="text-warm-stone leading-relaxed whitespace-pre-line text-lg">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'stepper':
        if (!content.items) {
          return renderFallback('此頁內容尚未完成。');
        }

        return (
          <div className="max-w-3xl mx-auto space-y-6 py-10">
            {content.items.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-clay-orange text-white flex items-center justify-center font-black z-10 shadow-lg shadow-clay-orange/20">
                    {index + 1}
                  </div>
                  {index < content.items.length - 1 && <div className="w-1 flex-1 bg-sand my-2 rounded-full" />}
                </div>
                <div className="flex-1 pb-10">
                  <div className="glass-panel p-7 rounded-[2rem] group-hover:translate-x-2 transition-transform">
                    <h3 className="text-xl md:text-2xl font-black mb-3">{item.title}</h3>
                    <p className="text-warm-stone leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'simulator':
        if (content.type === 'oars') {
          return (
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
              {content.items.map((item: any) => (
                <div key={item.id} className="glass-panel p-8 rounded-[2.5rem] space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-clay-orange/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                  <div className="text-5xl font-black text-clay-orange/20">{item.id}</div>
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className="text-warm-stone text-lg leading-relaxed">{item.desc}</p>
                  <div className="pt-4">
                    <div className="p-4 bg-sand rounded-2xl text-sm italic text-warm-stone flex justify-between items-center gap-4">
                      <span>可複製一句示範語句，作為演講帶領時的提示。</span>
                      <button
                        onClick={() => copyToClipboard(item.desc, item.id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors shrink-0"
                        title="複製內容"
                      >
                        {copiedId === item.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (content.type === 'scaling') {
          return (
            <div className="max-w-3xl mx-auto py-10">
              <div className="glass-panel p-10 md:p-12 rounded-[3rem] space-y-12 text-center">
                <h3 className="display-title text-3xl md:text-4xl font-black leading-tight">{content.question}</h3>
                <div className="relative py-10">
                  <div className="h-4 bg-sand rounded-full border border-warm-stone/10" />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    onChange={(e) => setReflectionScore(parseInt(e.target.value, 10))}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-clay-orange rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-white font-black text-xl z-10"
                    style={{ left: `calc(${reflectionScore * 10}% - 24px)` }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {reflectionScore}
                  </motion.div>
                  <div className="flex justify-between mt-6 text-xs font-black text-warm-stone uppercase tracking-widest">
                    <span>{content.minLabel}</span>
                    <span>{content.maxLabel}</span>
                  </div>
                </div>

                <div className="p-8 bg-warm-charcoal text-white rounded-3xl text-left space-y-4">
                  <div className="flex items-center gap-2 text-clay-orange font-black uppercase tracking-widest text-xs">
                    <MessageSquare size={14} /> MI 提示
                  </div>
                  <p className="text-xl font-medium italic leading-relaxed">
                    你現在給自己的分數是 {reflectionScore}。如果要往前再走一步，下一個可行的小動作會是什麼？
                  </p>
                  <p className="text-sm text-white/60">
                    這張投影片適合示範量尺問句如何幫助對方說出理由、信心與下一步。
                  </p>
                </div>
              </div>
            </div>
          );
        }

        return null;

      case 'summary':
        return (
          <div className="max-w-4xl mx-auto py-14 text-center space-y-12">
            <div className="w-24 h-24 bg-clay-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-clay-orange" />
            </div>
            <h2 className="display-title text-4xl md:text-6xl font-black text-warm-charcoal leading-tight">
              {slide.title}
            </h2>
            {content.points && (
              <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] space-y-6 text-left">
                {content.points.map((point: string, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-clay-orange text-white flex items-center justify-center font-black shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-xl md:text-2xl text-warm-charcoal font-medium leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            )}
            {content.conclusion && (
              <p className="text-lg md:text-xl text-warm-stone italic font-medium max-w-3xl mx-auto leading-relaxed">
                {content.conclusion}
              </p>
            )}
          </div>
        );

      case 'branching':
        if (!content.nodes) {
          return renderFallback('情境互動內容尚未完成。');
        }

        return (
          <div className="py-10">
            <BranchingScenario nodes={content.nodes} initialNodeId={content.initialNodeId} />
          </div>
        );

      case 'mechanism':
        if (content.mechanismId === 'page-live-dashboard-radio') {
          return (
            <div className="max-w-5xl mx-auto py-10">
              <LiveDashboard slideId={slide.id} title={content.title} options={content.options} />
            </div>
          );
        }

        if (content.mechanismId === 'page-distance-evaluation') {
          return (
            <div className="max-w-5xl mx-auto py-10">
              <DistanceEvaluation
                slideId={slide.id}
                title={content.title}
                question1={content.question1}
                question2={content.question2}
              />
            </div>
          );
        }

        if (content.mechanismId === 'comp-flip-cards') {
          return (
            <div className="max-w-5xl mx-auto py-10">
              <FlipCards cards={content.cards} title={content.title} description={content.description} />
            </div>
          );
        }

        return renderFallback('互動模組尚未定義。');

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-10 right-10 flex gap-4 z-50">
        {!isFirst && (
          <button
            onClick={onPrev}
            className="p-4 glass-panel rounded-2xl hover:bg-warm-charcoal hover:text-white transition-all group"
            title="上一頁"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        )}

        <button
          onClick={onNext}
          disabled={isLast}
          className={cn(
            'px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 transition-all shadow-xl',
            isLast
              ? 'bg-warm-stone/20 text-warm-stone cursor-not-allowed'
              : 'bg-clay-orange text-white hover:scale-105 shadow-clay-orange/20',
          )}
        >
          {isLast ? '已到最後一頁' : '下一頁'}
          {!isLast && <ArrowRight size={24} />}
        </button>
      </div>
    </div>
  );
};
