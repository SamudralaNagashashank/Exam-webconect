window.addEventListener("DOMContentLoaded", () => {
  const link = window.location.search;
  var urlParams = new URLSearchParams(link);

  const rollNo = urlParams.get("rollNo");

  getDetails(rollNo);
});

const getDetails = (roll) => {
  fetch("/getStudentDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rollNo: roll }),
  })
    .then((response) => {
      if (!response.ok) {
        const Details = document.getElementById("details");
        Details.innerHTML = `<h2>no data found<h2>`;
        throw new Error("Internal Server Error");
      }
      return response.json(); // assuming the response is in JSON format
    })
    .then((data) => {
      data.map((item) => {
        document.getElementById("rollValue").innerHTML = item.rollNo;
        document.getElementById("namevalue").innerHTML = item.studentName;
        document.getElementById("branchvalue").innerHTML = item.department;
        document.getElementById("Yearvalue").innerHTML = item.year;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
