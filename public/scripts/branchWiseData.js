const getDetails = () => {
  const link = window.location.search;
  var urlParams = new URLSearchParams(link);

  const deptValue = urlParams.get("dept");
  const yearValue = urlParams.get("year");

  const yearDetails = document.getElementById("yearDetails");
  yearDetails.innerHTML = yearValue + "  YEAR  " + deptValue;
};

window.addEventListener("DOMContentLoaded", () => {
  getDetails();
});

const getSubjectDetails = () => {
  const link = window.location.search;
  var urlParams = new URLSearchParams(link);

  const deptValue = urlParams.get("dept");
  const yearValue = urlParams.get("year");

  const formData = {
    department: deptValue,
    year: yearValue,
  };

  fetch("/getExamDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        const subjectDetails = document.getElementById("subjectDetails");
        subjectDetails.innerHTML = `<h2>no data found<h2>`;
        throw new Error("Internal Server Error");
      }
      return response.json(); // assuming the response is in JSON format
    })
    .then((data) => {
      insertData(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const insertData = (data) => {
  const subjectDetails = document.getElementById("subjectDetails");
  data.forEach((item) => {
    const subject = item.subject;
    const isoDate = new Date(item.examdate);
    
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(isoDate.getDate()).padStart(2, '0');
    
    const dateOnly = `${year}-${month}-${day}`;
    const startTime = item.starttime;
    const endTime = item.endtime;
    const timings = startTime + " to " + endTime;

    const newElement = document.createElement("div");
    newElement.setAttribute("class", "new");
    newElement.innerHTML = `<div class="subDetails"><span class="header">Subject Name :</span> <span class="value">${subject}</span></div>
    <div class="dateDetails"><span class="header">Date:</span><span class="value">${dateOnly}</span></div>
    <div class="timeDetails"><span class="header">Time:</span> <span class="value">${timings}</span></div><br><br>`;
    subjectDetails.appendChild(newElement);

    const subHeader = document.createElement("div");
    subHeader.setAttribute("class", "subHeader");
    getArrangeDetails(subHeader, subject);

    subjectDetails.appendChild(subHeader);
  });
};
getSubjectDetails();

const getArrangeDetails = (subHeader, subject) => {
  fetch("/getArrangeDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject: subject }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.forEach((item) => {
        const hall = item.classroom;
        // console.log(hall);

        getrollDetails(subject, hall, subHeader);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getrollDetails = (subject, hall, subHeader) => {
  fetch("/getrollDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject: subject, classroom: hall }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.status);
      const ele = document.createElement("div");
      ele.setAttribute("class", "ele");
      ele.innerHTML = `<div class="rollNo">
        <div class="heading">Roll No</div>
        <div class="values">${data
          .map((item) => item.enrollnumber)
          .join(",")}</div>
        </div>
        <div class="hall">
        <div class="heading">Lecture Hall</div>
        <div class="values">${hall}</div>
        </div><br><br>`;
      subHeader.appendChild(ele);
    })
    .catch((error) => {
      console.log(error);
    });
};
