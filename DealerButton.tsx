import React from 'react';

interface DealerButtonProps {
  x: number;
  y: number;
}

export const DealerButton: React.FC<DealerButtonProps> = ({ x, y }) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-30 pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      {/* Dealer Button Circle */}
      <div className="w-12 h-12 rounded-full bg-white border-4 border-yellow-500 shadow-2xl flex items-center justify-center relative">
        {/* Inner circle */}
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
          <span className="text-white font-bold text-xs">D</span>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-md -z-10" />
      </div>
      
      {/* Label */}
      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-yellow-400 drop-shadow-lg">
        Dealer
      </div>
    </div>
  );
};
