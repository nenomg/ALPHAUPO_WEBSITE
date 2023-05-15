this.board = false;


document.onkeydown = function(e) {
    if (this.board !== false) {
        switch (e.which) {
            case 37: // left
                revertMove();
                break;

            case 39: // right
                goForwardMove();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    };
}



function closeModalGamesTable() {
    $("#analizar-partidas").modal('hide');
}

function openModalGamesTable() {
    $("#analizar-partidas").modal('show');
}

function reviewGame(game) {
    var cadena = $('#' + game.toString()).val();

    var moves = cadena.replaceAll(/[\d]+[.]/g, '').split(' ').filter(Boolean);
    this.board = new Board();


    for (var i = 0; i < moves.length; i++) {
        var move = this.board.sanToMove(moves[i]);
        if (move !== false) {
            this.board.makeMove(move);
        }
    }

    for (var i = 0; i < this.board.movesStack.length - 1; i++) {
        this.board.revertLastMove(true);
        i = i - 1;
    }

    printBoardHTML(false);
    openModalGamesTable();
}

function printBoardHTML(square) {
    $("#game-board").html("");
    res = "<table id='tablero'>";
    for (var i = 0; i < 8; i++) {
        res += "<tr>";
        for (var j = 0; j < 8; j++) {
            if (((i + j) % 2) === 0) {
                if (this.board.board[i][j] === false) {
                    res += "<td id='" + i + "_" + j + "'class='w_square'></td>";
                } else {
                    aux = getPieceHTML(this.board.board[i][j].name);
                    res += "<td id='" + i + "_" + j + "' class='w_square'>" + aux + "</td>";
                }
            } else {
                if (this.board.board[i][j] === false) {
                    res += "<td id='" + i + "_" + j + "' class='b_square'></td>";
                } else {
                    aux = getPieceHTML(this.board.board[i][j].name);
                    res += "<td id='" + i + "_" + j + "' class='b_square'>" + aux + "</td>";
                }
            }
        }
        res += "</tr>";
    }
    res += "</table>";

    $("#game-board").append(res);

    if (square !== false) {
        aux = "#" + square[0] + "_" + square[1];
        $(aux).addClass("ultimo_movimiento");
    }
}

function getPieceHTML(name) {
    switch (name) {
        case "wp":
            return "<img class='piece' alt='pawn' src='images/pawn.png'>";
        case "bp":
            return "<img class='piece' alt='pawn' src='images/bpawn.png'>";
        case "wn":
            return "<img class='piece' alt='knight' src='images/knight.png'>";
        case "bn":
            return "<img class='piece' alt='knight' src='images/bknight.png'>";
        case "wb":
            return "<img class='piece' alt='bishop' src='images/bishop.png'>";
        case "bb":
            return "<img class='piece' alt='bishop' src='images/bbishop.png'>";
        case "wr":
            return "<img class='piece' alt='rook' src='images/rook.png'>";
        case "br":
            return "<img class='piece' alt='rook' src='images/brook.png'>";
        case "wq":
            return "<img class='piece' alt='queen' src='images/queen.png'>";
        case "bq":
            return "<img class='piece' alt='queen' src='images/bqueen.png'>";
        case "wk":
            return "<img class='piece' alt='king' src='images/king.png'>";
        case "bk":
            return "<img class='piece' alt='king' src='images/bking.png'>";

        default:
            break;

    }

}

function revertMove() {
    this.board.revertLastMove(true);
    $("#game-board").html("");
    printBoardHTML(false);
}

function goForwardMove() {
    this.board.goForwardMove();
    $("#game-board").html("");
    printBoardHTML(false);
}


function getNextdatabaseMoves(notation) {
    $.ajax({
        url: 'gamenextmove/' + notation,
        type: 'GET',
        success: function(response) {
            $('#next-moves').html(response);
        }
    });
}


function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

async function load_model() {
    let m = await tf.loadLayersModel('Model/Magnus-w/model.json');
    return m;
}

let model = load_model();


model.then(function (res) {
    const xs = tf.tensor([[-5, 0, 0, 0, 0, -6, 0, -4], [-1, 0, 0, 0, -3, -1, 0, 0], [0, 0, 0, 0, -1, 0, 0, 0], [0, 0, -1, 0, 0, -2, -1, -1], [5, 0, 1, 0, 0, 3, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 2, 1, 1, 0], [0, 0, 0, 4, 0, 0, 6, 0]]);
    const preds = res.predict([xs.reshape([1,8, 8, 1])]);
    
    document.getElementById("demo").innerHTML = indexOfMax(Array.from(preds.dataSync()));

    console.log(Array.from(preds.dataSync()));
}, function (err) {
    console.log(err);
});