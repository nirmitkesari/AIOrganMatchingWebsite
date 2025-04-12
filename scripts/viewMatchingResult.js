// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdAZtcznGNsuYvI6HmLLHRBdIwo3mb4MU",
  authDomain: "aiorganmatchingsystem.firebaseapp.com",
  databaseURL: "https://aiorganmatchingsystem-default-rtdb.firebaseio.com",
  projectId: "aiorganmatchingsystem",
  storageBucket: "aiorganmatchingsystem.appspot.com",
  messagingSenderId: "68131913364",
  appId: "1:68131913364:web:1c0a666f10fb02d9513e81",
  measurementId: "G-ZPPM0XBWM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

const tbody = document.querySelector("tbody");

// Fetch Donors and Recipients from Firebase
Promise.all([
  get(child(dbRef, "donors")),
  get(child(dbRef, "recipients"))
])
  .then(([donorsSnap, recipientsSnap]) => {
    if (!donorsSnap.exists() || !recipientsSnap.exists()) {
      tbody.innerHTML = `<tr><td colspan="7">No donor or recipient data found.</td></tr>`;
      return;
    }

    const donors = Object.values(donorsSnap.val());
    const recipients = Object.values(recipientsSnap.val());
    console.log("donor " , donors);
    console.log("recipient ", recipients);

    let matchFound = false;

    recipients.forEach(recipient => {
      donors.forEach(donor => {
        // Normalize values for comparison
        const bloodGroupMatch = donor.bloodGroup?.trim().toUpperCase() === recipient.bloodGroup?.trim().toUpperCase();
        const organMatch = donor.organ?.trim().toLowerCase() === recipient.organ?.trim().toLowerCase();
        const ageDiff = Math.abs(parseInt(donor.age) - parseInt(recipient.age));

        if (bloodGroupMatch && organMatch && ageDiff <= 10) {
          matchFound = true;

          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${recipient.name}</td>
            <td>${donor.name}</td>
            <td>${donor.bloodGroup}</td>
            <td>${donor.organ}</td>
            <td>${donor.age}</td>
            <td>${recipient.age}</td>
            <td>${donor.contact}</td>
          `;
          tbody.appendChild(row);
        }
      });
    });

    if (!matchFound) {
      tbody.innerHTML = `<tr><td colspan="7">No matching results found.</td></tr>`;
    }
  })
  .catch(error => {
    console.error("Firebase Error:", error);
    tbody.innerHTML = `<tr><td colspan="7">Error loading matching data.</td></tr>`;
  });
