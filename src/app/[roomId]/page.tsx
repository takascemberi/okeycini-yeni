// src/app/[roomId]/page.tsx

type PageProps = {
  params: {
    roomId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { roomId } = params;

  // Burada async işlemler yapabilirsin, örnek:
  // const data = await fetch(...);

  return (
    <main>
      <h1>Oda ID'si: {roomId}</h1>
      {/* Diğer içerikler buraya */}
    </main>
  );
}
