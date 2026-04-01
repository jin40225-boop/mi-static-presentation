import React from 'react';
import { BookOpen, CheckCircle2, ChevronRight, MessageSquare, Target, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Slide } from '../../curriculumData';

interface SidebarProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
}

const partIcons = [BookOpen, MessageSquare, Zap, Target, CheckCircle2];

export const Sidebar: React.FC<SidebarProps> = ({ slides, currentSlideIndex, onSlideSelect }) => {
  const parts = Array.from(new Set(slides.map((slide) => slide.part)));

  return (
    <aside className="w-80 h-screen sticky top-0 shrink-0 bg-sand/55 backdrop-blur-xl border-r border-warm-stone/10 p-6 overflow-hidden">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-clay-orange rounded-2xl flex items-center justify-center text-white shadow-lg shadow-clay-orange/20">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-warm-charcoal tracking-tight">MI 簡報大綱</h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-warm-stone">Presentation Outline</p>
          </div>
        </div>
        <p className="text-sm text-warm-stone leading-relaxed">
          左側保留章節導覽，右側專心呈現投影片內容。
        </p>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-10rem)] pr-2 custom-scrollbar space-y-8">
        {parts.map((part) => {
          const Icon = partIcons[part - 1] ?? BookOpen;
          const partSlides = slides.filter((slide) => slide.part === part);

          return (
            <section key={part} className="space-y-3">
              <div className="flex items-center gap-2 px-2 text-xs font-black uppercase tracking-[0.2em] text-warm-stone">
                <Icon size={14} />
                <span>Part {part}</span>
              </div>

              <div className="space-y-2">
                {partSlides.map((slide) => {
                  const index = slides.indexOf(slide);
                  const isActive = index === currentSlideIndex;
                  const isCompleted = index < currentSlideIndex;

                  return (
                    <button
                      key={slide.id}
                      onClick={() => onSlideSelect(index)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between gap-3 group',
                        isActive
                          ? 'bg-clay-orange text-white shadow-lg shadow-clay-orange/20'
                          : 'bg-white/55 text-warm-stone hover:bg-white hover:text-warm-charcoal border border-warm-stone/5',
                      )}
                    >
                      <span className="text-sm font-bold leading-snug">{slide.title}</span>
                      {isActive ? (
                        <ChevronRight size={16} className="shrink-0" />
                      ) : isCompleted ? (
                        <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-warm-stone/20 group-hover:bg-clay-orange/40 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
};
