class IDSSolver extends QueenProblemSolver {
    searchSolution(startNode, path, maxIter) {
        this.resetStat();
        let i = 0;
        let result = this.LDFS(startNode, i, path, maxIter);
        while (result === null) {
            this.resetStat();
            i++;
            result = this.LDFS(startNode, i, path, maxIter);
        }
        return result;
    }

    LDFS(startNode, limit, path, maxIter) {
        if (this.Iterations >= maxIter) {
            return startNode;
        }

        if (startNode.isSolved()) return startNode;
        limit -= 1;
        if (limit > 0) {
            this.Iterations += 1;
            let result;
            let possibleBoards = startNode.getPossibleBoards();
            if (possibleBoards.length === 0) this.CountOfDeadEnds += 1;

            this.CountOfStates += possibleBoards.length;
            this.CountOfStatesInMemory += possibleBoards.length;
            for (let nextState of possibleBoards) {
                result = this.LDFS(nextState.board, limit, path, maxIter);
                if (result !== null) {
                    path.push({bestMove: nextState.move, possibleBoards, result, limit});
                    return result;
                }
            }
        }
        return null;
    }
}
