const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('#gameStatus');
const endGameStatus = document.querySelector('#endGameStatus');
const playerOne = 'X';
const playerTwo = 'O';
let playerTurn = playerOne;
const selectMode = document.querySelector("#mode")
let gameMode = 'pvp'

// Définition des schémas de jeu gagnants
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.querySelector('#reloadGame').addEventListener('click', reloadGame);

selectMode.addEventListener('change', () => {
    gameMode = selectMode.value;
    // Réinitialiser le jeu lors du changement de mode
    resetGame();
});
// Fonction pour assurer que chaque cellule n'a qu'un seul écouteur actif 'click' se déclenchant qu'une fois
function addEvents() {
    cells.forEach(cell => {
        cell.removeEventListener('click', playGame);  // supprime tout événement click associé à la fonction playGame de l'élément cell
        cell.addEventListener('click', playGame, { once: true });  // { once: true } signifie que l'écouteur d'événements ne sera appelé qu'une seule fois, puis automatiquement supprimé
    });
}

addEvents();

function playGame(e) {
    if (gameMode === 'pvp') {
        playerMove(e.target);
    } else if (gameMode === 'cpu' && playerTurn === playerOne) {
        playerMove(e.target);
        if (!checkWin(playerTurn) && !checkDraw()) {
            setTimeout(cpuMove, 500);
        }
    }
}

function playerMove(cell) {
    if (cell.innerHTML !== '') {
        return; // Empêche le joueur de cliquer sur une cellule déjà occupée
    }

    // Le contenu de l'élément sur lequel l'utilisateur a cliqué sera mis à jour pour afficher la valeur de playerTurn
    cell.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateGameStatus("wins" + playerTurn);
        return endGame();
    } else if (checkDraw()) {
        updateGameStatus("draw");
        return endGame();     // Pas besoin de vérifier la défaite, car cela arrive lorsqu'un joueur gagne (l'autre perd)
    }

    updateGameStatus(playerTurn);
    switchPlayerTurn();
}

function cpuMove() {
    // Mettre à jour le statut du jeu pour indiquer que c'est au tour de l'ordinateur
    updateGameStatus('cpuTurn');

    // Trouver les cellules vides et choisir une cellule aléatoire pour le coup de l'ordinateur
    let emptyCells = [...cells].filter(cell => cell.innerHTML === '');
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateGameStatus("wins" + playerTurn);
        return endGame();
    } else if (checkDraw()) {
        updateGameStatus("draw");
        return endGame();     // Pas besoin de vérifier la défaite, car cela arrive lorsqu'un joueur gagne (l'autre perd)
    }

    updateGameStatus(playerTurn);
    switchPlayerTurn();
}

function switchPlayerTurn() {
    // Alterner le tour des joueurs
    playerTurn = playerTurn === playerOne ? playerTwo : playerOne;
}

// .some teste si au moins un élément du tableau passe le test implémenté par la fonction fournie
// On va tester chaque combinaison, et sur chaque combinaison on se servira de .every ci-dessous pour déterminer si c'est le joueur 1 ou 2 qui a gagné
function checkWin(playerTurn) {
    return winningPatterns.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML == playerTurn;
        });
    });
}

// .every permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument
// [...cells] permet de déstructurer les cellules HTML et de les transformer en array  
function checkDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML === playerOne || cell.innerHTML === playerTwo;
    });
}

function updateGameStatus(status) {
    let statusText;

    switch (status) {
        case 'X':
            if (gameMode === 'cpu') {
                statusText = "Au tour du joueur 1 (X)";
            } else {
                statusText = "Au tour du joueur 2 (O)";
            }
            break;
        case 'O':
            statusText = "Au tour du joueur 1 (X)";
            break;
        case 'winsX':
            statusText = "Le joueur 1 (X) a gagné!";
            break;
        case 'winsO':
            if (gameMode === 'cpu') {
                statusText = "L'ordinateur a gagné!";
            } else {
                statusText = "Le joueur 2 (O) a gagné!";
            }
            break;
        case 'draw':
            statusText = "Égalité! Personne ne gagne!";
            break;
        case 'cpuTurn':
            statusText = "Au tour de l'ordinateur";
            break;
    }

    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}

function endGame() {
    // Afficher la fin du jeu
    document.querySelector('#gameEnd').style.display = "block";
}

function resetGame() {
    // Réinitialiser les cellules et l'état du jeu
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    playerTurn = playerOne;
    updateGameStatus(playerTurn);
    addEvents();
}

// Recharge la page actuelle du navigateur, rafraîchissant ainsi tout le contenu de la page.
function reloadGame() {
    window.location.reload();
}
