<?php
require_once 'database.php';

header('Content-Type: application/json');

function generateToken($userId) {
    return hash('sha256', $userId . time() . getenv('JWT_SECRET'));
}

$action = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

switch ($action) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['action']) && $data['action'] === 'login') {
            $stmt = $pdo->prepare('SELECT id, role FROM users WHERE email = ? AND password_hash = ?');
            $stmt->execute([$data['email'], hash('sha256', $data['password'])]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                $token = generateToken($user['id']);
                setcookie('auth_token', $token, time() + 86400, '/', '', true, true);
                echo json_encode([
                    'status' => 'success',
                    'user' => ['id' => $user['id'], 'role' => $user['role']]
                ]);
            } else {
                header('HTTP/1.1 401 Unauthorized');
                echo json_encode(['error' => 'Invalid credentials']);
            }
        }
        break;
        
    case 'DELETE':
        setcookie('auth_token', '', time() - 3600, '/', '', true, true);
        echo json_encode(['status' => 'success', 'message' => 'Logged out']);
        break;
}
