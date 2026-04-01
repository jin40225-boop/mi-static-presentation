import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wand2, 
  ClipboardCopy, 
  Check, 
  MessageSquareCode,
  Library,
  Archive,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { useAnnotations } from '../../contexts/AnnotationContext';
import { cn } from '../../lib/utils';
import mechanismRegistry from '../../mechanismRegistry.json';

export const SidebarAICoPilot: React.FC = () => {
  const { 
    isAnnotationMode, 
    toggleAnnotationMode, 
    annotations, 
    clearAnnotations,
    removeAnnotation,
  } = useAnnotations();
  
  const [copied, setCopied] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const generatePrompt = (isClosing: boolean = false) => {
    if (annotations.length === 0 && !isClosing) return '';

    let prompt = isClosing 
      ? `### 結案與機制註冊請求\n\n我已經完成了目前的開發階段，請幫我將這次開發的功能「模組化」與「SOP化」。\n\n`
      : `請幫我修改目前的應用程式，以下是我的具體需求清單：\n\n`;

    if (annotations.length > 0) {
      const grouped = annotations.reduce((acc, curr) => {
        if (!acc[curr.type]) acc[curr.type] = [];
        acc[curr.type].push(curr);
        return acc;
      }, {} as Record<string, any[]>);

      const typeLabels = {
        feature: '✨ 新功能 (Features)',
        style: '🎨 樣式與排版 (Styles)',
        content: '📝 內容修改 (Content)',
        bug: '🐛 錯誤修復 (Bugs)'
      };

      Object.entries(grouped).forEach(([type, items]) => {
        const typedItems = items as any[];
        if (typedItems.length > 0) {
          prompt += `### ${typeLabels[type as keyof typeof typeLabels]}\n`;
          typedItems.forEach((item, index) => {
            prompt += `${index + 1}. **[定位：${item.targetName}]**\n   - 指令：${item.content}\n`;
          });
          prompt += '\n';
        }
      });
    }

    if (isClosing) {
      prompt += `\n**請針對本次開發的功能，向我提問以下資訊以完成機制註冊：**\n`;
      prompt += `1. 您想如何命名這個新功能/機制？\n`;
      prompt += `2. 這個機制的標準作業程序 (SOP) 為何？\n`;
      prompt += `3. 這個機制需要哪些可配置的參數？\n`;
      prompt += `\n註冊後，請將其更新至 mechanismRegistry.json 中。`;
    } else {
      prompt += `\n請確認您理解以上需求，並一次性幫我完成這些修改。如果需要修改底層資料結構（如 curriculumData.ts），請一併處理。`;
    }
    
    return prompt;
  };

  const handleCopy = (isClosing: boolean = false) => {
    const prompt = generatePrompt(isClosing);
    if (prompt) {
      // Use a more robust way to copy large text
      const textArea = document.createElement("textarea");
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="mt-6 border-t border-warm-stone/10 pt-6 space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white">
            <Wand2 size={14} className={cn(isAnnotationMode && "animate-pulse")} />
          </div>
          <span className="text-sm font-black text-warm-charcoal uppercase tracking-wider">AI Co-Pilot 控制中心</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => { setShowReview(!showReview); setShowLibrary(false); }}
            className={cn(
              "p-1.5 rounded-lg transition-colors relative",
              showReview ? "bg-indigo-100 text-indigo-600" : "hover:bg-sand text-warm-stone"
            )}
            title="查看所有標註"
          >
            <MessageSquareCode size={16} />
            {annotations.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                {annotations.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => { setShowLibrary(!showLibrary); setShowReview(false); }}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              showLibrary ? "bg-indigo-100 text-indigo-600" : "hover:bg-sand text-warm-stone"
            )}
            title="機制圖書館"
          >
            <Library size={16} />
          </button>
        </div>
      </div>

      {/* Annotation Review List */}
      <AnimatePresence>
        {showReview && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-2 space-y-2 overflow-hidden"
          >
            <div className="flex items-center justify-between px-1">
              <div className="text-[10px] font-black text-warm-stone uppercase tracking-widest">目前標註清單</div>
              <button onClick={clearAnnotations} className="text-[9px] text-red-500 font-bold hover:underline">全部清空</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
              {annotations.length === 0 ? (
                <div className="text-center py-4 text-[10px] text-warm-stone italic">尚未有任何標註</div>
              ) : (
                annotations.map(a => (
                  <div key={a.id} className="bg-white p-2 rounded-lg border border-warm-stone/10 relative group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-black px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded uppercase">
                        {a.type}
                      </span>
                      <button 
                        onClick={() => removeAnnotation(a.id)}
                        className="text-warm-stone hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                    <div className="text-[10px] font-bold text-warm-charcoal mb-1">定位：{a.targetName}</div>
                    <p className="text-[10px] text-warm-stone leading-tight">{a.content}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mechanism Library */}
      <AnimatePresence>
        {showLibrary && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-2 space-y-2 overflow-hidden"
          >
            <div className="text-[10px] font-black text-warm-stone uppercase tracking-widest px-1">機制圖書館</div>
            <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
              {mechanismRegistry.map(m => (
                <div key={m.id} className="bg-white/50 p-2 rounded-lg border border-warm-stone/5 group hover:border-indigo-200 transition-colors cursor-help">
                  <div className="text-[11px] font-bold text-warm-charcoal">{m.name}</div>
                  <p className="text-[9px] text-warm-stone line-clamp-1">{m.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-2 space-y-2">
        {/* Toggle Switch */}
        <button
          onClick={toggleAnnotationMode}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border-2",
            isAnnotationMode 
              ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
              : "bg-sand/30 text-warm-stone border-transparent hover:bg-sand/50"
          )}
        >
          <span>標註模式</span>
          <div className={cn(
            "w-8 h-4 rounded-full relative transition-colors",
            isAnnotationMode ? "bg-indigo-600" : "bg-warm-stone/30"
          )}>
            <div className={cn(
              "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
              isAnnotationMode ? "left-4.5" : "left-0.5"
            )} />
          </div>
        </button>

        {/* Export Button */}
        <button
          onClick={() => handleCopy(false)}
          disabled={annotations.length === 0}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
        >
          {copied ? (
            <><Check size={14} /> 已複製指令</>
          ) : (
            <><ClipboardCopy size={14} /> 匯出 AI 修改指令 ({annotations.length})</>
          )}
        </button>

        {/* Close Case Button */}
        <button
          onClick={() => handleCopy(true)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-warm-charcoal text-white rounded-xl text-[10px] font-bold hover:bg-black transition-all shadow-lg"
        >
          <Archive size={12} /> 結案並註冊新機制
        </button>
      </div>
    </div>
  );
};
