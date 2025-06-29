'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export default function HomePage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    try {
      if (isRegistering) {
        if (password !== passwordConfirm) {
          setError('Şifreler uyuşmuyor.');
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        setInfo('Kayıt başarılı! Artık giriş yapabilirsiniz.');
        setIsRegistering(false);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setInfo('Giriş başarılı!');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Lütfen e-posta girin.');
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f3f3f3' }}>
      <div style={{ background: '#fff', padding: 30, borderRadius: 12, boxShadow: '0 0 15px rgba(0,0,0,0.1)', width: 400 }}>
        <h2 style={{ textAlign: 'center' }}>{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          {isRegistering && (
            <input
              type="password"
              placeholder="Şifre (Tekrar)"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              style={inputStyle}
            />
          )}
          <button type="submit" style={buttonStyle}>
            {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </form>

        {!isRegistering && (
          <button onClick={handleForgotPassword} style={{ ...linkButton, marginTop: 10 }}>
            Şifremi Unuttum
          </button>
        )}

        <p style={{ marginTop: 15, textAlign: 'center' }}>
          {isRegistering ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?'}{' '}
          <button onClick={() => setIsRegistering(!isRegistering)} style={linkButton}>
            {isRegistering ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </p>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {info && <p style={{ color: 'green', textAlign: 'center' }}>{info}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  background: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer',
};

const linkButton = {
  background: 'none',
  border: 'none',
  color: '#0070f3',
  cursor: 'pointer',
  fontSize: '14px',
};
