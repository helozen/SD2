<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection setup
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password is empty
$dbname = "local_traders";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to securely hash passwords
function hashPassword($password)
{
    return password_hash($password, PASSWORD_BCRYPT);
}

$response = []; // Prepare an empty response array

// Handle customer signup
if ($_POST['type'] === 'customer') {
    $full_name = $_POST['name'];
    $email = $_POST['email'];
    $password = hashPassword($_POST['password']);
    $location = $_POST['location'];
    $terms_accepted = $_POST['termsAccepted'] ? 1 : 0;

    // Insert into customers table
    $sql = "INSERT INTO customers (full_name, email, password, location, terms_accepted)
            VALUES ('$full_name', '$email', '$password', '$location', '$terms_accepted')";

    if ($conn->query($sql) === TRUE) {
        $response["message"] = "Customer signup successful!";
    } else {
        $response["error"] = "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Handle tradesperson signup
if ($_POST['type'] === 'tradesperson') {
    $full_name = $_POST['name'];
    $email = $_POST['email'];
    $password = hashPassword($_POST['password']);
    $location = $_POST['location'];
    $skill = $_POST['skill'];
    $terms_accepted = $_POST['termsAccepted'] ? 1 : 0;

    // Handle file upload
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["document"]["name"]);

    // Move the uploaded file
    if (move_uploaded_file($_FILES["document"]["tmp_name"], $target_file)) {
        // Insert into tradespersons table
        $sql = "INSERT INTO tradespersons (full_name, email, password, location, skill, document_path, terms_accepted)
                VALUES ('$full_name', '$email', '$password', '$location', '$skill', '$target_file', '$terms_accepted')";

        if ($conn->query($sql) === TRUE) {
            $response["message"] = "Tradesperson signup successful!";
        } else {
            $response["error"] = "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        $response["error"] = "File upload failed.";
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close connection
$conn->close();

