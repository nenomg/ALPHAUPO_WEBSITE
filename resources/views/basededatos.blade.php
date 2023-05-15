<head>
    <title>ALPHAUPO</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--JQUERY-->
    <script src="{{asset('lib/Jquery/jquery-3.6.0.min.js')}}"></script>

    <!--BOOTSTRAP-->
    <link href="{{ asset('lib/Bootstrap5/bootstrap.css') }}" rel="stylesheet">
    <script src="{{ asset('lib/Bootstrap5/bootstrap.bundle.js')}}"></script>

    <!--BOARD STYLES-->
    <link href="css/board.css" rel="stylesheet">
    <link href="css/basedatos.css" rel="stylesheet">
    @extends('Layout.linksPortada')
</head>
<body>
    @extends('Layout.header')
<div id="contenido2">
    <h1 id="titulo-basededatos">BASE DE DATOS</h1>

    <div>
        <button id="boton-busqueda" type="button" style="color: white;" class="btn" data-bs-toggle="modal" data-bs-target="#modal-jugadores">
            <i class="ri-calendar-event-line"></i>
        </button>
        <button id="boton-busqueda" type="button" style="color: white;" class="btn" data-bs-toggle="modal" data-bs-target="#modal-evento">
            <i class="ri-user-search-line"></i>
        </button>
    </div>

    




    <div class="modal" id="modal-evento" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">BUSQUEDA</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div style="text-align:left;">
                        <form class="form-group row" action="{{route('basededatosJugadores')}}" method="GET">
                            <label for="jugador" class="col-xs-2 col-form-label">Buscar Jugador: </label>
                            <div class="col-xs-10" >
                                <select id="jugador" class="form-select" name="jugador" style="max-witdth: 50%">
                                    @foreach($jugadores as $jugador)
                                        <option value="{{$jugador->White}}">{{$jugador->White}}</option>
                                    @endforeach
                                </select>
                                <button style="width:100%;margin: auto; margin-top: 5vh;" type="submit" class="btn btn-primary"><i class="ri-search-line"></i></button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="modal" id="modal-jugadores" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">BUSQUEDA</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div style="text-align:left;">
                        <form class="form-group row" action="{{route('basededatosEventos')}}" method="GET">
                            <label for="evento" class="col-xs-2 col-form-label">Buscar Evento: </label>
                            <div class="col-xs-10" >
                                <select id="evento" class="form-select" name="evento" style="max-witdth: 50%">
                                    @foreach($eventos as $evento)
                                        <option value="{{$evento->Event}}">{{$evento->Event}}</option>
                                    @endforeach
                                </select>
                                <button style="width:100%;margin: auto; margin-top: 5vh;" type="submit" class="btn btn-primary"><i class="ri-search-line"></i></button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>


    <br/>
    <br/>




    <table id="tabla-de-partidas" class="table table-light table-striped">
        <thead class="table-dark">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Black</th>
                <th scope="col">White</th>
                <th scope="col">Event</th>
                <th scope="col">Date</th>
                <th scope="col">Round</th>
                <th scope="col">Result</th>
                <th scope="col">Site</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            @foreach($partidas as $partida)
            <tr>
                <td>{{$partida->Id}}</td>
                <td>{{ $partida->Black}}</td>
                <td>{{ $partida->White }}</td>
                <td>{{ $partida->Event }}</td>
                <td>{{ $partida->Date }}</td>
                <td>{{ $partida->Round }}</td>
                <td>{{ $partida->Result }}</td>
                <td>{{ $partida->Site }}</td>
                <td><button class="btn btn-primary" onclick="reviewGame({{$partida->Id}})">Analizar</button></td>
                <input id="{{$partida->Id}}" style="display:none;" value="{{$partida->Game}}"/>
            </tr>
            @endforeach
        </tbody>
        
    </table>
    <div id="links-tabla-partidas">
        {{ $partidas->links() }}
    </div>
</div>



            <!-- Modal -->
        <div class="modal fade" id="analizar-partidas" tabindex="-1" role="dialog" aria-labelledby="analizar-partidasLabel" aria-hidden="true">
            <div id="modal-dialog-analisis" class="modal-dialog" role="document">
                <div id="modal-content-analisis" class="modal-content">
                    <div id="modal-header-analisis" class="modal-header">
                        <h5 class="modal-title" id="analizar-partidasLabel">Análisis</h5>
                        <button type="button" class="btn-close btn-close-white" aria-label="Close" onclick="closeModalGamesTable()"></button>
                    </div>
                    <div class="modal-body" style="height: 100vh">
                            <div id="game-content">
                                <div id="game-board">
                                    <table id="tablero">
                                        <tbody>
                                            <tr>
                                                <td id="0_0" onclick="printMovesFor(0,0);" class="w_square"></td>
                                                <td id="0_1" onclick="printMovesFor(0,1);" class="b_square"></td>
                                                <td id="0_2" onclick="printMovesFor(0,2);" class="w_square"></td>
                                                <td id="0_3" onclick="printMovesFor(0,3);" class="b_square"></td>
                                                <td id="0_4" onclick="printMovesFor(0,4);" class="w_square"></td>
                                                <td id="0_5" onclick="printMovesFor(0,5);" class="b_square"></td>
                                                <td id="0_6" onclick="printMovesFor(0,6);" class="w_square"></td>
                                                <td id="0_7" onclick="printMovesFor(0,7);" class="b_square"></td>
                                            </tr>
                                            <tr>
                                                <td id="1_0" onclick="printMovesFor(1,0);" class="b_square"></td>
                                                <td id="1_1" onclick="printMovesFor(1,1);" class="w_square"></td>
                                                <td id="1_2" onclick="printMovesFor(1,2);" class="b_square"></td>
                                                <td id="1_3" onclick="printMovesFor(1,3);" class="w_square"></td>
                                                <td id="1_4" onclick="printMovesFor(1,4);" class="b_square"></td>
                                                <td id="1_5" onclick="printMovesFor(1,5);" class="w_square"></td>
                                                <td id="1_6" onclick="printMovesFor(1,6);" class="b_square"></td>
                                                <td id="1_7" onclick="printMovesFor(1,7);" class="w_square"></td>
                                            </tr>
                                            <tr>
                                                <td id="2_0" class="w_square" onclick="updateBoardHTML(2,0);"></td>
                                                <td id="2_1" class="b_square" onclick="updateBoardHTML(2,1);"></td>
                                                <td id="2_2" class="w_square" onclick="updateBoardHTML(2,2);"></td>
                                                <td id="2_3" class="b_square" onclick="updateBoardHTML(2,3);"></td>
                                                <td id="2_4" class="w_square" onclick="updateBoardHTML(2,4);"></td>
                                                <td id="2_5" class="b_square" onclick="updateBoardHTML(2,5);"></td>
                                                <td id="2_6" class="w_square" onclick="updateBoardHTML(2,6);"></td>
                                                <td id="2_7" class="b_square" onclick="updateBoardHTML(2,7);"></td>
                                            </tr>
                                            <tr>
                                                <td id="3_0" class="b_square" onclick="updateBoardHTML(3,0);"></td>
                                                <td id="3_1" class="w_square" onclick="updateBoardHTML(3,1);"></td>
                                                <td id="3_2" class="b_square" onclick="updateBoardHTML(3,2);"></td>
                                                <td id="3_3" class="w_square" onclick="updateBoardHTML(3,3);"></td>
                                                <td id="3_4" class="b_square" onclick="updateBoardHTML(3,4);"></td>
                                                <td id="3_5" class="w_square" onclick="updateBoardHTML(3,5);"></td>
                                                <td id="3_6" class="b_square" onclick="updateBoardHTML(3,6);"></td>
                                                <td id="3_7" class="w_square" onclick="updateBoardHTML(3,7);"></td>
                                            </tr>
                                            <tr>
                                                <td id="4_0" class="w_square" onclick="updateBoardHTML(4,0);"></td>
                                                <td id="4_1" class="b_square" onclick="updateBoardHTML(4,1);"></td>
                                                <td id="4_2" class="w_square" onclick="updateBoardHTML(4,2);"></td>
                                                <td id="4_3" class="b_square" onclick="updateBoardHTML(4,3);"></td>
                                                <td id="4_4" class="w_square" onclick="updateBoardHTML(4,4);"></td>
                                                <td id="4_5" class="b_square" onclick="updateBoardHTML(4,5);"></td>
                                                <td id="4_6" class="w_square" onclick="updateBoardHTML(4,6);"></td>
                                                <td id="4_7" class="b_square" onclick="updateBoardHTML(4,7);"></td>
                                            </tr>
                                            <tr>
                                                <td id="5_0" class="b_square" onclick="updateBoardHTML(5,0);"></td>
                                                <td id="5_1" class="w_square" onclick="updateBoardHTML(5,1);"></td>
                                                <td id="5_2" class="b_square" onclick="updateBoardHTML(5,2);"></td>
                                                <td id="5_3" class="w_square" onclick="updateBoardHTML(5,3);"></td>
                                                <td id="5_4" class="b_square" onclick="updateBoardHTML(5,4);"></td>
                                                <td id="5_5" class="w_square" onclick="updateBoardHTML(5,5);"></td>
                                                <td id="5_6" class="b_square" onclick="updateBoardHTML(5,6);"></td>
                                                <td id="5_7" class="w_square" onclick="updateBoardHTML(5,7);"></td>
                                            </tr>
                                            <tr>
                                                <td id="6_0" onclick="printMovesFor(6,0);" class="w_square"></td>
                                                <td id="6_1" onclick="printMovesFor(6,1);" class="b_square"></td>
                                                <td id="6_2" onclick="printMovesFor(6,2);" class="w_square"></td>
                                                <td id="6_3" onclick="printMovesFor(6,3);" class="b_square"></td>
                                                <td id="6_4" onclick="printMovesFor(6,4);" class="w_square"></td>
                                                <td id="6_5" onclick="printMovesFor(6,5);" class="b_square"></td>
                                                <td id="6_6" onclick="printMovesFor(6,6);" class="w_square"></td>
                                                <td id="6_7" onclick="printMovesFor(6,7);" class="b_square"></td>
                                            </tr>
                                            <tr>
                                                <td id="7_0" onclick="printMovesFor(7,0);" class="b_square"></td>
                                                <td id="7_1" onclick="printMovesFor(7,1);" class="w_square"></td>
                                                <td id="7_2" onclick="printMovesFor(7,2);" class="b_square"></td>
                                                <td id="7_3" onclick="printMovesFor(7,3);" class="w_square"></td>
                                                <td id="7_4" onclick="printMovesFor(7,4);" class="b_square"></td>
                                                <td id="7_5" onclick="printMovesFor(7,5);" class="w_square"></td>
                                                <td id="7_6" onclick="printMovesFor(7,6);" class="b_square"></td>
                                                <td id="7_7" onclick="printMovesFor(7,7);" class="w_square"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="botones-game-content">
                    
                                    <div id="botones-adelante-atras">
                                        <button id="boton-ir-atras" class="btn btn-outline-dark" onclick="revertMove()"><</button>
                                        <button id="boton-ir-adelante" class="btn btn-outline-dark" onclick="goForwardMove()">></button>
                                    </div>
                                </div>
                                <p id="Pensando"></p>
                                <div id="demo"></div>
                            </div>

                        <div id="next-moves"></div>
                    </div>
                </div>
            </div>

            

        </div>



    @extends('Layout.footer')


    <script src="engine/Alphaupo.js"></script>
    <script src="js/tf.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#header-basededatos').addClass('active');
        });
    </script>
    <script>
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

            var mat = boardToMat(this.board.board);
            predictModel(mat);

            $("#game-board").html("");
            printBoardHTML(false);
        }

        function goForwardMove() {
            this.board.goForwardMove();

            var mat = boardToMat(this.board.board);
            predictModel(mat);

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

        function boardToMat(board){
            var res = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ]
            for(var i=0;i<board.length;i++){
                for(var j=0; j<board.length;j++){
                    if(board[i][j]!==false){
                        if(board[i][j].name==="wp"){
                            res[i][j] = 1;
                        }
                        else if(board[i][j].name==="bp"){
                            res[i][j] = -1;
                        }
                        else if(board[i][j].name==="wn"){
                            res[i][j] = 2;
                        }
                        else if(board[i][j].name==="bn"){
                            res[i][j] = -2;
                        }
                        else if(board[i][j].name==="wb"){
                            res[i][j] = 3;
                        }
                        else if(board[i][j].name==="bb"){
                            res[i][j] = -3;
                        }
                        else if(board[i][j].name==="wr"){
                            res[i][j] = 4;
                        }
                        else if(board[i][j].name==="br"){
                            res[i][j] = -4;
                        }
                        else if(board[i][j].name==="wq"){
                            res[i][j] = 5;
                        }
                        else if(board[i][j].name==="bq"){
                            res[i][j] = -5;
                        }
                        else if(board[i][j].name==="wk"){
                            res[i][j] = 6;
                        }
                        else if(board[i][j].name==="bk"){
                            res[i][j] = -6;
                        }
                    }
                    
                }
            }

            return res;
        }

        function predictModel(mat){
            document.getElementById("demo").innerHTML = "<div class='lds-dual-ring'></div>";

            let model = load_model();
            
            
            model.then(function (res) {
                const xs = tf.tensor(mat);
                const preds = res.predict([xs.reshape([1,8, 8, 1])]);
                
                var text = "Resulatado red convolucional: ";
                var pos = indexOfMax(Array.from(preds.dataSync()));
                if(pos===0){
                    text = text + "POSICIÓN IGUALADA";
                }
                else if(pos===1){
                    text = text + "BLANCAS GANAN";
                }
                else if(pos===2){
                    text = text + "NEGRAS GANAN";
                }

                document.getElementById("demo").innerHTML = text;
            }, function (err) {
                console.log(err);
            });
        }


    </script>


</body>