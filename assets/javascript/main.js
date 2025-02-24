
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('#gameStatus');
const endGameStatus = document.querySelector('#endGameStatus');
const playerOne = 'X'; const playerTwo = 'O';
let playerTurn = playerOne;

// Definition des schémas de jeu gagnants
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

// {once: true} indique que l'écouteur doit être exécuté au maximum une fois après l'ajout, retiré une fois executé
cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});

function playGame(e) {
    // Le contenu de l'élément sur lequel l'utilisateur a cliqué sera mis à jour pour afficher la valeur de playerTurn
    e.target.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateGameStatus("wins" + playerTurn);
        return endGame();
    } else if (checkDraw()) {
        updateGameStatus("draw");
        return endGame();     // Pas besoin de vérifier la défaite, car cela arrive lorsqu'un joueur gagne (l'autre perd)
    }

    updateGameStatus(playerTurn);
    //expression ternaire utilisée pour alterner les tours des joueurs.
    //   playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;  
    if (playerTurn == playerOne) {
        playerTurn = playerTwo;
    } else {
        playerTurn = playerOne;
    }
}

//.some permet aussi d'effectuer des tests pour déterminer qui gagne
// On va tester chaque combinaison, et sur chaque combinaison on se servira de .every ci-dessous pour déterminer si c'est le joueur 1 ou 2 qui a gagné
function checkWin(playerTurn) {
    return winningPatterns.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML == playerTurn;
        });
    });
}

// .every permet de faire des tests, ici on verifie si chaque cellule a la marque du joueur 1 ou du J2
// [...cells] permet de déstructurer les cellules HTML et de les transformer en array  
function checkDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
    });
}

function updateGameStatus(status) {
    let statusText;

    switch (status) {
        case 'X':
            statusText = "Au tour du joueur 2 (O)";
            break;
        case 'O':
            statusText = "Au tour du joueur 1 (X)";
            break;
        case 'winsX':
            statusText = "Le joueur 1 (X) a gagné!";
            break;
        case 'winsO':
            statusText = "Le joueur 2 (O) a gagné!";
            break;
        case 'draw':
            statusText = "Egalité! Personne ne gagne!";
            break;
    }

    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}

function endGame() { document.getElementById('gameEnd').style.display = "block" }

// recharge la page actuelle du navigateur, rafraîchissant ainsi tout le contenu de la page.
function reloadGame() { window.location.reload() }  
