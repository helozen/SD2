// Show Customer Form
function showCustomerForm() {
  document.getElementById("customer-form").classList.remove("hidden");
  document.getElementById("tradesperson-form").classList.add("hidden");
  document.getElementById("customer-tab").classList.add("active-tab");
  document.getElementById("tradesperson-tab").classList.remove("active-tab");
}

// Show Tradesperson Form
function showTradespersonForm() {
  document.getElementById("tradesperson-form").classList.remove("hidden");
  document.getElementById("customer-form").classList.add("hidden");
  document.getElementById("tradesperson-tab").classList.add("active-tab");
  document.getElementById("customer-tab").classList.remove("active-tab");
}

// Handle Customer Form Submission
function validateCustomerForm(event) {
  event.preventDefault(); // Prevent default form submission
  const formData = new FormData(document.getElementById("customer-form"));

  // Send data to PHP backend
  fetch("register-process.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Customer signed up successfully!");
        window.location.href = "login.html"; // Redirect to login page
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

// Handle Tradesperson Form Submission
function validateTradespersonForm(event) {
  event.preventDefault(); // Prevent default form submission
  const formData = new FormData(document.getElementById("tradesperson-form"));

  // Send data to PHP backend
  fetch("php/register-process.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Tradesperson signed up successfully!");
        window.location.href = "login.html"; // Redirect to login page
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
