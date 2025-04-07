document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".donor-details table tbody");
  
    fetch("http://127.0.0.1:5000/api/donors")
      .then(response => response.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          tableBody.innerHTML = "<tr><td colspan='6'>No donor data available.</td></tr>";
          return;
        }
  
        data.forEach(donor => {
          const row = document.createElement("tr");
  
          row.innerHTML = `
            <td>${donor.name}</td>
            <td>${donor.age}</td>
            <td>${donor.gender}</td>
            <td>${donor.bloodGroup}</td>
            <td>${donor.organ}</td>
            <td>${donor.contact}</td>
          `;
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error fetching donor data:", error);
        tableBody.innerHTML = "<tr><td colspan='6'>Error loading data. Please try again later.</td></tr>";
      });
  });
  