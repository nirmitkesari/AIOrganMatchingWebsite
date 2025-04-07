// scripts/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdAZtcznGNsuYvI6HmLLHRBdIwo3mb4MU",
  authDomain: "aiorganmatchingsystem.firebaseapp.com",
  projectId: "aiorganmatchingsystem",
  databaseURL: "https://aiorganmatchingsystem-default-rtdb.firebaseio.com",
  storageBucket: "aiorganmatchingsystem.appspot.com",
  messagingSenderId: "68131913364",
  appId: "1:68131913364:web:1c0a666f10fb02d9513e81",
  measurementId: "G-ZPPM0XBWM4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
