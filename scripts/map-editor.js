tab = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 1, 1, 1, 2, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [7, 9, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 8],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
* Fonction qui crée le labyrinthe
*/
const table = document.querySelector("table");
function createLabyrinthe() {
    for (let x = 0; x < tab.length; x++) {
        const tr = document.createElement("tr");
        for (let y = 0; y < tab[x].length; y++) {
            const td = document.createElement("td");
            td.id = `${x}-${y}`;
            // Murs
            if (tab[x][y] == 0) {
                td.className = "wall";
            }
            // Vide
            else if (tab[x][y] == 1) {
                td.className = "way";
            }
            // Bonbons
            else if (tab[x][y] == 2) {
                td.style.background = "url('../images/candy.png')";
                td.className = "candy";
                td.style.backgroundPosition = "center";
                td.style.backgroundSize = '100%';
                td.style.animation = "rotation 3.5s infinite linear";
            }
            // clé
            else if (tab[x][y] == 4) {
                td.className = "key";
                td.innerHTML = `<img class="key-img" src="../images/key-solid.svg">`
            }
            // Sorcière
            else if (tab[x][y] == 5) {
                td.className = "witch";
                td.innerHTML = `<img class="witch-img" src="../images/witch.png">`
            }
            // porte
            else if (tab[x][y] == 6) {
                td.className = "door";
                td.innerHTML = `<img class="door-img" src="../images/lock-solid.svg">`
            }
            // Joueur
            else if (tab[x][y] == 9) {
                td.className = "player";
                td.innerHTML = `<img class="player-img" src="../images/player.png">`
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

createLabyrinthe();