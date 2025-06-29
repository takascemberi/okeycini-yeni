'use client';

import React, { useState, useEffect } from 'react';
import './slot.css'; // Stilleri ayırdık (aşağıda vereceğim)

const SYMBOLS = ['🍒', '🔔', '💎', '🍋', '⭐', '🧞']; // 🧞 özel sembol (Cin)

const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

const generateGrid = () => {
  return Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => getRandomSymbol())
  );
};

export default function MagicalSlot() {
  const [grid, setGrid] = useState(generateGrid());
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(10000);
  const [freeSpins, setFreeSpins] = useState(0);
  const [message, setMessage] = useState('');

  const spin = () => {
    if (spinning) return;

    if (freeSpins === 0 && balance < 100) {
      setMessage('Yetersiz bakiye!');
      return;
    }

    setSpinning(true);
    setMessage('🎰 Dönüyor...');

    setTimeout(() => {
      const newGrid = generateGrid();
      setGrid(newGrid);

      const flat = newGrid.flat();
      const cinCount = flat.filter((s) => s === '🧞').length;

      let kazanc = 0;
      if (cinCount >= 5) {
        setFreeSpins((prev) => prev + 5);
        kazanc = Math.floor(Math.random() * 1000 + 500);
        setBalance((prev) => prev + kazanc);
        setMessage(`🎁 Tebrikler! 5 Cin yakaladınız. +5 Free Spin! Kazanç: ${kazanc} TL`);
      } else {
        kazanc = Math.floor(Math.random() * 400 + 100);
        setBalance((prev) => prev + kazanc);
        setMessage(`+${kazanc} TL kazandınız!`);
      }

      if (freeSpins > 0) {
        setFreeSpins((prev) => prev - 1);
      } else {
        setBalance((prev) => prev - 100);
      }

      setSpinning(false);
    }, 1000);
  };

  return (
    <div className="slot-container">
      <h1>🧞 Büyülü Slot</h1>
      <p>💰 Bakiye: {balance} TL | 🎁 Free Spin: {freeSpins}</p>
      <div className="slot-grid">
        {grid.map((row, rowIndex) =>
          row.map((symbol, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="slot-box">
              {symbol}
            </div>
          ))
        )}
      </div>
      <button className="spin-button" onClick={spin} disabled={spinning}>
        {freeSpins > 0 ? '🎁 Free Spin' : '🎰 Spin'}
      </button>
      {message && <p className="slot-message">{message}</p>}
    </div>
  );
}
