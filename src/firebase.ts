import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCR9SNz3fkcwlaprofkeXfxC0Dyv5q2m9U",
  authDomain: "udaipur-smartcity-hackth-1bcf5.firebaseapp.com",
  projectId: "udaipur-smartcity-hackth-1bcf5",
  storageBucket: "udaipur-smartcity-hackth-1bcf5.firebasestorage.app",
  messagingSenderId: "556643979051",
  appId: "1:556643979051:web:2515477af6977ca3c8ff6e",
  measurementId: "G-8P717DHW8E"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
