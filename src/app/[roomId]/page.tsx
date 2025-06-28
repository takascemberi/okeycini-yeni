export default function RoomPage({ params }: { params: { roomId: string } }) {
  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Oda ID: {params.roomId}</h1>
      <p>Bu, dinamik rota ile oluşturulmuş bir sayfadır.</p>
    </div>
  );
}
