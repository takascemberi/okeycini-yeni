import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebaseConfig';  // Firebase'den auth'yi import et
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';  // Firebase'den db'yi import et

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null); // Kullanıcı bilgilerini tutacak state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);

        // Firestore'dan kullanıcı verilerini al
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
      setLoading(false);
    };
    
    getUserData();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (!user) {
    return <p>Giriş yapılmamış.</p>; // Kullanıcı girişi yapılmamışsa
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto', color: '#fff' }}>
      <h2>Profil Bilgileri</h2>
      <img
        src={user.photoURL || '/default-avatar.png'}
        alt="Profil"
        style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
      />
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Kullanıcı Adı:</strong> {user.displayName || 'Kullanıcı adı yok'}
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>E-posta:</strong> {user.email}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Bakiye:</strong> {userData ? userData.balance : 'Yükleniyor...'} TL
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Oynanan Oyunlar:</strong> {userData ? userData.gamesPlayed : 'Yükleniyor...'}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Kazanılan Oyunlar:</strong> {userData ? userData.gamesWon : 'Yükleniyor...'}
      </div>
    </div>
  );
};

export default ProfilePage;
