'use client';

import React, { useState, useEffect } from 'react';
import './slot.css';

const SYMBOL_COUNT = 6;
const COLUMNS = 5;
const VISIBLE_ROWS = 3;
const SPIN_ROWS = 10;

const generateColumn = () => {
  const column = [];
  for (let i = 0; i < SPIN_ROWS; i++) {
    column.push(Math.floor(Math.random() * SYMBOL_COUNT));
  }
  return column;
};

const generateGrid = () => {
  return Array.from({ length: COLUMNS }, () => generateColumn());
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
  const [bet, setBet] = useState(100);
  const [freeSpinMode, setFreeSpinMode] = useState(false);
  const [freeSpinResults, setFreeSpinResults] = useState<number[]>([]);
  const [currentFreeSpin, setCurrentFreeSpin] = useState(0);

  const stopSpin = (finalGrid: number[][], callback: () => void) => {
    setTimeout(() => {
      setGrid(finalGrid);
      callback();
    }, 800);
  };

  const performSpin = (callback: (finalGrid: number[][], kazanc: number) => void) => {
    const spinFrames: number[][][] = [];
    for (let i = 0; i < 10; i++) {
      spinFrames.push(generateGrid());
    }
    let frame = 0;
    const interval = setInterval(() => {
      setGrid(spinFrames[frame]);
      frame++;
      if (frame >= spinFrames.length) {
        clearInterval(interval);
        const finalGrid = generateGrid();
        stopSpin(finalGrid, () => {
          callback(finalGrid, Math.floor(bet * (Math.random() * 0.85 + 0.25)));
        });
      }
    }, 100);
  };

  const handleSingleSpin = () => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    playSound('spin.mp3');
    setBalance(prev => prev - bet);

    performSpin((finalGrid, kazanc) => {
      setBalance(prev => prev + kazanc);
      playSound('coin.mp3');
      setMessage(`+${kazanc.toFixed(2)} TL kazandınız!`);
      setGrid(finalGrid);
      setSpinning(false);
    });
  };

  const handleBuyFreeSpins = () => {
    if (spinning || balance < bet) return;
    setBalance(prev => prev - bet);

    const min = bet * 0.5;
    const max = bet * 1.2;
    const total = Math.floor(Math.random() * (max - min + 1) + min);
    const base = Math.floor(total / 15);
    const results = Array(15).fill(base);
    results[14] += total - base * 15;

    setFreeSpinResults(results);
    setFreeSpinMode(true);
    setCurrentFreeSpin(0);
    setMessage(`🎁 Free Spin başladı!`);
  };

  useEffect(() => {
    if (freeSpinMode && currentFreeSpin < 15) {
      setSpinning(true);
      playSound('spin.mp3');

      performSpin((finalGrid, _) => {
        const kazanc = freeSpinResults[currentFreeSpin];
        setBalance(prev => prev + kazanc);
        playSound('coin.mp3');
        setMessage(`🎁 Free Spin ${currentFreeSpin + 1}/15 → +${kazanc} TL`);
        setGrid(finalGrid);
        setCurrentFreeSpin(prev => prev + 1);
        setSpinning(false);
      });
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
        {grid.map((column, colIndex) => (
          <div className="slot-column" key={colIndex}>
            {column.slice(0, VISIBLE_ROWS).map((symbol, rowIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={`slot-box symbol-${symbol}`}></div>
            ))}
          </div>
        ))}
      </div>

      {!freeSpinMode && (
        <>
          <select value={bet} onChange={(e) => setBet(Number(e.target.value))} disabled={spinning}>
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((v) => (
              <option key={v} value={v}>{v} TL</option>
            ))}
          </select>

          <div className="spin-options">
            <button onClick={handleSingleSpin} disabled={spinning}>🎰 Spin Yap</button>
            <button onClick={handleBuyFreeSpins} disabled={spinning}>🎁 15 Free Spin Satın Al</button>
          </div>
        </>
      )}

      {message && <p className="slot-message">{message}</p>}
    </div>
  );
}
