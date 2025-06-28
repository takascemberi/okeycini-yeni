// src/app/[roomId]/page.tsx
interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Oda ID: {params.roomId}</h1>
      <p>Dinamik rota başarılı şekilde çalışıyor.</p>
    </div>
  );
}
