<?php
header('Content-Type: application/json');

// Sample strata management data
$strataInfo = [
    'buildingName' => 'Oceanview Apartments',
    'address' => '123 Beach Road, Sydney',
    'totalUnits' => 50,
    'committeeMembers' => [
        ['name' => 'John Smith', 'role' => 'Chairperson'],
        ['name' => 'Sarah Johnson', 'role' => 'Secretary'],
        ['name' => 'Mike Brown', 'role' => 'Treasurer']
    ],
    'upcomingMeetings' => [
        [
            'date' => '2025-05-15',
            'time' => '18:00',
            'location' => 'Building Common Room',
            'agenda' => 'Annual General Meeting'
        ]
    ]
];

echo json_encode($strataInfo, JSON_PRETTY_PRINT);
