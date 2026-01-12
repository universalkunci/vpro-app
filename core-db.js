import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, setDoc, doc, deleteDoc, query 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// PASTIKAN INI ADALAH DATA DARI FIREBASE CONSOLE ANDA
const firebaseConfig = {
    apiKey: "AIzaSy...", 
    authDomain: "project-id.firebaseapp.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "...",
    appId: "..."
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
