// JavaScript for handling dynamic loading and filtering of tradespersons based on user location

// Placeholder for dynamic tradesperson data
const tradespersons = [
    { name: "John Doe", trade: "Plumber", rating: 4.5, available: "Now" },
    { name: "Jane Smith", trade: "Electrician", rating: 4.8, available: "2 hours" },
    // Add more tradespersons dynamically here
];

// Dynamically load tradespersons based on the user's location (mocked for now)
function loadTradespersons() {
    const container = document.querySelector(".nearby-tradespersons");

    tradespersons.forEach(person => {
        const div = document.createElement("div");
        div.classList.add("tradesperson");

        div.innerHTML = `
            <h4>${person.name}</h4>
            <p>${person.trade} | ${person.rating} ★ | Available ${person.available}</p>
            <a href="tradesperson.html" class="btn">View Profile</a>
        `;
        container.appendChild(div);
    });
}

// Initialize the page by loading tradespersons
document.addEventListener("DOMContentLoaded", loadTradespersons);
