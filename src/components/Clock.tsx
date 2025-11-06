import React, { useEffect, useState } from 'react';
import { Box } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';

export const Clock: React.FC = () => {
  const { mode } = useColorScheme();
  // angles state for smooth animation
  const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 });
  const rafRef = React.useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const d = new Date(now);
      const ms = d.getMilliseconds();
      const seconds = d.getSeconds() + ms / 1000;
      const minutes = d.getMinutes() + seconds / 60;
      const hours = (d.getHours() % 12) + minutes / 60;

      const sAngle = seconds * 6; // 360/60
      const mAngle = minutes * 6;
      const hAngle = hours * 30; // 360/12

      setAngles({ h: hAngle, m: mAngle, s: sAngle });
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // color tokens tuned for dark and light modes
  const colors = mode === 'dark'
    ? {
        faceFill: 'rgba(255,255,255,0.02)',
        tick: 'rgba(255,255,255,0.08)',
        hand: '#e6e6e6',
        second: '#ff6b6b',
        center: '#e6e6e6'
      }
    : {
        faceFill: 'rgba(0,0,0,0.04)',
        tick: 'rgba(0,0,0,0.3)',
        hand: '#111827',
        second: '#c21807',
        center: '#111827'
      };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }} aria-label="Analog clock">
      <svg viewBox="-50 -50 100 100" width="160" height="160" role="img" aria-hidden="false">
        {/* clock face */}
        <defs>
          <radialGradient id="faceGrad" cx="50%" cy="45%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.06" />
          </radialGradient>
        </defs>
  <circle cx="0" cy="0" r="48" fill={colors.faceFill} strokeOpacity="0.06" stroke={colors.tick} />

        {/* hour ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = Math.sin(angle) * 40;
          const y1 = -Math.cos(angle) * 40;
          const x2 = Math.sin(angle) * 46;
          const y2 = -Math.cos(angle) * 46;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={0.9} strokeWidth={2} stroke={colors.tick} />;
        })}

        {/* minute ticks (thin) */}
        {Array.from({ length: 60 }).map((_, i) => {
          if (i % 5 === 0) return null;
          const angle = (i / 60) * Math.PI * 2;
          const x1 = Math.sin(angle) * 42;
          const y1 = -Math.cos(angle) * 42;
          const x2 = Math.sin(angle) * 46;
          const y2 = -Math.cos(angle) * 46;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={0.5} strokeWidth={0.8} stroke={colors.tick} />;
        })}

        {/* hands groups centered at 0,0 */}
        <g transform={`rotate(${angles.h})`}>
          <rect x={-3} y={-2} width={6} height={30} rx={2} fill={colors.hand} />
        </g>

        <g transform={`rotate(${angles.m})`}>
          <rect x={-2} y={-3} width={4} height={38} rx={2} fill={colors.hand} />
        </g>

        <g transform={`rotate(${angles.s})`}>
          <rect x={-0.8} y={-3} width={1.6} height={44} rx={1} fill={colors.second} />
        </g>

        {/* center pin */}
        <circle cx="0" cy="0" r="2.5" fill={colors.center} />
      </svg>
    </Box>
  );
};