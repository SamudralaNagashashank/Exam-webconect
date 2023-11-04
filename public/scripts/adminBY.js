document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from the server when the DOM is loaded
  fetch("/getFormData")
    .then((response) => response.json())
    .then((data) => {
      const branchSelect = document.getElementById("branchName");
      const yearSelect = document.getElementById("year");

      // Populate BranchName dropdown
      data.branches.forEach((branchName) => {
        const option = document.createElement("option");
        option.value = branchName.department;
        option.text = branchName.department;
        branchSelect.appendChild(option);
      });

      // Populate Year dropdown
      data.years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year.year;
        option.text = year.year;
        yearSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const adminForm = document.getElementById("adminbyForm");
adminForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const branch = document.getElementById("branchName").value;
  const year = document.getElementById("year").value;

  window.location.href = "../datainsert.html?branch=" + branch +"&year=" + year;
});
