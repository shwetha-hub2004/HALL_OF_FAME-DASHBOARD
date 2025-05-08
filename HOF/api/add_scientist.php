<?php
session_start();
header('Content-Type: application/json');
require_once 'db.php';

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$name = trim($_POST['name'] ?? '');
$bio = trim($_POST['bio'] ?? '');
$quote = trim($_POST['quote'] ?? '');
$organization = trim($_POST['organization'] ?? '');
$country = trim($_POST['country'] ?? '');

if (empty($name) || empty($bio)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and bio are required']);
    exit();
}

if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Photo upload failed']);
    exit();
}

// Handle photo upload
$uploadDir = '../images/';
$photoName = basename($_FILES['photo']['name']);
$targetFile = $uploadDir . $photoName;

if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded photo']);
    exit();
}

// Insert into scientists table
$stmt = $conn->prepare("INSERT INTO scientists (name, photo, bio, quote, organization, country) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database prepare failed: ' . $conn->error]);
    exit();
}
$stmt->bind_param("ssssss", $name, $photoName, $bio, $quote, $organization, $country);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Scientist added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add scientist']);
}

$stmt->close();
$conn->close();
?>
