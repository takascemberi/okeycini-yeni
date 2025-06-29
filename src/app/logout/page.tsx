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
        router.push('/login');
      } catch (error) {
        console.error('Çıkış hatası:', error);
      }
    };

    çıkışYap();
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', color: 'white' }}>
      Çıkış yapılıyor...
    </div>
  );
}
