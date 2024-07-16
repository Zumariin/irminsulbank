<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genshin Impact Character List</title>
    <link rel="stylesheet" href="CSS file/styles3.css">
    <style>
        .character-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
        }
        .character-item {
            cursor: pointer;
        }
        .character-details {
            display: none;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <nav>
            <div class="logo">IrminsulBank</div>
            <ul>
                <li><a href="http://localhost/IrminsulBank/home.php">Home</a></li>
                <li><a href="http://localhost/IrminsulBank/aboutus.php">About Us</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Character Build & Tips</h1>
        
        <div class="character-grid">
            <!-- Character items -->
            <div class="character-item" onclick="toggleDetails('cyno')">
                <img src="img/Cyno.png" alt="cyno">
                <h3>Cyno</h3>
            </div>

            <div class="character-item" onclick="toggleDetails('arlecchino')">
                <img src="img/Arlecchino.png" alt="arlecchino">
                <h3>Arlecchino</h3>
            </div>

            <div class="character-item" onclick="toggleDetails('neuvillette')">
                <img src="img/Neuvillette.jpg" alt="neuvillette">
                <h3>Neuvillette</h3>
            </div>

            <div class="character-item" onclick="toggleDetails('ayaka')">
                <img src="img/Ayaka.png" alt="ayaka">
                <h3>Kamisato Ayaka</h3>
            </div>

            <div class="character-item" onclick="toggleDetails('wanderer')">
                <img src="img/Wanderer.png" alt="wanderer">
                <h3>Wanderer</h3>
            </div>

            <div class="character-item" onclick="toggleDetails('nahida')">
                <img src="img/Nahida.png" alt="nahida">
                <h3>Nahida</h3>
            </div>

            <div class="character-item" onclick="toggleDetails('zhongli')">
                <img src="img/Zhongli.png" alt="zhongli">
                <h3>Zhongli</h3>
            </div>

            <div class="character-item" onclick="toggleDetails('raiden')">
                <img src="img/Raiden.png" alt="raiden">
                <h3>Raiden Shogun</h3>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 Irminsul Bank. All rights reserved.</p>
        <a href="#" id="scrollToTop" class="top">&#8593;</a>
    </footer>
        <script src="Javascript file/scrollbutton.js"></script>
    <script>
    // Paste the JavaScript code here
    document.addEventListener('DOMContentLoaded', function() {
        var scrollToTopBtn = document.getElementById("scrollToTop");

// Show button when user scrolls down 20px from the top of the document
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    scrollToTopBtn.classList.add('top-scroll');
    setTimeout(function() {
        scrollToTopBtn.classList.remove('top-scroll');
    }, 1000);
});
    });

  </script>

    <script>
        function toggleDetails(character) {
            var details = document.getElementById(character + '-details');
            if (details.style.display === 'none') {
                details.style.display = 'block';
            } else {
                details.style.display = 'none';
            }
        }
    </script>
</body>
</html>