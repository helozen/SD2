<?php
include('db.php');

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

$name = htmlspecialchars(strip_tags($_POST['name']));
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);  // Hash the password
$location = htmlspecialchars(strip_tags($_POST['location']));

if (empty($name) || empty($email) || empty($password) || empty($location)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit();
}

// Check if the form is for a tradesperson or customer
if (isset($_POST['skill'])) {
    // Tradesperson specific data
    $role = 'tradesperson';
    $skill = htmlspecialchars(strip_tags($_POST['skill']));

    // Handle document upload for tradesperson
    if (isset($_FILES['document'])) {
        $file_name = $_FILES['document']['name'];
        $file_tmp = $_FILES['document']['tmp_name'];
        $upload_dir = 'uploads/documents/';
        $file_path = $upload_dir . basename($file_name);

        // Check file size and type
        if ($_FILES['document']['size'] > 1000000) {
            echo json_encode(['success' => false, 'message' => 'File size too large.']);
            exit();
        }

        $allowed_types = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!in_array($_FILES['document']['type'], $allowed_types)) {
            echo json_encode(['success' => false, 'message' => 'Unsupported file type.']);
            exit();
        }

        // Move uploaded document to uploads directory
        if (!move_uploaded_file($file_tmp, $file_path)) {
            echo json_encode(['success' => false, 'message' => 'Document upload failed.']);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No document uploaded.']);
        exit();
    }
} else {
    // Customer specific data
    $role = 'customer';
}

// Check if email already exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'message' => 'Database query failed: ' . $stmt->error]);
    exit();
}
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already exists.']);
} else {
    // Insert user into the database
    if ($role === 'customer') {
        // Insert customer data
        $sql = "INSERT INTO users (username, email, password, role, location) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $name, $email, $password, $role, $location);
    } else {
        // Insert tradesperson data
        $sql = "INSERT INTO users (username, email, password, role, location, skill, document) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssss", $name, $email, $password, $role, $location, $skill, $file_path);
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => ucfirst($role) . ' signed up successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to insert user: ' . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
