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

$scientist_id = intval($_POST['scientist_id'] ?? 0);

if ($scientist_id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid scientist ID']);
    exit();
}

if (!isset($_FILES['gallery_image']) || $_FILES['gallery_image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Image upload failed']);
    exit();
}

// Handle image upload
$uploadDir = '../images/';
$imageName = basename($_FILES['gallery_image']['name']);
$targetFile = $uploadDir . $imageName;

if (!move_uploaded_file($_FILES['gallery_image']['tmp_name'], $targetFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded image']);
    exit();
}

// Insert into gallery table
$stmt = $conn->prepare("INSERT INTO gallery (scientist_id, image_path) VALUES (?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database prepare failed: ' . $conn->error]);
    exit();
}
$stmt->bind_param("is", $scientist_id, $imageName);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Gallery image uploaded successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to upload gallery image']);
}

$stmt->close();
$conn->close();
