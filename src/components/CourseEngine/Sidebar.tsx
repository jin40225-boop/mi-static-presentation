import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MessageSquare, 
  Zap, 
  Target, 
  CheckCircle2,
  ChevronRight,
  Plus,
  Globe,
  Trash2,
  Check,
  X,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Slide } from '../../curriculumData';
import { useAnnotations } from '../../contexts/AnnotationContext';
import { SidebarAICoPilot } from '../AICoPilot/SidebarAICoPilot';

interface SidebarProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
}

const partIcons = [
  BookOpen,
  MessageSquare,
  Zap,
  Target,
  CheckCircle2
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  slides, 
  currentSlideIndex, 
  onSlideSelect 
}) => {
  const { isAnnotationMode, annotations, addAnnotation, removeAnnotation } = useAnnotations();
  const [expandedSlideId, setExpandedSlideId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  
  const parts = Array.from(new Set(slides.map(s => s.part)));

  const copyStudentLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('role', 'student');
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddNote = (targetName: string) => {
    if (!newNote.trim()) return;
    addAnnotation({
      targetName,
      content: newNote.trim(),
      type: 'feature'
    });
    setNewNote('');
  };

  return (
    <div className="w-72 h-screen fixed left-0 top-0 bg-sand/50 backdrop-blur-xl border-r border-warm-stone/10 p-6 flex flex-col z-50">
      <div className="mb-10">
        <h1 className="text-2xl font-black text-warm-charcoal tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-clay-orange rounded-lg flex items-center justify-center text-white">
            <Zap size={20} fill="currentColor" />
          </div>
          MI 教學大綱
        </h1>
        <p className="text-xs text-warm-stone font-bold uppercase tracking-widest mt-2">
          互動式課程引擎 v2.0
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
        {/* Global Annotation Section */}
        {isAnnotationMode && (
          <div className="space-y-3">
            <button 
              onClick={() => setExpandedSlideId(expandedSlideId === 'global' ? null : 'global')}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-black transition-all",
                expandedSlideId === 'global' ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              )}
            >
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span>全域需求標註</span>
              </div>
              {expandedSlideId === 'global' ? <X size={14} /> : <Plus size={14} />}
            </button>
            
            <AnimatePresence>
              {expandedSlideId === 'global' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-2 px-1"
                >
                  <AnnotationList 
                    targetName="全域需求" 
                    annotations={annotations} 
                    onRemove={removeAnnotation} 
                  />
                  <AnnotationInput 
                    value={newNote} 
                    onChange={setNewNote} 
                    onAdd={() => handleAddNote('全域需求')} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {parts.map((part: any) => {
          const partSlides = slides.filter(s => s.part === part);
          const Icon = partIcons[(part as number) - 1] || BookOpen;
          
          return (
            <div key={part} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-warm-stone uppercase tracking-widest px-2">
                <Icon size={14} />
                <span>第 {part} 部分</span>
              </div>
              <div className="space-y-2">
                {partSlides.map(slide => {
                  const index = slides.indexOf(slide);
                  const isActive = index === currentSlideIndex;
                  const isCompleted = index < currentSlideIndex;
                  const slideAnnotations = annotations.filter(a => a.targetName === slide.title);
                  const isExpanded = expandedSlideId === slide.id;

                  return (
                    <div key={slide.id} className="space-y-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onSlideSelect(index)}
                          className={cn(
                            "flex-1 text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group",
                            isActive 
                              ? "bg-clay-orange text-white shadow-lg shadow-clay-orange/20" 
                              : "hover:bg-warm-stone/5 text-warm-stone hover:text-warm-charcoal"
                          )}
                        >
                          <span className="text-sm font-medium truncate pr-2">
                            {slide.title}
                          </span>
                          <div className="flex items-center gap-2">
                            {slideAnnotations.length > 0 && (
                              <span className="text-[10px] bg-indigo-500 text-white px-1.5 rounded-full font-bold">
                                {slideAnnotations.length}
                              </span>
                            )}
                            {isActive ? (
                              <motion.div layoutId="active-indicator">
                                <ChevronRight size={16} />
                              </motion.div>
                            ) : isCompleted ? (
                              <CheckCircle2 size={16} className="text-green-500" />
                            ) : null}
                          </div>
                        </button>

                        {isAnnotationMode && (
                          <button
                            onClick={() => {
                              setExpandedSlideId(isExpanded ? null : slide.id);
                              setNewNote('');
                            }}
                            className={cn(
                              "p-3 rounded-xl transition-all",
                              isExpanded ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                            )}
                          >
                            {isExpanded ? <X size={16} /> : <Plus size={16} />}
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {isAnnotationMode && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-2 px-2 pb-2"
                          >
                            <AnnotationList 
                              targetName={slide.title} 
                              annotations={annotations} 
                              onRemove={removeAnnotation} 
                            />
                            <AnnotationInput 
                              value={newNote} 
                              onChange={setNewNote} 
                              onAdd={() => handleAddNote(slide.title)} 
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <SidebarAICoPilot />

      <div className="mt-auto pt-6 border-t border-warm-stone/10 space-y-4">
        <button
          onClick={copyStudentLink}
          className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-indigo-100/50"
        >
          {copiedLink ? <Check size={16} /> : <LinkIcon size={16} />}
          {copiedLink ? '已複製學員連結' : '複製學員專屬連結'}
        </button>

        <div className="flex items-center gap-3 p-3 glass-panel rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-clay-orange to-golden-sand" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold truncate">林彥宇 督導</div>
            <div className="text-[10px] text-warm-stone uppercase tracking-wider">專業講師</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnotationList: React.FC<{ 
  targetName: string; 
  annotations: any[]; 
  onRemove: (id: string) => void 
}> = ({ targetName, annotations, onRemove }) => {
  const filtered = annotations.filter(a => a.targetName === targetName);
  
  if (filtered.length === 0) return null;

  return (
    <div className="space-y-1.5 mb-2">
      {filtered.map(a => (
        <div key={a.id} className="bg-white/80 p-2 rounded-lg border border-indigo-100 group relative">
          <p className="text-[11px] text-warm-charcoal leading-tight pr-4">{a.content}</p>
          <button 
            onClick={() => onRemove(a.id)}
            className="absolute top-1 right-1 text-warm-stone hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={10} />
          </button>
        </div>
      ))}
    </div>
  );
};

const AnnotationInput: React.FC<{ 
  value: string; 
  onChange: (v: string) => void; 
  onAdd: () => void 
}> = ({ value, onChange, onAdd }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onAdd()}
      placeholder="輸入標註指令..."
      className="w-full bg-white border border-warm-stone/20 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all pr-8"
    />
    <button 
      onClick={onAdd}
      disabled={!value.trim()}
      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-indigo-600 hover:scale-110 transition-transform disabled:opacity-30"
    >
      <Check size={14} />
    </button>
  </div>
);
