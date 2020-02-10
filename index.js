const othello = new Othello();
const board = new OthelloBoard(othello, {
    "displayMoves": "b",
    "onWhiteMove": executeAiMove,
    "onGameOver": restart
});

function executeAiMove() {
    setTimeout(function () {
        let moves = othello.getMoves();
        let move = moves[Math.floor(Math.random() * moves.length)];
        board.move(move);
    }, 1000);
}

function restart() {
    setTimeout(function () {
        let bScore = othello.getScore("b");
        let wScore = othello.getScore("w");
        console.log(bScore + " | " + wScore);
        board.reset();
    }, 5000);
}
