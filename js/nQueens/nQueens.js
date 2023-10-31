class MatrixAlgorithms {
    constructor(size, matrix) {
        this._size = size;
        this._matrix = matrix;
    }

    forEachSumByColumn(action) {
        for (let k = 0; k < this._size; k++) {
            let columnSum = 0;
            this.traverseMatrix(0, k, 1, 0, (i, j) => {
                columnSum += this._matrix[i][j];
                return true;
            });
            action(columnSum);
        }
    }

    forEachSumByRow(action) {
        for (let k = 0; k < this._size; k++) {
            let rowSum = 0;
            this.traverseMatrix(k, 0, 0, 1, (i, j) => {
                rowSum += this._matrix[i][j];
                return true;
            });
            action(rowSum);
        }
    }

    forEachSumByDiagonals(action) {
        let diagonalSum = 0;
        for (let k = 0; k < this._size; k++) {
            diagonalSum = 0;
            this.traverseMatrix(0, k, 1, -1, (i, j) => {
                diagonalSum += this._matrix[i][j];
                return true;
            });
            action(diagonalSum);

            diagonalSum = 0;
            this.traverseMatrix(this._size - 1, this._size - k - 1, -1, 1, (i, j) => {
                diagonalSum += this._matrix[i][j];
                return true;
            });
            action(diagonalSum);

            diagonalSum = 0;
            this.traverseMatrix(0, this._size - k - 1, 1, 1, (i, j) => {
                diagonalSum += this._matrix[i][j];
                return true;
            });
            action(diagonalSum);

            diagonalSum = 0;
            this.traverseMatrix(this._size - 1, k, -1, -1, (i, j) => {
                diagonalSum += this._matrix[i][j];
                return true;
            });
            action(diagonalSum);
        }
    }

    traverseMatrix(startI, startJ, dI, dJ, action) {
        if (
            startI >= this._size ||
            startJ >= this._size ||
            startI < 0 ||
            startJ < 0
        ) {
            throw new Error("Start position is outside of the matrix");
        }

        let canContinue = true;
        let i = startI;
        let j = startJ;
        while (
            i < this._size &&
            j < this._size &&
            i >= 0 &&
            j >= 0 &&
            canContinue
        ) {
            canContinue = action(i, j);
            i += dI;
            j += dJ;
        }
    }
}

class QueenMove {
    constructor(startY, startX, endY, endX) {
        this.StartY = startY;
        this.StartX = startX;
        this.EndY = endY;
        this.EndX = endX;
    }
}

class Board {
    constructor(queensPositions, size) {
        this.QueensPositions = queensPositions;
        this._size = size;
        this._board = new Array(size)
            .fill(0)
            .map(() => new Array(size).fill(0));
        queensPositions.forEach((position) => {
            this._board[position.Y][position.X] = 1;
        });

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (this._board[i][j] !== 1) {
                    this._board[i][j] = 0;
                }
            }
        }

        this._matrixAlgorithms = new MatrixAlgorithms(size, this._board);
    }

    getAvailableMovesForQueen(y, x) {
        let moves = [];

        this.forEachDirection((dx, dy) => {
            this._matrixAlgorithms.traverseMatrix(y, x, dy, dx, (i, j) => {
                if (i !== y || j !== x) {
                    if (this._board[i][j] !== 1) {
                        moves.push({ Y: i, X: j });
                    } else {
                        return false;
                    }
                }
                return true;
            });
        });

        return moves;
    }

    isSolved() {
        let isSolved = true;
        this._matrixAlgorithms.forEachSumByColumn((sum) => {
            if (sum > 1) isSolved = false;
        });
        this._matrixAlgorithms.forEachSumByRow((sum) => {
            if (sum > 1) isSolved = false;
        });
        this._matrixAlgorithms.forEachSumByDiagonals((sum) => {
            if (sum > 1) isSolved = false;
        });
        return isSolved;
    }

    countConflicts() {
        let conflicts = [];
        this.QueensPositions.forEach((queen) => {
            this.forEachDirection((dx, dy) =>
                this._matrixAlgorithms.traverseMatrix(queen.Y, queen.X, dy, dx, (i, j) => {
                    if (i !== queen.Y || j !== queen.X) {
                        if (this._board[i][j] === 1) {
                            let firstQueenIndex = this.QueensPositions.indexOf(queen);
                            let secondQueenIndex = this.QueensPositions.indexOf({ Y: i, X: j });
                            if (
                                !conflicts.some(
                                    (conflict) =>
                                        (conflict.Queen1 === firstQueenIndex &&
                                            conflict.Queen2 === secondQueenIndex) ||
                                        (conflict.Queen1 === secondQueenIndex &&
                                            conflict.Queen2 === firstQueenIndex)
                                )
                            ) {
                                conflicts.push({ Queen1: firstQueenIndex, Queen2: secondQueenIndex });
                            }
                            return false;
                        }
                    }
                    return true;
                })
            );
        });

        return conflicts.length;
    }

    forEachDirection(method) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (j === 0 && i === 0) continue;
                method(j, i);
            }
        }
    }

    getPossibleBoards() {
        let possibleBoards = [];
        this.QueensPositions.forEach((queen) => {
            let availableMoves = this.getAvailableMovesForQueen(queen.Y, queen.X);
            availableMoves.forEach((move) => {
                let newQueensPositions = [...this.QueensPositions];
                newQueensPositions = newQueensPositions.filter(
                    (position) => position.Y !== queen.Y || position.X !== queen.X
                );
                newQueensPositions.push(move);
                let board = new Board(newQueensPositions, this._size);
                possibleBoards.push({ board, move: new QueenMove(queen.Y, queen.X, move.Y, move.X) });
            });
        });

        return possibleBoards;
    }
}

class QueenProblemSolver {
    constructor() {
        this.Iterations = 0;
        this.CountOfDeadEnds = 0;
        this.CountOfStates = 0;
        this.CountOfStatesInMemory = 0;
    }

    resetStat() {
        this.Iterations = 0;
        this.CountOfDeadEnds = 0;
        this.CountOfStates = 0;
        this.CountOfStatesInMemory = 0;
    }
}
