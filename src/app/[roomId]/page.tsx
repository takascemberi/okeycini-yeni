// src/app/[roomId]/page.tsx

interface RoomPageProps {
  params: Promise<{ roomId: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const resolvedParams = await params;
  const { roomId } = resolvedParams;

  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Oda ID: {roomId}</h1>
      <p>Dinamik rota çalışıyor.</p>
    </div>
  );
}
