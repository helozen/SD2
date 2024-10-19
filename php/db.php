<?php
// db.php - Database connection
$host = 'localhost'; // Your database host
$dbname = 'local_traders'; // Your database name
$username = 'root'; // Your database username
$password = ''; // Your database password

try {
    // Establish a connection to the database
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error: Could not connect. " . $e->getMessage());
}
