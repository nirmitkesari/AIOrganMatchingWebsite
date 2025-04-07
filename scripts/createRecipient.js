document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const recipientData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        blood_group: document.getElementById("blood-group").value,
        organ: document.getElementById("organ").value,
        contact: document.getElementById("contact").value
      };
  
      fetch("/api/recipient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipientData),
      })
        .then(response => {
          if (response.ok) {
            alert("Recipient registration successful!");
            form.reset();
          } else {
            alert("Failed to register recipient.");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert("Something went wrong. Please try again.");
        });
    });
  });
  