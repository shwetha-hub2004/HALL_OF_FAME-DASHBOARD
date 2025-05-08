<?php
header('Content-Type: application/json');
include 'db.php';

$sql = "SELECT id, title, description, date, image, category, subtitle, location, speakers FROM events ORDER BY date DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Database query failed: " . $conn->error]);
    error_log("Database query failed in get_events.php: " . $conn->error);
    exit();
}

$eventsByCategory = [];

while ($row = $result->fetch_assoc()) {
    $category = $row['category'];
    if (!isset($eventsByCategory[$category])) {
        $eventsByCategory[$category] = [];
    }
    $speakers = null;
    if (!empty($row['speakers'])) {
        $speakers = json_decode($row['speakers'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("JSON decode error for speakers in get_events.php: " . json_last_error_msg());
            $speakers = [];
        }
    } else {
        $speakers = [];
    }
    $eventsByCategory[$category][] = [
        "id" => $row['id'],
        "title" => $row['title'],
        "description" => $row['description'],
        "date" => $row['date'],
        "image" => $row['image'],
        "subtitle" => $row['subtitle'],
        "location" => $row['location'],
        "speakers" => $speakers
    ];
}

echo json_encode($eventsByCategory);
$conn->close();
?>
