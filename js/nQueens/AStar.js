class AStarSolver extends QueenProblemSolver {
    searchSolution(startNode, path) {
        this.resetStat();
        let result = this.AStarSearch(startNode, path);
        return result;
    }

    AStarSearch(node, path) {
        if (node.isSolved()) return node;

        this.Iterations += 1;

        let openSet = [node];

        node.gScore = 0;
        node.hScore = node.countConflicts();
        node.fScore = node.hScore;

        let closedSet = new Set();

        while (openSet.length > 0) {
            let currentNode = this.findLowestFScoreNode(openSet);

            if (currentNode.isSolved()) {
                this.updatePath(path, currentNode);
                return currentNode;
            }

            openSet = openSet.filter((n) => n !== currentNode);
            closedSet.add(currentNode);

            let possibleBoards = currentNode.getPossibleBoards();
            console.log(possibleBoards);
            if (possibleBoards.length === 0) {
                this.CountOfDeadEnds += 1;
            }

            this.CountOfStates += possibleBoards.length;

            for (let { board, move } of possibleBoards) {
                if (closedSet.has(board)) {
                    continue;
                }

                let gScore = this.calculateGScore(currentNode, board);
                let hScore = this.calculateHScore(board);

                if (!openSet.includes(board) || gScore < board.gScore) {
                    board.gScore = gScore;
                    board.hScore = hScore;
                    board.fScore = gScore + hScore;
                    board.parent = currentNode;
                    board.parent_move = move;

                    if (!openSet.includes(board)) {
                        openSet.push(board);
                    }
                }
            }
        }

        return null;
    }

    findLowestFScoreNode(nodes) {
        let lowestNode = nodes[0];
        for (let node of nodes) {
            if (node.fScore < lowestNode.fScore) {
                lowestNode = node;
            }
        }
        return lowestNode;
    }

    calculateGScore(currentNode, nextNode) {
        return currentNode.gScore + 1;
    }

    calculateHScore(board) {
        return board.countConflicts();
    }

    updatePath(path, currentNode) {
        while (currentNode.parent) {
            path.push({ bestMove: currentNode.parent_move });
            currentNode = currentNode.parent;
        }
        path.reverse();
    }
}
