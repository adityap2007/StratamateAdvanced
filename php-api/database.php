<?php
function getDbConnection() {
    $host = getenv('POSTGRES_HOST');
    $database = getenv('POSTGRES_DATABASE');
    $user = getenv('POSTGRES_USER');
    $password = getenv('POSTGRES_PASSWORD');

    try {
        $dsn = "pgsql:host=$host;dbname=$database";
        $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        return $pdo;
    } catch (PDOException $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
}
