import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCIFGVe8rYbtty5qnkYFIg-0OUJhnU0LpI",
    authDomain: "iic-development.firebaseapp.com",
    projectId: "iic-development",
    storageBucket: "iic-development.appspot.com",
    messagingSenderId: "264501829712",
    appId: "1:264501829712:web:dba679ac95f127ecfb7155",
    measurementId: "G-7X4LT5GKJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function auth_CheckUser(userId) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            userId(uid);
        } else {
            userId(null);
        }
    });
}
export function auth_SignIn(email, password, success) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            success(true);
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            success(false);
            alert(errorMessage);
        });
}
export function auth_SignOut(success) {
    signOut(auth).then(() => {
        success(true)
    }).catch((error) => {
        alert("Something bad happened.");
    });
}