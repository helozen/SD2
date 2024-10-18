// Customer form validation and submission
function validateCustomerForm(event) {
  event.preventDefault();
  const password = document.getElementById("customer-password").value;
  const confirmPassword = document.getElementById(
    "customer-confirm-password"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else {
    // Collect form data
    const formData = {
      name: document.getElementById("customer-name").value,
      email: document.getElementById("customer-email").value,
      password: password,
      location: document.getElementById("customer-location").value,
      termsAccepted: document.getElementById("customer-terms").checked ? 1 : 0,
    };

    // Send form data to backend
    sendDataToBackend("php/signup.php", formData);
  }
}

// Tradesperson form validation and submission
function validateTradespersonForm(event) {
  event.preventDefault();
  const password = document.getElementById("tradesperson-password").value;
  const confirmPassword = document.getElementById(
    "tradesperson-confirm-password"
  ).value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else {
    // Collect form data
    const formData = {
      name: document.getElementById("tradesperson-name").value,
      email: document.getElementById("tradesperson-email").value,
      password: password,
      location: document.getElementById("tradesperson-location").value,
      skill: document.getElementById("tradesperson-skill").value,
      termsAccepted: document.getElementById("tradesperson-terms").checked
        ? 1
        : 0,
      document: document.getElementById("tradesperson-document").files[0],
    };

    // Send form data to backend with file upload
    sendDataToBackend("php/signup.php", formData, true);
  }
}

// Function to send data to the PHP backend
function sendDataToBackend(url, formData, isTradesperson = false) {
  if (isTradesperson) {
    // Handle tradesperson form (with file upload)
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    formDataObj.append("type", "tradesperson");

    // Send form data via POST request (for tradesperson)
    fetch(url, {
      method: "POST",
      body: formDataObj,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Signup failed, please try again.");
      });
  } else {
    // Handle customer form (without file upload)
    const customerData = {
      ...formData,
      type: "customer",
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(customerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Signup failed, please try again.");
      });
  }
}

// Show customer form
function showCustomerForm() {
  document.getElementById("customer-form").classList.remove("hidden");
  document.getElementById("tradesperson-form").classList.add("hidden");
  document.getElementById("customer-tab").classList.add("active-tab");
  document.getElementById("tradesperson-tab").classList.remove("active-tab");
}

// Show tradesperson form
function showTradespersonForm() {
  document.getElementById("customer-form").classList.add("hidden");
  document.getElementById("tradesperson-form").classList.remove("hidden");
  document.getElementById("customer-tab").classList.remove("active-tab");
  document.getElementById("tradesperson-tab").classList.add("active-tab");
}
