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
    <link href="../css/board.css" rel="stylesheet">

    @include('Layout.linksPortada')
</head>
<body>
    @extends('Layout.header')
    <div id="contenido2">
    <h1 id="titulo-basededatos">Administrar Partidas</h1>
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
                <td><form method="POST" action="{{route('admin.partidas.delete')}}">
                        @csrf    
                        <input type="text" value="{{$partida->Id}}" name="idPartida" hidden>
                        <input type="submit" class="btn btn-danger" value="Eliminar">
                    </form>
                </td>   
            </tr>
            @endforeach
        </tbody>
        
    </table>
    <div id="links-tabla-partidas">
        {{ $partidas->links() }}
    </div>
</div>
