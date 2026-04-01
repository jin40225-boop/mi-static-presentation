import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Maximize, Minimize } from 'lucide-react';
import { Sidebar } from './components/CourseEngine/Sidebar';
import { SlideRenderer } from './components/CourseEngine/SlideRenderer';
import { Inspector } from './components/CourseEngine/Inspector';
import { curriculumData as initialCurriculumData, Slide } from './curriculumData';
import { AnnotationProvider } from './contexts/AnnotationContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(initialCurriculumData);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = slides[currentSlideIndex];

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.error('Error attempting to enable fullscreen:', error);
      }
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSlideSelect = (index: number) => {
    setCurrentSlideIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSlideUpdate = (updatedSlide: Slide) => {
    const nextSlides = [...slides];
    nextSlides[currentSlideIndex] = updatedSlide;
    setSlides(nextSlides);
  };

  const showSidebar = !isFullscreen;
  const showInspector = !isFullscreen;
  const mainMarginClass = isFullscreen ? 'w-full' : 'ml-72 mr-80';
  const progressMarginClass = isFullscreen ? 'left-0 right-0' : 'left-72 right-80';

  return (
    <div className="min-h-screen bg-aurora selection:bg-clay-orange/20 flex">
      {showSidebar && (
        <Sidebar slides={slides} currentSlideIndex={currentSlideIndex} onSlideSelect={handleSlideSelect} />
      )}

      <main className={`flex-1 min-h-screen relative overflow-hidden transition-all duration-300 ${mainMarginClass}`}>
        <div className={`fixed top-0 h-1.5 bg-sand z-50 transition-all duration-300 ${progressMarginClass}`}>
          <motion.div
            className="h-full bg-clay-orange shadow-[0_0_10px_rgba(219,122,78,0.5)]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>

        <div className={`max-w-5xl mx-auto py-20 px-10 ${isFullscreen ? 'h-screen flex flex-col justify-center' : ''}`}>
          <SlideRenderer
            slide={currentSlide}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentSlideIndex === 0}
            isLast={currentSlideIndex === slides.length - 1}
          />
        </div>

        <button
          onClick={toggleFullscreen}
          className="fixed bottom-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-sm border border-warm-stone/20 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all text-warm-stone hover:text-clay-orange"
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>

        <div className={`fixed top-20 w-96 h-96 bg-clay-orange/5 rounded-full blur-[100px] -z-10 animate-pulse ${isFullscreen ? 'right-20' : 'right-[25rem]'}`} />
        <div className={`fixed bottom-20 w-64 h-64 bg-golden-sand/5 rounded-full blur-[80px] -z-10 animate-pulse ${isFullscreen ? 'left-20' : 'left-96'}`} />
      </main>

      {showInspector && <Inspector slide={currentSlide} onUpdate={handleSlideUpdate} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AnnotationProvider>
        <AppContent />
      </AnnotationProvider>
    </ErrorBoundary>
  );
};

export default App;
