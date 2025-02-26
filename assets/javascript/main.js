const gameContainer = document.querySelector('#gameContainer')

const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]
let currentPlayer = 'X'
let gameOver = false

function displayGrid() {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const cellContainer = document.createElement('div')
            cellContainer.classList.add('cell')
            cellContainer.addEventListener('click', () => playerMove(rowIndex,cellIndex))
        gameContainer.appendChild(cellContainer)
        })
    })
}
displayGrid()

function playerMove(rowIndex, cellIndex) {
    if (gameOver) {
        document.querySelector('#message').textContent = 'Le jeu est terminé !'
    } else if (grid[rowIndex][cellIndex] !== '') {
        document.querySelector('#message').textContent = 'Cette cellule est deja occupée'
    }
    else {
        grid[rowIndex][cellIndex] = currentPlayer
        updateGrid()
        if (checkWinner()) {
            message.textContent = `Le joueur ${currentPlayer} a gagné !`
            gameOver = true
        } else if (isDraw()) {
            message.textContent = `Match nul !`
            gameOver = true
        } else { // chgmt de joueur, décla ternaire pour eviter les if else
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
            document.querySelector('#playerTurn').textContent = `C'est au tour du joueur ${currentPlayer}`
        }
    }
}

// fonction qui parcourt ttes les cellules du jeu et MAJ leur contenu
function updateGrid() {
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
        const rowIndex = Math.floor(index/3 )  // calc index de la ligne
        const cellIndex = index % 3  // calc index de la cellule 
        cell.textContent = grid[rowIndex][cellIndex]
    })
}

function checkWinner() {
    //verif des lignes
    for (let i = 0; i < 3; i++) {
        if (grid[i][0] && grid[i][0] === grid[i][1] && grid[i][1] == grid[i][2] ) {
            return true
        }
    }
    //verif des colonnes
    for (let i = 0; i < 3; i++) {
        if (grid[0][i] && grid[0][i] === grid[1][i] && grid[1][i] == grid[2][i] ) {
            return true
        }
    }
    //verif des diago
        if (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] == grid[2][2] ) {
            return true
        }
        if (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] == grid[2][0] ) {
            return true
        }
        return false
    }
// verifier si egalité ou pas (si les cellules sont vides ou pas)
function isDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j< 3; j++) {
            if (grid[i][j] === '') {
                return false
            }
        }
    }
    return true
}    



// function cpuMove() {

// }
