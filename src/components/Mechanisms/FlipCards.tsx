import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FlipCard {
  id: string;
  frontTitle: string;
  frontIcon?: React.ReactNode;
  backTitle: string;
  backContent: string;
  color?: string;
}

interface FlipCardsProps {
  cards: FlipCard[];
  title?: string;
  description?: string;
}

export const FlipCards: React.FC<FlipCardsProps> = ({ cards, title, description }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-black text-warm-charcoal mb-4">{title}</h2>}
          {description && <p className="text-warm-stone max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const isFlipped = flippedCards[card.id];
          const color = card.color || '#F27D26'; // Default to clay-orange

          return (
            <div 
              key={card.id}
              className="relative h-64 perspective-1000 cursor-pointer group"
              onClick={() => toggleCard(card.id)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Front */}
                <div 
                  className={cn(
                    "absolute w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 shadow-lg transition-shadow group-hover:shadow-xl",
                    isFlipped ? "pointer-events-none" : ""
                  )}
                  style={{ 
                    borderColor: `${color}30`,
                    backgroundColor: 'white'
                  }}
                >
                  {card.frontIcon && (
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${color}15`, color: color }}
                    >
                      {card.frontIcon}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-warm-charcoal">{card.frontTitle}</h3>
                  <div className="absolute bottom-4 right-4 text-warm-stone/50 group-hover:text-warm-stone transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>

                {/* Back */}
                <div 
                  className={cn(
                    "absolute w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg overflow-y-auto",
                    !isFlipped ? "pointer-events-none" : ""
                  )}
                  style={{ 
                    transform: 'rotateY(180deg)',
                    backgroundColor: color,
                    color: 'white'
                  }}
                >
                  <h3 className="text-lg font-bold mb-3 border-b border-white/20 pb-2 w-full">{card.backTitle}</h3>
                  <p className="text-sm leading-relaxed text-white/90">{card.backContent}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
