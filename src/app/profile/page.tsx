'use client';

import React, { useEffect, useState } from 'react';
import { auth, storage } from '@/firebase/firebaseConfig';
import { updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      alert('Profil resmi güncellendi!');
    }
  };

  const handleChangePassword = async () => {
    if (user && newPassword.length >= 6) {
      await updatePassword(user, newPassword);
      alert('Şifre güncellendi!');
      setNewPassword('');
    } else {
      alert('Şifre en az 6 karakter olmalı.');
    }
  };

  if (!user) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto', color: '#fff' }}>
      <h2>Profil Bilgileri</h2>
      <img
        src={previewUrl || user.photoURL || '/default-avatar.png'}
        alt="Profil"
        style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={btnStyle}>📤 Fotoğraf Yükle</button>

      <hr style={{ margin: '2rem 0' }} />

      <input
        type="password"
        placeholder="Yeni Şifre"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleChangePassword} style={btnStyle}>🔒 Şifreyi Güncelle</button>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  backgroundColor: '#ffcc00',
  color: '#000',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '0.5rem'
};
