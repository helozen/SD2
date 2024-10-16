function validateLoginForm(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(document.getElementById("loginForm"));

  // Send form data to the backend via AJAX (Fetch API)
  fetch("php/login-process.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // If login is successful, redirect based on user role
        window.location.href = data.redirect;
      } else {
        alert(data.message); // Show error message
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
