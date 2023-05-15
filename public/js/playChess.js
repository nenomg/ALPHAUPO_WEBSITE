selected_square = false;
endDatabase = false;
printBackwards = false;




function beginGame() {
    this.board = new Board();
    this.endDatabase = false;

    printBoardHTML(false);
}

function revertMove() {
    this.endDatabase = false;
    this.board.revertLastMove(true);
    $("#game-board").html("");
    printBoardHTML(false);
}

function goForwardMove() {
    this.board.goForwardMove();
    $("#game-board").html("");
    printBoardHTML(false);
}

function printBoardHTML(square) {
    $("#game-board").html("");
    res = "<table id='tablero'>";

    if(printBackwards == false){
        for (var i = 0; i < 8; i++) {
            res += "<tr>";
            for (var j = 0; j < 8; j++) {
                if (((i + j) % 2) === 0) {
                    if (this.board.board[i][j] === false) {
                        res += "<td id='" + i + "_" + j + "'class='w_square' onclick='updateBoardHTML(" + i + "," + j + ");'></td>";
                    } else {
                        aux = getPieceHTML(this.board.board[i][j].name);
                        res += "<td id='" + i + "_" + j + "' onclick='printMovesFor(" + i + "," + j + ");' class='w_square'>" + aux + "</td>";
                    }
                } else {
                    if (this.board.board[i][j] === false) {
                        res += "<td id='" + i + "_" + j + "' class='b_square' onclick='updateBoardHTML(" + i + "," + j + ");'></td>";
                    } else {
                        aux = getPieceHTML(this.board.board[i][j].name);
                        res += "<td id='" + i + "_" + j + "' onclick='printMovesFor(" + i + "," + j + ");' class='b_square'>" + aux + "</td>";
                    }
                }
            }
            res += "</tr>";
        }
    }else{
        for (var i = 7; i >= 0; i--) {
            res += "<tr>";
            for (var j = 7; j >= 0; j--) {
                if (((i + j) % 2) === 0) {
                    if (this.board.board[i][j] === false) {
                        res += "<td id='" + i + "_" + j + "'class='w_square' onclick='updateBoardHTML(" + i + "," + j + ");'></td>";
                    } else {
                        aux = getPieceHTML(this.board.board[i][j].name);
                        res += "<td id='" + i + "_" + j + "' onclick='printMovesFor(" + i + "," + j + ");' class='w_square'>" + aux + "</td>";
                    }
                } else {
                    if (this.board.board[i][j] === false) {
                        res += "<td id='" + i + "_" + j + "' class='b_square' onclick='updateBoardHTML(" + i + "," + j + ");'></td>";
                    } else {
                        aux = getPieceHTML(this.board.board[i][j].name);
                        res += "<td id='" + i + "_" + j + "' onclick='printMovesFor(" + i + "," + j + ");' class='b_square'>" + aux + "</td>";
                    }
                }
            }
            res += "</tr>";
        }


    }





    res += "</table>";

    $("#game-board").append(res);

    if (square !== false) {
        aux = "#" + square[0] + "_" + square[1];
        $(aux).addClass("ultimo_movimiento");
    }
}


function deleteDuplicatesMoves(moves) {
    aux_moves = moves;
    prev_move = aux_moves[0];

    for (var i = 1; i < moves.length; i++) {
        if (aux_moves[i][0] === prev_move[0] && aux_moves[i][1] === prev_move[1] && aux_moves[i][2] === prev_move[2] && aux_moves[i][3] === prev_move[3]) {
            aux_moves.splice(i, 1);
            i = i - 1;
        }
        prev_move = aux_moves[i];
    }
    return aux_moves;
}


function printMovesFor(i, j) {
    ss = $("#" + i + "_" + j);
    if (this.board.toMove === this.board.board[i][j].color) {
        moves = this.board.getMovesByPos(i, j);
        moves = deleteDuplicatesMoves(moves);

        updateBoardHTML(i, j);
    } else {
        updateBoardHTML(i, j);
        return;
    }

    ss.addClass("selected_square");
    selected_square = [i, j];

    for (var i = 0; i < moves.length; i++) {
        square_name = "#" + moves[i][2] + "_" + moves[i][3];
        $(square_name).append("<div class='possible_move_box'><div class='possible_move'></div></div>");
    }
}


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


function isPromotion(move) {
    i = move[0];
    j = move[1];
    i2 = move[2];
    j2 = move[3];

    if (this.board.board[i][j].name === "wp" && i === 1 && i2 === 0) {
        return true;
    } else if (this.board.board[i][j].name === "bp" && i === 6 && i2 === 7) {
        return true;
    }

    return false;
}


function showPromotionModal(move) {

    pc = this.board.board[move[0]][move[1]];
    $("#promotion-modal-pieces").html("");

    if (pc.color === 0) {
        appendWhitePiecesToModal(move);
    } else if (pc.color === 1) {
        appendBlackPiecesToModal(move);
    }

    $('#exampleModal').modal('show');

}

function promoteMove(i, j, i2, j2, p) {
    $('#exampleModal').modal('hide');
    var san = this.board.moveToSan([i, j, i2, j2, "PROMOTE", p]);
    this.board.makeMove([i, j, i2, j2, "PROMOTE", p]);
    $("#game-board").html("");
    printBoardHTML([i2, j2]);
    $("#Pensando").html("<div class='lds-dual-ring'></div>");
    setTimeout(minimaxMove(), 100);
}

function appendWhitePiecesToModal(move) {
    i = move[0];
    j = move[1];
    i2 = move[2];
    j2 = move[3];


    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"Q"' + ")><img class='promotion-piece' alt='queen' src='images/queen.png'></div>");
    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"N"' + ")><img class='promotion-piece' alt='knight' src='images/knight.png'></div>");
    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"R"' + ")><img class='promotion-piece' alt='rook' src='images/rook.png'></div>");
    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"B"' + ")><img class='promotion-piece' alt='bishop' src='images/bishop.png'></div>");
}

function appendBlackPiecesToModal() {
    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"Q"' + ")><img class='promotion-piece' alt='bqueen' src='images/bqueen.png'></div>");
    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"N"' + ")><img class='promotion-piece' alt='bknight' src='images/bknight.png'></div>");
    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"R"' + ")><img class='promotion-piece' alt='brook' src='images/brook.png'></div>");
    $("#promotion-modal-pieces").append("<div onclick = promoteMove(" + i + "," + j + "," + i2 + "," + j2 + ',"B"' + ")><img class='promotion-piece' alt='bbishop' src='images/bbishop.png'></div>");
}

async function minimaxMove() {
    var alg = parseInt($("#algoritmo-en-uso").val());
    var depth = parseInt($("#profundidad-del-algoritmo").val());

    if(alg == 2 && this.endDatabase!=true){
        var move = databaseMove(this.board);


        if(move != false){
            if(move[1].length < 1){
                this.endDatabase = true;
                alg = 3;
            }else{
                $("#resultado-completado").html("TRUE");
                $("#movimiento-completado").html(JSON.stringify(this.board.sanToMove(move[1])));
                setMinimaxRes();
                return;
            }
        }
    }else if(alg == 2){
        alg = 3;
    }



    var w = new Worker("js/algorithimWorker.js");

    w.postMessage([this.board.movesStack, alg, depth]);

    w.onmessage = function(event) {
        $("#resultado-completado").html("TRUE");
        $("#movimiento-completado").html(JSON.stringify(event.data[1]));

        setMinimaxRes();
        w.terminate();
    };


    



    /*
    if (alg === 0) {
        var move = await minimax(this.board, depth);
    } else if (alg === 1) {
        var move = await minimaxAlphaBetaPruning(this.board, depth, -99999999, 99999999);
    } else {
        return 1;
    }
    */




    return 1;
}

function setMinimaxRes() {
    var resm = $("#movimiento-completado").html();
    var move = JSON.parse(resm);

    var san = this.board.moveToSan(move);
    this.board.makeMove(move);
    $("#game-board").html("");
    printBoardHTML([move[2], move[3]]);

    $("#Pensando").html("<p>Último movimiento: <strong>" + san + "</strong></p>");

    setTimeout(() => {
        if (this.board.gameState === "CHECKMATE") {
            if(this.board.toMove == 1){
                showModalCheckmate("Ganan blancas");
            }else{
                showModalCheckmate("Ganan negras");
            }
            
            $("#Pensando").html("");
        }
    }, 100);

    $("#resultado-completado").html("");
}










function updateBoardHTML(i, j) {
    ss = $("#" + i + "_" + j);
    childs = ss.children();

    for (var idx = 0; idx < childs.length; idx++) {
        if ($(childs[idx]).hasClass("possible_move_box")) {
            move = [selected_square[0], selected_square[1], i, j];

            if (this.board.board[move[0]][move[1]] !== false) {
                if (this.board.board[move[0]][move[1]].name === "wp" && this.board.board[move[2]][move[3]] === false && move[1] !== move[3]) {
                    move = [selected_square[0], selected_square[1], i, j, this.board.board[move[2] + 1][move[3]], "PASSANT"];
                } else if (this.board.board[move[0]][move[1]].name === "bp" && this.board.board[move[2]][move[3]] === false && move[1] !== move[3]) {
                    move = [selected_square[0], selected_square[1], i, j, this.board.board[move[2] - 1][move[3]], "PASSANT"];
                }
            }

            if (isPromotion(move) !== false) {
                showPromotionModal(move);
                return;
            }

            var san = this.board.moveToSan(move);
            this.board.makeMove(move);

            
            $("#game-board").html("");
            printBoardHTML([move[2], move[3]]);
            $("#Pensando").html("<div class='lds-dual-ring'></div>");

            if (this.board.gameState === "CHECKMATE") {
                if(this.board.toMove == 1){
                    showModalCheckmate("Ganan blancas");
                }else{
                    showModalCheckmate("Ganan negras");
                }
                
                $("#Pensando").html("");
            }

            setTimeout(minimaxMove, 100);

        }
    }


    var aux = document.getElementsByClassName('possible_move_box');

    while (aux.length > 0) {
        aux[0].parentNode.removeChild(aux[0]);
    }

    aux = "#" + selected_square[0] + "_" + selected_square[1];

    $(aux).removeClass('selected_square');

    selected_square = false;

}

function makeMoveBySan() {
    var value = $("#moveBySanVal").val();
    var move = this.board.sanToMove(value);
    this.board.makeMove(move);
    $("#game-board").html("");
    printBoardHTML([move[2], move[3]]);
}


function showModalSelection() {
    $('#modelo-seleccion-algoritmo').modal('show');
}

function closeModalSelection() {
    $('#modelo-seleccion-algoritmo').modal('hide');

    var alg = parseInt($("#algoritmo-en-uso").val());

    var alg_name = "";

    if (alg === 0) {
        alg_name = "Minimax";
    } else if (alg === 1) {
        alg_name = "Minimax Alpha Beta";
    }else if (alg === 2) {
        alg_name = "Minimax, database";
    }else if (alg === 3) {
        alg_name = "Minimax 2";
    }
    $('#algoritmo-utilizado').html(alg_name);
}

function closeModalPromotion() {
    $('#exampleModal').modal('hide');
}

function closeModalCheckmate() {
    $('#modalCheckmate').modal('hide');
}

function showModalCheckmate(msg) {
    $('#modalCheckmateMessage').html(msg);
    $('#modalCheckmate').modal('show');
}

function closeModalStalemate() {
    $('#modalStalemate').modal('hide');
}

function showModalStalemate(msg) {
    $('#modalCheckmateMessage').html(msg);
    $('#modalStalemate').modal('show');
}



/*
function compareXMoves() {
    var startTime = performance.now();

    for (var idx2 = 0; idx2 < 200; idx2++) {
        const moves = this.board.getLegalMoves(this.board.toMove);
        const move = moves[Math.floor(Math.random() * moves.length)];
        if (this.board.makeMove(move) === "CHECKMATE") {
            alert("CHECKMATE");
        }
    }

    var endTime = performance.now();
    const chess = new Chess();

    var startTime2 = performance.now();
    for (var i = 0; i < 200; i++) {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
    }
    var endTime2 = performance.now();

    $("#aux").html("Mi algoritmo: " + (endTime - startTime) + " / ChessJs:" + (endTime2 - startTime2));
}
*/

function databaseMove(board){
    getNextDatabaseMove(board);
    var move = $("#databaseMove").html();

    if(move == "FALSE"){
        return false;
    }else{
        return [0, move];
    }
}

function getNextDatabaseMove(board){
    $("#databaseMove").html("");
    var g = board.getFullGame();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: "gamenextmove/" + g.toString(),
        type: 'GET',
        dataType: 'json',
        async: false,
        cache: false,
        timeout: 30000,
        fail: function(){
            return false;
        },
        success:function(data){
            if(data.length < 1){
                $("#databaseMove").html("FALSE");
                return;
            }

            var res = JSON.parse(JSON.stringify(data));
            var bl = res["Black"];
            var wh = res["White"];

            var diffs = [];

            for(var i = 0; i < bl.length; i++){
                for(var j = 0; j < wh.length; j++){
                    if(bl[i]["n_move"] == wh[j]["n_move"]){
                        diffs.push([bl[i]["n_move"], bl[i]["number"] / wh[j]["number"]]);
                    }
                }
            }
            
            var move = "";
            var move_p = 0;
            for(var i = 0; i<diffs.length; i++){
                if(move_p < diffs[i][1]){
                    move = diffs[i][0];
                    move_p = diffs[i][1];
                }
            }

            $("#databaseMove").html(move.replace(/\d./g, ""));
         }
    });


}


function swapSides(){
    minimaxMove();

    if(printBackwards){
        printBackwards = false;
        $('#icono-cambio-de-lado').removeClass("claseParaNegro");
    }else{
        printBackwards = true;
        $('#icono-cambio-de-lado').addClass("claseParaNegro");
    }
    
    updateBoardHTML();
}
