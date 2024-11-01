import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    UserCredential 
} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore 
} from "firebase/firestore/lite";
import { toast } from "react-toastify";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyAnEi_JLA3DDhg_iCjTrp9tXtjujIbcQ3k",
  authDomain: "netflix-clone-3a636.firebaseapp.com",
  projectId: "netflix-clone-3a636",
  storageBucket: "netflix-clone-3a636.appspot.com",
  messagingSenderId: "656848152003",
  appId: "1:656848152003:web:d955bb651a207500854976"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// User Signup
const signup = async (name: string, email: string, password: string): Promise<void> => {
    try {
        const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error((error as { code: string }).code.split('/')[1].split('-').join(' ')); // Error message setup
    }
}


// User Login
const login = async (email: string, password: string): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error((error as { code: string }).code.split('/')[1].split('-').join(' '));
    }
}

const logout = (): void => {
    signOut(auth);
}
export {
    auth,
    login,
    signup,
    logout
}
