'use client';

import React, { useEffect, useState } from 'react';

const SYMBOLS = ['🍒', '🔔', '💎', '🍋', '⭐', '🧞']; // 6 farklı sembol, cin (🧞) özel

const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

const generateSlotGrid = () => {
  return Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => getRandomSymbol())
  );
};

export default function MagicalSlotPage() {
  const [grid, setGrid] = useState<string[][]>(generateSlotGrid());
  const [balance, setBalance] = useState(10000);
  const [freeSpins, setFreeSpins] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('');

  const handleSpin = () => {
    if (isSpinning) return;

    if (freeSpins === 0 && balance < 100) {
      setMessage('Bakiyeniz yetersiz!');
      return;
    }

    setIsSpinning(true);
    setMessage('Çeviriliyor...');

    setTimeout(() => {
      const newGrid = generateSlotGrid();
      setGrid(newGrid);

      let cinCount = 0;
      newGrid.forEach((row) => {
        row.forEach((symbol) => {
          if (symbol === '🧞') cinCount++;
        });
      });

      let kazanc = 0;
      if (cinCount >= 5) {
        setFreeSpins(prev => prev + 5);
        kazanc = Math.floor(Math.random() * 1500 + 500);
        setBalance(prev => prev + kazanc);
        setMessage(`🎁 5 Free Spin kazandınız ve ${kazanc} TL ödül!`);
      } else {
        kazanc = Math.floor(Math.random() * 400 + 100);
        setBalance(prev => prev + kazanc);
        setMessage(`${kazanc} TL kazandınız!`);
      }

      if (freeSpins > 0) {
        setFreeSpins(prev => prev - 1);
      } else {
        setBalance(prev => prev - 100); // Normal spin ücreti
      }

      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/magical-slot-board.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧞‍♂️ Büyülü Slot Oyunu</h1>
      <div style={{ marginBottom: '1rem' }}>
        💰 Bakiye: {balance} TL | 🎁 Free Spins: {freeSpins}
      </div>

      {/* Slot Alanı */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 60px)',
          gap: '10px',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1rem',
        }}
      >
        {grid.flat().map((symbol, index) => (
          <div
            key={index}
            style={{
              fontSize: '2rem',
              width: '60px',
              height: '60px',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: '0 0 5px rgba(0,0,0,0.5)',
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        style={{
          backgroundColor: '#ffcc00',
          color: '#000',
          padding: '0.75rem 1.5rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: '0 0 8px black',
        }}
      >
        {freeSpins > 0 ? '🎁 Free Spin Kullan' : '🎰 Spin'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#ffeb3b' }}>
          {message}
        </p>
      )}
    </div>
  );
}
