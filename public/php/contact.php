<?php
require_once 'database.php';

header('Content-Type: text/html; charset=UTF-8');

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    
    if (!empty($name) && !empty($email) && !empty($message)) {
        try {
            $pdo = getDbConnection();
            $stmt = $pdo->prepare('INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, NOW())');
            $stmt->execute([$name, $email, $message]);
            
            $success = "Thank you for your message! We'll get back to you soon.";
        } catch (PDOException $e) {
            $error = "Sorry, there was an error submitting your message. Please try again later.";
        }
    } else {
        $error = "Please fill in all fields.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Strata Mate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        input[type="text"],
        input[type="email"],
        textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        textarea {
            height: 150px;
            resize: vertical;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        .success {
            color: #4CAF50;
            padding: 10px;
            margin-bottom: 20px;
            background-color: #dff0d8;
            border-radius: 4px;
        }
        .error {
            color: #d9534f;
            padding: 10px;
            margin-bottom: 20px;
            background-color: #f2dede;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Us</h1>
        
        <?php if (isset($success)): ?>
            <div class="success"><?php echo htmlspecialchars($success); ?></div>
        <?php endif; ?>
        
        <?php if (isset($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            
            <button type="submit">Send Message</button>
        </form>
    </div>
</body>
</html> 