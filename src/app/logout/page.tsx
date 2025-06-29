'use client';

import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const çıkışYap = async () => {
      try {
        await signOut(auth);
        router.push('/login'); // Giriş sayfasına yönlendirme
      } catch (error) {
        console.error('Çıkış hatası:', error);
      }
    };

    çıkışYap();
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'url(/lobi.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textShadow: '0 0 5px black'
    }}>
      Çıkış yapılıyor...
    </div>
  );
}
