  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><a href="{{ route('portada') }}">ALPHAUPO</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="{{ route('portada') }}">Home</a></li>
          <li><a class="nav-link" href="{{ route('juega') }}">Juega</a></li>
          <li><a class="nav-link" href="{{ route('basededatos') }}">Base de Datos</a></li>
          <li><a class="nav-link scrollto" href="#about">Nosotros</a></li>
          <li><a class="nav-link scrollto" href="#services">Servicios</a></li>
          <li><a class="nav-link   scrollto" href="#skills">Tecnologías</a></li>
          <li><a class="nav-link scrollto" href="#team">Equipo</a></li>
              @auth
                @if(auth()->user()->is_admin == 1)
                  <li><a href="{{ route('admin') }}">Portal Administrador</a></li>
                @endif
              @endauth



              @auth 
                <li><a href="" onclick="event.preventDefault();document.getElementById('logoutForm').submit();">{{auth()->user()->name}} <i style="font-size: 18px" class="ri-shut-down-line"></i></a></li>
                <form id="logoutForm" action="{{ route('logout') }}" method="POST" class="d-none">
                  @csrf
                </form>

                @else
                <li><a href="{{ route('login') }}">Login</a></li>
                <li><a href="{{ route('register') }}">Register</a></li>
              @endauth

              


        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->