// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFX7BWtHyr5nmV0rj36RgQz41qJ2NyRLo",
  authDomain: "okeycini-ea22e.firebaseapp.com",
  projectId: "okeycini-ea22e",
  storageBucket: "okeycini-ea22e.appspot.com", // ✅ DÜZELTİLDİ
  messagingSenderId: "102049886702",
  appId: "1:102049886702:web:befef059dfd2086d375eff",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
