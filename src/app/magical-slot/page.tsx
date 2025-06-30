'use client';

import React, { useState, useEffect } from 'react';
import './slot.css';

const SYMBOLS = ['🍒', '🔔', '💎', '🍋', '⭐', '🧞'];

const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

const generateGrid = () => {
  return Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => getRandomSymbol())
  );
};

const playSound = (filename: string) => {
  const audio = new Audio(`/sounds/${filename}`);
  audio.play();
};

export default function MagicalSlot() {
  const [grid, setGrid] = useState(generateGrid());
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState('');
  const [freeSpinMode, setFreeSpinMode] = useState(false);
  const [freeSpinResults, setFreeSpinResults] = useState<number[]>([]);
  const [currentFreeSpin, setCurrentFreeSpin] = useState(0);

  const handleSingleSpin = (amount: number) => {
    if (spinning || balance < amount) return;

    setSpinning(true);
    playSound('spin.mp3');
    setBalance(prev => prev - amount);

    setTimeout(() => {
      const kazanc = parseFloat((amount * (Math.random() * 0.85 + 0.25)).toFixed(2));
      setBalance(prev => prev + kazanc);
      playSound('coin.mp3');
      setMessage(`+${kazanc.toFixed(2)} TL kazandınız!`);
      setGrid(generateGrid());
      setSpinning(false);
    }, 1000);
  };

  const handleBuyFreeSpins = (amount: number) => {
    if (spinning || balance < amount) return;

    setBalance(prev => prev - amount);
    const min = amount * 0.5;
    const max = amount * 1.2;
    let total = Math.floor(Math.random() * (max - min + 1) + min);

    const results: number[] = [];
    for (let i = 0; i < 15; i++) {
      let spinAmount = Math.floor(Math.random() * 5 + 3); // 3–7 TL
      results.push(spinAmount);
    }

    // Dengele
    const sum = results.reduce((a, b) => a + b, 0);
    const fark = total - sum;
    results[14] += fark;

    setFreeSpinResults(results);
    setFreeSpinMode(true);
    setCurrentFreeSpin(0);
    setMessage(`🎁 Free Spin başladı! Bekleyin...`);
  };

  useEffect(() => {
    if (freeSpinMode && currentFreeSpin < 15) {
      setSpinning(true);
      playSound('spin.mp3');

      setTimeout(() => {
        setGrid(generateGrid());
        const kazanc = freeSpinResults[currentFreeSpin];
        setBalance(prev => prev + kazanc);
        setMessage(`🎁 Free Spin ${currentFreeSpin + 1}/15 → +${kazanc} TL`);
        playSound('coin.mp3');
        setCurrentFreeSpin(prev => prev + 1);
        setSpinning(false);
      }, 1200);
    } else if (freeSpinMode && currentFreeSpin === 15) {
      setFreeSpinMode(false);
      setMessage('🎉 Free Spin tamamlandı!');
    }
  }, [freeSpinMode, currentFreeSpin]);

  return (
    <div className="slot-container">
      <h1>🧞 Büyülü Slot</h1>
      <p>💰 Bakiye: {balance.toFixed(2)} TL</p>
      <div className="slot-grid">
        {grid.map((row, rowIndex) =>
          row.map((symbol, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="slot-box">
              {symbol}
            </div>
          ))
        )}
      </div>

      {!freeSpinMode && (
        <>
          <div className="spin-options">
            <button disabled={spinning} onClick={() => handleSingleSpin(100)}>🎰 100 TL Spin</button>
            <button disabled={spinning} onClick={() => handleSingleSpin(500)}>🎰 500 TL Spin</button>
            <button disabled={spinning} onClick={() => handleSingleSpin(1000)}>🎰 1000 TL Spin</button>
          </div>
          <div className="freespin-options">
            <button disabled={spinning} onClick={() => handleBuyFreeSpins(100)}>🎁 100 TL Free Spin</button>
            <button disabled={spinning} onClick={() => handleBuyFreeSpins(500)}>🎁 500 TL Free Spin</button>
            <button disabled={spinning} onClick={() => handleBuyFreeSpins(1000)}>🎁 1000 TL Free Spin</button>
          </div>
        </>
      )}

      {message && <p className="slot-message">{message}</p>}
    </div>
  );
}
