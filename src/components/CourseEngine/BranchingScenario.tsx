import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw,
  Info,
  Users
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { DialogueNode, Choice } from '../../curriculumData';
import { AnnotationWrapper } from '../AICoPilot/AnnotationWrapper';

interface BranchingScenarioProps {
  nodes: Record<string, DialogueNode>;
  initialNodeId: string;
  onComplete?: (finalTrust: number) => void;
}

export const BranchingScenario: React.FC<BranchingScenarioProps> = ({ 
  nodes, 
  initialNodeId,
  onComplete 
}) => {
  const [currentNodeId, setCurrentNodeId] = useState(initialNodeId);
  const [history, setHistory] = useState<string[]>([]);
  const [trustScore, setTrustScore] = useState(50); // 0 to 100
  const [lastFeedback, setLastFeedback] = useState<{
    text: string;
    skill?: string;
    trustChange: number;
  } | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentNode = nodes[currentNodeId];
  const isEnd = currentNode.choices.length === 0;

  const handleChoice = (choice: Choice) => {
    setLastFeedback({
      text: choice.feedback,
      skill: choice.skillUsed,
      trustChange: choice.trustChange
    });
    setShowFeedback(true);
    
    // Update trust score with bounds
    setTrustScore(prev => Math.min(100, Math.max(0, prev + (choice.trustChange * 10))));
    
    // Move to next node
    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(choice.nextNodeId);
  };

  const reset = () => {
    setCurrentNodeId(initialNodeId);
    setHistory([]);
    setTrustScore(50);
    setLastFeedback(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    if (isEnd && onComplete) {
      onComplete(trustScore);
    }
  }, [isEnd, trustScore, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Trust Meter */}
      <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-medium mb-2 text-warm-stone uppercase tracking-wider">
            <span>個案防衛心</span>
            <span>建立信任度</span>
          </div>
          <div className="h-3 bg-sand rounded-full overflow-hidden border border-warm-stone/10">
            <motion.div 
              className="h-full trust-gradient"
              initial={{ width: '50%' }}
              animate={{ width: `${trustScore}%` }}
              transition={{ type: 'spring', stiffness: 50 }}
            />
          </div>
        </div>
        <div className="text-2xl font-bold text-clay-orange w-12 text-center">
          {Math.round(trustScore)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Character Visual */}
        <div className="md:col-span-1 flex flex-col items-center justify-center glass-panel p-6 rounded-3xl min-h-[300px]">
          <motion.div
            key={currentNode.expression}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className={cn(
              "w-32 h-32 rounded-full flex items-center justify-center mb-4 transition-colors duration-500",
              currentNode.expression === 'angry' ? "bg-red-100 text-red-500" :
              currentNode.expression === 'sad' ? "bg-blue-100 text-blue-500" :
              currentNode.expression === 'happy' ? "bg-green-100 text-green-500" :
              "bg-warm-stone/10 text-warm-stone"
            )}>
              {currentNode.expression === 'angry' ? <ShieldAlert size={64} /> :
               currentNode.expression === 'sad' ? <AlertCircle size={64} /> :
               currentNode.expression === 'happy' ? <CheckCircle2 size={64} /> :
               <Users size={64} />}
            </div>
            <div className="text-center font-bold text-lg">{currentNode.speaker}</div>
            <div className="text-center text-xs text-warm-stone uppercase tracking-widest mt-1">
              {currentNode.expression === 'angry' ? '防衛中' :
               currentNode.expression === 'sad' ? '沮喪中' :
               currentNode.expression === 'happy' ? '開放中' : '中立'}
            </div>
          </motion.div>
        </div>

        {/* Dialogue Area */}
        <div className="md:col-span-2 space-y-4">
          <AnnotationWrapper targetName={`Dialogue: ${currentNode.speaker}`}>
            <motion.div 
              key={currentNodeId}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="glass-panel p-8 rounded-3xl relative min-h-[160px] flex items-center"
            >
              <div className="absolute -left-3 top-10 w-6 h-6 bg-white rotate-45 border-l border-b border-white/20" />
              <p className="text-xl leading-relaxed italic text-warm-charcoal">
                {currentNode.text}
              </p>
            </motion.div>
          </AnnotationWrapper>

          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {!showFeedback ? (
                <motion.div 
                  key="choices"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {currentNode.choices.map((choice, idx) => (
                    <AnnotationWrapper key={idx} targetName={`Choice ${idx + 1}: ${choice.text}`}>
                      <button
                        onClick={() => handleChoice(choice)}
                        className="w-full text-left p-5 glass-panel hover:bg-clay-orange hover:text-white transition-all duration-300 rounded-2xl flex items-center justify-between group"
                      >
                        <span className="font-medium pr-4">{choice.text}</span>
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                      </button>
                    </AnnotationWrapper>
                  ))}
                  {isEnd && (
                    <div className="space-y-4">
                      <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-green-800">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                          <CheckCircle2 size={20} /> 模擬結束
                        </h4>
                        <p>你成功運用了 MI 技巧引導個案。最終信任度：{trustScore}</p>
                      </div>
                      <button
                        onClick={reset}
                        className="flex items-center gap-2 text-warm-stone hover:text-clay-orange transition-colors mx-auto"
                      >
                        <RotateCcw size={18} /> 重新開始模擬
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="feedback"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="glass-panel p-6 rounded-3xl border-l-8 border-clay-orange"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-clay-orange/10 rounded-xl text-clay-orange">
                      <Info size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-lg">技巧解析</h4>
                        {lastFeedback?.skill && (
                          <span className="px-3 py-1 bg-warm-stone/10 rounded-full text-xs font-bold text-warm-stone uppercase tracking-tighter">
                            {lastFeedback.skill}
                          </span>
                        )}
                      </div>
                      <p className="text-warm-stone leading-relaxed mb-4">
                        {lastFeedback?.text}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <span>信任度變化：</span>
                        <span className={cn(
                          (lastFeedback?.trustChange || 0) > 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {(lastFeedback?.trustChange || 0) > 0 ? "+" : ""}{(lastFeedback?.trustChange || 0) * 10}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="w-full mt-6 py-3 bg-warm-charcoal text-white rounded-xl font-bold hover:bg-clay-orange transition-colors"
                  >
                    繼續對話
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
