<?php
// Include the database connection
include 'php/db.php';

// Get user location from request (default to a fixed location if not provided)
$user_lat = isset($_GET['lat']) ? (float)$_GET['lat'] : 40.712776; // Example latitude
$user_lng = isset($_GET['lng']) ? (float)$_GET['lng'] : -74.005974; // Example longitude
$radius = isset($_GET['radius']) ? (int)$_GET['radius'] : 10; // Default search radius 10km

// Query to find tradespersons within the specified radius using the Haversine formula
$query = "
    SELECT 
        id, name, service_type, rating, 
        (6371 * acos(cos(radians(:lat)) * cos(radians(latitude)) * cos(radians(longitude) - radians(:lng)) 
        + sin(radians(:lat)) * sin(radians(latitude)))) AS distance, availability
    FROM service_providers
    HAVING distance < :radius
    ORDER BY distance ASC
";

$stmt = $db->prepare($query);
$stmt->bindParam(':lat', $user_lat);
$stmt->bindParam(':lng', $user_lng);
$stmt->bindParam(':radius', $radius);
$stmt->execute();

$tradespersons = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return tradespersons as a JSON object
header('Content-Type: application/json');
echo json_encode($tradespersons);
?>