/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (isRegistering) {
      if (password !== passwordConfirm) {
        setError('Şifreler uyuşmuyor.');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        setInfo('Kayıt başarılı! Giriş yapabilirsiniz.');
        setIsRegistering(false);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user.displayName !== username) {
          setError('Kullanıcı adı eşleşmiyor.');
          return;
        }
        setInfo('Giriş başarılı!');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setInfo('Şifre sıfırlama e-postası gönderildi.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, background: 'rgba(255,255,255,0.9)', borderRadius: 10 }}>
      <h2>{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Şifre (Tekrar)"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
        )}
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
        </button>
      </form>

      {!isRegistering && (
        <button onClick={handleForgotPassword} style={{ marginTop: 10, background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          Şifremi Unuttum
        </button>
      )}

      <p style={{ marginTop: 10 }}>
        {isRegistering ? 'Zaten hesabın var mı?' : 'Hesabın yok mu?'}{' '}
        <button type="button" onClick={() => setIsRegistering(!isRegistering)} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isRegistering ? 'Giriş yap' : 'Kayıt ol'}
        </button>
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {info && <p style={{ color: 'green' }}>{info}</p>}
    </div>
  );
}
