function getSubjectDetails(formData) {
  fetch("/subjectDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      //fetch details to frontend
      const subjectselect = document.getElementById("subjectselect");
      data.forEach((sub) => {
        const option = document.createElement("option");
        option.value = sub.subject;
        option.text = sub.subject;
        subjectselect.appendChild(option);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function submitInsertingValues() {
  const getForm = document.getElementById("datainsertForm");
  getForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const department = document.getElementById("dept").value;
    const year = document.getElementById("year").value;
    const startNumber = document.getElementById("startNumber").value;
    const endNumber = document.getElementById("endNumber").value;
    const subject = document.getElementById("subjectselect").value;
    const classroom = document.getElementById("classroom").value;
    const date = document.getElementById("examdate").value;
    const startTime = document.getElementById("starttime").value;
    const endTime = document.getElementById("endtime").value;

   

    const datatoInsert = {
      department: department,
      year: year,
      startNumber: startNumber,
      endNumber: endNumber,
      subject: subject,
      classroom: classroom,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };

    fetch("/submitDataInsertForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datatoInsert),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "../sucess.html";
        } else {
          document.write("UnsucessFull Inserting!");
        }
      })
      .catch((error) => {
        document.write(error);
      });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const link = window.location.search;
  var urlParams = new URLSearchParams(link);

  const deptValue = urlParams.get("branch");
  const yearValue = urlParams.get("year");

  const dept = document.getElementById("dept");
  const year = document.getElementById("year");

  dept.value = deptValue;
  year.value = yearValue;

  const formData = {
    department: dept.value,
    year: year.value,
  };

  getSubjectDetails(formData);
});

submitInsertingValues();
