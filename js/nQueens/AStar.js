class AStarSolver extends QueenProblemSolver {
    searchSolution(startNode, path, maxIter, solutionInfo) {
        this.resetStat();
        let result = this.AStarSearch(startNode, path, maxIter, solutionInfo);
        return result;
    }

    AStarSearch(node, path, maxIter, solutionInfo) {
        if (node.isSolved()) return node;

        let openSet = [node];

        node.gScore = 0;
        node.hScore = node.countConflicts();
        node.fScore = node.hScore;

        let closedSet = new Set();

        let step = 1;

        solutionInfo["INIT"] = {
            openSet,
            closedSet
        };

        while (openSet.length > 0) {
            let currentNode = this.findLowestFScoreNode(openSet);

            if (this.Iterations > maxIter) {
                solutionInfo['MAX iter reached'] = {
                    currentNode
                }

                this.updatePath(path, currentNode, solutionInfo);
                return currentNode;
            }

            if (currentNode.isSolved()) {
                solutionInfo['Solution found'] = {
                    currentNode
                }

                this.updatePath(path, currentNode, solutionInfo);
                return currentNode;
            }

            openSet = openSet.filter((n) => n !== currentNode);
            closedSet.add(currentNode);

            let possibleBoards = currentNode.getPossibleBoards();
            if (possibleBoards.length === 0) {
                this.CountOfDeadEnds += 1;
            }

            solutionInfo[`Step ${step}: Find node`] = {
                currentNode,
                openSet,
                closedSet,
                possibleBoards
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

            solutionInfo[`Step ${step}: Process Node`] = {
                currentNode,
                openSet,
                closedSet,
                possibleBoards
            };

            step++;
            this.Iterations += 1;
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

    updatePath(path, currentNode, solutionInfo) {
        let step = 1;
        solutionInfo['Backtracking Solution'] = {currentNode};
        while (currentNode.parent) {
            solutionInfo['Backtracking Solution'][`Step ${step}`] = {
                "parent node": currentNode.parent,
                "move": currentNode.parent_move
            }
            path.push({ bestMove: currentNode.parent_move });
            currentNode = currentNode.parent;
            step++;
        }
        path.reverse();
    }
}
