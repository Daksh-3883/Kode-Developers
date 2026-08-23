document.addEventListener('DOMContentLoaded', () => {
    // Game state variables
    let currentPlayer = 'X';
    let gameMode = null; // 'singleplayer' or 'multiplayer'
    let boardSize = 3;
    let board = [];
    let gameActive = true;
    
    // DOM elements
    const setupScreen = document.getElementById('setup-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameBoard = document.getElementById('game-board');
    const currentPlayerDisplay = document.getElementById('current-player');
    const restartBtn = document.getElementById('restart-btn');
    
    // Setup event listeners
    document.getElementById('singleplayer-btn').addEventListener('click', () => {
        gameMode = 'singleplayer';
        document.querySelector('.setup-option').classList.add('hidden');
    });
    
    document.getElementById('multiplayer-btn').addEventListener('click', () => {
        gameMode = 'multiplayer';
        document.querySelector('.setup-option').classList.add('hidden');
    });
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (gameMode) {
                boardSize = parseInt(btn.dataset.size);
                startGame();
            }
        });
    });
    
    restartBtn.addEventListener('click', resetGame);
    
    function startGame() {
        setupScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // Set up the game board
        gameBoard.className = `game-board size-${boardSize}`;
        gameBoard.innerHTML = '';
        
        // Initialize board array
        board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
        
        // Create cells
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', () => handleCellClick(i, j));
                gameBoard.appendChild(cell);
            }
        }
        
        currentPlayer = 'X';
        gameActive = true;
        updateCurrentPlayerDisplay();
    }
    
    function handleCellClick(row, col) {
        if (!gameActive || board[row][col] !== '') return;
        
        // Make player move
        board[row][col] = currentPlayer;
        updateBoard();
        
        // Check for win or draw
        if (checkWin(currentPlayer)) {
            endGame(`${currentPlayer} wins!`);
            return;
        } else if (checkDraw()) {
            endGame("It's a draw!");
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentPlayerDisplay();
        
        // Computer move in singleplayer
        if (gameMode === 'singleplayer' && currentPlayer === 'O' && gameActive) {
            setTimeout(makeComputerMove, 500);
        }
    }
    
    function makeComputerMove() {
        // Smarter AI:
        // - For 3x3 use minimax for optimal play
        // - For larger boards try immediate win, block, center, otherwise random

        function findImmediateMove(player) {
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = player;
                        const win = checkWin(player);
                        board[i][j] = '';
                        if (win) return {row: i, col: j};
                    }
                }
            }
            return null;
        }

        function isMovesLeft() {
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    if (board[i][j] === '') return true;
                }
            }
            return false;
        }

        function evaluate(depth) {
            if (checkWin('O')) return 10 - depth;
            if (checkWin('X')) return depth - 10;
            return 0;
        }

        function minimax(depth, isMaximizing) {
            const score = evaluate(depth);
            if (score !== 0) return score;
            if (!isMovesLeft()) return 0;

            if (isMaximizing) {
                let best = -Infinity;
                for (let i = 0; i < boardSize; i++) {
                    for (let j = 0; j < boardSize; j++) {
                        if (board[i][j] === '') {
                            board[i][j] = 'O';
                            best = Math.max(best, minimax(depth + 1, false));
                            board[i][j] = '';
                        }
                    }
                }
                return best;
            } else {
                let best = Infinity;
                for (let i = 0; i < boardSize; i++) {
                    for (let j = 0; j < boardSize; j++) {
                        if (board[i][j] === '') {
                            board[i][j] = 'X';
                            best = Math.min(best, minimax(depth + 1, true));
                            board[i][j] = '';
                        }
                    }
                }
                return best;
            }
        }

        let chosen = null;

        if (boardSize === 3) {
            let bestVal = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = 'O';
                        const moveVal = minimax(0, false);
                        board[i][j] = '';
                        if (moveVal > bestVal) {
                            bestVal = moveVal;
                            chosen = {row: i, col: j};
                        }
                    }
                }
            }
        } else {
            // Try to win immediately
            chosen = findImmediateMove('O');
            // Block opponent immediate win
            if (!chosen) chosen = findImmediateMove('X');
            // Take center if available
            if (!chosen) {
                const center = Math.floor(boardSize / 2);
                if (board[center][center] === '') chosen = {row: center, col: center};
            }
            // Fallback: random
            if (!chosen) {
                let emptyCells = [];
                for (let i = 0; i < boardSize; i++) {
                    for (let j = 0; j < boardSize; j++) {
                        if (board[i][j] === '') emptyCells.push({row: i, col: j});
                    }
                }
                if (emptyCells.length > 0) {
                    chosen = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                }
            }
        }

        if (chosen) {
            board[chosen.row][chosen.col] = 'O';
            updateBoard();

            if (checkWin('O')) {
                endGame('O wins!');
            } else if (checkDraw()) {
                endGame("It's a draw!");
            } else {
                currentPlayer = 'X';
                updateCurrentPlayerDisplay();
            }
        }
    }
    
    function updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.textContent = board[row][col];
        });
    }
    
    function checkWin(player) {
        // Check rows
        for (let i = 0; i < boardSize; i++) {
            if (board[i].every(cell => cell === player)) {
                return true;
            }
        }

        // Check columns
        for (let col = 0; col < boardSize; col++) {
            let colWin = true;
            for (let row = 0; row < boardSize; row++) {
                if (board[row][col] !== player) {
                    colWin = false;
                    break;
                }
            }
            if (colWin) return true;
        }

        // Check main diagonal
        let diag1 = true;
        for (let i = 0; i < boardSize; i++) {
            if (board[i][i] !== player) {
                diag1 = false;
                break;
            }
        }
        if (diag1) return true;

        // Check anti-diagonal
        let diag2 = true;
        for (let i = 0; i < boardSize; i++) {
            if (board[i][boardSize - 1 - i] !== player) {
                diag2 = false;
                break;
            }
        }
        if (diag2) return true;

        return false;
    }

    function checkDraw() {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === '') return false;
            }
        }
        return true;
    }

    function endGame(message) {
        gameActive = false;
        currentPlayerDisplay.textContent = message;
    }

    function resetGame() {
        // Show setup and reset state
        setupScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
        // Reveal mode selection again
        const setupOption = document.querySelector('.setup-option');
        if (setupOption) setupOption.classList.remove('hidden');

        currentPlayer = 'X';
        gameMode = null;
        boardSize = 3;
        board = [];
        gameActive = true;
        currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
        gameBoard.innerHTML = '';
    }

    function updateCurrentPlayerDisplay() {
        currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

});