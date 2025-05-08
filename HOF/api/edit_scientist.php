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

$id = intval($_POST['id'] ?? 0);
$name = trim($_POST['name'] ?? '');
$bio = trim($_POST['bio'] ?? '');
$quote = trim($_POST['quote'] ?? '');
$organization = trim($_POST['organization'] ?? '');
$country = trim($_POST['country'] ?? '');

if ($id <= 0 || empty($name) || empty($bio)) {
    http_response_code(400);
    echo json_encode(['error' => 'ID, name and bio are required']);
    exit();
}

// Handle photo upload if provided
$photoName = null;
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../images/';
    $photoName = basename($_FILES['photo']['name']);
    $targetFile = $uploadDir . $photoName;

    if (!move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded photo']);
        exit();
    }
}

// Build update query
if ($photoName !== null) {
    $stmt = $conn->prepare("UPDATE scientists SET name = ?, photo = ?, bio = ?, quote = ?, organization = ?, country = ? WHERE id = ?");
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Database prepare failed: ' . $conn->error]);
        exit();
    }
    $stmt->bind_param("ssssssi", $name, $photoName, $bio, $quote, $organization, $country, $id);
} else {
    $stmt = $conn->prepare("UPDATE scientists SET name = ?, bio = ?, quote = ?, organization = ?, country = ? WHERE id = ?");
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Database prepare failed: ' . $conn->error]);
        exit();
    }
    $stmt->bind_param("sssssi", $name, $bio, $quote, $organization, $country, $id);
}

if ($stmt->execute()) {
    echo json_encode(['success' => 'Scientist updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update scientist']);
}

$stmt->close();
$conn->close();
?>
