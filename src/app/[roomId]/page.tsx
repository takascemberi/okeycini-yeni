'use client';

import { useParams } from 'next/navigation';

export default function RoomPage() {
  const { roomId } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Room: {roomId}</h1>
      <p>This is Ozkan&apos;s dynamic game room page.</p>
    </div>
  );
}
