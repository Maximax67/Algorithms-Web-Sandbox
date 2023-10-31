document.addEventListener("DOMContentLoaded", function () {
    const algorithms = {
        IDS: "ids",
        RBFS: "rbfs",
        ASTAR: "aStar"
    }

    const sizeInput = document.getElementById("size-input");
    const setSizeButton = document.getElementById("set-size-button");
    const algorithmInput = document.getElementById("algorithm-select");
    const maxIterInput = document.getElementById("max-iter-input");
    const startButton = document.getElementById("start-button");
    const solutionSteps = document.getElementById("solution-steps");
    const solutionDiv = document.getElementsByClassName("solution")[0];
    const initialBoard = document.getElementById("initial-board");

    let currentSize = 8;
    let initialQueens = [];

    function updateInitialBoard() {
        initialBoard.innerHTML = '';
        for (let row = 0; row < currentSize; row++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('chess-row');

            for (let col = 0; col < currentSize; col++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('chess-cell');
                cellElement.dataset.row = row;
                cellElement.dataset.col = col;
                cellElement.addEventListener('click', toggleQueen);

                // Check if this cell contains a queen
                if (initialQueens.some(({ Y, X }) => Y === row && X === col)) {
                    cellElement.classList.add('queen');
                }

                rowElement.appendChild(cellElement);
            }

            initialBoard.appendChild(rowElement);
        }
    }

    // Event listener to toggle the queen's position
    function toggleQueen(event) {
        const row = parseInt(event.target.dataset.row, 10);
        const col = parseInt(event.target.dataset.col, 10);

        const existingQueenIndex = initialQueens.findIndex(({ Y, X }) => Y === row && X === col);
        if (existingQueenIndex !== -1) {
            initialQueens.splice(existingQueenIndex, 1);
        } else {
            initialQueens.push({ Y: row, X: col });
        }

        updateInitialBoard();
    }

    setSizeButton.addEventListener("click", function () {
        const newSize = parseInt(sizeInput.value, 10);
        if (isNaN(newSize) || newSize < 1) {
            alert("Please enter a valid board size (a positive integer).");
            return;
        }

        if (newSize > 99) {
            alert("Too big board size!");
            return;
        }

        currentSize = newSize;
        initialQueens = [];
        updateInitialBoard();
    });

    function printBoard(queens, boardElement, size) {
        boardElement.innerHTML = '';

        for (let row = 0; row < size; row++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('chess-row');

            for (let col = 0; col < size; col++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('chess-cell');

                if (queens.some(({ Y, X }) => Y === row && X === col)) {
                    cellElement.classList.add('queen');
                }

                rowElement.appendChild(cellElement);
            }

            boardElement.appendChild(rowElement);
        }
    }

    function moveQueen(queensList, queenMove) {
        for (let i = 0; i < queensList.length; i++) {
            const queen = queensList[i];
            if (queen.X === queenMove.StartX && queen.Y === queenMove.StartY) {
                queen.X = queenMove.EndX;
                queen.Y = queenMove.EndY;
                break;
            }
        }
    }

    function printSolutionStep(title, solutionInfo = "", size = 0, queens = []) {
        const solutionElement = document.createElement("div");
        solutionElement.classList.add("step");
        solutionElement.innerHTML = `<p>${title}</p>`;
        solutionSteps.appendChild(solutionElement);

        if (solutionInfo) {
            solutionElement.appendChild(solutionInfo);
        }

        if (queens.length && size) {
            const boardElement = document.createElement("div");
            boardElement.classList.add("chess-board");
            printBoard(queens, boardElement, size);
            solutionElement.appendChild(boardElement);
            solutionSteps.appendChild(solutionElement);
        }
    }

    startButton.addEventListener("click", function () {
        const maxIter = parseInt(maxIterInput.value);

        if (isNaN(maxIter) || maxIter < 1) {
            alert("Please enter a max iterations (a positive integer).");
            return;
        }

        solutionSteps.innerHTML = ""; // Clear previous solutions

        let solvingQueens = deepCopy(initialQueens);
        const size = currentSize;
        const board = new Board(solvingQueens, size);
        const path = [];

        let solver;
        let isSolved;
        let globalSolution = {};

        if (algorithmInput.value == algorithms.RBFS) {
            solver = new RBFSSolver();
            isSolved = solver.searchSolution(board, path, maxIter);
        } else if (algorithmInput.value == algorithms.IDS) {
            solver = new IDSSolver();
            isSolved = solver.searchSolution(board, path, maxIter).isSolved();
        } else {
            solver = new AStarSolver();
            isSolved = solver.searchSolution(board, path, maxIter, globalSolution).isSolved();
        }

        if (isSolved) {
            printSolutionStep(`Solution found! Total Steps: ${path.length}`);
            
            printSolutionStep('Initial board', '', size, solvingQueens);
            if (globalSolution) {
                const solutionInfoDiv = document.createElement('div');
                solutionInfoDiv.classList.add('objects');
                createTree(globalSolution, solutionInfoDiv);
                printSolutionStep(`Solution:`, solutionInfoDiv);
            }

            path.forEach((solution, index) => {
                moveQueen(solvingQueens, solution.bestMove);

                const solutionInfoDiv = document.createElement('div');
                solutionInfoDiv.classList.add('objects');
                createTree(solution, solutionInfoDiv);

                printSolutionStep(`Step: ${index + 1}`, solutionInfoDiv, size, solvingQueens);
            });
        } else {
            printSolutionStep(`NO Solution found!`);
            printSolutionStep('Initial board', '', size, solvingQueens);
            if (globalSolution) {
                const solutionInfoDiv = document.createElement('div');
                solutionInfoDiv.classList.add('objects');
                createTree(globalSolution, solutionInfoDiv);
                printSolutionStep(`Solution:`, solutionInfoDiv);
            }

            path.forEach((solution, index) => {
                moveQueen(solvingQueens, solution.bestMove);

                const solutionInfoDiv = document.createElement('div');
                solutionInfoDiv.classList.add('objects');
                createTree(solution, solutionInfoDiv);

                printSolutionStep(`Step: ${index + 1}`, solutionInfoDiv, size, solvingQueens);
            });
        }

        solutionDiv.style.display = 'block';
    });

    updateInitialBoard();
});
