// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_ixHwSDvPUu-N56GPRBLhSrOQv_e06Bs",
  authDomain: "todo-app-17814.firebaseapp.com",
  projectId: "todo-app-17814",
  storageBucket: "todo-app-17814.firebasestorage.app",
  messagingSenderId: "862773230543",
  appId: "1:862773230543:web:34c4528dfbd9f3996d30ba",
  measurementId: "G-DQJB43J1SY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };