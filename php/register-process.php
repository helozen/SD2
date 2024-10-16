<?php
include('db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $location = $_POST['location'];
    $role = $_POST['role'];

    if ($password !== $confirm_password) {
        die('Passwords do not match.');
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // For Tradesperson: Collect additional fields
    $skill = null;
    $document = null;
    if ($role === 'tradesperson') {
        $skill = $_POST['skill'];

        // Handle file upload
        if (isset($_FILES['document']) && $_FILES['document']['error'] == 0) {
            $file_name = $_FILES['document']['name'];
            $file_tmp = $_FILES['document']['tmp_name'];
            $upload_dir = 'uploads/documents/';
            $document = $upload_dir . basename($file_name);

            // Move the uploaded file to the uploads directory
            if (!move_uploaded_file($file_tmp, $document)) {
                die('Failed to upload document.');
            }
        }
    }

    // Check if the email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        die('Email is already registered.');
    }

    // Insert user data into the database
    if ($role === 'customer') {
        $sql = "INSERT INTO users (username, email, password, role, location) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $name, $email, $hashed_password, $role, $location);
    } else {
        $sql = "INSERT INTO users (username, email, password, role, location, skill, document) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssss", $name, $email, $hashed_password, $role, $location, $skill, $document);
    }

    // Execute the query and check for success
    if ($stmt->execute()) {
        // Redirect to a success page
        header("Location: login.html");
        exit();
    } else {
        die('Error: ' . $stmt->error);
    }
}
