import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oda Sayfası',
};

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

export default function RoomPage({ params }: RoomPageProps) {
  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Oda ID: {params.roomId}</h1>
      <p>Dinamik rota başarıyla çalışıyor.</p>
    </div>
  );
}
