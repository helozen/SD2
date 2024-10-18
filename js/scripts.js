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

// JavaScript for dynamic menu and login status
document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menu-btn");
    const menuDropdown = document.getElementById("menu-dropdown");
    const menuList = document.getElementById("menu-list");

    // Placeholder for user login status (replace this with real logic later)
    const userLoggedIn = false; // Change to true when logged in

    // Function to render the menu items based on login status
    function renderMenu() {
        menuList.innerHTML = ''; // Clear current menu items

        if (userLoggedIn) {
            // If logged in, show Profile and Logout options
            menuList.innerHTML += `
                <li><a href="user-profile.html">Profile</a></li>
                <li><a href="logout.html">Log Out</a></li>
            `;
        } else {
            // If not logged in, show Login option
            menuList.innerHTML += `
                <li><a href="login.html">Log In</a></li>
                <li><a href="signup.html">Signup</a></li>
            `;
        }
    }

    // Toggle menu dropdown on button click
    menuBtn.addEventListener("click", function() {
        menuDropdown.classList.toggle("show");
    });

    // Render the menu options on page load
    renderMenu();
});

document
  .getElementById("location-search")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way
    const location = document.getElementById("location").value;

    if (location) {
      const service = "services"; // You can change this dynamically if needed
      const googleMapsURL = `https://www.google.com/maps/search/${service}+near+${encodeURIComponent(
        location
      )}`;
      window.open(googleMapsURL, "_blank"); // Open in a new tab
    } else {
      alert("Please enter a location.");
    }
  });

function findService(serviceType) {
  const location = document.getElementById("location").value;

  if (location) {
    const googleMapsURL = `https://www.google.com/maps/search/${serviceType}+near+${encodeURIComponent(
      location
    )}`;
    window.open(googleMapsURL, "_blank"); // Open in a new tab
  } else {
    alert("Please enter your location in the search box.");
  }
}
