import { 
    initializeApp 
  } from 'firebase/app';
  
  import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
  } from 'firebase/auth';
  
  const firebaseConfig = {
    apiKey: "AIzaSyBzU7dLk_3DshfKF_QhnyCZD1Ee49bney8",
    authDomain: "freshalert-11a35.firebaseapp.com",
    projectId: "freshalert-11a35",
    storageBucket: "freshalert-11a35.firebasestorage.app",
    messagingSenderId: "344392765156",
    appId: "1:344392765156:web:73ad4b05b521eeb5d126f1",
    measurementId: "G-5QL89SDHWC"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  export { 
      auth, 
      provider, 
      signInWithPopup,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      sendEmailVerification
  };