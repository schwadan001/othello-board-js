const othello = new Othello();
const board = new OthelloBoard(othello, {
    "displayMoves": "b",
    "onWhiteMove": executeAiMove
});

function executeAiMove() {
    setTimeout(function () {
        let aiMove = getAiMove(othello.fen());
        board.move(aiMove.move);
    }, 1000);
}

function restart() {
    let bScore = othello.getScore("b");
    let wScore = othello.getScore("w");
    console.log(bScore + " | " + wScore);
    board.reset();
}

window.addEventListener("resize", resize, false);
window.addEventListener("orientationchange", resize, false);
