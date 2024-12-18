// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAOGtkq9UqqnGAUgXN8l9WLVIqZLAD-oY",
  authDomain: "app-vet-pet-ff124.firebaseapp.com",
  projectId: "app-vet-pet-ff124",
  storageBucket: "app-vet-pet-ff124.firebasestorage.app",
  messagingSenderId: "914502278527",
  appId: "1:914502278527:web:75135a52cbb2962a860e4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener autenticación y Firestore
export const auth = getAuth(app);

export default app;

// ================ Auth Functions ================ //

// ================ Sign In - Email and Password ================ //
export const signIn = (user: { email: string; password: string }) => {
  return signInWithEmailAndPassword(auth, user.email, user.password);
};

// export const signIn = (
//   user: { email?: string; password?: string },
//   providerType?: "google" | "facebook"
// ) => {
//   if (providerType) {
//     // Sign In with Google or Facebook
//     const provider =
//       providerType === "google"
//         ? new GoogleAuthProvider()
//         : new FacebookAuthProvider();
//     return signInWithPopup(auth, provider);
//   } else if (user.email && user.password) {
//     // Sign In with Email and Password
//     return signInWithEmailAndPassword(auth, user.email, user.password);
//   } else {
//     throw new Error("Invalid parameters");
//   }
// };

export const firestore = getFirestore(app)