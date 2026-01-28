import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDrIrPK8_-BB59F1KcQRtbWWTOCHKy_Xfo",
  authDomain: "udaipur-hackathon.firebaseapp.com",
  projectId: "udaipur-hackathon",
  storageBucket: "udaipur-hackathon.firebasestorage.app",
  messagingSenderId: "575480004847",
  appId: "1:575480004847:web:203b182891f71e53bb5b1a",
  measurementId: "G-87E38TF9XT"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
