import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvt1z7-C0NObnNPfL2pq2MzoYRnVIrq2s",
    authDomain: "nutrifind-22427.firebaseapp.com",
    projectId: "nutrifind-22427",
    storageBucket: "nutrifind-22427.appspot.com",
    messagingSenderId: "307075155693",
    appId: "1:307075155693:web:57d4ead38348cd642daee4",
    measurementId: "G-CG1RHQHP09"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;