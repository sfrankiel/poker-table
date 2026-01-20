# Poker Table Components

Self-contained React components for rendering beautiful poker tables. Built with TypeScript, React, and Tailwind CSS.



## Features

- 🎰 **Two Table Types**: 
  - **10-Seat Table**: 1 physical dealer position (seat 0) + 9 player seats (seats 1-9)
  - **9-Player Table**: 9 player seats with a virtual dealer button that can be positioned anywhere
- 🎨 **Beautiful Design**: Realistic poker table with felt texture, chip tray, and dealer button
- 📱 **Responsive**: Positions calculated as percentages for perfect scaling
- 🎯 **TypeScript**: Fully typed for better developer experience
- 🎮 **Interactive**: Click empty seats to add players

## Installation

### Option 1: Copy Files Directly

Copy all files from this directory into your project:

```
your-project/
  └── components/
      └── PokerTable/
          ├── index.ts
          ├── PokerTable10seat.tsx    # 10-seat table
          ├── PokerTable09seat.tsx    # 9-player table
          ├── Seat.tsx
          ├── DealerButton.tsx        # Virtual dealer button
          ├── types.ts
          └── useTablePositions.ts
```

### Option 2: Import as Package

If you're using this as a package, import from the main entry point:

```typescript
import { PokerTable } from './path-to-poker-table';
```

## Dependencies

This component requires:

- **React** (^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0)
- **Tailwind CSS** - Must be configured in your project

Make sure Tailwind CSS is set up in your project. If you're using Vite, you can add it with:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Basic Usage

### 10-Seat Table (with Physical Dealer)

```tsx
import { PokerTable } from './components/PokerTable';

function App() {
  return (
    <div className="app">
      <PokerTable />
    </div>
  );
}

export default App;
```

### 9-Player Table (with Virtual Dealer Button)

```tsx
import { PokerTable9Player } from './components/PokerTable';

function App() {
  return (
    <div className="app">
      <PokerTable9Player dealerButtonPosition={0} />
    </div>
  );
}

export default App;
```

## Props

The `PokerTable` component accepts the following optional props:

```typescript
interface PokerTableProps {
  /** Initial seat states. If not provided, all seats start empty. */
  initialSeats?: SeatState[];
  /** Custom handler when a player sits down. If not provided, uses default behavior. */
  onSit?: (index: number, player: Player) => void;
  /** Custom className for the outer container */
  className?: string;
  /** Whether to show the center "POKER" logo. Default: true */
  showLogo?: boolean;
}
```

### Examples

#### Controlled Component with Custom Handler

```tsx
import { PokerTable, SeatState, Player } from './components/PokerTable';
import { useState } from 'react';

function App() {
  const [seats, setSeats] = useState<SeatState[]>(
    Array.from({ length: 10 }, (_, i) => ({ index: i }))
  );

  const handleSit = (index: number, player: Player) => {
    // Custom logic - e.g., validate, save to backend, etc.
    console.log(`Player ${player.name} sat at seat ${index}`);
    
    setSeats(prev => prev.map(seat => 
      seat.index === index ? { ...seat, player } : seat
    ));
  };

  return (
    <PokerTable 
      initialSeats={seats}
      onSit={handleSit}
    />
  );
}
```

#### Custom Styling

```tsx
<PokerTable 
  className="w-full h-[600px] bg-gray-900"
  showLogo={false}
/>
```

#### Pre-populated Seats

```tsx
const initialSeats: SeatState[] = [
  { index: 0 }, // Dealer
  { index: 1, player: { id: '1', name: 'Alice', stack: 5000 } },
  { index: 2, player: { id: '2', name: 'Bob', stack: 3000 }, isHero: true },
  { index: 3 },
  // ... rest empty
];

<PokerTable initialSeats={initialSeats} />
```

### 9-Player Table Props

The `PokerTable9Player` component accepts the following optional props:

```typescript
interface PokerTable9PlayerProps {
  /** Initial seat states. If not provided, all seats start empty. */
  initialSeats?: SeatState[];
  /** Position of the dealer button (0-8). Default: 0 */
  dealerButtonPosition?: number;
  /** Custom handler when a player sits down. If not provided, uses default behavior. */
  onSit?: (index: number, player: Player) => void;
  /** Custom className for the outer container */
  className?: string;
  /** Whether to show the center "POKER" logo. Default: true */
  showLogo?: boolean;
}
```

#### 9-Player Table Examples

```tsx
import { PokerTable9Player, SeatState, Player } from './components/PokerTable';
import { useState } from 'react';

function App() {
  const [dealerPosition, setDealerPosition] = useState(0);
  const [seats, setSeats] = useState<SeatState[]>(
    Array.from({ length: 9 }, (_, i) => ({ index: i }))
  );

  const handleSit = (index: number, player: Player) => {
    setSeats(prev => prev.map(seat => 
      seat.index === index ? { ...seat, player } : seat
    ));
  };

  // Move dealer button to next position
  const moveDealerButton = () => {
    setDealerPosition(prev => (prev + 1) % 9);
  };

  return (
    <div>
      <PokerTable9Player 
        initialSeats={seats}
        dealerButtonPosition={dealerPosition}
        onSit={handleSit}
      />
      <button onClick={moveDealerButton}>Move Dealer Button</button>
    </div>
  );
}
```

## Seat Layout

### 10-Seat Table Layout

The 10-seat table positions seats in a circular arrangement:

- **Seat 0**: Dealer position at **top center** (-90° / 270°)
- **Seats 1-9**: Player seats distributed clockwise around the table

The positioning starts at the top center (seat 0) and distributes the remaining 9 seats evenly in a clockwise direction, creating a symmetrical layout.

### 9-Player Table Layout

The 9-player table positions 9 player seats in a circular arrangement:

- **Seats 0-8**: All are player seats, distributed evenly around the table
- **Virtual Dealer Button**: A visual indicator that can be positioned at any seat (0-8)

The positioning starts at the top center (seat 0) and distributes all 9 seats evenly in a clockwise direction. The dealer button is a separate visual element that overlays the table and can be moved programmatically.

### Position Calculation

Positions are calculated using polar coordinates:

**10-Seat Table:**
- Starting angle: `-90°` (top center)
- Step size: `36°` per seat (360° / 10 seats)

**9-Player Table:**
- Starting angle: `-90°` (top center)
- Step size: `40°` per seat (360° / 9 seats)

Both table types return positions as percentages (x%, y%) for responsive scaling.

## Type Definitions

### Player

```typescript
interface Player {
  id: string;
  name: string;
  stack: number;
  avatarUrl?: string;
}
```

### SeatState

```typescript
interface SeatState {
  index: number; // 0 is Dealer, 1-9 are Players
  player?: Player;
  isHero?: boolean; // Highlight the hero player
}
```

## Component Modes

The `PokerTable` component can be used in two modes:

### Uncontrolled (Default)

When no `onSit` prop is provided, the component manages its own state internally:

```tsx
<PokerTable />
```

Players can click empty seats to sit down, and the component handles the state automatically.

### Controlled

When you provide an `onSit` handler, you take control of the state management:

```tsx
<PokerTable 
  initialSeats={seats}
  onSit={handleSit}
/>
```

This is useful when you need to:
- Validate players before they sit
- Save state to a backend
- Integrate with your game logic
- Prevent certain players from sitting

## Advanced Usage

### Accessing Types and Utilities

```typescript
import { 
  PokerTable,
  PokerTableProps,
  PokerTable9Player,
  PokerTable9PlayerProps,
  Player, 
  SeatState, 
  isDealerSeat,
  useTablePositions 
} from './components/PokerTable';

// Check if a seat is the dealer
if (isDealerSeat(seatIndex)) {
  // Handle dealer seat
}
```

### Custom Positioning

If you need to customize the table layout, you can use the `useTablePositions` hook:

```typescript
import { useTablePositions } from './components/PokerTable';

const positions = useTablePositions(
  10,    // totalSeats
  42,    // xRadius (percentage)
  38     // yRadius (percentage)
);
```

### Iterating Through Player Seats

When cycling through players (e.g., moving the dealer button), remember to skip seat 0:

```typescript
const getNextPlayerSeat = (currentIndex: number): number => {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= 10) nextIndex = 0; // Wrap around
  
  if (nextIndex === 0) return 1; // SKIP DEALER (seat 0)
  return nextIndex;
};
```

## Component Structure

- **PokerTable10seat.tsx**: 10-seat table component (with physical dealer seat)
- **PokerTable09seat.tsx**: 9-player table component (with virtual dealer button)
- **Seat.tsx**: Individual seat component (dealer chip tray or player circle)
- **DealerButton.tsx**: Virtual dealer button component for 9-player tables
- **useTablePositions.ts**: Hook that calculates circular seat positions
- **types.ts**: TypeScript type definitions and utility functions
- **index.ts**: Main export file for easy imports

## Styling

The component uses Tailwind CSS classes. The table features:

- Dark slate background (`bg-slate-950`)
- Emerald green felt (`bg-emerald-900`)
- Amber wood border (`border-amber-950`)
- Responsive sizing with aspect ratio preservation

All styling is self-contained within the component files.
## Credits

Code generated by AI 26-01-19: 
Gemini 3 Pro and Cursor 2.3.41

## License

MIT
