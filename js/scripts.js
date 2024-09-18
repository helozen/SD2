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

// Initialize by showing the customer form by default
document.addEventListener('DOMContentLoaded', () => {
    showCustomerForm();
});
