'use client';

import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '@/firebase/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';

export default function AdminPanel() {
  const [kullanicilar, setKullanicilar] = useState<any[]>([]);
  const [arama, setArama] = useState('');
  const [filtrelenmis, setFiltrelenmis] = useState<any[]>([]);
  const [mesaj, setMesaj] = useState('');
  const [seciliKullanici, setSeciliKullanici] = useState<any | null>(null);
  const [adminMesajlar, setAdminMesajlar] = useState<any[]>([]);
  const [yeniSifre, setYeniSifre] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const kullanicilariGetir = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const liste: any[] = [];
      snapshot.forEach(doc => liste.push({ id: doc.id, ...doc.data() }));
      setKullanicilar(liste);
      setFiltrelenmis(liste);
    };
    kullanicilariGetir();

    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const gelen: any[] = [];
      snapshot.forEach(doc => gelen.push({ id: doc.id, ...doc.data() }));
      setAdminMesajlar(gelen);

      const okunmamisVar = gelen.some(m => m.unreadForAdmin);
      if (okunmamisVar && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.warn('Ses çalınamadı:', e));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (arama.trim() === '') {
      setFiltrelenmis(kullanicilar);
    } else {
      const filtre = kullanicilar.filter(k => k.username.toLowerCase().includes(arama.toLowerCase()));
      setFiltrelenmis(filtre);
    }
  }, [arama, kullanicilar]);

  const mesajGonder = async () => {
    if (seciliKullanici && mesaj.trim() !== '') {
      const ref = doc(db, 'messages', seciliKullanici.id);
      await setDoc(ref, {
        users: ['admin', seciliKullanici.id],
        unreadForAdmin: false,
        messages: [{ text: mesaj, sender: 'admin', timestamp: serverTimestamp() }],
      }, { merge: true });
      alert(`\uD83D\uDCE8 ${seciliKullanici.username} kullanıcısına mesaj gönderildi: ${mesaj}`);
      setMesaj('');
    }
  };

  const bakiyeEkle = async (uid: string, miktar: number) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      balance: kullanicilar.find(k => k.id === uid).balance + miktar
    });
    alert(`\u2705 ${miktar} TL eklendi!`);
    window.location.reload();
  };

  const bakiyeCek = async (uid: string, miktar: number) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      balance: kullanicilar.find(k => k.id === uid).balance - miktar
    });
    alert(`\uD83D\uDCB8 ${miktar} TL çekildi!`);
    window.location.reload();
  };

  const kullaniciSil = async (uid: string) => {
    const onay = confirm('Bu kullanıcıyı silmek istediğine emin misin?');
    if (onay) {
      await deleteDoc(doc(db, 'users', uid));
      alert('\u274C Kullanıcı silindi');
      window.location.reload();
    }
  };

  const sifreDegistir = async () => {
    try {
      if (auth.currentUser && yeniSifre.trim().length >= 6) {
        await updatePassword(auth.currentUser, yeniSifre);
        alert('\uD83D\uDD10 Şifre başarıyla değiştirildi');
        setYeniSifre('');
      } else {
        alert('Şifre en az 6 karakter olmalı');
      }
    } catch (err) {
      alert('Hata: Şifre değiştirilemedi');
    }
  };

  const mesajSil = async (id: string) => {
    await deleteDoc(doc(db, 'messages', id));
    alert('\uD83D\uDDD1️ Mesaj geçmişi silindi');
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <audio ref={audioRef} src="/message-alert.mp3" preload="auto" />

      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎛️ Admin Paneli</h1>

      <input
        type="text"
        placeholder="Kullanıcı adıyla ara..."
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        style={{ padding: '0.5rem 1rem', borderRadius: '8px', marginBottom: '1rem', width: '300px' }}
      />

      {adminMesajlar.map((m) => (
        <div key={m.id} style={{ background: m.unreadForAdmin ? 'darkred' : '#222', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
          <strong>{kullanicilar.find(k => k.id === m.id)?.username || 'Bilinmeyen Kullanıcı'}</strong>
          {m.unreadForAdmin && <span style={{ marginLeft: '1rem', color: 'yellow' }}>📩 Okunmamış</span>}
          <button onClick={() => mesajSil(m.id)} style={{ float: 'right', ...buton }}>❌</button>
        </div>
      ))}

      <div style={{ marginTop: '1rem' }}>
        {filtrelenmis.map(k => (
          <div key={k.id} style={{ padding: '1rem', border: '1px solid #444', borderRadius: '10px', marginBottom: '1rem' }}>
            <strong>{k.username}</strong> - Bakiye: {k.balance} TL
            <div style={{ fontSize: '0.85rem', color: '#ccc' }}>Oynandı: {k.stats?.played || 0}, Kazanıldı: {k.stats?.won || 0}</div>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => setSeciliKullanici(k)} style={buton}>💬 Mesaj Gönder</button>
              <button onClick={() => bakiyeEkle(k.id, 1000)} style={buton}>+1000 TL</button>
              <button onClick={() => bakiyeCek(k.id, 1000)} style={buton}>-1000 TL</button>
              <button onClick={() => kullaniciSil(k.id)} style={{ ...buton, backgroundColor: 'red', color: 'white' }}>🗑️ Sil</button>
            </div>
          </div>
        ))}
      </div>

      {seciliKullanici && (
        <div style={{ marginTop: '2rem', backgroundColor: '#222', padding: '1rem', borderRadius: '10px' }}>
          <h3>{seciliKullanici.username} kullanıcısına mesaj gönder</h3>
          <textarea
            value={mesaj}
            onChange={(e) => setMesaj(e.target.value)}
            rows={3}
            placeholder="Mesajınızı yazın..."
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', marginBottom: '1rem' }}
          />
          <br />
          <button onClick={mesajGonder} style={buton}>Gönder</button>
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        <h3>🔐 Admin Şifre Değiştir</h3>
        <input
          type="password"
          value={yeniSifre}
          onChange={(e) => setYeniSifre(e.target.value)}
          placeholder="Yeni şifre"
          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '6px' }}
        />
        <button onClick={sifreDegistir} style={buton}>Şifreyi Güncelle</button>
      </div>
    </div>
  );
}

const buton: React.CSSProperties = {
  backgroundColor: '#ffcc00',
  color: '#000',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};
