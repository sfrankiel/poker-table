import React from 'react';
import { SeatState, isDealerSeat } from './types';

interface SeatProps {
  data: SeatState;
  x: number;
  y: number;
  onSit: (index: number) => void;
}

export const Seat: React.FC<SeatProps> = ({ data, x, y, onSit }) => {
  const isDealer = isDealerSeat(data.index);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-300"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: isDealer ? '120px' : '80px',
        height: '80px',
        pointerEvents: isDealer ? 'none' : 'auto',
      }}
    >
      {isDealer ? (
        // --- DEALER ANCHOR (TOP CENTER) ---
        <div className="flex flex-col items-center">
           {/* Label above tray */}
           <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Dealer
          </div>
          {/* Chip Tray */}
          <div className="w-24 h-10 bg-zinc-900 rounded-b-lg border-x-2 border-b-2 border-zinc-700 shadow-xl flex flex-col items-center justify-start relative overflow-hidden">
             {/* Tray Interior */}
             <div className="w-full h-full bg-gradient-to-b from-black to-zinc-800 flex justify-center gap-1 pt-1">
                {/* Chip stacks */}
                <div className="w-1 h-6 bg-red-900/60 rounded-full"></div>
                <div className="w-1 h-6 bg-zinc-700 rounded-full"></div>
                <div className="w-1 h-6 bg-zinc-700 rounded-full"></div>
                <div className="w-1 h-6 bg-blue-900/60 rounded-full"></div>
             </div>
          </div>
        </div>
      ) : (
        // --- PLAYERS (1-9) ---
        <>
          <div 
            onClick={() => !data.player && onSit(data.index)}
            className={`
              w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg cursor-pointer relative z-10
              ${data.player 
                ? 'bg-slate-800 border-slate-600' 
                : 'bg-green-900/40 border-green-700/30 hover:bg-green-800/60 hover:border-green-400 dashed-border'}
              ${data.isHero ? 'ring-2 ring-yellow-400' : ''}
            `}
          >
            {data.player ? (
              <span className="text-white font-bold text-lg">
                {data.player.name.charAt(0)}
              </span>
            ) : (
              <span className="text-green-300/40 text-xs font-semibold">Sit</span>
            )}
          </div>

          {/* Player Info Badge */}
          {data.player && (
            <div className="absolute -bottom-6 bg-black/90 px-2 py-1 rounded text-center min-w-[80px] z-20 border border-white/10">
              <div className="text-xs text-slate-300 truncate max-w-[70px]">
                {data.player.name}
              </div>
              <div className="text-xs text-yellow-500 font-mono font-bold">
                ${data.player.stack}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};