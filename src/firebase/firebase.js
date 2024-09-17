import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; 

const firebaseConfig = {
  apiKey: "AIzaSyCvjsm6-ypy2ka2SbUlf7_9qye8BOmz-3M",
  authDomain: "figopkay.firebaseapp.com",
  projectId: "figopkay",
  storageBucket: "figopkay.appspot.com",
  messagingSenderId: "706220257298",
  appId: "1:706220257298:web:3478f2818126b23beb68cb",
  measurementId: "G-7597FMGBKM"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app); 

export { auth, db, analytics, app };
