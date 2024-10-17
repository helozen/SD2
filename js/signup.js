// js/signup.js
function validateCustomerForm(event) {
  event.preventDefault();
  const password = document.getElementById("customer-password").value;
  const confirmPassword = document.getElementById(
    "customer-confirm-password"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else {
    alert("Customer form submitted successfully!");
    // Add form submission logic here
  }
}

function validateTradespersonForm(event) {
  event.preventDefault();
  const password = document.getElementById("tradesperson-password").value;
  const confirmPassword = document.getElementById(
    "tradesperson-confirm-password"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else {
    alert("Tradesperson form submitted successfully!");
    // Add form submission logic here
  }
}

function showCustomerForm() {
  document.getElementById("customer-form").classList.remove("hidden");
  document.getElementById("tradesperson-form").classList.add("hidden");
  document.getElementById("customer-tab").classList.add("active-tab");
  document.getElementById("tradesperson-tab").classList.remove("active-tab");
}

function showTradespersonForm() {
  document.getElementById("customer-form").classList.add("hidden");
  document.getElementById("tradesperson-form").classList.remove("hidden");
  document.getElementById("customer-tab").classList.remove("active-tab");
  document.getElementById("tradesperson-tab").classList.add("active-tab");
}
