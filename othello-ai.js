let initVals = [
    [10000, -1000, 500, 1, 1, 500, -1000, 10000],
    [-1000, -1000, -1, -1, -1, -1, -1000, -1000],
    [500, -1, 300, 100, 100, 300, -1, 500],
    [1, -1, 100, 100, 100, 100, -1, 1],
    [1, -1, 100, 100, 100, 100, -1, 1],
    [500, -1, 300, 100, 100, 300, -1, 500],
    [-1000, -1000, -1, -1, -1, -1, -1000, -1000],
    [10000, -1000, 500, 100, 100, 500, -1000, 10000]
];

function aiEval(othello, turn, opp) {
    if (othello.gameOver()) {
        let pScore = othello.getScore(turn);
        let oppScore = othello.getScore(opp);
        if (pScore > oppScore) { return Infinity; }
        if (pScore < oppScore) { return -Infinity; }
        return 0;
    }
    let board = othello.getBoard();
    var val = 0;
    for (var row = 0; row < othello.dim; row++) {
        for (var col = 0; col < othello.dim; col++) {
            let square = board[row][col];
            let initVal = initVals[row][col];
            var squareVal = initVal;
            // if a square is uncapturable, give it favorable points
            if (square == turn) {
                let cornerDirs = [
                    { "slope": 1, "colDir": 1 },
                    { "slope": 1, "colDir": -1 },
                    { "slope": -1, "colDir": 1 },
                    { "slope": -1, "colDir": -1 }
                ];
                cornerDirs.forEach(dir => {
                    let squaresToCorner = getSquaresToCorner(row, col, dir.slope, dir.colDir)
                        .map(sq => board[sq.row][sq.col]);
                    if (squaresToCorner.filter(sq => sq != turn).length == 0) {
                        squareVal = Math.abs(squareVal) * 2;
                    }
                })
                val += squareVal;
            } else if (square == opp) {
                val -= squareVal;
            }
        }
    }
    return val;
}

function getAiMove(fen, maxPly = 2, ply = 1, bestEvals = {}) {
    let maximize = (ply % 2 != 0);
    let othello = new Othello({ "fen": fen });
    let perspectiveTurn = (ply % 2 != 0) ? othello.turn : othello.getOppColor();
    let perspectiveOpp = (ply % 2 != 0) ? othello.getOppColor() : othello.turn;
    let moves = shuffle(othello.getMoves());
    var bestMove;
    var bestEval = (maximize ? -Infinity : Infinity);
    for (var i = 0; i < moves.length; i++) {
        let m = moves[i];
        var val;
        let newGame = new Othello({ "fen": fen });
        newGame.move(m);
        if (ply >= maxPly || newGame.gameOver()) {
            val = aiEval(newGame, perspectiveTurn, perspectiveOpp);
        } else {
            result = getAiMove(newGame.fen(), maxPly, ply + 1, bestEvals);
            val = result.val;
        }
        let pruneVal = bestEvals[ply - 1];
        if (pruneVal != undefined && (maximize ? val < pruneVal : val < pruneVal)) {
            return { "move": m, "val": val };
        }
        if (bestEvals[ply] == undefined || (maximize ? val >= bestEvals[ply] : val <= bestEvals[ply])) {
            bestEvals[ply] = val;
        }
        if (maximize ? val >= bestEval : val <= bestEval) {
            bestMove = m;
            bestEval = val;
        }
    }
    return { "move": bestMove, "val": bestEval };
}

function getSquaresToCorner(startRow, startCol, slope, colDirection) {
    let b = startRow - (slope * startCol);
    var squares = [];
    for (var row = 0; row < othello.dim; row++) {
        for (var col = 0; col < othello.dim; col++) {
            let critCol = (row - b) / slope;
            if ((colDirection == 1) ? (col >= critCol) : (col <= critCol)) {
                squares.push({ "row": row, "col": col });
            }
        }
    }
    return squares;
}

function shuffle(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}
