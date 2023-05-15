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

    <link href="css/portalAdmin.css" rel="stylesheet">

    @extends('Layout.linksPortada')
</head>
<body>
    @extends('Layout.header')
<div id="contenido2">
    <h1 id="titulo-basededatos">Portal Administrador</h1>
        <div id="botonesAdmin">
            <a href="{{route('admin.users')}}"><span>Usuarios</span></a>
            <a href="{{route('admin.partidas')}}"><span>Partidas</span></a>
        </div>
</div>





    @extends('Layout.footer')


    <script src="engine/Alphaupo.js"></script>
    <script src="js/basededatos.js"></script>

</body>