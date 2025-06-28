export default function RoomPage({ params }: { params: { roomId: string } }) {
  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
      <h1>Oda Sayfası</h1>
      <p>Oda ID: {params.roomId}</p>
    </div>
  );
}
