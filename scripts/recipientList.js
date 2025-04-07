document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".recipient-table tbody");
  
    fetch("/api/recipients")
      .then(response => response.json())
      .then(data => {
        data.forEach(recipient => {
          const row = document.createElement("tr");
  
          row.innerHTML = `
            <td>${recipient.name}</td>
            <td>${recipient.age}</td>
            <td>${recipient.gender || '-'}</td>
            <td>${recipient.blood_group}</td>
            <td>${recipient.organ}</td>
            <td>${recipient.contact}</td>
          `;
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error loading recipient data:", error);
      });
  });
  