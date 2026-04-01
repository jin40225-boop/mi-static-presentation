import React, { useState } from 'react';
import { useAnnotations } from '../../contexts/AnnotationContext';
import { cn } from '../../lib/utils';
import { MessageSquarePlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnnotationWrapperProps {
  targetName: string;
  children: React.ReactNode;
  className?: string;
}

export const AnnotationWrapper: React.FC<AnnotationWrapperProps> = ({ targetName, children, className }) => {
  const { isAnnotationMode, addAnnotation } = useAnnotations();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [annotationText, setAnnotationText] = useState('');
  const [annotationType, setAnnotationType] = useState<'feature' | 'style' | 'content' | 'bug'>('feature');

  if (!isAnnotationMode) {
    return <div className={className}>{children}</div>;
  }

  const handleAddAnnotation = () => {
    if (!annotationText.trim()) return;
    addAnnotation({
      targetName,
      content: annotationText,
      type: annotationType
    });
    setIsModalOpen(false);
    setAnnotationText('');
  };

  return (
    <>
      <div 
        className={cn("relative group transition-all duration-200 cursor-pointer", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        {/* Target Content */}
        <div className={cn(
          "transition-all duration-200",
          isHovered ? "ring-2 ring-indigo-500/50 rounded-lg" : ""
        )}>
          {children}
        </div>

        {/* Label */}
        {isHovered && (
          <div className="absolute -top-3 -left-2 z-40 flex items-center gap-1">
            <div className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap uppercase tracking-wider">
              {targetName}
            </div>
            <div className="bg-indigo-600 text-white p-0.5 rounded shadow-lg">
              <MessageSquarePlus size={12} />
            </div>
          </div>
        )}
      </div>

      {/* Annotation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-warm-charcoal/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-warm-stone/10 flex justify-between items-center bg-sand/30">
                <div>
                  <h3 className="font-black text-warm-charcoal">新增標註</h3>
                  <p className="text-xs text-warm-stone font-bold mt-0.5">目標：{targetName}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-white rounded-lg transition-colors text-warm-stone"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-warm-stone uppercase tracking-widest">標註類型</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'feature', label: '✨ 新功能' },
                      { id: 'style', label: '🎨 樣式修改' },
                      { id: 'content', label: '📝 內容調整' },
                      { id: 'bug', label: '🐛 錯誤修復' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setAnnotationType(type.id as any)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-sm font-bold transition-all border-2",
                          annotationType === type.id 
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                            : "border-warm-stone/10 text-warm-stone hover:border-warm-stone/30"
                        )}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-warm-stone uppercase tracking-widest">修改指令</label>
                  <textarea
                    value={annotationText}
                    onChange={(e) => setAnnotationText(e.target.value)}
                    placeholder="請描述您希望 AI 如何修改這個區塊..."
                    className="w-full h-32 p-3 border-2 border-warm-stone/10 rounded-xl focus:border-indigo-500 focus:ring-0 resize-none text-sm"
                    autoFocus
                  />
                </div>

                <button
                  onClick={handleAddAnnotation}
                  disabled={!annotationText.trim()}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
                >
                  確認新增標註
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
