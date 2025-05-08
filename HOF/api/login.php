<?php
// This login.php now handles only normal user login, no admin role handling
session_start();
header('Content-Type: application/json');
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = $_POST;

$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required']);
    exit();
}

// Fetch user by username or email, excluding admin role
$stmt = $conn->prepare("SELECT id, username, email, password_hash FROM users WHERE (username = ? OR email = ?) AND role != 'admin'");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database prepare failed: ' . $conn->error]);
    exit();
}
$stmt->bind_param("ss", $username, $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid username or password']);
    exit();
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid username or password']);
    exit();
}

// Set session variables
$_SESSION['user_id'] = $user['id'];
$_SESSION['username'] = $user['username'];
$_SESSION['role'] = 'user';

echo json_encode(['success' => 'Login successful', 'username' => $user['username'], 'role' => 'user']);
$stmt->close();
$conn->close();
?>
