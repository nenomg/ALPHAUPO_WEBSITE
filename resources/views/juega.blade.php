<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>

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

    @extends('Layout.linksPortada')
</head>

<body>
    @extends('Layout.header')
    <div id="contenido">
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
                <button id="boton-empezar-partida" class="btn btn-primary" onclick="beginGame()">EMPEZAR PARTIDA</button>
                
                <div id="botones-adelante-atras">
                    <button type="button" id="boton-seleccion-algoritmo" class="btn btn-dark" onclick="showModalSelection()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                      </svg>
                      <p id="algoritmo-utilizado">Minimax</p>
                    </button>

                    <i id="icono-cambio-de-lado" onclick="swapSides()" class="ri-swap-line"></i>
                    
                    <button id="boton-ir-atras" class="btn btn-outline-dark" onclick="revertMove()"><</button>
                    <button id="boton-ir-adelante" class="btn btn-outline-dark" onclick="goForwardMove()">></button>
                    
                </div>
                
            </div>
            <div>
                <p id="Pensando"></p>
            </div>
        </div>
        



        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Selecciona la pieza a promocionar</h5>
                        <button type="button" class="btn-close" aria-label="Close" onclick="closeModalPromotion()"></button>
                    </div>
                    <div class="modal-body">
                        <div id="promotion-modal-pieces">

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal Checkmate / Stalemate -->
        <div class="modal fade" id="modalCheckmate" tabindex="-1" role="dialog" aria-labelledby="modalCheckmateLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCheckmateLabel">CHECKMATE</h5>
                        <button type="button" class="btn-close" aria-label="Close" onclick="closeModalCheckmate()"></button>
                    </div>
                    <div class="modal-body">
                        <div id="checkmateModalBody">
                        <span id="modalCheckmateMessage"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Stalemate -->

        <div class="modal fade" id="modalStalemate" tabindex="-1" role="dialog" aria-labelledby="modalStalemateLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalStalemateLabel">STALEMATE</h5>
                        <button type="button" class="btn-close" aria-label="Close" onclick="closeModalStalemate()"></button>
                    </div>
                    <div class="modal-body">
                        <div id="stalemateModalBody">
                            <span id="modalStalemateMessage"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <!-- Modal -->
    <div class="modal fade" id="modelo-seleccion-algoritmo" tabindex="-1" role="dialog" aria-labelledby="modelo-seleccion-algoritmoLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelo-seleccion-algoritmoLabel">Selecciona el algoritmo</h5>
                <button type="button" class="btn-close" aria-label="Close" onclick="closeModalSelection()"></button>
            </div>
            <div class="modal-body">
              <div id="formulario-seleccion-algoritmo">
                <h3>Selección del algoritmo: </h3>
    
                <div class="form-group">
                    <label for="algoritmo-en-uso">Selección del algoritmo</label>
                    <select selected="1" class="form-control" id="algoritmo-en-uso">
                        <option selected="selected" value="0">Minimax</option>
                        <option value="1">Minimax con ponderación alpha y beta</option>
                        <option value="2">Minimax alpha y beta + database</option>
                        <option value="3">Minimax alpha y beta 2</option>
                    </select>
                    <label for="profundidad-del-algoritmo">Selección de la profundidad</label>
                    <input class="form-control" value="3" id="profundidad-del-algoritmo" type="number" min="1" />

                    <br/>
                    <div id="contenido-boton-modelo-seleccion-continuar">
                      <button id="boton-modelo-seleccion-continuar" class="btn btn-success" onclick="closeModalSelection()">Continuar</button>
                    </div>
                </div>
                
              </div>
              
            </div>
        </div>
    </div>
</div>
<div id="resultado-completado"></div>
<div id="movimiento-completado"></div>


    @extends('Layout.footer')



    <div id ="databaseMove">
    </div>
    <script src="engine/Alphaupo.js"></script>
    <script src="engine/minimax.js"></script>
    <script src="engine/mcts.js"></script>
    <script src="js/playChess.js"></script>
    <script>
        $(document).ready(function() {
            $('#header-juega').addClass('active');
        });
    </script>
</body>

</html>
