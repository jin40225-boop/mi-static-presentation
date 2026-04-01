import React from 'react';
import { motion } from 'motion/react';
import { Settings, Type, List, Palette, Save } from 'lucide-react';
import { Slide } from '../../curriculumData';
import mechanismRegistry from '../../mechanismRegistry.json';

interface InspectorProps {
  slide: Slide;
  onUpdate: (updatedSlide: Slide) => void;
}

export const Inspector: React.FC<InspectorProps> = ({ slide, onUpdate }) => {
  const handleContentChange = (key: string, value: any) => {
    onUpdate({
      ...slide,
      content: {
        ...slide.content,
        [key]: value
      }
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...slide, title: e.target.value });
  };

  const handleMechanismChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMechanismId = e.target.value;
    const mechanismDef = mechanismRegistry.find((m: any) => m.id === newMechanismId);
    
    if (mechanismDef) {
      // 初始化新機制的預設參數
      const defaultContent: any = { mechanismId: newMechanismId };
      mechanismDef.parameters.forEach((param: any) => {
        if (param.type === 'string') defaultContent[param.name] = '';
        if (param.type === 'array') defaultContent[param.name] = [];
      });

      onUpdate({
        ...slide,
        type: 'mechanism',
        content: defaultContent
      });
    }
  };

  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 bg-white border-l border-warm-stone/10 h-screen fixed right-0 top-0 overflow-y-auto shadow-2xl z-40 flex flex-col"
    >
      <div className="p-6 border-b border-warm-stone/10 bg-sand/30 flex items-center gap-3 sticky top-0 z-10">
        <div className="w-8 h-8 bg-warm-charcoal rounded-lg flex items-center justify-center text-white">
          <Settings size={16} />
        </div>
        <div>
          <h2 className="text-sm font-black text-warm-charcoal uppercase tracking-wider">屬性面板</h2>
          <p className="text-[10px] text-warm-stone font-bold">Inspector</p>
        </div>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* 基本設定 */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-warm-stone uppercase tracking-widest flex items-center gap-2">
            <Type size={14} /> 基本設定
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-warm-stone mb-1">頁面標題</label>
            <input 
              type="text" 
              value={slide.title}
              onChange={handleTitleChange}
              className="w-full text-sm p-2 border border-warm-stone/20 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-warm-stone mb-1">頁面類型</label>
            <select 
              value={slide.type}
              onChange={(e) => onUpdate({ ...slide, type: e.target.value as any })}
              className="w-full text-sm p-2 border border-warm-stone/20 rounded-md focus:outline-none focus:border-indigo-500 bg-white"
            >
              <option value="intro">開場 (Intro)</option>
              <option value="content">內容 (Content)</option>
              <option value="mechanism">互動機制 (Mechanism)</option>
              <option value="stepper">步驟引導 (Stepper)</option>
              <option value="branching">分支對話 (Branching)</option>
            </select>
          </div>
        </div>

        {/* 機制設定 (僅當 type 為 mechanism 時顯示) */}
        {slide.type === 'mechanism' && (
          <div className="space-y-4 pt-4 border-t border-warm-stone/10">
            <h3 className="text-xs font-black text-warm-stone uppercase tracking-widest flex items-center gap-2">
              <List size={14} /> 模組選擇 (武器庫)
            </h3>
            <div>
              <select 
                value={slide.content?.mechanismId || ''}
                onChange={handleMechanismChange}
                className="w-full text-sm p-2 border border-indigo-200 rounded-md focus:outline-none focus:border-indigo-500 bg-indigo-50/30 text-indigo-900 font-bold"
              >
                <option value="" disabled>請選擇互動模組...</option>
                {/* 根據分類分組顯示 */}
                <optgroup label="全頁面子母互動 (PageLevel)">
                  {(mechanismRegistry as any[]).filter(m => m.category === 'PageLevel').map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </optgroup>
                <optgroup label="單頁面互動元件 (ComponentLevel)">
                  {(mechanismRegistry as any[]).filter(m => m.category === 'ComponentLevel').map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* 動態渲染機制參數輸入框 */}
            {slide.content?.mechanismId && (
              <div className="mt-6 space-y-4 bg-sand/20 p-4 rounded-xl border border-warm-stone/10">
                <h4 className="text-[10px] font-black text-warm-charcoal uppercase tracking-widest mb-2">模組參數設定</h4>
                
                {/* 這裡先硬編碼針對 live-dashboard 的編輯介面，未來可根據 registry 動態生成 */}
                {slide.content.mechanismId === 'page-live-dashboard-radio' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-warm-stone mb-1">問題標題</label>
                      <input 
                        type="text" 
                        value={slide.content.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="w-full text-sm p-2 border border-warm-stone/20 rounded-md"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[10px] font-bold text-warm-stone">選項設定</label>
                        <button 
                          onClick={() => {
                            const newOptions = [...(slide.content.options || []), { label: '新選項', value: `opt-${Date.now()}`, color: '#141414' }];
                            handleContentChange('options', newOptions);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 text-[10px] font-bold"
                        >
                          + 新增
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(slide.content.options || []).map((opt: any, index: number) => (
                          <div key={index} className="flex gap-2 items-center bg-white p-2 rounded border border-warm-stone/10">
                            <input 
                              type="color" 
                              value={opt.color}
                              onChange={(e) => {
                                const newOptions = [...slide.content.options];
                                newOptions[index].color = e.target.value;
                                handleContentChange('options', newOptions);
                              }}
                              className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                            />
                            <input 
                              type="text" 
                              value={opt.label}
                              onChange={(e) => {
                                const newOptions = [...slide.content.options];
                                newOptions[index].label = e.target.value;
                                handleContentChange('options', newOptions);
                              }}
                              className="flex-1 text-xs p-1 border-b border-transparent hover:border-warm-stone/20 focus:border-indigo-500 focus:outline-none"
                            />
                            <button 
                              onClick={() => {
                                const newOptions = slide.content.options.filter((_: any, i: number) => i !== index);
                                handleContentChange('options', newOptions);
                              }}
                              className="text-red-400 hover:text-red-600 text-xs px-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {slide.content.mechanismId === 'page-distance-evaluation' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-warm-stone mb-1">機制標題</label>
                      <input 
                        type="text" 
                        value={slide.content.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="w-full text-sm p-2 border border-warm-stone/20 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-warm-stone mb-1 mt-3">問題一 (評分題)</label>
                      <input 
                        type="text" 
                        value={slide.content.question1 || ''}
                        onChange={(e) => handleContentChange('question1', e.target.value)}
                        className="w-full text-sm p-2 border border-warm-stone/20 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-warm-stone mb-1 mt-3">問題二 (文字題)</label>
                      <input 
                        type="text" 
                        value={slide.content.question2 || ''}
                        onChange={(e) => handleContentChange('question2', e.target.value)}
                        className="w-full text-sm p-2 border border-warm-stone/20 rounded-md"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-warm-stone/10 bg-white">
        <button className="w-full flex items-center justify-center gap-2 bg-warm-charcoal text-white py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors">
          <Save size={16} /> 儲存變更
        </button>
      </div>
    </motion.div>
  );
};
