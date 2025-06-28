// src/app/[roomId]/page.tsx

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oda Sayfası',
};

// ✅ Doğru tanım: Next.js 15 uyumlu
type Props = {
  params: {
    roomId: string;
  };
};

export default function RoomPage({ params }: Props) {
  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Oda ID: {params.roomId}</h1>
      <p>Dinamik rota başarıyla çalışıyor.</p>
    </div>
  );
}
