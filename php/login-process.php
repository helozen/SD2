<?php
session_start();
include('db.php'); // Include the database connection

// Collect form data
$email = $_POST['email'];
$password = $_POST['password'];

// Check if the email exists in the users table
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];

        // Redirect based on user role (customer or tradesperson)
        if ($user['role'] === 'customer') {
            echo json_encode(['success' => true, 'redirect' => 'user-profile.html']);
        } else if ($user['role'] === 'tradesperson') {
            echo json_encode(['success' => true, 'redirect' => 'tradesperson-profile.html']);
        }
    } else {
        // Password is incorrect
        echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    }
} else {
    // No account found with this email
    echo json_encode(['success' => false, 'message' => 'No account found with this email.']);
}

$stmt->close();
$conn->close();
?>
