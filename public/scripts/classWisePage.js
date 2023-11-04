const fillForm = (data) => {
  const branch = document.getElementById("branch");
  const year = document.getElementById("year");

  data.branches.forEach((branchName) => {
    const option = document.createElement("option");
    option.value = branchName.department;
    option.text = branchName.department;
    branch.appendChild(option);
  });

  // Populate Year dropdown
  data.years.forEach((yearValue) => {
    const option = document.createElement("option");
    option.value = yearValue.year;
    option.text = yearValue.year;
    year.appendChild(option);
  });
};

const getFormData = () => {
  fetch("/getFormData")
    .then((response) => response.json())
    .then((data) => {
      fillForm(data);
    })
    .catch((error) => {
      document.write(error);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  getFormData();
});

const branchForm = document.getElementById("branchForm");

branchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dept = document.getElementById("branch").value;
  const year = document.getElementById("year").value;
  window.location.href = "../branchWiseData.html?dept="+dept+"&year="+year;
});
