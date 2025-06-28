interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const { roomId } = params;

  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Oda ID: {roomId}</h1>
      <p>Dinamik rota çalışıyor.</p>
    </div>
  );
}
