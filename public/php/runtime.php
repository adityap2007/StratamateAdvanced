<?php
// PHP Runtime configuration for Vercel
header('Content-Type: application/json');
echo json_encode([
    'runtime' => 'PHP ' . phpversion(),
    'timestamp' => time()
]);
