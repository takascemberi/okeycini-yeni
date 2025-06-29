/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [balance, setBalance] = useState(10000);
  const [ticker, setTicker] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/');
      else setUser(currentUser);
    });

    const interval = setInterval(() => {
      const names = ['Ayşe', 'Mehmet', 'Ahmet', 'Zeynep', 'Fatma'];
      const name = names[Math.floor(Math.random() * names.length)];
      const amount = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
      setTicker(`${name} ${amount.toLocaleString()} TL kazandı!`);
    }, 180000); // 3 dakika

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, `Siz: ${newMessage}`]);
    setNewMessage('');
    setTimeout(() => {
      setMessages((prev) => [...prev, 'Müşteri temsilcilerimiz şu anda meşgul, en kısa sürede size dönüş yapılacaktır.']);
    }, 500);
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/lobi.png")',
        backgroundSize: 'cover',
        minHeight: '100vh',
        color: 'white',
        padding: 20,
        position: 'relative',
      }}
    >
      {/* Üst Alan */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{user?.displayName}</strong> | Bakiye: {balance.toLocaleString()} TL
        </div>
        <div>
          <button onClick={() => setShowChat(true)} style={buttonStyle}>Para Yatır</button>
          <button onClick={() => setShowChat(true)} style={buttonStyle}>Para Çek</button>
          <button onClick={handleLogout} style={{ ...buttonStyle, background: '#f00' }}>Çıkış</button>
        </div>
      </div>

      {/* Başlık */}
      <h1 style={{ textAlign: 'center', marginTop: 100 }}>Okey Cini'ne Hoş Geldiniz</h1>

      {/* Şerit */}
      <div style={{ position: 'absolute', top: 70, left: 0, width: '100%', textAlign: 'center', fontWeight: 'bold', background: '#0008', padding: 10 }}>
        {ticker}
      </div>

      {/* Sohbet Kutusu */}
      {showChat && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 300,
          background: '#000c',
          padding: 10,
          borderRadius: 8,
        }}>
          <h4>Canlı Destek</h4>
          <div style={{ maxHeight: 150, overflowY: 'auto', marginBottom: 10 }}>
            {messages.map((msg, idx) => <p key={idx}>{msg}</p>)}
          </div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Mesaj yaz..."
            style={{ width: '100%', padding: 6, marginBottom: 6 }}
          />
          <button onClick={handleSendMessage} style={buttonStyle}>Gönder</button>
        </div>
      )}

      {/* Neden Biz? */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: '60%',
        background: '#0008',
        padding: 20,
        borderRadius: 12,
      }}>
        <h3>Neden Bizi Seçmelisiniz?</h3>
        <ul>
          <li>✅ 7/24 canlı destek ve güvenli para işlemleri</li>
          <li>✅ Gerçek zamanlı oyun keyfi ve yüksek kazanç fırsatları</li>
          <li>✅ Modern arayüz, kolay kullanım ve zengin oyun çeşitliliği</li>
        </ul>
      </div>
    </div>
  );
}

const buttonStyle = {
  marginLeft: 10,
  padding: '6px 12px',
  background: '#0070f3',
  border: 'none',
  borderRadius: 6,
  color: 'white',
  cursor: 'pointer',
};
