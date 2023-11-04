window.addEventListener("DOMContentLoaded", () => {
  const link = window.location.search;
  var urlParams = new URLSearchParams(link);

  const hallValue = urlParams.get("hall");
  const hall = document.getElementById("hall");
  hall.innerHTML = hallValue;

  fetch("/getHallDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ classroom: hallValue }),
  })
    .then((response) => {
      if (!response.ok) {
        const details = document.getElementById("details");
        details.innerHTML = `<h2>no data found<h2>`;
        throw new Error("Internal Server Error");
      }
      return response.json(); // assuming the response is in JSON format
    })
    .then((data) => {

      insertDetails(data, hallValue);
    })
    .catch((error) => {
      console.log(error);
    });
});

const insertDetails = (data, hall) => {
  const details = document.getElementById("details");

  data.map((item) => {
    const ele = document.createElement("div");
    ele.setAttribute("class", "ele");
    const isoDate = new Date(item.examdate);
    
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(isoDate.getDate()).padStart(2, '0');
    
    const dateOnly = `${year}-${month}-${day}`;
    

    ele.innerHTML = `<div class="detail" ><div class="item examDate">${dateOnly}</div>
        <div class="item startTime">START TIME : ${item.starttime}</div>
        <div class="item endTime">END TIME : ${item.endtime}</div></div>`;
    details.appendChild(ele);
    const detailsele = document.createElement("div");
    ele.appendChild(detailsele);
    detailsele.setAttribute("class","detailsele");
    getDept(dateOnly, hall,detailsele);
  });
};

const getDept = (examdate, hall,ele) => {
  fetch("/getDept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ classroom: hall, date: examdate }),
  })
    .then((response) => {
      if (!response.ok) {
        const details = document.getElementById("details");
        details.innerHTML = `<h2>no data found<h2>`;
        throw new Error("Internal Server Error");
      }
      return response.json(); // assuming the response is in JSON format
    })
    .then((data) => {
        data.map((item)=>{
            const newele = document.createElement("div");
            newele.setAttribute("class","newele");
            newele.innerHTML = `<div class="item">
                <div class="roll">Roll Number : ${item.enrollnumber}</div>
                <div class="roll">Year : ${item.year}</div>
                <div class="roll">Department : ${item.department}</div>
                <div class="roll">Subject : ${item.subject}</div>
            </div>`;
            ele.appendChild(newele);
        })
    })
    .catch((error) => {
      console.log(error);
    });
};
