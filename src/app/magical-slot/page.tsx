/* Yeni slot oyunu yapısına göre kodlar: 6x8 slot, meyve sembolleri, şık çerçeve, dropdown seçimi */

'use client';

import React, { useEffect, useState } from 'react';
import './slot.css';

const SYMBOLS = [
  'karpuz.png',
  'kiraz.png',
  'limon.png',
  'yildiz.png',
  'zil.png',
  '7.png',
  'armut.png',
  'cin.png'
];

const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
const COLUMNS = 6;
const ROWS = 8;

export default function MagicalSlot() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [spinning, setSpinning] = useState(false);
  const [spinBet, setSpinBet] = useState(1);
  const [freeSpinBet, setFreeSpinBet] = useState(100);
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState('');
  const [spinGain, setSpinGain] = useState(0);
  const [totalGain, setTotalGain] = useState(0);
  const [remainingSpins, setRemainingSpins] = useState(0);
  const [autoSpins, setAutoSpins] = useState<number[]>([]);

  useEffect(() => {
    const generateGrid = () => {
      return Array.from({ length: COLUMNS }, () =>
        Array.from({ length: ROWS }, () => getRandomSymbol())
      );
    };
    setGrid(generateGrid());
  }, []);

  const performSpin = (isFree = false) => {
    if (spinning) return;
    const bet = isFree ? freeSpinBet : spinBet;
    if (!isFree && balance < bet) return;

    setSpinning(true);
    if (!isFree) setBalance((prev) => prev - bet);

    const generateGrid = () => {
      return Array.from({ length: COLUMNS }, () =>
        Array.from({ length: ROWS }, () => getRandomSymbol())
      );
    };

    const gain = isFree
      ? Math.floor(Math.random() * ((freeSpinBet * 1.2) - (freeSpinBet * 0.5)) + freeSpinBet * 0.5) / 15
      : parseFloat((Math.random() * bet * 1.1 + bet * 0.1).toFixed(2));

    setTimeout(() => {
      setGrid(generateGrid());
      setSpinGain(gain);
      setTotalGain((prev) => prev + gain);
      setBalance((prev) => prev + gain);
      setMessage(`+${gain.toFixed(2)} TL kazandınız!`);
      setSpinning(false);
    }, 1000);
  };

  const handleSpin = () => {
    performSpin(false);
  };

  const handleFreeSpinPurchase = () => {
    if (spinning || balance < freeSpinBet) return;
    setBalance((prev) => prev - freeSpinBet);

    const min = freeSpinBet * 0.5;
    const max = freeSpinBet * 1.2;
    const total = Math.floor(Math.random() * (max - min + 1) + min);
    const base = Math.floor(total / 15);
    const spins = Array(15).fill(base);
    spins[14] += total - base * 15;

    setAutoSpins(spins);
    setRemainingSpins(15);
    setMessage('🎁 15 Free Spin Başlıyor...');
  };

  useEffect(() => {
    if (remainingSpins > 0 && autoSpins.length) {
      const timeout = setTimeout(() => {
        performSpin(true);
        setRemainingSpins((prev) => prev - 1);
        setAutoSpins((prev) => prev.slice(1));
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [remainingSpins, autoSpins]);

  return (
    <div className="slot-wrapper">
      <img src="/slotarkapilan.png" alt="background" className="slot-bg" />
      <div className="slot-frame">
        <div className="slot-overlay">
          <div className="slot-info-bar">
            <div>Kazanç: {spinGain.toFixed(2)} TL</div>
            <div>Toplam: {totalGain.toFixed(2)} TL</div>
            <div>Kalan Spin: {remainingSpins}</div>
          </div>
          <div className="slot-grid">
            {grid.map((col, colIndex) => (
              <div key={colIndex} className="slot-column">
                {col.map((symbol, rowIndex) => (
                  <img
                    key={rowIndex}
                    src={`/symbols/${symbol}`}
                    className="slot-symbol"
                    alt="symbol"
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="slot-controls">
            <div className="dropdowns">
              <label>
                🎰 Spin Bahsi:
                <select
                  value={spinBet}
                  onChange={(e) => setSpinBet(parseFloat(e.target.value))}
                >
                  {[1, 2, 5, 7.5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
                    <option key={v} value={v}>{v} TL</option>
                  ))}
                </select>
              </label>
              <label>
                🎁 Free Spin:
                <select
                  value={freeSpinBet}
                  onChange={(e) => setFreeSpinBet(parseInt(e.target.value))}
                >
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((v) => (
                    <option key={v} value={v}>{v} TL</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="buttons">
              <button onClick={handleSpin} disabled={spinning}>🎰 Spin</button>
              <button onClick={handleFreeSpinPurchase} disabled={spinning}>🎁 15 Free Spin Satın Al</button>
            </div>

            {message && <div className="slot-message">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
