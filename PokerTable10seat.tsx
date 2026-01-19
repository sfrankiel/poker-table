import React, { useState, useEffect } from 'react';
import { Seat } from './Seat';
import { useTablePositions } from './useTablePositions';
import { SeatState, Player, isDealerSeat } from './types';

const TOTAL_POSITIONS = 10; 

export interface PokerTableProps {
  /** Initial seat states. If not provided, all seats start empty. */
  initialSeats?: SeatState[];
  /** Custom handler when a player sits down. If not provided, uses default behavior. */
  onSit?: (index: number, player: Player) => void;
  /** Custom className for the outer container */
  className?: string;
  /** Whether to show the center "POKER" logo. Default: true */
  showLogo?: boolean;
}

export const PokerTable: React.FC<PokerTableProps> = ({
  initialSeats,
  onSit,
  className = '',
  showLogo = true,
}) => {
  const positions = useTablePositions(TOTAL_POSITIONS);
  
  const [seats, setSeats] = useState<SeatState[]>(
    initialSeats || Array.from({ length: TOTAL_POSITIONS }, (_, i) => ({ index: i }))
  );

  // Update seats if initialSeats prop changes
  useEffect(() => {
    if (initialSeats) {
      setSeats(initialSeats);
    }
  }, [initialSeats]);

  const handleSit = (index: number) => {
    if (isDealerSeat(index)) return;

    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: `Player ${index}`,
      stack: 1000
    };

    // If custom onSit handler provided, call it
    if (onSit) {
      onSit(index, newPlayer);
      return;
    }

    // Default behavior: update internal state
    setSeats(prev => prev.map(seat => 
      seat.index === index ? { ...seat, player: newPlayer } : seat
    ));
  };

  const containerClassName = className || 'w-full h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden';

  return (
    <div className={containerClassName}>
      <div className="relative w-full max-w-5xl aspect-[1.8/1]">
        
        {/* Felt */}
        <div className="absolute inset-0 m-12 bg-emerald-900 rounded-[50%] border-[14px] border-amber-950 shadow-2xl relative">
          <div className="absolute inset-0 border border-emerald-800/50 rounded-[50%]" />
          
          {/* Center Logo - Adjusted to be legible */}
          {showLogo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <div className="text-emerald-950 font-black text-6xl tracking-tighter transform">
                POKER
              </div>
            </div>
          )}
        </div>

        {/* Seats */}
        {seats.map((seat) => (
          <Seat
            key={seat.index}
            data={seat}
            x={positions[seat.index].x}
            y={positions[seat.index].y}
            onSit={handleSit}
          />
        ))}

      </div>
    </div>
  );
};