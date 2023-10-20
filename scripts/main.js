/**
 * Fonction qui charge les niveau
 */
let tab = [];
let level = [];
async function LoadLevels() {
  try {
    const response = await fetch('../niveaux/niveaux.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erreur de chargement des données : ' + error.message);
  }
}
/**
 * Fonction d'initialisation de la page HTML
 */
let lvl = 1;
async function Init() {
  level = await LoadLevels();
  tab = level.niveau1;
  CreateLabyrinthe(tab);
}

let playerPosition = [7, 1];
let canMove = true;
let key = 0;

const table = document.querySelector("table");
const nbr = document.querySelector(".nbr");

const dialogue = document.querySelector(".dialogue");
const dialoguePnjName = document.querySelector(".dialogue-pnj-name");
const dialoguePnjMessage = document.querySelector(".dialogue-pnj-message");

// Ecouteur sur le bouton echec
const fail = document.querySelector(".fail");
fail.addEventListener("click", () => {
  fail.style.cssText = "display:none;";
  canMove = true;
})

// Ecouteur sur le bouton victoire
const win = document.querySelector(".win");
win.addEventListener("click", () => {
  win.style.cssText = "display:none;";
  canMove = true;
  table.textContent = "";
  if (lvl == 2) {
    tab = level.niveau3;
  }
  else if (lvl == 3) {
    tab = level.niveau4;
  }
  lvl++;
  playerPosition = [7, 1];
  CreateLabyrinthe(tab);
})

// Ecouteur sur le bouton quete
const quest = document.querySelector(".dialogue-btn");
quest.addEventListener("click", () => {
  dialogue.style.cssText = "display:none;";
  if (quest.textContent == "Recommencer") {
    table.textContent = "";
    nbr = 0;
    lvl = 1;
    tab = level.niveau1;
    CreateLabyrinthe(tab);
  }
  else if (quest.textContent == "Accepter") {
    table.textContent = "";
    tab = level.niveau2;
    lvl++;
    CreateLabyrinthe(tab);
  }
  canMove = true;
})

/**
 * Fonction qui crée le labyrinthe
 */
function CreateLabyrinthe(tab) {
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

function Move(xDirection, yDirection) {
  updateLabyrinthe(playerPosition[0], playerPosition[1], 1);
  playerPosition[0] += xDirection;
  playerPosition[1] += yDirection;

  // Bonbon
  if (tab[playerPosition[0]][playerPosition[1]] == 2) {
    nbr.textContent = parseInt(nbr.textContent) + 1;
    updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
  }
  // Clé
  else if (tab[playerPosition[0]][playerPosition[1]] == 4) {
    key++;
    updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
  }
  // Porte
  else if (tab[playerPosition[0]][playerPosition[1]] == 6) {
    updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
    tab[playerPosition[0]][playerPosition[1]] = 1;
  }
  // Sortie
  else if (tab[playerPosition[0]][playerPosition[1]] == 8) {
    updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
    // Si tout les bonbons ont été récupérés
    if (parseInt(nbr.textContent) % 4 == 0) {
      win.style.cssText = "display:block;";
    }
    // Sinon on continue
    else {
      fail.style.cssText = "display:block;";
    }
    canMove = false;
  }
  else {
    updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
  }
}
/**
 * Fonction de déplacemnet
 * @param {*} xDirection 
 * @param {*} yDirection 
 */
function MoveVerification(xDirection, yDirection) {
  if (canMove) {
    // PNJ
    if (tab[playerPosition[0] + xDirection][playerPosition[1] + yDirection] == 5) {
      if (lvl == 1) {
        dialoguePnjName.textContent = "La sorcière enchanté :";
        dialoguePnjMessage.textContent = "Bonjour petit fantome d'Halloween. J'ai besoin que tu m'apporte tous les bonbons que tu trouvera pour préparer la fête d'Halloween.";
        dialogue.style.cssText = "display:flex;"
        canMove = false;
      }
      else if (nbr.textContent != "12") {
        dialoguePnjName.textContent = "La sorcière enchanté :";
        dialoguePnjMessage.textContent = "Bonjour petit fantome d'Halloween. Il me manque encore des bonbons pour la fête.";
        dialogue.style.cssText = "display:flex;"
        quest.textContent = "Continuer";
        canMove = false;
      }
      else {
        dialoguePnjName.textContent = "La sorcière enchanté :";
        dialoguePnjMessage.textContent = "Félicitation. Bonne fête d'Halloween!";
        dialogue.style.cssText = "display:flex;"
        quest.textContent = "Recommencer";
        canMove = false;
      }
    }
    //Porte
    else if (tab[playerPosition[0] + xDirection][playerPosition[1] + yDirection] == 6) {
      if (key > 0) {
        Move(xDirection, yDirection);
        key--;
      }
    }
    // Peut se déplacer
    else if (tab[playerPosition[0] + xDirection][playerPosition[1] + yDirection] != 0 && tab[playerPosition[0] + xDirection][playerPosition[1] + yDirection] != 7) {
      Move(xDirection, yDirection);
    }
  }
}
/**
 * Fonction de mise à jour du labyrinthe
 * @param {*} x 
 * @param {*} y 
 * @param {*} value 
 */
function updateLabyrinthe(x, y, value) {
  // tab[x][y] == 0;
  const td = document.getElementById(`${x}-${y}`);
  // Murs
  if (value == 0) {
    td.className = "wall";
  }
  // Vide
  else if (value == 1) {
    td.className = "way";
    td.innerHTML = `<img class="way-img" src="../images/1px.png">`
  }
  // Sorcière
  else if (value == 5) {
    td.className = "witch";
    td.style.cssText = `<img class="witch-img" src="../images/witch.png">`
  }
  // Joueur
  else if (value == 9) {
    td.className = "player";
    td.innerHTML = `<img class="player-img" src="../images/player.png">`
    td.style.background = "url('../images/1px.png')";
    td.style.animation = "none";
  }
}

/**
 * Ecouteur du joystick
 */
const up = document.querySelector('#up');
const down = document.querySelector('#down');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const joystick = [up, down, left, right];
for (let i = 0; i < joystick.length; i++) {
  joystick[i].addEventListener("click", () => {
    if (joystick[i].id == "right") {
      MoveVerification(0, 1);
    }
    else if (joystick[i].id == "left") {
      MoveVerification(0, -1);
    }
    else if (joystick[i].id == "up") {
      MoveVerification(-1, 0);
    }
    else if (joystick[i].id == "down") {
      MoveVerification(1, 0);
    }
  })
}

/**
 * Ecouteur des fleches directionnelles
 */
document.addEventListener("keydown", evt => {
  if (evt.key == "ArrowRight") {
    MoveVerification(0, 1);
  }
  else if (evt.key == "ArrowLeft") {
    MoveVerification(0, -1);
  }
  else if (evt.key == "ArrowUp") {
    MoveVerification(-1, 0);
  }
  else if (evt.key == "ArrowDown") {
    MoveVerification(1, 0);
  }
})
Init();