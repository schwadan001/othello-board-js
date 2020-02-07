const othello = new Othello();
const board = new OthelloBoard(othello, {
    "displayMoves": "b",
    //"onBlackMove": executeAiMove,
    "onWhiteMove": executeAiMove,
});

function executeAiMove() {
    setTimeout(function () {
        let bestMove = getAiMove(othello.fen())
        board.move(bestMove.move);
    }, 1000);
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