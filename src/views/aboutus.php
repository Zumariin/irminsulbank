<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Irminsul Bank</title>
    <link rel="stylesheet" href="CSS file/styles1.css">
    <style>
        body, html {
            height: 100%;
            margin: 0;
        }
        .wrapper {
            min-height: 100%;
            display: flex;
            flex-direction: column;
        }
        .content {
            flex: 1;
        }
        .about-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .image-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .image-container img {
            text-align: center;
            width: 18%;
            height: auto;

        }
        .about-content p {
            margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.5); /* Warna putih densgan transparansi 80% */
            padding: 20px;
            border-radius: 10px; /* Opsional: membuat sudut melengkung */
        }

        h1 {
        color: #ffff;
            font-size: 3em; /* Adjust the font size as needed */
        font-weight: bold; /* Make the text bold */
        text-shadow: 5px 5px 4px #000000; /* Add a black outline to the text */
        }

        body {
        background: url('img/background.png') no-repeat center center fixed;
        background-size: cover;
        }

        footer {
            text-align: center;
            padding: 1em 0;
            background: #31a5e9; /* Ganti warna latar belakang sesuai kebutuhan */
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <header>
            <nav>
                <div class="logo">Irminsul Bank</div>
                <ul>
                    <li><a href="http://localhost/IrminsulBank/home.php">Home</a></li>
                    <li><a href="http://localhost/IrminsulBank/aboutus.php">About Us</a></li>
                </ul>
            </nav>
        </header>

        <div class="content">
            <section class="about-content">
                <div class="image-container">
                    <img src="img/Lumine.png" alt="Layanan Bantuan">
                    <img src="img/paimong.gif" alt="Layanan Bantuan">
                </div>
                
                <h1>Tentang Kami</h1>
                <p>Irminsul Bank adalah website yang bergerak di bidang penyediaan jasa yang dikhususkan untuk para pemain game Genshin Impact. Kami memahami betapa pentingnya pengalaman bermain game yang menyenangkan dan memuaskan. Oleh karena itu, kami hadir untuk memberikan layanan yang mungkin dapat membantu para pemain untuk mencapai apa yang mereka inginkan dalam game.</p>
                <p>Kami percaya bahwa setiap pemain memiliki cara unik untuk menikmati permainan. Oleh karena itu, kami selalu siap mendengarkan kebutuhan dan keinginan Anda untuk memberikan layanan yang paling sesuai. Irminsul Bank tidak hanya sekadar penyedia jasa, tetapi juga mitra yang dapat diandalkan dalam perjalanan Anda di dunia Teyvat.</p>
            </section>
        </div>

        <!-- Footer -->
        <footer>
            <p>&copy; 2024 Irminsul Bank. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
