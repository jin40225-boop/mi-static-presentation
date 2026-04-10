import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Maximize, Menu, Minimize, X } from 'lucide-react';
import { SlideRenderer } from './components/CourseEngine/SlideRenderer';
import { Sidebar } from './components/CourseEngine/Sidebar';
import { curriculumData as initialCurriculumData, Slide } from './curriculumData';
import { ErrorBoundary } from './components/ErrorBoundary';
import { cn } from './lib/utils';

const AppContent: React.FC = () => {
  const [slides] = useState<Slide[]>(initialCurriculumData);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const currentSlide = slides[currentSlideIndex];

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(fullscreen);

      if (fullscreen) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileSidebarOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.error('Error attempting to enable fullscreen:', error);
      }
      return;
    }

    if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      scrollToTop();
    }
  };

  const handleSlideSelect = (index: number) => {
    setCurrentSlideIndex(index);
    setIsMobileSidebarOpen(false);
    scrollToTop();
  };

  return (
    <div className="flex min-h-screen bg-aurora selection:bg-clay-orange/20">
      {!isFullscreen && (
        <div className="hidden md:block">
          <Sidebar
            slides={slides}
            currentSlideIndex={currentSlideIndex}
            onSlideSelect={handleSlideSelect}
            variant="desktop"
          />
        </div>
      )}

      <AnimatePresence>
        {!isFullscreen && isMobileSidebarOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close course navigation"
              className="fixed inset-0 z-50 bg-warm-charcoal/35 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            <motion.div
              id="mobile-course-navigation"
              className="fixed inset-y-0 left-0 z-50 w-[min(24rem,88vw)] md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            >
              <div className="relative h-full">
                <button
                  type="button"
                  aria-label="Close course navigation"
                  className="absolute right-4 top-4 z-10 rounded-full border border-warm-stone/10 bg-white/90 p-2 text-warm-charcoal shadow-lg backdrop-blur"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <X size={18} />
                </button>

                <Sidebar
                  slides={slides}
                  currentSlideIndex={currentSlideIndex}
                  onSlideSelect={handleSlideSelect}
                  onNavigate={() => setIsMobileSidebarOpen(false)}
                  variant="mobile"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative min-h-screen flex-1 overflow-x-clip transition-all duration-300">
        <div className="fixed left-0 right-0 top-0 z-50 h-1.5 bg-sand transition-all duration-300">
          <motion.div
            className="h-full bg-clay-orange shadow-[0_0_10px_rgba(219,122,78,0.5)]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>

        {!isFullscreen && (
          <div className="fixed inset-x-0 top-1.5 z-40 border-b border-warm-stone/10 bg-white/80 px-4 py-3 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-6xl items-center gap-3">
              <button
                type="button"
                aria-label={isMobileSidebarOpen ? 'Close course navigation' : 'Open course navigation'}
                aria-expanded={isMobileSidebarOpen}
                aria-controls="mobile-course-navigation"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-warm-stone/10 bg-white/85 text-warm-charcoal shadow-sm"
                onClick={() => setIsMobileSidebarOpen((open) => !open)}
              >
                {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-warm-stone">
                  Part {currentSlide.part} · {currentSlideIndex + 1}/{slides.length}
                </p>
                <p className="truncate text-sm font-black text-warm-charcoal">{currentSlide.title}</p>
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            'mx-auto max-w-6xl',
            isFullscreen
              ? 'flex h-screen flex-col justify-center px-5 py-16 sm:px-8 md:px-10'
              : 'px-4 pb-28 pt-24 sm:px-6 md:px-10 md:py-20',
          )}
        >
          <SlideRenderer
            slide={currentSlide}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentSlideIndex === 0}
            isLast={currentSlideIndex === slides.length - 1}
          />
        </div>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          className="fixed right-4 top-20 z-40 rounded-full border border-warm-stone/20 bg-white/85 p-3 text-warm-stone shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:text-clay-orange md:bottom-6 md:right-6 md:top-auto"
        >
          {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
        </button>

        <div className="pointer-events-none fixed right-4 top-24 -z-10 hidden h-72 w-72 rounded-full bg-clay-orange/5 blur-[100px] md:block md:right-20 md:top-20 md:h-96 md:w-96" />
        <div className="pointer-events-none fixed bottom-20 left-6 -z-10 hidden h-52 w-52 rounded-full bg-golden-sand/5 blur-[80px] md:block md:left-20 md:h-64 md:w-64" />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;
