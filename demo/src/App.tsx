import React, { useState } from 'react';
import { PokerTable, PokerTable9Player, SeatState, Player } from '../../index';

function App() {
  const [activeTable, setActiveTable] = useState<'10seat' | '9seat'>('10seat');
  const [dealerPosition, setDealerPosition] = useState(0);

  // Example: Pre-populate some seats for testing
  const initialSeats10: SeatState[] = [
    { index: 0 }, // Dealer
    { index: 1, player: { id: '1', name: 'Alice', stack: 5000 } },
    { index: 2, player: { id: '2', name: 'Bob', stack: 3000 }, isHero: true },
    { index: 3, player: { id: '3', name: 'Charlie', stack: 7500 } },
    { index: 4 },
    { index: 5 },
    { index: 6 },
    { index: 7 },
    { index: 8 },
    { index: 9 },
  ];

  const initialSeats9: SeatState[] = [
    { index: 0, player: { id: '1', name: 'Alice', stack: 5000 } },
    { index: 1, player: { id: '2', name: 'Bob', stack: 3000 }, isHero: true },
    { index: 2, player: { id: '3', name: 'Charlie', stack: 7500 } },
    { index: 3 },
    { index: 4 },
    { index: 5 },
    { index: 6 },
    { index: 7 },
    { index: 8 },
  ];

  const handleSit = (index: number, player: Player) => {
    console.log(`Player ${player.name} sat at seat ${index}`);
  };

  const moveDealerButton = () => {
    setDealerPosition((prev) => (prev + 1) % 9);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Controls */}
      <div className="fixed top-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTable('10seat')}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                activeTable === '10seat'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              10-Seat Table
            </button>
            <button
              onClick={() => setActiveTable('9seat')}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                activeTable === '9seat'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              9-Player Table
            </button>
          </div>

          {activeTable === '9seat' && (
            <button
              onClick={moveDealerButton}
              className="px-4 py-2 rounded bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition-colors"
            >
              Move Dealer Button (Current: {dealerPosition})
            </button>
          )}

          <div className="ml-auto text-sm text-slate-400">
            Click empty seats to add players
          </div>
        </div>
      </div>

      {/* Table Display */}
      <div className="pt-24">
        {activeTable === '10seat' ? (
          <PokerTable
            initialSeats={initialSeats10}
            onSit={handleSit}
            showLogo={true}
          />
        ) : (
          <PokerTable9Player
            initialSeats={initialSeats9}
            dealerButtonPosition={dealerPosition}
            onSit={handleSit}
            showLogo={true}
          />
        )}
      </div>
    </div>
  );
}

export default App;
