<?php
require_once 'database.php';

header('Content-Type: application/json');

$action = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($action) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM strata_payments ORDER BY payment_date DESC');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO strata_payments (unit_number, amount, payment_type, payment_date) VALUES (?, ?, ?, NOW())');
        $stmt->execute([$data['unit_number'], $data['amount'], $data['payment_type']]);
        echo json_encode(['status' => 'success', 'message' => 'Payment recorded']);
        break;
}
