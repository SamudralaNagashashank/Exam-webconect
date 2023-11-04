const rollform = document.getElementById("rollForm");
rollform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const roll = document.getElementById("rollNo").value;
    
    window.location.href = "../individualData.html?rollNo="+roll;
})