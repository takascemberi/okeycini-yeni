'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');
  const router = useRouter();

  const girisYap = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata('');

    try {
      const sonuc = await signInWithEmailAndPassword(auth, email, sifre);
      const kullanici = sonuc.user;

      if (kullanici.email === 'admin@okeycini.com') {
        router.push('/admin');
      } else {
        setHata('❌ Bu sayfaya sadece admin erişebilir.');
      }
    } catch (err) {
      setHata('❌ Giriş başarısız. E-posta veya şifre hatalı.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={girisYap} className="bg-[#111] p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Admin Girişi</h2>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Admin e-posta"
          className="w-full p-2 mb-4 rounded text-black"
          required
        />
        <input
          type="password"
          value={sifre}
          onChange={e => setSifre(e.target.value)}
          placeholder="Şifre"
          className="w-full p-2 mb-4 rounded text-black"
          required
        />
        {hata && <p className="text-red-500 mb-2 text-sm">{hata}</p>}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
