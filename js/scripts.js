function findService(serviceType) {
    const location = document.getElementById("location").value;
    if (!location) {
        alert("Please enter your location to find " + serviceType + " nearby.");
    } else {
        alert("Searching for " + serviceType + " near " + location);
        // Add geolocation or API integration here.
    }
}

document.getElementById("location-search").addEventListener("submit", function(event) {
    event.preventDefault();
    const location = document.getElementById("location").value;
    if (location) {
        alert("Searching for services near " + location);
        // Add geolocation or API integration here.
    } else {
        alert("Please enter your location.");
    }
});

// Toggle between customer and tradesperson forms
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

// Validate customer form
function validateCustomerForm(event) {
    event.preventDefault();
    
    const password = document.getElementById("customer-password").value;
    const confirmPassword = document.getElementById("customer-confirm-password").value;
    const terms = document.getElementById("customer-terms").checked;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!terms) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    alert("Customer form submitted successfully!");
    // You can add API call to submit form data here
}

// Validate tradesperson form
function validateTradespersonForm(event) {
    event.preventDefault();

    const password = document.getElementById("tradesperson-password").value;
    const confirmPassword = document.getElementById("tradesperson-confirm-password").value;
    const terms = document.getElementById("tradesperson-terms").checked;
    const documentUpload = document.getElementById("tradesperson-document").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!terms) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    if (!documentUpload) {
        alert("Please upload a verification document.");
        return;
    }

    alert("Tradesperson form submitted successfully!");
    // You can add API call to submit form data here
}


function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const location = document.getElementById("location").value;
    const terms = document.getElementById("terms").checked;

    // Basic Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!terms) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    // Submit form if validation passes
    alert("Form submitted successfully!");

    // Here you would typically make an API call to register the user
    // Example: 
    // fetch('api/signup', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         name,
    //         email,
    //         password,
    //         location
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
}
