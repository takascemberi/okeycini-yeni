'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import Link from 'next/link';

const winnerNames = [
  'Ayşe', 'Ahmet', 'Alex', 'John', 'Fatma', 'Yusuf', 'Maria', 'Olga', 'Hans', 'Mehmet',
  'Ali', 'Sophia', 'Mustafa', 'Anastasia', 'George', 'Ahmed', 'Zeynep', 'Vladimir', 'Sven', 'Murat',
  'Hassan', 'Eleni', 'Irina', 'Omar', 'Lena', 'Selim', 'Natalya', 'Jack', 'Emily', 'Deniz',
  'Tariq', 'Anna', 'Kerem', 'Ingrid', 'Furkan', 'Hülya', 'Ivan', 'Petra', 'Cem', 'Thomas',
  'Yara', 'Nikos', 'Leila', 'Berat', 'Mila', 'Stefan', 'Aliya', 'Okan', 'Emine', 'Jamal',
  'Khalid', 'Amina', 'Abdullah', 'Farah', 'Rami', 'Nour', 'Kareem', 'Salma', 'Mahmoud', 'Layla',
  'Zain', 'Rania', 'Amir', 'Nada', 'Yasin', 'Malak', 'Samir', 'Dalia', 'Tamer', 'Basma'
];

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [ticker, setTicker] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/auth/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      const name = winnerNames[Math.floor(Math.random() * winnerNames.length)];
      const amount = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
      setTicker(`${name} ${amount.toLocaleString()} TL kazandı! 🎉`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'url(/lobi.png)', backgroundSize: 'cover', padding: '1rem', color: 'white' }}>
      {/* Üst Menü */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{user?.displayName}</strong> | Bakiye: 10.000 TL
          <Link href="/profile"><button style={{ marginLeft: 10 }}>Profil</button></Link>
        </div>
        <div>
          <button onClick={() => setChatVisible(true)}>Para Yatır</button>
          <button onClick={() => setChatVisible(true)} style={{ marginLeft: 10 }}>Para Çek</button>
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>Çıkış</button>
        </div>
      </div>

      {/* Hoş geldiniz */}
      <h1 style={{ textAlign: 'center', marginTop: 40, fontSize: '2rem' }}>Okey Cini'ne Hoş Geldiniz</h1>

      {/* Kazananlar Şeridi */}
      <div style={{
        margin: '20px auto',
        padding: '10px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '1.2rem',
        animation: 'tickerMove 10s linear infinite',
        border: '2px solid gold',
        textAlign: 'center'
      }}>
        <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{ticker}</span>
      </div>

      {/* Neden Bizi Seçmelisiniz */}
      <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
        {[
          '✅ 7/24 canlı destek ve güvenli para işlemleri',
          '✅ Gerçek zamanlı oyun keyfi ve yüksek kazanç fırsatları',
          '✅ Modern arayüz, kolay kullanım ve zengin oyun çeşitliliği'
        ].map((text, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.85)', color: '#000', padding: '1rem', borderRadius: '12px', minWidth: 250 }}>
            {text}
          </div>
        ))}
      </div>

      {/* Canlı Mesaj Kutucuğu */}
      {chatVisible && (
        <div style={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          background: 'white',
          color: 'black',
          padding: '1rem',
          borderRadius: '12px',
          width: 300,
          zIndex: 999
        }}>
          <strong>Canlı Destek</strong>
          <p style={{ fontSize: '0.9rem', marginTop: 10 }}>Müşteri temsilcilerimiz şu anda meşgul, en kısa sürede size dönüş yapılacaktır.</p>
        </div>
      )}

      {/* Sabit Baloncuk */}
      <button
        onClick={() => setChatVisible(!chatVisible)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: '#FFD700',
          border: 'none',
          padding: '0.8rem 1rem',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 0 10px black'
        }}>
        💬
      </button>

      <style>{`
        @keyframes tickerMove {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
