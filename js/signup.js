// Function to show the customer form and hide the tradesperson form
function showCustomerForm() {
    document.getElementById('customer-form').classList.add('active-form');
    document.getElementById('tradesperson-form').classList.remove('active-form');
    document.getElementById('customer-tab').classList.add('active-tab');
    document.getElementById('tradesperson-tab').classList.remove('active-tab');
}

// Function to show the tradesperson form and hide the customer form
function showTradespersonForm() {
    document.getElementById('tradesperson-form').classList.add('active-form');
    document.getElementById('customer-form').classList.remove('active-form');
    document.getElementById('tradesperson-tab').classList.add('active-tab');
    document.getElementById('customer-tab').classList.remove('active-tab');
}

// Form validation for customer signup form
function validateCustomerForm(event) {
    event.preventDefault();
    
    const password = document.getElementById('customer-password').value;
    const confirmPassword = document.getElementById('customer-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    alert('Customer signed up successfully!');
    // Add logic to send form data to the backend
}

// Form validation for tradesperson signup form
function validateTradespersonForm(event) {
    event.preventDefault();
    
    const password = document.getElementById('tradesperson-password').value;
    const confirmPassword = document.getElementById('tradesperson-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    alert('Tradesperson signed up successfully!');
    // Add logic to send form data to the backend
}

// Initialize by showing the customer form by default
document.addEventListener('DOMContentLoaded', () => {
    showCustomerForm();
});
