// scripts/recipient.js
import { database } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipientForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const recipientData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      blood_group: document.getElementById("blood-group").value,
      organ: document.getElementById("organ").value,
      contact: document.getElementById("contact").value
    };

    const recipientRef = ref(database, "recipients/");
    push(recipientRef, recipientData)
      .then(() => {
        alert("Recipient registered successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error(error);
      });
  });
});
