import React from 'react';
import { BookOpen, CheckCircle2, ChevronRight, MessageSquare, Target, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Slide } from '../../curriculumData';

interface SidebarProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
}

const partIcons = [BookOpen, MessageSquare, Zap, Target, CheckCircle2];

export const Sidebar: React.FC<SidebarProps> = ({
  slides,
  currentSlideIndex,
  onSlideSelect,
  onNavigate,
  variant = 'desktop',
}) => {
  const parts = Array.from(new Set(slides.map((slide) => slide.part)));
  const isMobile = variant === 'mobile';

  return (
    <aside
      className={cn(
        'shrink-0 border-r border-warm-stone/10 overflow-hidden',
        isMobile
          ? 'h-full w-full bg-warm-cream/95 px-5 py-5 backdrop-blur-2xl'
          : 'sticky top-0 h-screen w-80 bg-sand/55 p-6 backdrop-blur-xl',
      )}
    >
      <div className={cn('mb-8', isMobile && 'mb-6')}>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-clay-orange text-white shadow-lg shadow-clay-orange/20">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className={cn('font-black tracking-tight text-warm-charcoal', isMobile ? 'text-lg' : 'text-xl')}>
              MI 簡報大綱
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-warm-stone">Presentation Outline</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-warm-stone">
          左側保留章節導覽，右側專心呈現投影片內容。
        </p>
      </div>

      <div
        className={cn(
          'custom-scrollbar space-y-8 overflow-y-auto pr-2',
          isMobile ? 'h-[calc(100dvh-8rem)] pb-6' : 'h-[calc(100vh-10rem)]',
        )}
      >
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
                      onClick={() => {
                        onSlideSelect(index);
                        onNavigate?.();
                      }}
                      data-testid={`slide-nav-${slide.id}`}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        'group flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300',
                        isActive
                          ? 'bg-clay-orange text-white shadow-lg shadow-clay-orange/20'
                          : 'border border-warm-stone/5 bg-white/55 text-warm-stone hover:bg-white hover:text-warm-charcoal',
                      )}
                    >
                      <span className="text-sm font-bold leading-snug">{slide.title}</span>
                      {isActive ? (
                        <ChevronRight size={16} className="shrink-0" />
                      ) : isCompleted ? (
                        <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                      ) : (
                        <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-warm-stone/20 group-hover:bg-clay-orange/40" />
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
