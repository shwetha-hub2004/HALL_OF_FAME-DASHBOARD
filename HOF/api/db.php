<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "space_hall_of_fame";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Set charset to utf8mb4 for proper encoding
$conn->set_charset("utf8mb4");
?>
