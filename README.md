# othello-board-js
othello-board-js is a simple JavaScript Othello board built on [othello-js](https://github.com/schwadan001/othello-js).

An example implementation of othello-js and othello-board-js is viewable in this repository's published GitHub.io site: https://schwadan001.github.io/othello-board-js/


## Getting started
The othello-board-js library cannot be imported via NPM or included as a CDN repository. Simply fork the project or download the files to get started with othello-board-js.

The following code will play a random game of Othello:

```html
<html>
<head>
    <link rel='stylesheet' href='othello-board-js/othello-board.css'>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>
</head>
<body>
    <div id='info'></div>
    <table id='board'></table>
</body>
<script src='https://code.jquery.com/jquery-1.12.4.min.js'></script>
<script src='othello-js/othello.js'></script>
<script src='othello-board-js/othello-board.js'></script>
<script>
    let othello = new Othello();
    let board = new OthelloBoard(othello, {
        'displayMoves': 'none',
        'onBlackMove': executeAiMove,
        'onWhiteMove': executeAiMove,
    });
    function executeAiMove() {
        setTimeout(function () {
            let moves = othello.getMoves();
            let move = moves[Math.floor(Math.random() * moves.length)];
            board.move(move);
        }, 3000);
    }
</script>
</html>
```


## API - othello-board.js (class OthelloBoard)

OthelloBoard requires jQuery for DOM manipulation. To use OthelloBoard, add the following to your html document:
```html
<script src='https://code.jquery.com/jquery-1.12.4.min.js'></script>
```

### Constructor - OthelloBoard()
The constructor takes 2 parameters:
  1. **othello** : Othello object - _(required)_
  1. **config** : json object - _(optional)_ - takes the following parameters, which are all optional:
      * **boardId** : string => id of the board object in the HTML document. Do not prefix with ```#```.
        * default = ```'board'```
      * **infoId** : string => id of an info/notification div in the HTML document. Do not prefix with ```#```.
        * default = ```'info'```
      * **boardVar** : string => variable name of the OthelloBoard object in your code. Used to tie your board object to button actions in the UI.
        * default = ```'board'```
      * **displayMoves** : string => determines which players will be able to see clickable move options displayed on the board. This should be selected for player moves and turned off for AI moves.
        * options : ```'both', 'none', 'b', 'w'```
        * default = ```'both'```
      * **onBlackMove** : string => function to execute when it's black's turn.
        * default = ```function () { }```
      * **onWhiteMove** : string => function to execute when it's black's turn.
        * default = ```function () { }```

``` javascript
// default board settings are player vs player
let othello = new Othello();
let board = new OthelloBoard(othello);

// example where HTML ids don't match the default values
let othello1 = new Othello();
let board1 = new OthelloBoard(othello1, config = {
  'boardId': 'myOthelloBoardId',
  'infoId': 'notificationDivId',
  'boardVar': 'board1'
});

// example where white is controlled by random AI
let othello2 = new Othello();
let board2 = new OthelloBoard(othello2, config = {
  'displayMoves': 'b', // only display possible moves for the human player (black)
  'onWhiteMove': executeAiMove,
  'boardVar': 'board2'
});
function executeAiMove() {
    setTimeout(function () {
        let moves = othello2.getMoves();
        let move = moves[Math.floor(Math.random() * moves.length)];
        board2.move(move);
    }, 3000);
}
```

### .move(position)
Executes move, updating the Othello object and the display. Also kicks off then next automated move, if applicable.

```javascript
// player vs player example
let othello = new Othello();
let board = new OthelloBoard(othello);
othello.fen() // returns => '8|8|8|3bw3|3wb3|8|8|8 b'
board.move({'row': 2, 'col': 4}); // move executed; display updated; turn switched to white
othello.fen() // returns '8|8|4b3|3bb3|3wb3|8|8|8 w'

// player vs AI example
let othello = new Othello();
let board = new OthelloBoard(othello2, config = {
  'displayMoves': 'b',
  'onWhiteMove': executeAiMove
});
function executeAiMove() {
    setTimeout(function () {
        let moves = othello2.getMoves();
        let move = moves[Math.floor(Math.random() * moves.length)];
        board2.move(move);
    }, 3000);
}
board.move({'row': 2, 'col': 4}); // move executed; display updated; turn switched to white
// executeAiMove() is called for white
// after AI move, turn switches back to black and waits for user input
```

### .updateDisplay()
Forces the update of the display (board and score), and highlights changes to the board since the display was last updated. There isn't a strong use case for calling this method since ```.move()``` calls ```.updateDisplay()``` automatically.
  * The piece that was placed is highlighted in purple.
  * Pieces that are flipped as a result of that placement are highlighted in pink.

### .reset()
Calls the ```.reset()``` method on the ```Othello``` object and updates the display. 

```javascript
// correct way to reset the board and game state
let othello = new Othello();
let board = new OthelloBoard(othello);
board.move({'row': 2, 'col': 4});
board.reset();

// NOT EQUIVALENT - this will highlight all the 'changes' that occur when the board is reset
let othello = new Othello();
let board = new OthelloBoard(othello);
board.move({'row': 2, 'col': 4});
othello.reset()
board.updateDisplay()
```
