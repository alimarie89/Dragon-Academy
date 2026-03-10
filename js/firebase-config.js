// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEXAMPLE_REPLACE_WITH_YOUR_KEY",
  authDomain: "dragon-academy-xxx.firebaseapp.com",
  projectId: "dragon-academy-xxx",
  storageBucket: "dragon-academy-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
  .catch(err => {
    if (err.code == 'failed-precondition') {
      console.log('Offline persistence disabled - multiple tabs open');
    } else if (err.code == 'unimplemented') {
      console.log('Browser does not support offline persistence');
    }
  });
