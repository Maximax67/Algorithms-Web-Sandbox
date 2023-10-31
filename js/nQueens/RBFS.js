class RBFSSolver extends QueenProblemSolver {
    searchSolution(startNode, path, maxIter) {
        this.resetStat();
        return this.RBFSRecursive(startNode, maxIter, Infinity, path).board;
    }

    RBFSRecursive(node, maxIter, fLimit, path) {
        if (node.isSolved()) return { board: node, newF: 0 };

        if (this.Iterations >= maxIter) {
            return { board: node.board, newF: 0 };
        }

        this.Iterations += 1;

        let estimations = [];
        let possibleBoards = node.getPossibleBoards();

        if (possibleBoards.length === 0) this.CountOfDeadEnds += 1;

        this.CountOfStates += possibleBoards.length;
        this.CountOfStatesInMemory += possibleBoards.length;
        let result;
        let bestState;
        let bestMove;

        possibleBoards.forEach((state) => {
            estimations.push({ f: state.board.countConflicts(), board: state.board, move: state.move });
        });

        do {
            estimations.sort((a, b) => a.f - b.f);
            let bestEstimate = estimations[0].f;
            bestState = estimations[0].board;
            bestMove = estimations[0].move;

            let alternative = estimations[1].f;
            if (bestEstimate > fLimit) return { board: null, newF: bestEstimate };
            result = this.RBFSRecursive(bestState, maxIter, Math.min(fLimit, alternative), path);

            if (result.board === null) {
                estimations[0] = { f: result.newF, board: bestState, move: bestMove };
            }
        } while (result.board === null);

        path.push({
            fLimit,
            bestMove,
            estimations,
        });

        return { board: result.board, newF: 0 };
    }
}
