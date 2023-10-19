tab = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 8],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 9, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let playerPosition = [9, 1];
const table = document.querySelector("table");
const nbr = document.querySelector(".nbr");
const win = document.querySelector(".win");
const fail = document.querySelector(".fail");
fail.addEventListener("click", () => { fail.style.cssText = "display:none;"; canMove = true })
let canMove = true;

/**
 * Fonction qui crée le labyrinthe
 */
function createLabyrinthe() {
  for (let x = 0; x < tab.length; x++) {
    const tr = document.createElement("tr");
    for (let y = 0; y < tab[x].length; y++) {
      const td = document.createElement("td");
      td.id = `${x}-${y}`;
      if (tab[x][y] == 0) {
        td.className = "wall";
      }
      else if (tab[x][y] == 1) {
        td.className = "nothing";
      }
      else if (tab[x][y] == 2) {
        td.style.background = "url('../images/candy.png')";
        td.className = "candy";
        td.style.backgroundPosition = "center";
        td.style.backgroundSize = '100%';
        td.style.animation = "rotation 3.5s infinite linear";
      }
      else if (tab[x][y] == 9) {
        td.className = "player";
        td.style.background = "url('../images/player.png')";
        td.style.backgroundPosition = "center";
        td.style.backgroundSize = '120%';
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}
function move(xDirection, yDirection) {
  if (canMove) {
    if (tab[playerPosition[0] + xDirection][playerPosition[1] + yDirection] != 0) {
      updateLabyrinthe(playerPosition[0], playerPosition[1], 1);
      playerPosition[0] += xDirection;
      playerPosition[1] += yDirection;
      if (tab[playerPosition[0]][playerPosition[1]] == 2) {
        nbr.textContent = parseInt(nbr.textContent) + 1;
        updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
      }
      else if (tab[playerPosition[0]][playerPosition[1]] == 8) {
        updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
        if (nbr.textContent == "3") {
          win.style.cssText = "display:block;";
        }
        else {
          fail.style.cssText = "display:block;";
        }
        canMove = false;
      }
      else {
        updateLabyrinthe(playerPosition[0], playerPosition[1], 9);
      }
    }
  }
}
function updateLabyrinthe(x, y, value) {
  tab[x][y] == 0;

  const td = document.getElementById(`${x}-${y}`);
  if (value == 0) {
    td.className = "wall";
  }
  else if (value == 1) {
    td.className = "nothing";
    td.style.background = "white";
  }
  else if (value == 9) {
    td.className = "player";
    td.style.background = "url('../images/player.png')";
    td.style.backgroundPosition = "center";
    td.style.backgroundSize = '120%';
    td.style.animation = "none";
  }
}

const up = document.querySelector('#up');
const down = document.querySelector('#down');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const joystick = [up, down, left, right];
for (let i = 0; i < joystick.length; i++) {
  joystick[i].addEventListener("click", () => {
    if (joystick[i].id == "right") {
      move(0, 1);
    }
    else if (joystick[i].id == "left") {
      move(0, -1);
    }
    else if (joystick[i].id == "up") {
      move(-1, 0);
    }
    else if (joystick[i].id == "down") {
      move(1, 0);
    }
  })
}

createLabyrinthe();