const othello = new Othello();
const board = new OthelloBoard(othello, {
    "displayMoves": "b",
    "onWhiteMove": executeAiMove
});

var cancelMove = false;

function executeAiMove() {
    cancelMove = false;
    setTimeout(function () {
        if (!cancelMove) {
            let aiMove = getAiMove(othello.fen());
            board.move(aiMove.move);
        }
    }, 1000 + Math.floor(Math.random() * 400));
}

function restart() {
    cancelMove = true;
    let bScore = othello.getScore("b");
    let wScore = othello.getScore("w");
    console.log(bScore + " | " + wScore);
    board.reset();
    new Audio("othello-board-js/restart.mp3").play();
}

window.addEventListener("resize", resize, false);
window.addEventListener("orientationchange", resize, false);
