'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState<number>(10000); // test bakiyesi
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [ticker, setTicker] = useState('');

  // Giriş kontrolü
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  // Ticker rastgele yazı üretici
  useEffect(() => {
    const generateRandomWin = () => {
      const names = ['Ayşe', 'Mehmet', 'Ali', 'Zeynep', 'Ahmet'];
      const name = names[Math.floor(Math.random() * names.length)];
      const amount = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
      setTicker(`${name} ${amount.toLocaleString()} TL kazandı!`);
    };

    generateRandomWin();
    const interval = setInterval(generateRandomWin, 180000); // 3 dakika
    return () => clearInterval(interval);
  }, []);

  // Canlı mesaj simülasyonu
  const handleRequest = (type: 'Yatırma' | 'Çekme') => {
    setShowChat(true);
    const mesaj = `Kullanıcı ${type.toLowerCase()} talebi gönderdi.`;
    setMessages((prev) => [...prev, mesaj]);
    setTimeout(() => {
      setMessages((prev) => [...prev, 'Müşteri temsilcilerimiz şu anda meşgul, en kısa sürede size dönüş yapılacaktır.']);
    }, 500); // 0.5 saniye sonra sistem mesajı
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div
      style={{
        backgroundImage: "url('/lobi.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        color: '#fff',
      }}
    >
      {/* Üst bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Sol: kullanıcı bilgisi */}
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 8 }}>
          <p>👤 {user?.displayName || user?.email}</p>
          <p>💰 Bakiye: {balance.toLocaleString()} TL</p>
        </div>

        {/* Sağ: butonlar */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleLogout} style={btn}>Çıkış</button>
          <button onClick={() => handleRequest('Yatırma')} style={btn}>Para Yatır</button>
          <button onClick={() => handleRequest('Çekme')} style={btn}>Para Çek</button>
        </div>
      </div>

      {/* Ortadaki başlık */}
      <h1 style={{ textAlign: 'center', marginTop: 100, fontSize: '2.5rem', textShadow: '2px 2px 4px black' }}>
        Okey Cini'ne Hoş Geldiniz
      </h1>

      {/* Ticker */}
      <div style={{ background: 'rgba(0,0,0,0.7)', padding: 10, borderRadius: 8, overflow: 'hidden' }}>
        <marquee>{ticker}</marquee>
      </div>

      {/* Mesaj kutusu */}
      {showChat && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#fff', color: '#000', padding: 15, borderRadius: 10, width: 300, maxHeight: 200, overflowY: 'auto' }}>
          <strong>Canlı Destek</strong>
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx} style={{ fontSize: 14, marginTop: 5 }}>• {msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Neden bizi seçmelisiniz */}
      <div style={{ marginTop: 40, background: 'rgba(0,0,0,0.6)', padding: 20, borderRadius: 12 }}>
        <h3>Neden Bizi Seçmelisiniz?</h3>
        <ul>
          <li>⚡ Anlık para yatırma ve çekme işlemleri</li>
          <li>🎲 Gerçek oyun deneyimi ve yüksek güvenlik</li>
          <li>💬 7/24 canlı destek ile yanınızdayız</li>
        </ul>
      </div>
    </div>
  );
}

const btn = {
  padding: '8px 16px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#ffd700',
  color: '#000',
  cursor: 'pointer',
  fontWeight: 'bold',
};
