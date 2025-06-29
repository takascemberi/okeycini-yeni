// src/app/home/page.tsx

'use client';

import React, { useEffect, useState } from 'react';

const kazananlarListesi = [
  'Ayşe 15.000 TL kazandı',
  'Irina 17.000 TL kazandı',
  'Ahmet 12.000 TL kazandı',
  'Yannis 19.000 TL kazandı',
  'Mustafa 14.500 TL kazandı',
  'Elena 13.200 TL kazandı',
  'Dimitri 20.000 TL kazandı',
  'Ali 18.750 TL kazandı',
  'Murat 16.000 TL kazandı',
  'Svetlana 19.500 TL kazandı'
];

export default function HomePage() {
  const [kazananMesaji, setKazananMesaji] = useState('');

  useEffect(() => {
    const guncelle = () => {
      const rastgele = kazananlarListesi[Math.floor(Math.random() * kazananlarListesi.length)];
      setKazananMesaji(rastgele);
    };
    guncelle();
    const interval = setInterval(guncelle, 180000); // 3 dakikada bir
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url(/lobi.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
        padding: '1rem',
        position: 'relative'
      }}
    >
      {/* Kayan kazanan yazısı */}
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '0.5rem',
          marginBottom: '1rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          animation: 'marquee 15s linear infinite',
          borderRadius: '12px'
        }}
      >
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
        <span>{kazananMesaji}</span>
      </div>

      {/* Üst sağ butonlar */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '1rem' }}>
        <button style={buttonStyle}>Çıkış</button>
        <button style={buttonStyle}>Para Yatır</button>
        <button style={buttonStyle}>Para Çek</button>
      </div>

      {/* Üst sol profil */}
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <button style={buttonStyle}>👤 Profil (Mevcut Bakiye: 7600 TL)</button>
      </div>

      {/* Orta karşılama yazısı */}
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '2rem' }}>🎉 Okey Cini'ne Hoş Geldiniz 🎉</h1>

      {/* "Neden bizi seçmelisiniz?" kutuları */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
          textAlign: 'center'
        }}
      >
        {[
          '7/24 canlı destek ve güvenli para işlemleri',
          'Gerçek zamanlı oyun keyfi ve yüksek kazanç fırsatları',
          'Modern arayüz, kolay kullanım ve zengin oyun çeşitliliği'
        ].map((neden, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '1rem',
              borderRadius: '12px',
              width: '250px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              marginBottom: '2rem'
            }}
          >
            {neden}
          </div>
        ))}
      </div>

      {/* Sabit sağ alt köşede canlı destek mesaj baloncuğu */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#fff',
          color: '#000',
          padding: '0.75rem 1rem',
          borderRadius: '999px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          zIndex: 999,
          cursor: 'pointer'
        }}
      >
        💬 Canlı Destek
      </div>
    </div>
  );
}

// Button Style
const buttonStyle = {
  backgroundColor: '#ffcc00',
  color: '#000',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  transition: 'background-color 0.3s',
  fontWeight: 'bold'
};
