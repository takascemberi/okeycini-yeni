'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      // Eğer kullanıcı adı girdiyse, email formatına dönüştür
      const email = emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@okeycini.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.displayName) {
        localStorage.setItem('kullaniciAdi', user.displayName);
      }
      localStorage.setItem('uid', user.uid);

      router.push('/home');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          setErrorMsg('Şifre hatalı.');
          break;
        case 'auth/user-not-found':
          setErrorMsg('Kullanıcı bulunamadı.');
          break;
        default:
          setErrorMsg('Giriş yapılamadı. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/casino-bg.jpg.png')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">🎰 Okey Cini Giriş</h2>

        {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Kullanıcı Adı veya E-Posta"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Giriş Yap
        </button>

        <p
          onClick={() => router.push('/register')}
          className="mt-4 text-center text-blue-700 underline cursor-pointer"
        >
          Hesabınız yok mu? Kayıt olun
        </p>

        <p
          onClick={() => alert('Şifre sıfırlama ileride eklenecek.')}
          className="mt-2 text-center text-sm text-gray-600 cursor-pointer"
        >
          Şifremi unuttum
        </p>
      </div>
    </div>
  );
}
