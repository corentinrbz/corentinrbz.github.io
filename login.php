<?php
session_start();

//deja co ??
if (isset($_SESSION['admin']) && $_SESSION['admin'] === true) {
    header("Location: admin_messages.php");
    exit();
}

//verif
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $identifiant = $_POST['identifiant'] ?? '';
    $motdepasse = $_POST['motdepasse'] ?? '';


    $identifiant_bon = "ribe0047";
    $motdepasse_bon = "vp9gJhCDL7"; //ok car coté serveur

    if ($identifiant === $identifiant_bon && $motdepasse === $motdepasse_bon) {
        $_SESSION['admin'] = true;
        header("Location: admin_messages.php");
        exit();
    } else {
        $erreur = "Identifiant ou mot de passe incorrect.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Session admin</title>
    <link rel="stylesheet" href="./styles/styles.css">
</head>
<body>
    <header class="entete">
        <div class="conteneur">
            <nav class="navigation">
                <ul class="liens">
                    <li><a href="index.html" class="actif">Accueil</a></li>
                    <li><a href="cv.html">CV</a></li>
                    <li><a href="portfolio.html">Portfolio</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="login.php">Admin</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <section class="section-contenu">
        <header class="titre-contenu">
            <p>Demi-tour. C'est privé ici !</p>
            <form method="post" class="formulaire-ajout">
                <div class="flex-saisie-contact">
                    <input id="identifiant" name="identifiant" aria-label="Identifiant" type="text" required placeholder="Identifiant">
                </div>
                <div class="flex-saisie-contact">
                    <input id="motdepasse" name="motdepasse" aria-label="Mot de passe" type="password" required placeholder="Mot de passe">
                </div> <br>
                <?php if (isset($erreur)) : ?>
                <p style="color: white; text-align: center; font-size: 1rem !important" ><?= htmlspecialchars($erreur) ?></p>
                <?php endif; ?>
                <button class="bouton-decouvrir5" type="submit">Je me connecte</button>
                <br> <br> <br> <br>
            </form>
        </header>
    </section>

    <footer id="footer">
        <p class="copyright">&copy; 2025 Corentin Ribezzo. Tous droits réservés.</p>
    </footer>

        
</body>
</html>
