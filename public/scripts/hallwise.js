window.addEventListener("DOMContentLoaded", () => {
  fetch("/getHallFormData")
    .then((response) => response.json())
    .then((data) => {
      const hallno = document.getElementById("hallno");
      data.forEach((item) => {
        const option = document.createElement("option");
        option.setAttribute("class", "options");
        option.value = item.classroom;
        option.text = item.classroom;
        hallno.appendChild(option);
      });
    })
    .catch((error) => {
      console.log(error);
    });

    const hallform = document.getElementById("hallform");
    hallform.addEventListener("submit",(e)=>{
        e.preventDefault();
        const value = document.getElementById("hallno").value;
        window.location.href = "../hallwiseData.html?hall="+value;
    })
});
