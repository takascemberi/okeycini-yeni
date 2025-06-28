import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oda Sayfası',
};

// ✅ Next.js 15.3+ uyumlu tür tanımı
export default function RoomPage({ params }: { params: { roomId: string } }) {
  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Oda ID: {params.roomId}</h1>
      <p>Dinamik rota başarıyla çalışıyor.</p>
    </div>
  );
}
