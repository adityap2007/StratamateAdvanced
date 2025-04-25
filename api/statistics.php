<?php
require_once 'database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$action = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($action === 'GET') {
    try {
        // Get total number of residents
        $residentsStmt = $pdo->query('SELECT COUNT(*) as total_residents FROM residents');
        $totalResidents = $residentsStmt->fetch(PDO::FETCH_ASSOC)['total_residents'];

        // Get total number of maintenance requests
        $maintenanceStmt = $pdo->query('SELECT COUNT(*) as total_requests, 
            SUM(CASE WHEN priority = \'high\' THEN 1 ELSE 0 END) as high_priority
            FROM maintenance_requests');
        $maintenanceStats = $maintenanceStmt->fetch(PDO::FETCH_ASSOC);

        // Get total payments this month
        $paymentsStmt = $pdo->query('SELECT COUNT(*) as total_payments, 
            COALESCE(SUM(amount), 0) as total_amount 
            FROM strata_payments 
            WHERE payment_date >= DATE_TRUNC(\'month\', CURRENT_DATE)');
        $paymentStats = $paymentsStmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 'success',
            'data' => [
                'total_residents' => (int)$totalResidents,
                'maintenance_requests' => [
                    'total' => (int)$maintenanceStats['total_requests'],
                    'high_priority' => (int)$maintenanceStats['high_priority']
                ],
                'payments' => [
                    'monthly_count' => (int)$paymentStats['total_payments'],
                    'monthly_amount' => (float)$paymentStats['total_amount']
                ]
            ]
        ]);
    } catch (PDOException $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to fetch statistics']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Method not allowed']);
}
