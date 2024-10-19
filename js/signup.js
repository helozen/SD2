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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
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
console.log("Sending data:", formData);
