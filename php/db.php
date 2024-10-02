<?php
$servername = "localhost";
$username = "traders_user"; // Or root if using default
$password = "4563"; // Enter your password here
$dbname = "local_traders";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
