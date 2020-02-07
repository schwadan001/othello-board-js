/* if a corner is occupied by us, invert the negatives surrounding it
 * if we have a line starting in a corner, add a bonus to adjacent side pieces
 */

let initVals = [
    [5000, -500, 300, 100, 100, 300, -500, 5000],
    [-500, -500, -1, -1, -1, -1, -500, -500],
    [300, -1, 300, 1, 1, 300, -1, 300],
    [100, -1, 1, 1, 1, 1, -1, 100],
    [100, -1, 1, 1, 1, 1, -1, 100],
    [300, -1, 300, 1, 1, 300, -1, 300],
    [-500, -500, -1, -1, -1, -1, -500, -500],
    [5000, -500, 300, 100, 100, 300, -500, 5000]
];

let cornerLineBonus = 100;

function aiEval(board, turn, opp) {
    var val = 0;
    for (var row = 0; row < othello.dim; row++) {
        for (var col = 0; col < othello.dim; col++) {
            let square = board[row][col];
            let initVal = initVals[row][col];
            var squareVal = initVal;
            // if a square is uncapturable, take the abs() of its value
            // a square is uncapturable if we own all pieces between the square and any corner
            if (square == turn) {
                let cornerDirs = [
                    { "r": 1, "c": 1 }, // bottom right
                    { "r": 1, "c": -1 }, // bottom left
                    { "r": -1, "c": 1 }, // top right
                    { "r": -1, "c": -1 } // top left
                ];
                cornerDirs.forEach(dir => {
                    let squaresToCorner = getSquaresToCorner(board, row, col, dir.r, dir.c);
                    if (squaresToCorner.filter(sq => sq != turn).length == 0) {
                        squareVal = Math.abs(squareVal);
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

function getAiMove(fen) {
    let othello = new Othello({ 'fen': fen })
    let moves = shuffle(othello.getMoves());
    let turn = othello.turn;
    let opp = othello.getOppColor();
    let bestMove = { "move": undefined, "val": -Infinity };
    moves.forEach(m => {
        let newGame = new Othello({ 'fen': othello.fen(), 'turn': othello.turn });
        newGame.move(m);
        let val = aiEval(newGame.getBoard(), turn, opp);
        if (val >= bestMove.val) {
            bestMove = { "move": m, "val": val };
        }
    });
    return bestMove;
}

function getSquaresToCorner(board, startRow, startCol, rowDirection, colDirection) {
    var squares = [];
    for (var row = startRow; row < othello.dim && row >= 0; row += rowDirection) {
        for (var col = startCol; col < othello.dim && col >= 0; col += colDirection) {
            if (row != startRow || col != startCol) {
                squares.push(board[row][col]);
            }
        }
    }
    return squares;
}