import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getIdToken,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
  signInWithPopup,
} from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAOGtkq9UqqnGAUgXN8l9WLVIqZLAD-oY",
  authDomain: "app-vet-pet-ff124.firebaseapp.com",
  projectId: "app-vet-pet-ff124",
  storageBucket: "app-vet-pet-ff124.firebasestorage.app",
  messagingSenderId: "914502278527",
  appId: "1:914502278527:web:75135a52cbb2962a860e4a",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Configuración de persistencia
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error configurando la persistencia:", error);
});

// ======================= INICIO DE SESIÓN ======================= //}
// Función para iniciar sesión con E-mail y Contraseña
export const signIn = async (user: { email: string; password: string }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );

  // Obtener el token de ID de Firebase
  const token = await getIdToken(userCredential.user);

  // Guardar token en las cookies
  document.cookie = `auth-token=${token}; path=/;`;

  return userCredential;
};

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Obtener el token de ID de Firebase
    const token = await getIdToken(user);

    // Guardar token en las cookies
    document.cookie = `auth-token=${token}; path=/;`;
    console.log("Usuario autenticado con Google:", user);

    return user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};

// ======================= REGISTRO DE USUARIO ======================= //

// Función para regisrarse
export const signUp = async ({
  email,
  password,
  name,
  phone,
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  const auth = getAuth();
  try {
    // Verificar si el correo electrónico ya está en uso
    const existingUser = await fetchSignInMethodsForEmail(auth, email);
    if (existingUser.length > 0) {
      throw new Error("Este correo electrónico ya está registrado.");
    }

    // Si el correo no está en uso, continuar con el registro
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, {
      displayName: name,
    });

    await setDoc(doc(firestore, "users", firebaseUser.uid), {
      name,
      phone,
      email,
      uid: firebaseUser.uid,
      role: "user",
      profilePictureUrl: firebaseUser.photoURL || "",
      createdAt: new Date(),
    });

    const token = await getIdToken(firebaseUser);
    document.cookie = `auth-token=${token}; path=/;`;

    return userCredential;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw error;
  }
};
