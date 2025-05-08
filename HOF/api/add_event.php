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

$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$date = $_POST['date'] ?? '';
$category = $_POST['category'] ?? '';

if (empty($title) || empty($description) || empty($date) || empty($category)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields except image are required']);
    exit();
}

$imageName = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../images/';
    $imageName = basename($_FILES['image']['name']);
    $targetFile = $uploadDir . $imageName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded image']);
        exit();
    }
}

$stmt = $conn->prepare("INSERT INTO events (title, description, date, image, category) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database prepare failed: ' . $conn->error]);
    exit();
}
$stmt->bind_param("sssss", $title, $description, $date, $imageName, $category);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Event added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add event']);
}

$stmt->close();
$conn->close();
?>
