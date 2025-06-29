'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Okey Cini</h1>
      <p>Hoş geldin! <Link href="/auth/login">Giriş yapmak için tıkla</Link></p>
    </div>
  );
}
