// Main exports - 10-seat table (with physical dealer seat)
export { PokerTable } from './PokerTable10seat';
export type { PokerTableProps } from './PokerTable10seat';

// 9-player table (with virtual dealer button)
export { PokerTable9Player } from './PokerTable09seat';
export type { PokerTable9PlayerProps } from './PokerTable09seat';

// Types
export type { Player, SeatState } from './types';
export { isDealerSeat } from './types';

// Hook (if users want to customize positioning)
export { useTablePositions } from './useTablePositions';

// Components (if users want to customize)
export { Seat } from './Seat';
export { DealerButton } from './DealerButton';