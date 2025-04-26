<?php
header('Content-Type: application/json; charset=utf-8');

// TODO: Replace static values with dynamic data from your database
$data = [
  'total_residents' => 250,
  'maintenance_requests' => [
    'total' => 12,
    'high_priority' => 3
  ],
  'payments' => [
    'monthly_count' => 30,
    'monthly_amount' => 15000
  ]
];

echo json_encode(['data' => $data]); 