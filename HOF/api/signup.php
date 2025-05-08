<?php
header('Content-Type: application/json');
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = $_POST;

$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Check if username or email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database prepare failed: ' . $conn->error]);
    exit();
}
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'Username or email already exists']);
    exit();
}
$stmt->close();

// Hash the password
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password_hash);
if ($stmt->execute()) {
    echo json_encode(['success' => 'User registered successfully', 'username' => $username]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to register user']);
}
$stmt->close();
$conn->close();
?>
