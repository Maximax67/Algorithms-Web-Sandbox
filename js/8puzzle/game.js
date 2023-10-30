let isFirstState = document.getElementById('desiredState').value === "first";

var Game = function(opt_state) {
    this.state = opt_state || '012345678';
};

Game.Actions = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
};

if (isFirstState) {
    Game.DesiredState = '123456780';
} else {
    Game.DesiredState = '012345678';
}

Game.prototype.getAvaliableActionsAndStates = function() {
    var result = {};

    var zeroIndex = this.state.indexOf('0');
    var row = Math.floor(zeroIndex / 3);
    var column = zeroIndex % 3;

    if (column > 0) result[Game.Actions.LEFT] = this.getNextState(Game.Actions.LEFT);
    if (column < 2) result[Game.Actions.RIGHT] = this.getNextState(Game.Actions.RIGHT);
    if (row > 0) result[Game.Actions.UP] = this.getNextState(Game.Actions.UP);
    if (row < 2) result[Game.Actions.DOWN] = this.getNextState(Game.Actions.DOWN);

    return result;
};


Game.prototype.getNextState = function(action) {
    var zeroIndex = this.state.indexOf('0');
    var newIndex;

    switch (action) {
        case Game.Actions.LEFT:
            newIndex = zeroIndex - 1
            break;
        case Game.Actions.RIGHT:
            newIndex = zeroIndex + 1
            break;
        case Game.Actions.UP:
            newIndex = zeroIndex - 3
            break;
        case Game.Actions.DOWN:
            newIndex = zeroIndex + 3
            break;
        default:
            throw new Error('Unexpected action');
    }

    var stateArr = this.state.split('');
    stateArr[zeroIndex] = stateArr[newIndex];
    stateArr[newIndex] = '0';
    return stateArr.join('');
};


Game.prototype.isFinished = function() {
    return this.state == Game.DesiredState;
};


Game.prototype.randomize = function() {
    var that = this;
    var states = {};
    // var iteration = parseInt(prompt('How many random moves from desired state?'));
    var iteration = 100;

    if (!iteration || isNaN(iteration))
        return alert('Invalid iteration count, please enter a number');

    this.state = Game.DesiredState;
    states[this.state] = true;

    var randomNextState = function() {
        var state = _.sample(that.getAvaliableActionsAndStates());

        if (states[state])
            return randomNextState();

        return state;
    }

    _.times(iteration, function() {
        that.state = randomNextState();
    });
};


Game.prototype.getManhattanDistance = function() {
    let distance = 0;

    const oneIndex = this.state.indexOf('1');
    const onePosition = Game.indexToRowColumn(oneIndex);
    const twoIndex = this.state.indexOf('2');
    const twoPosition = Game.indexToRowColumn(twoIndex);
    const threeIndex = this.state.indexOf('3');
    const threePosition = Game.indexToRowColumn(threeIndex);
    const fourIndex = this.state.indexOf('4');
    const fourPosition = Game.indexToRowColumn(fourIndex);
    const fiveIndex = this.state.indexOf('5');
    const fivePosition = Game.indexToRowColumn(fiveIndex);
    const sixIndex = this.state.indexOf('6');
    const sixPosition = Game.indexToRowColumn(sixIndex);
    const sevenIndex = this.state.indexOf('7');
    const sevenPosition = Game.indexToRowColumn(sevenIndex);
    const eightIndex = this.state.indexOf('8');
    const eightPosition = Game.indexToRowColumn(eightIndex);

    if (isFirstState) {
        distance += Math.abs(0 - onePosition.row) + Math.abs(0 - onePosition.column);
        distance += Math.abs(0 - twoPosition.row) + Math.abs(1 - twoPosition.column);
        distance += Math.abs(0 - threePosition.row) + Math.abs(2 - threePosition.column);
        distance += Math.abs(1 - fourPosition.row) + Math.abs(0 - fourPosition.column);
        distance += Math.abs(1 - fivePosition.row) + Math.abs(1 - fivePosition.column);
        distance += Math.abs(1 - sixPosition.row) + Math.abs(2 - sixPosition.column);
        distance += Math.abs(2 - sevenPosition.row) + Math.abs(0 - sevenPosition.column);
        distance += Math.abs(2 - eightPosition.row) + Math.abs(1 - eightPosition.column);
    } else {
        distance += Math.abs(0 - onePosition.row) + Math.abs(1 - onePosition.column);
        distance += Math.abs(0 - twoPosition.row) + Math.abs(2 - twoPosition.column);
        distance += Math.abs(1 - threePosition.row) + Math.abs(0 - threePosition.column);
        distance += Math.abs(1 - fourPosition.row) + Math.abs(1 - fourPosition.column);
        distance += Math.abs(1 - fivePosition.row) + Math.abs(2 - fivePosition.column);
        distance += Math.abs(2 - sixPosition.row) + Math.abs(0 - sixPosition.column);
        distance += Math.abs(2 - sevenPosition.row) + Math.abs(1 - sevenPosition.column);
        distance += Math.abs(2 - eightPosition.row) + Math.abs(2 - eightPosition.column);
    }

    return distance;
};


const euclideanDistance = (a, b) => Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));

Game.prototype.getEuclideanDistance = function() {
    let distance = 0;

    const oneIndex = this.state.indexOf('1');
    const onePosition = Game.indexToRowColumn(oneIndex);
    const twoIndex = this.state.indexOf('2');
    const twoPosition = Game.indexToRowColumn(twoIndex);
    const threeIndex = this.state.indexOf('3');
    const threePosition = Game.indexToRowColumn(threeIndex);
    const fourIndex = this.state.indexOf('4');
    const fourPosition = Game.indexToRowColumn(fourIndex);
    const fiveIndex = this.state.indexOf('5');
    const fivePosition = Game.indexToRowColumn(fiveIndex);
    const sixIndex = this.state.indexOf('6');
    const sixPosition = Game.indexToRowColumn(sixIndex);
    const sevenIndex = this.state.indexOf('7');
    const sevenPosition = Game.indexToRowColumn(sevenIndex);
    const eightIndex = this.state.indexOf('8');
    const eightPosition = Game.indexToRowColumn(eightIndex);

    if (isFirstState) {
        distance += euclideanDistance([0, 0], [onePosition.row, onePosition.column]);
        distance += euclideanDistance([0, 1], [twoPosition.row, twoPosition.column]);
        distance += euclideanDistance([0, 2], [threePosition.row, threePosition.column]);
        distance += euclideanDistance([1, 0], [fourPosition.row, fourPosition.column]);
        distance += euclideanDistance([1, 1], [fivePosition.row, fivePosition.column]);
        distance += euclideanDistance([1, 2], [sixPosition.row, sixPosition.column]);
        distance += euclideanDistance([2, 0], [sevenPosition.row, sevenPosition.column]);
        distance += euclideanDistance([2, 1], [eightPosition.row, eightPosition.column]);
    } else {
        distance += euclideanDistance([0, 1], [onePosition.row, onePosition.column]);
        distance += euclideanDistance([0, 2], [twoPosition.row, twoPosition.column]);
        distance += euclideanDistance([1, 0], [threePosition.row, threePosition.column]);
        distance += euclideanDistance([1, 1], [fourPosition.row, fourPosition.column]);
        distance += euclideanDistance([1, 2], [fivePosition.row, fivePosition.column]);
        distance += euclideanDistance([2, 0], [sixPosition.row, sixPosition.column]);
        distance += euclideanDistance([2, 1], [sevenPosition.row, sevenPosition.column]);
        distance += euclideanDistance([2, 2], [eightPosition.row, eightPosition.column]);
    }

    return distance;
}


Game.prototype.getMismatchHeuristic = function() {
    let mismatches = 0;

    const oneIndex = this.state.indexOf('1');
    const onePosition = Game.indexToRowColumn(oneIndex);
    const twoIndex = this.state.indexOf('2');
    const twoPosition = Game.indexToRowColumn(twoIndex);
    const threeIndex = this.state.indexOf('3');
    const threePosition = Game.indexToRowColumn(threeIndex);
    const fourIndex = this.state.indexOf('4');
    const fourPosition = Game.indexToRowColumn(fourIndex);
    const fiveIndex = this.state.indexOf('5');
    const fivePosition = Game.indexToRowColumn(fiveIndex);
    const sixIndex = this.state.indexOf('6');
    const sixPosition = Game.indexToRowColumn(sixIndex);
    const sevenIndex = this.state.indexOf('7');
    const sevenPosition = Game.indexToRowColumn(sevenIndex);
    const eightIndex = this.state.indexOf('8');
    const eightPosition = Game.indexToRowColumn(eightIndex);

    if (isFirstState) {
        if (onePosition.row != 0 || onePosition.column != 0) {
            mismatches++;
        }
        if (twoPosition.row != 0 || twoPosition.column != 1) {
            mismatches++;
        }
        if (threePosition.row !== 0 || threePosition.column !== 2) {
            mismatches++;
        }
        if (fourPosition.row !== 1 || fourPosition.column !== 0) {
            mismatches++;
        }
        if (fivePosition.row !== 1 || fivePosition.column !== 1) {
            mismatches++;
        }
        if (sixPosition.row !== 1 || sixPosition.column !== 2) {
            mismatches++;
        }
        if (sevenPosition.row !== 2 || sevenPosition.column !== 0) {
            mismatches++;
        }
        if (eightPosition.row !== 2 || eightPosition.column !== 1) {
            mismatches++;
        }
    } else {
        if (onePosition.row != 0 || onePosition.column != 1) {
            mismatches++;
        }
        if (twoPosition.row != 0 || twoPosition.column != 2) {
            mismatches++;
        }
        if (threePosition.row !== 1 || threePosition.column !== 0) {
            mismatches++;
        }
        if (fourPosition.row !== 1 || fourPosition.column !== 1) {
            mismatches++;
        }
        if (fivePosition.row !== 1 || fivePosition.column !== 2) {
            mismatches++;
        }
        if (sixPosition.row !== 2 || sixPosition.column !== 0) {
            mismatches++;
        }
        if (sevenPosition.row !== 2 || sevenPosition.column !== 1) {
            mismatches++;
        }
        if (eightPosition.row !== 2 || eightPosition.column !== 2) {
            mismatches++;
        }
    }

    return mismatches;
}


Game.indexToRowColumn = function(index) {
    return {
        row: Math.floor(index / 3),
        column: index % 3
    };
}
