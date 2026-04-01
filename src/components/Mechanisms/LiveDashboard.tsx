import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BarChart3, RotateCcw, Vote } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Option {
  label: string;
  value: string;
  color: string;
}

interface LiveDashboardProps {
  slideId: string;
  title: string;
  options: Option[];
}

const seedVotes = (options: Option[]) =>
  options.reduce<Record<string, number>>((acc, option, index) => {
    acc[option.value] = [18, 24, 13, 9, 6, 4][index] ?? Math.max(3, 12 - index * 2);
    return acc;
  }, {});

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ slideId, title, options = [] }) => {
  const [votes, setVotes] = useState<Record<string, number>>(() => seedVotes(options));
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  void slideId;

  const totalVotes = useMemo(() => Object.values(votes).reduce((sum, count) => sum + count, 0), [votes]);

  const handleVote = (value: string) => {
    if (selectedValue) {
      return;
    }

    setSelectedValue(value);
    setVotes((prev) => ({
      ...prev,
      [value]: (prev[value] || 0) + 1,
    }));
  };

  const handleReset = () => {
    setVotes(seedVotes(options));
    setSelectedValue(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-warm-stone/10 border border-warm-stone/5 overflow-hidden">
      <div className="bg-sand/30 px-8 py-4 flex items-center justify-between border-b border-warm-stone/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-warm-charcoal rounded-xl flex items-center justify-center text-white">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-warm-charcoal uppercase tracking-wider">現場投票示意</h3>
            <p className="text-[10px] text-warm-stone font-bold">單機展示版，可於演講中模擬即時統計效果</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-xs font-bold text-warm-stone hover:text-clay-orange transition-colors"
        >
          <RotateCcw size={14} />
          重設示範
        </button>
      </div>

      <div className="p-8 lg:p-12">
        <h2 className="text-3xl lg:text-4xl font-black text-warm-charcoal mb-12 leading-tight tracking-tight">{title}</h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="text-xs font-black text-warm-stone uppercase tracking-widest mb-6">請選擇一個答案</div>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleVote(option.value)}
                disabled={!!selectedValue}
                className={cn(
                  'w-full group relative flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300',
                  selectedValue
                    ? selectedValue === option.value
                      ? 'border-clay-orange bg-clay-orange/5'
                      : 'border-warm-stone/10 opacity-60'
                    : 'border-warm-stone/10 hover:border-warm-charcoal hover:shadow-xl hover:-translate-y-1',
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full border-2 border-warm-stone/20" style={{ backgroundColor: option.color }} />
                  <span className="text-lg font-bold text-warm-charcoal">{option.label}</span>
                </div>
                <ArrowRight size={20} className="text-warm-stone group-hover:text-warm-charcoal transition-colors" />
              </button>
            ))}

            <div className="p-6 bg-warm-charcoal text-white rounded-2xl text-sm opacity-90 flex items-start gap-3">
              <Vote size={18} className="mt-0.5 shrink-0 text-clay-orange" />
              <p>這個區塊用來示範課堂中可能看到的投票互動效果，方便演講時帶出討論。</p>
            </div>
          </div>

          <div className="bg-sand/10 rounded-3xl p-8 border border-warm-stone/5">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-black text-warm-stone uppercase tracking-widest">投票結果</span>
              <span className="text-xs font-bold text-warm-stone">{totalVotes} 票</span>
            </div>

            <div className="space-y-6">
              {options.map((option) => {
                const count = votes[option.value] || 0;
                const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

                return (
                  <div key={option.value} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-warm-charcoal">{option.label}</span>
                      <span className="text-warm-stone">
                        {Math.round(percentage)}% ({count})
                      </span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden border border-warm-stone/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
