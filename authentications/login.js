import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, update, get} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { appContext } from "./userdata.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBXx524FbCHquq8PLLaabAq6DkSdG2pTXE",
    authDomain: "one-dsa.firebaseapp.com",
    databaseURL: "https://one-dsa-default-rtdb.firebaseio.com",
    projectId: "one-dsa",
    storageBucket: "one-dsa.appspot.com",
    messagingSenderId: "249051723719",
    appId: "1:249051723719:web:85278f48165a1d1ece8be2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

  

  const loginButton = document.getElementById('login');
  let username;
  loginButton.addEventListener('click', async (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    location.assign('index.html');

    if (user) {
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      });

      // Fetch additional user data
      const userRef = ref(database, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        username = userSnapshot.val().username;
        window.username = username;
        alert('Login successful. Username: ' + username);
      } else {
        alert('User data not found');
      }
    } else {
      // Handle the case where user is null
      alert('User not authenticated');
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  }
});

