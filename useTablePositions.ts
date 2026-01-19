import { useMemo } from 'react';

interface Position {
  x: number;
  y: number;
  rotation: number;
}

export const useTablePositions = (
  totalSeats: number = 10, // 0 (Dealer) + 9 Players
  xRadius: number = 42,
  yRadius: number = 38
) => {
  return useMemo(() => {
    const positions: Position[] = [];

    // STARTING ANGLE: -90 degrees (Top Center) in radians
    const startAngle = -Math.PI / 2;
    
    // STEP: Full circle divided by seats
    const step = (2 * Math.PI) / totalSeats;

    for (let i = 0; i < totalSeats; i++) {
      // Clockwise direction = Adding to the angle
      const angle = startAngle + (i * step);

      const x = 50 + xRadius * Math.cos(angle);
      const y = 50 + yRadius * Math.sin(angle);

      // Rotation logic:
      // We want the seats to 'face' the center.
      // At top (-90deg), rotation should be 180 (upside down) or 0? 
      // Usually, top seat faces down (180), bottom faces up (0).
      const rotation = (angle * 180) / Math.PI + 90;

      positions.push({ x, y, rotation });
    }

    return positions;
  }, [totalSeats, xRadius, yRadius]);
};