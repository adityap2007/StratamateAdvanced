<?php
require_once 'database.php';

header('Content-Type: application/json');

$action = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($action) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM residents');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO residents (name, unit_number, contact) VALUES (?, ?, ?)');
        $stmt->execute([$data['name'], $data['unit_number'], $data['contact']]);
        echo json_encode(['status' => 'success', 'message' => 'Resident added']);
        break;
}
