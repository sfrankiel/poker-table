export interface Player {
  id: string;
  name: string;
  stack: number;
  avatarUrl?: string;
}

export interface SeatState {
  index: number; // For 10-seat: 0 is Dealer, 1-9 are Players. For 9-seat: 0-8 are all Players
  player?: Player;
  isHero?: boolean;
}

export const isDealerSeat = (index: number) => index === 0;