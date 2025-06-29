'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const semboller = ['🧞', '🍒', '🔔', '🍋', '💎', '7️⃣']; // Cin ve klasik slot sembolleri

const SLOT_ROWS = 5;
const SLOT_COLS = 6;

export default function MagicalSlotGame() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [freeSpins, setFreeSpins] = useState(0);
  const [message, setMessage] = useState('');

  const spin = () => {
    const newGrid: string[][] = [];
    let cinSayisi = 0;

    for (let row = 0; row < SLOT_ROWS; row++) {
      const rowArr: string[] = [];
      for (let col = 0; col < SLOT_COLS; col++) {
        const sembol = semboller[Math.floor(Math.random() * semboller.length)];
        if (sembol === '🧞') cinSayisi++;
        rowArr.push(sembol);
      }
      newGrid.push(rowArr);
    }

    setGrid(newGrid);

    if (cinSayisi >= 5) {
      setFreeSpins(freeSpins + 5);
      setMessage(`🎁 Tebrikler! ${cinSayisi} Cin yakaladınız. +5 Free Spin!`);
    } else {
      setMessage('');
    }
  };

  const handleSpinClick = () => {
    if (freeSpins > 0) {
      setFreeSpins(freeSpins - 1);
      spin();
    } else {
      spin();
    }
  };

  return (
    <div style={{
      backgroundImage: 'url("/magical-slot-board.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '4rem',
      textAlign: 'center',
      color: 'white',
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>🎰 Büyülü Slot</h1>

      <div style={{ marginBottom: '1rem' }}>
        <strong>🎟 Free Spins:</strong> {freeSpins}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${SLOT_COLS}, 60px)`,
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '1rem',
      }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              fontSize: '2rem',
              borderRadius: '8px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ffc107',
              boxShadow: '0 0 8px black',
            }}>
              {cell}
            </div>
          ))
        )}
      </div>

      {message && <div style={{ marginBottom: '1rem', fontWeight: 'bold', color: 'lightgreen' }}>{message}</div>}

      <button onClick={handleSpinClick} style={{
        backgroundColor: '#ffcc00',
        color: '#000',
        fontWeight: 'bold',
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
      }}>
        🎲 {freeSpins > 0 ? 'Free Spin Kullan' : 'Spin'}
      </button>
    </div>
  );
}
