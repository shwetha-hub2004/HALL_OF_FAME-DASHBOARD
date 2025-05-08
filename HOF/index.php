<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Global Space Hall of Fame</title>
    <meta name="description" content="Hall of Fame Dashboard for the Space Fraternity - Celebrating pioneers in space science and technology." />
    <meta property="og:title" content="Global Space Hall of Fame" />
    <meta property="og:description" content="Hall of Fame Dashboard for the Space Fraternity - Celebrating pioneers in space science and technology." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://yourdomain.com/index.html" />
    <meta property="og:image" content="http://yourdomain.com/images/og-image.jpg" />
    <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/index.css" />
</head>
<body>
    <header class="site-header">
        <h1 class="site-title" style="font-size: 5rem; color: #ffffff; text-shadow: 0 0 20px #007bff, 0 0 30px #00bfff, 0 0 40px #1e90ff; margin-left: 20px;">Hall of Fame</h1>
        <nav class="navbar">
            <ul class="nav-links" style="color: #000000; text-shadow: none;">
                <li><a href="index.php" class="active" style="color: #000000; text-shadow: none;">Home</a></li>
                <li><a href="isro.html" style="color: #000000; text-shadow: none;">ISRO</a></li>
                <li><a href="itca.html" style="color: #000000; text-shadow: none;">ITCA</a></li>
                <li><a href="gallery.html" style="color: #000000; text-shadow: none;">Gallery</a></li>
                <li><a href="events.html" style="color: #000000; text-shadow: none;">Events</a></li>
                <li><a href="profile.html" style="color: #000000; text-shadow: none;">Profile</a></li>
                <li><a href="favorites.html" style="color: #000000; text-shadow: none;">Favorites</a></li>
                <li><a href="about.html" style="color: #000000; text-shadow: none;">About</a></li>
<?php if (isset($_SESSION['username'])): ?>
                <li>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></li>
                <li><a href="logout.php">Logout</a></li>
<?php else: ?>
                <li><a href="login.html">Login</a></li>
                <li><a href="signup.html">Sign Up</a></li>
<?php endif; ?>
            </ul>
            <button id="theme-toggle-btn" aria-label="Toggle dark/light mode" style="font-size: 1.5rem; margin-left: 20px; cursor: pointer;">🌙</button>
        </nav>
    </header>
    <section class="description" style="font-size: 1.5rem;">
        <p>Welcome to the Global Space Hall of Fame Dashboard, a tribute to the pioneers and visionaries who have shaped the future of space exploration and technology.</p>
    
    </section>

    <button id="scrollTopBtn" title="Scroll to top">↑</button>

    <script src="js/gallery.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
