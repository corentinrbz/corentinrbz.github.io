// memo: const --> val qui change pas   var --> peut etre reaffecte
// test js 

document.addEventListener("DOMContentLoaded", () => {
    const boutonNouvelleCompetence = document.getElementById("bouton-nouvelle-competence");
    const formulaireAjout = document.getElementById("formulaire-ajout");
    const listeCompetences = document.getElementById("liste");
    var competenceEnCoursDeModification = null;
    
    // demarrer recherche comp
    chargerCompetences();

    // mettre form pour ajout
    boutonNouvelleCompetence.addEventListener("click", () => {
        competenceEnCoursDeModification = null; // test pour comp
        formulaireAjout.classList.add("active");
        formulaireAjout.style.display = "block";
    });

    //test si comp existe deja
    formulaireAjout.addEventListener("submit", (e) => {
        e.preventDefault();
        if (competenceEnCoursDeModification) {
            mettreAJourCompetence();
        } else {
            ajouterCompetence();
        }
    });

    // ajt nv comp
    function ajouterCompetence() {
        const nom = document.getElementById("nouvelle-competence").value;
        const description = document.getElementById("description-competence").value;
        const niveau = document.getElementById("niveau-competence").value;
        const competence = {
            nom,
            description,
            niveau
        };
        var competences = obtenirCompetences();
        competences.push(competence);
        localStorage.setItem("competences", JSON.stringify(competences));
        afficherCompetence(competence);
        document.getElementById("nouvelle-competence").value = "";
        document.getElementById("description-competence").value = "";
        document.getElementById("niveau-competence").value = "Débutant";
        formulaireAjout.style.display = "none"; // pour mask form après ajt
        formulaireAjout.classList.remove("active");
    }

    // maj comp existante
    function mettreAJourCompetence() {
        const nom = document.getElementById("nouvelle-competence").value;
        const description = document.getElementById("description-competence").value;
        const niveau = document.getElementById("niveau-competence").value;
        const competences = obtenirCompetences();
        const index = competences.findIndex(c => c.nom === competenceEnCoursDeModification.nom && c.description === competenceEnCoursDeModification.description && c.niveau === competenceEnCoursDeModification.niveau);
        competences[index].nom = nom;
        competences[index].description = description;
        competences[index].niveau = niveau;
        localStorage.setItem("competences", JSON.stringify(competences));
        chargerCompetences();
        formulaireAjout.style.display = "none";
        formulaireAjout.classList.remove("active");
        competenceEnCoursDeModification = null;
    }

    // affiche comp dans li
    function afficherCompetence(competence) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${competence.nom}</strong> - ${competence.niveau} <button class="bouton-supprimer">Supprimer</button> <button class="bouton-modifier">Modifier</button><br><small>${competence.description || ''}</small>`;
        listeCompetences.appendChild(li);
        li.querySelector(".bouton-supprimer").addEventListener("click", () => {
            supprimerCompetence(competence);
        });
        li.querySelector(".bouton-modifier").addEventListener("click", () => {
            remplirFormulairePourModification(competence);
        });
    }

    // modif
    function remplirFormulairePourModification(competence) {
        competenceEnCoursDeModification = competence;
        document.getElementById("nouvelle-competence").value = competence.nom;
        document.getElementById("description-competence").value = competence.description;
        document.getElementById("niveau-competence").value = competence.niveau;
        formulaireAjout.classList.add("active");
        formulaireAjout.style.display = "block";
    }

    // local storage
    function obtenirCompetences() {
        return localStorage.getItem("competences") ? JSON.parse(localStorage.getItem("competences")) : [];
    }

    // recup depuis LS
    function chargerCompetences() {
        // test après
        const items = document.querySelectorAll("#liste li:not(.base)");
        items.forEach(item => {
            item.remove();
        });
        var competences = obtenirCompetences();
        competences.forEach(competence => afficherCompetence(competence));
    }

    // suppr comp
    function supprimerCompetence(competenceASupprimer) {
        var competences = obtenirCompetences();
        competences = competences.filter(competence => !(competence.nom === competenceASupprimer.nom && competence.description === competenceASupprimer.description && competence.niveau === competenceASupprimer.niveau));
        localStorage.setItem("competences", JSON.stringify(competences)); // après
        chargerCompetences();
    }
});
