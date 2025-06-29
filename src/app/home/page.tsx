'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const [kazananMesaji, setKazananMesaji] = useState('');
  const [canliDestekGorunur, setCanliDestekGorunur] = useState(false);
  const [mesajlar, setMesajlar] = useState<string[]>([
    'Sistem: Müşteri temsilcilerimiz şu anda meşgul, en kısa sürede size dönüş yapılacaktır.'
  ]);
  const [yeniMesaj, setYeniMesaj] = useState('');

  const kazananlar = [
    'Abdullah 14024 TL kazandı', 'Amina 15872 TL kazandı', 'Boris 18485 TL kazandı', 'Dimitri 19695 TL kazandı',
    'Elena 15889 TL kazandı', 'Fatima 6950 TL kazandı', 'Georgios 5652 TL kazandı', 'Hüseyin 10779 TL kazandı',
    'Irina 17469 TL kazandı', 'Jessica 15797 TL kazandı', 'Khalid 11363 TL kazandı', 'Layla 16678 TL kazandı',
    'Mehmet 12504 TL kazandı', 'Mustafa 19670 TL kazandı', 'Nikos 6452 TL kazandı', 'Olga 6667 TL kazandı',
    'Paul 15228 TL kazandı', 'Robert 9636 TL kazandı', 'Sarah 12983 TL kazandı', 'Tatiana 7813 TL kazandı',
    'William 19837 TL kazandı', 'Yannis 7741 TL kazandı', 'Zainab 12573 TL kazandı', 'Zeynep 10760 TL kazandı',
    'Omar 13120 TL kazandı', 'Yusuf 13348 TL kazandı', 'Finn 5234 TL kazandı', 'Ivan 9811 TL kazandı',
    'Emily 16808 TL kazandı', 'Leon 6704 TL kazandı', 'John 5677 TL kazandı', 'Emma 18182 TL kazandı',
    'Christos 19491 TL kazandı', 'Linda 12841 TL kazandı', 'Lukas 7511 TL kazandı', 'Maria 14208 TL kazandı',
    'Mia 10466 TL kazandı', 'Mikhail 17088 TL kazandı', 'Nikolai 5115 TL kazandı', 'Panagiota 13306 TL kazandı',
    'Ali 15145 TL kazandı', 'Ahmet 17305 TL kazandı'
  ];

  useEffect(() => {
    const yenile = () => {
      const rastgele = kazananlar[Math.floor(Math.random() * kazananlar.length)];
      setKazananMesaji(rastgele);
    };
    yenile();
    const interval = setInterval(yenile, 180000);
    return () => clearInterval(interval);
  }, []);

  const mesajGonder = () => {
    if (yeniMesaj.trim() !== '') {
      setMesajlar([...mesajlar, 'Siz: ' + yeniMesaj]);
      setYeniMesaj('');
      setTimeout(() => {
        setMesajlar(prev => [...prev, 'Admin: Talebiniz alınmıştır, birazdan dönüş yapılacaktır.']);
      }, 2000);
    }
  };

  const oyunlar = [
    { ad: '🎰 Büyülü Slot', image: '/slot.png', link: '/magical-slot' },
    { ad: '🎲 Barbut', image: '/barbut.png', link: '/barbut' },
    { ad: '🀄 101 Okey', image: '/101.png', link: '/okey-101' },
    { ad: '🀄 Klasik Okey', image: '/klasikokey.png', link: '/klasik-okey' },
    { ad: '🎡 Rulet', image: '/rulet.png', link: '/rulet' }
  ];

  return (
    <div style={{
      backgroundImage: 'url(/lobi.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '1rem',
      position: 'relative',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Kayan Kazanan Mesajı */}
      <div style={{
        background: 'linear-gradient(to right, #ffeb3b, #ffc107, #ffeb3b)',
        color: 'black',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        animation: 'marquee 12s linear infinite',
        marginBottom: '1rem',
        fontWeight: 'bold',
        textShadow: '0 0 5px white'
      }}>
        🎉 {kazananMesaji}
      </div>

      {/* Butonlar */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '1rem' }}>
        <button onClick={() => setCanliDestekGorunur(true)} style={buttonStyle}>Para Yatır</button>
        <button onClick={() => setCanliDestekGorunur(true)} style={buttonStyle}>Para Çek</button>
        <button onClick={() => router.push('/logout')} style={buttonStyle}>Çıkış</button>
      </div>

      {/* Profil */}
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <button onClick={() => router.push('/profile')} style={buttonStyle}>
          👤 Profil (Mevcut Bakiye: 7600 TL)
        </button>
      </div>

      {/* Başlık */}
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '2.5rem' }}>
        🎰 Okey Cini'ne Hoş Geldiniz 🎰
      </h1>

      {/* Oyun Kartları */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
        {oyunlar.map((oyun, i) => (
          <div
            key={i}
            onClick={() => router.push(oyun.link)}
            style={{
              cursor: 'pointer',
              borderRadius: '12px',
              overflow: 'hidden',
              width: '300px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
            }}
          >
            <Image src={oyun.image} alt={oyun.ad} width={300} height={200} style={{ objectFit: 'cover' }} />
            <div style={{ padding: '1rem', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
              {oyun.ad}
            </div>
          </div>
        ))}
      </div>

      {/* Neden Bizi Seçmelisiniz */}
      <div style={{
        marginTop: '5rem',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderTop: '2px solid #ffc107',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#fff', animation: 'pulse 2s infinite', marginBottom: '2rem' }}>
          ✨ Neden Bizi Seçmelisiniz? ✨
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          {[
            '7/24 canlı destek ve güvenli para işlemleri',
            'Gerçek zamanlı oyun keyfi ve yüksek kazanç fırsatları',
            'Modern arayüz, kolay kullanım ve zengin oyun çeşitliliği',
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '12px',
              width: '300px',
              fontWeight: 'bold',
              color: '#fff'
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Canlı destek balonu */}
      <div
        onClick={() => setCanliDestekGorunur(!canliDestekGorunur)}
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
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        💬 Canlı Destek
      </div>

      {canliDestekGorunur && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '300px',
          backgroundColor: 'white',
          color: 'black',
          padding: '1rem',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0,0,0,0.4)',
          zIndex: 1000
        }}>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
            {mesajlar.map((mesaj, i) => {
              const isAdmin = mesaj.startsWith('Admin');
              return (
                <div key={i} style={{
                  backgroundColor: isAdmin ? '#4CAF50' : '#e0e0e0',
                  color: isAdmin ? 'white' : 'black',
                  borderRadius: '15px',
                  padding: '10px 15px',
                  margin: '5px 0',
                  boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                }}>
                  {mesaj}
                </div>
              );
            })}
          </div>
          <input
            type="text"
            value={yeniMesaj}
            onChange={(e) => setYeniMesaj(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && mesajGonder()}
            placeholder="Mesajınızı yazın..."
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>
      )}
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#ffcc00',
  color: '#000',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  boxShadow: '0 0 6px rgba(0,0,0,0.3)',
  transition: '0.3s',
};
