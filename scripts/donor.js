document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const donorData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      bloodGroup: document.getElementById("blood").value,
      organ: document.getElementById("organ").value,
      contact: document.getElementById("contact").value,
    };

    fetch("http://127.0.0.1:5000/api/donor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donorData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Donor registered successfully!");
        form.reset();
        // Optional redirect:
        // window.location.href = "../pages/donarList.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      });
  });
});
