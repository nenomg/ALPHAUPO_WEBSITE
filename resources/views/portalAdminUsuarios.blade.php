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
    <h1 id="titulo-basededatos">Administrar Usuarios</h1>
    <table id="tabla-de-partidas" class="table table-light table-striped">
        <thead class="table-dark">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr>
                <td>{{$user->id}}</td>
                <td>{{ $user->name}}</td>
                <td>{{ $user->email }}</td>
                <td>
                    @if($user->is_admin == 0)         
                        <i class="ri-close-line"></i>       
                    @else
                        <i class="ri-check-line"></i>  
                    @endif
                </td>
                <td><form method="POST" action="{{route('admin.delete')}}">
                        @csrf    
                        <input type="text" value="{{$user->id}}" name="idUser" hidden>
                        <input type="submit" class="btn btn-danger" value="Eliminar">
                    </form>
                </td>
                <td><a href="../user/edit/{{$user->id}}" class="btn btn-warning">Editar</a></td>
            </tr>
            @endforeach
        </tbody>
        
    </table>
    <div id="links-tabla-usuarios">
        {{ $users->links() }}
    </div>
</div>





    @extends('Layout.footer')

</body>