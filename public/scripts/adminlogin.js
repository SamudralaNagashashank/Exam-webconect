document
  .getElementById("adminLoginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    const formData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    // Make API request
    fetch("/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        // Handle API response data
        if(data.success)
        {
            window.location.href="../adminBranchYear.html";
        }
        else
        {
            const errMsg = document.getElementById('errMsg');
            errMsg.style.display = "flex";
            errMsg.innerHTML = "Invalid Details!Try Again";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
