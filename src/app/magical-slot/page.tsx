'use client';

import React, { useState, useEffect } from 'react';
import './slot.css';

const SYMBOLS = [
  'karpuz.png',
  'kiraz.png',
  'limon.png',
  'yıldız.png',
  'zil.png',
  '7.png',
  'armut.png',
  'cin.png',
];

const COLUMNS = 6;
const VISIBLE_ROWS = 5;
const SPIN_FRAMES = 10;

const generateColumn = () => {
  const column = [];
  for (let i = 0; i < SPIN_FRAMES; i++) {
    column.push(Math.floor(Math.random() * SYMBOLS.length));
  }
  return column;
};

const generateGrid = () => Array.from({ length: COLUMNS }, () => generateColumn());

const playSound = (filename: string) => {
  const audio = new Audio(`/sounds/${filename}`);
  audio.play();
};

export default function MagicalSlot() {
  const [grid, setGrid] = useState(generateGrid());
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [totalWin, setTotalWin] = useState(0);
  const [spinResult, setSpinResult] = useState(0);
  const [spinBet, setSpinBet] = useState(1);
  const [freeBet, setFreeBet] = useState(100);
  const [freeSpinMode, setFreeSpinMode] = useState(false);
  const [freeSpinResults, setFreeSpinResults] = useState<number[]>([]);
  const [currentFreeSpin, setCurrentFreeSpin] = useState(0);

  const performSpin = (callback: (finalGrid: number[][], win: number) => void) => {
    const frames: number[][][] = [];
    for (let i = 0; i < SPIN_FRAMES; i++) {
      frames.push(generateGrid());
    }
    let frame = 0;
    const interval = setInterval(() => {
      setGrid(frames[frame]);
      frame++;
      if (frame >= frames.length) {
        clearInterval(interval);
        const finalGrid = generateGrid();
        setGrid(finalGrid);
        const kazanc = Math.floor(spinBet * (Math.random() * 0.85 + 0.25));
        callback(finalGrid, kazanc);
      }
    }, 100);
  };

  const handleSingleSpin = () => {
    if (spinning || balance < spinBet) return;
    setSpinning(true);
    playSound('spin.mp3');
    setBalance(prev => prev - spinBet);

    performSpin((_, win) => {
      setBalance(prev => prev + win);
      setTotalWin(prev => prev + win);
      setSpinResult(win);
      playSound('coin.mp3');
      setSpinning(false);
    });
  };

  const handleBuyFreeSpins = () => {
    if (spinning || balance < freeBet) return;
    setBalance(prev => prev - freeBet);
    const min = freeBet * 0.5;
    const max = freeBet * 1.2;
    const total = Math.floor(Math.random() * (max - min + 1) + min);
    const base = Math.floor(total / 15);
    const results = Array(15).fill(base);
    results[14] += total - base * 15;

    setFreeSpinResults(results);
    setFreeSpinMode(true);
    setCurrentFreeSpin(0);
    setSpinResult(0);
    setTotalWin(0);
  };

  useEffect(() => {
    if (freeSpinMode && currentFreeSpin < 15) {
      setSpinning(true);
      playSound('spin.mp3');
      performSpin((_, __) => {
        const kazanc = freeSpinResults[currentFreeSpin];
        setBalance(prev => prev + kazanc);
        setTotalWin(prev => prev + kazanc);
        setSpinResult(kazanc);
        playSound('coin.mp3');
        setCurrentFreeSpin(prev => prev + 1);
        setSpinning(false);
      });
    } else if (freeSpinMode && currentFreeSpin === 15) {
      setFreeSpinMode(false);
    }
  }, [freeSpinMode, currentFreeSpin]);

  return (
    <div className="slot-wrapper">
      <div className="slot-info-bar">
        <div className="slot-info-box">Kazanç: {spinResult.toFixed(2)} TL</div>
        <div className="slot-info-box">Toplam: {totalWin.toFixed(2)} TL</div>
        <div className="slot-info-box">Kalan Spin: {freeSpinMode ? 15 - currentFreeSpin : 0}</div>
      </div>

      <div className="slot-frame">
        <div className="slot-grid">
          {grid.map((column, colIndex) => (
            <div className="slot-column" key={colIndex}>
              {column.slice(0, VISIBLE_ROWS).map((symbolIndex, rowIndex) => (
                <img
                  key={`${rowIndex}-${colIndex}`}
                  src={`/symbols/${SYMBOLS[symbolIndex]}`}
                  alt="symbol"
                  className="slot-symbol"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="slot-controls">
        <div className="dropdowns">
          <label>
            🎰 Spin Bahis:
            <select value={spinBet} onChange={(e) => setSpinBet(Number(e.target.value))}>
              {[1,2,5,7.5,10,15,20,30,40,50,60,70,80,90,100].map(v => (
                <option key={v} value={v}>{v} TL</option>
              ))}
            </select>
          </label>

          <label>
            🎁 Free Spin Bahis:
            <select value={freeBet} onChange={(e) => setFreeBet(Number(e.target.value))}>
              {[100,200,300,400,500,600,700,800,900,1000].map(v => (
                <option key={v} value={v}>{v} TL</option>
              ))}
            </select>
          </label>
        </div>

        <div className="buttons">
          <button onClick={handleSingleSpin} disabled={spinning}>🎰 Spin</button>
          <button onClick={handleBuyFreeSpins} disabled={spinning}>🎁 15 Free Spin Satın Al</button>
        </div>
      </div>
    </div>
  );
}
