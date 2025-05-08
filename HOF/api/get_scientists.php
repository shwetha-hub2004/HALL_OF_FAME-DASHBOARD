<?php
header('Content-Type: application/json');
include 'db.php';

$sql = "SELECT id, name, photo, bio, quote, organization, country FROM scientists";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Database query failed: " . $conn->error]);
    exit();
}

$scientists = array();
while ($row = $result->fetch_assoc()) {
    $scientistId = $row['id'];

    // Fetch gallery images for this scientist
    $gallerySql = "SELECT image_path FROM gallery WHERE scientist_id = $scientistId";
    $galleryResult = $conn->query($gallerySql);
    $gallery = [];
    if ($galleryResult) {
        while ($galleryRow = $galleryResult->fetch_assoc()) {
            $gallery[] = $galleryRow['image_path'];
        }
    }

    $row['gallery'] = $gallery;
    $scientists[] = $row;
}

echo json_encode($scientists);
$conn->close();
?>
