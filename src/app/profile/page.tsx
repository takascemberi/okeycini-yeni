'use client';

import React, { useEffect, useState } from 'react';
import { auth, storage } from '@/firebase/firebaseConfig';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (user && selectedFile) {
      const fileRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(fileRef, selectedFile);
      const photoURL = await getDownloadURL(fileRef);
      await user.updateProfile({ photoURL });
      alert('✅ Profil resmi güncellendi!');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== repeatNewPassword) {
      alert('❌ Yeni şifreler eşleşmiyor!');
      return;
    }
    if (user && currentPassword.length >= 6 && newPassword.length >= 6) {
      try {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert('✅ Şifre başarıyla güncellendi!');
        setCurrentPassword('');
        setNewPassword('');
        setRepeatNewPassword('');
      } catch (error) {
        alert('❌ Mevcut şifre hatalı!');
      }
    } else {
      alert('⚠️ Tüm şifre alanları en az 6 karakter olmalı.');
    }
  };

  if (!user) return <p style={{ color: 'white', textAlign: 'center' }}>Yükleniyor...</p>;

  return (
    <div style={{
      backgroundImage: 'url(/lobi.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem',
      color: '#fff'
    }}>
      <div style={{ maxWidth: '500px', margin: 'auto', background: 'rgba(0,0,0,0.6)', borderRadius: '15px', padding: '2rem', boxShadow: '0 0 10px black' }}>
        <h2 style={{ textAlign: 'center' }}>👤 Oyuncu Profili</h2>
        
        <img
          src={previewUrl || user.photoURL || '/default-avatar.png'}
          alt="Profil"
          style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', margin: '1rem auto', display: 'block' }}
        />

        <input type="file" onChange={handleFileChange} style={{ marginBottom: '1rem' }} />
        <button onClick={handleUpload} style={btnStyle}>📤 Fotoğraf Yükle</button>

        <hr style={{ margin: '2rem 0', borderColor: '#ffcc00' }} />

        <input
          type="password"
          placeholder="Mevcut Şifre"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Yeni Şifre"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Yeni Şifre Tekrar"
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleChangePassword} style={btnStyle}>🔒 Şifreyi Güncelle</button>

        <button onClick={() => router.push('/')} style={{ ...btnStyle, marginTop: '2rem', backgroundColor: '#4caf50', color: 'white' }}>
          🏠 Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  backgroundColor: '#ffcc00',
  color: '#000',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '0.5rem',
  width: '100%'
};

const inputStyle: React.CSSProperties = {
  padding: '0.6rem',
  width: '100%',
  marginBottom: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  color: '#000'
};
