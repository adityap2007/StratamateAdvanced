<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename=residents-directory.csv');

echo "Name,Unit,Email\n";
echo "Alice Johnson,Unit 1,alice@example.com\n";
echo "Bob Martin,Unit 2,bob@example.com\n";
echo "Carol Davis,Unit 3,carol@example.com\n";
echo "David Lee,Unit 4,david@example.com\n";
?>