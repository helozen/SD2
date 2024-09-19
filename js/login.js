function validateForm() {
    // Get form elements
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Check if the email field is empty
    if (email === "") {
        alert("Please enter your email.");
        return false; // Prevent form submission
    }

    // Check if the email format is valid
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false; // Prevent form submission
    }

    // Check if the password field is empty
    if (password === "") {
        alert("Please enter your password.");
        return false; // Prevent form submission
    }

    // Ensure the password is at least 6 characters long
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false; // Prevent form submission
    }

    // If all validations pass, allow form submission
    return true;
}
