function toggleForms() {
    const userType = document.getElementById("userType").value;
    const customerForm = document.getElementById("customer-form");
    const tradespersonForm = document.getElementById("tradesperson-form");

    if (userType === "customer") {
        customerForm.style.display = "block";
        tradespersonForm.style.display = "none";
    } else {
        customerForm.style.display = "none";
        tradespersonForm.style.display = "block";
    }
}

document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission for now
    const userType = document.getElementById("userType").value;
    alert("Registered as " + userType);
});
