import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, setDoc, doc, deleteDoc, query 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// PASTIKAN INI ADALAH DATA DARI FIREBASE CONSOLE ANDA
  const firebaseConfig = {
    apiKey: "AIzaSyA4ChRlnwmYxo63hVXQUngUzcGyNQWAvP0",
    authDomain: "universal-group-app.firebaseapp.com",
    projectId: "universal-group-app",
    storageBucket: "universal-group-app.firebasestorage.app",
    messagingSenderId: "541279253826",
    appId: "1:541279253826:web:79b009baf88da9cf4e44db"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const CloudDB = {
    async set(col, id, data) { 
        try { return await setDoc(doc(db, col, id), data, { merge: true }); }
        catch (e) { alert("Gagal Simpan: " + e.message); throw e; }
    },
    async add(col, data) { 
        try { return await addDoc(collection(db, col), data); }
        catch (e) { alert("Gagal Tambah: " + e.message); throw e; }
    },
    async getAll(col) {
        try {
            const snap = await getDocs(collection(db, col));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) { 
            console.error("Gagal Ambil Data:", e); 
            return []; 
        }
    },
    async delete(col, id) { return await deleteDoc(doc(db, col, id)); }
};

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

export const CloudAuth = {
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            alert("Login Gagal: " + error.message);
        }
    }
};


