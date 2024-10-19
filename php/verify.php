<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "local_traders";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Verify the token
    $sql = "SELECT * FROM customers WHERE verification_token='$token'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Token is valid, update user's status
        $sql = "UPDATE customers SET is_verified=1, verification_token=NULL WHERE verification_token='$token'";
        if ($conn->query($sql) === TRUE) {
            echo "Email verified successfully!";
        }
    } else {
        echo "Invalid token.";
    }
} else {
    echo "No token provided.";
}

$conn->close();
