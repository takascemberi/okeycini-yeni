interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
      <h1>Oda Sayfası</h1>
      <p>Oda ID: {params.roomId}</p>
    </div>
  );
}
