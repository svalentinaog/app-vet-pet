import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getIdToken
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBAOGtkq9UqqnGAUgXN8l9WLVIqZLAD-oY",
  authDomain: "app-vet-pet-ff124.firebaseapp.com",
  projectId: "app-vet-pet-ff124",
  storageBucket: "app-vet-pet-ff124.firebasestorage.app",
  messagingSenderId: "914502278527",
  appId: "1:914502278527:web:75135a52cbb2962a860e4a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error configurando la persistencia:", error);
});

export default app;

// =========== Inicio de sesión con E-mail y Contraseña =========== //
// export const signIn = (user: { email: string; password: string }) => {
//   return signInWithEmailAndPassword(auth, user.email, user.password);
// };

export const signIn = async (user: { email: string; password: string }) => {
  const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
  const token = await getIdToken(userCredential.user);

  // Establecer token en las cookies
  document.cookie = `auth-token=${token}; path=/;`;

  return userCredential;
};

export const firestore = getFirestore(app)