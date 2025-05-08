<?php
header('Content-Type: application/json');
include 'db.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing scientist ID"]);
    exit();
}

// Fetch scientist profile
$sqlProfile = "SELECT id, name, photo, bio, quote, organization, country FROM scientists WHERE id = $id LIMIT 1";
$resultProfile = $conn->query($sqlProfile);

if (!$resultProfile || $resultProfile->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Scientist not found"]);
    exit();
}

$profile = $resultProfile->fetch_assoc();

// Fetch achievements
$sqlAchievements = "SELECT content FROM achievements WHERE scientist_id = $id";
$resultAchievements = $conn->query($sqlAchievements);
$achievements = [];
if ($resultAchievements) {
    while ($row = $resultAchievements->fetch_assoc()) {
        $achievements[] = $row['content'];
    }
}

// Fetch awards
$sqlAwards = "SELECT content FROM awards WHERE scientist_id = $id";
$resultAwards = $conn->query($sqlAwards);
$awards = [];
if ($resultAwards) {
    while ($row = $resultAwards->fetch_assoc()) {
        $awards[] = $row['content'];
    }
}

// Fetch contributions
$sqlContributions = "SELECT content FROM contributions WHERE scientist_id = $id";
$resultContributions = $conn->query($sqlContributions);
$contributions = [];
if ($resultContributions) {
    while ($row = $resultContributions->fetch_assoc()) {
        $contributions[] = $row['content'];
    }
}

// Fetch gallery images
$sqlGallery = "SELECT image_path FROM gallery WHERE scientist_id = $id";
$resultGallery = $conn->query($sqlGallery);
$gallery = [];
if ($resultGallery) {
    while ($row = $resultGallery->fetch_assoc()) {
        $gallery[] = $row['image_path'];
    }
}

$response = [
    "profile" => $profile,
    "achievements" => $achievements,
    "awards" => $awards,
    "contributions" => $contributions,
    "gallery" => $gallery
];

echo json_encode($response);
$conn->close();
?>
