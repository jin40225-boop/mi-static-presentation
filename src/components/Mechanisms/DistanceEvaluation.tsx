import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DistanceEvaluationProps {
  slideId: string;
  title: string;
  question1: string;
  question2: string;
}

export const DistanceEvaluation: React.FC<DistanceEvaluationProps> = ({ slideId, title, question1, question2 }) => {
  const [score, setScore] = useState<number>(5);
  const [ability, setAbility] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  void slideId;

  const getMIReflection = (value: number) => {
    if (value <= 3) {
      return `目前分數是 ${value}，可以先從觀察現況與命名感受開始，幫助自己看見起點。`;
    }
    if (value <= 7) {
      return `目前分數是 ${value}，代表你已經在改變歷程中，可以試著找出支持你前進的關鍵因素。`;
    }
    return `目前分數是 ${value}，你已經很接近行動了，下一步可以把想法轉成一個具體可執行的行動。`;
  };

  const handleSubmit = () => {
    if (!ability.trim()) {
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setScore(5);
    setAbility('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-warm-stone/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-warm-charcoal">{title}</h2>
          <p className="text-sm text-warm-stone mt-2">本地示範版互動，用來帶觀眾進入自我評估與反思。</p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-sm font-bold text-warm-stone hover:text-clay-orange transition-colors"
        >
          <RotateCcw size={16} />
          重新填寫
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-bold text-warm-charcoal mb-4">{question1}</label>
            <div className="relative pt-10 pb-4">
              <div className="relative h-4 bg-sand rounded-full overflow-hidden border border-warm-stone/10">
                <div className="absolute inset-y-0 left-0 bg-clay-orange transition-all duration-500" style={{ width: `${score * 10}%` }} />
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={score}
                  onChange={(event) => setScore(parseInt(event.target.value, 10))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
              </div>
              <div className="flex justify-between text-2xl md:text-4xl font-black text-warm-stone/30 mt-6 px-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <span
                    key={value}
                    className={cn('transition-all duration-300', value === score && 'text-clay-orange scale-125 md:scale-150 -translate-y-2')}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-warm-charcoal mb-4">{question2}</label>
            <textarea
              value={ability}
              onChange={(event) => setAbility(event.target.value)}
              placeholder="寫下你想到的能力、資源、支持條件，或是一個你願意開始的小步驟。"
              className="w-full p-4 border-2 border-sand rounded-xl focus:border-clay-orange focus:ring-0 resize-none h-36 text-lg"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!ability.trim()}
            className="w-full py-4 bg-clay-orange text-white rounded-xl font-black text-lg hover:bg-[#c6653b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-clay-orange/20"
          >
            儲存這次思考
          </button>
        </div>

        <motion.div layout className="space-y-4">
          <div className="p-6 bg-warm-charcoal text-white rounded-2xl space-y-3">
            <div className="text-xs font-black text-clay-orange uppercase tracking-widest flex items-center gap-2">
              <Lightbulb size={14} />
              MI 提示
            </div>
            <p className="text-lg font-medium italic leading-relaxed">{getMIReflection(score)}</p>
          </div>

          <div className="p-6 bg-sand/30 rounded-2xl border border-warm-stone/5">
            <div className="text-xs font-black text-warm-stone uppercase tracking-widest mb-2">目前狀態</div>
            <div className="text-4xl font-black text-clay-orange mb-3">{score}</div>
            <p className="text-sm text-warm-stone leading-relaxed">
              {isSubmitted ? ability : '送出後，這裡會顯示你剛才留下的文字，方便在演講中示範反思過程。'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
