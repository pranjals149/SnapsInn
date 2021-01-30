import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCRtVJHf7mQKYJIMBE12ad-WSHDIpLFnIE",
    authDomain: "snapsinn-b3aaf.firebaseapp.com",
    projectId: "snapsinn-b3aaf",
    storageBucket: "snapsinn-b3aaf.appspot.com",
    messagingSenderId: "98971363530",
    appId: "1:98971363530:web:d9cc7baa2c16cd81f86c33",
    measurementId: "G-PPEC87QHRV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
