import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, setDoc, doc, deleteDoc, query, orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    async set(col, id, data) { return await setDoc(doc(db, col, id), data, { merge: true }); },
    async add(col, data) { return await addDoc(collection(db, col), data); },
    async getAll(col) {
        const snap = await getDocs(collection(db, col));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async delete(col, id) { return await deleteDoc(doc(db, col, id)); }
};