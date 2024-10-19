document.addEventListener("DOMContentLoaded", function () {
  // Get user's current location (or use a default)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        loadTradespersons(position.coords.latitude, position.coords.longitude);
      },
      function () {
        // If location access is denied, use default coordinates
        loadTradespersons(40.712776, -74.005974); // Default location (New York City)
      }
    );
  } else {
    // If geolocation is not available, use default location
    loadTradespersons(40.712776, -74.005974);
  }
});

function loadTradespersons(lat, lng) {
  const apiUrl = `/api/nearby-tradespersons.php?lat=${lat}&lng=${lng}&radius=10`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".nearby-tradespersons");
      container.innerHTML = ""; // Clear existing data

      if (data.length === 0) {
        container.innerHTML = "<p>No tradespersons found near you.</p>";
      }

      data.forEach((tradesperson) => {
        const tradespersonDiv = `
                    <div class="tradesperson">
                        <h4>${tradesperson.name}</h4>
                        <p>${tradesperson.service_type} | ${tradesperson.rating} ★ | Available ${tradesperson.availability}</p>
                        <a href="tradesperson.html?id=${tradesperson.id}" class="btn">View Profile</a>
                    </div>
                `;
        container.innerHTML += tradespersonDiv;
      });
    })
    .catch((error) => console.error("Error fetching tradespersons:", error));
}
