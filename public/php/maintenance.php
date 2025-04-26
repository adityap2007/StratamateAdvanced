<?php
require_once 'database.php';

header('Content-Type: application/json');

$action = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($action) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM maintenance_requests ORDER BY created_at DESC');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO maintenance_requests (unit_number, description, priority) VALUES (?, ?, ?)');
        $stmt->execute([$data['unit_number'], $data['description'], $data['priority']]);
        echo json_encode(['status' => 'success', 'message' => 'Maintenance request created']);
        break;
}
