  <!-- ======= Footer ======= -->
  <footer id="footer">

    <div class="footer-top">
      <div class="container">
        <div class="row justify-content-center">

          <div class="col-lg-3 col-md-6 footer-contact mx-3">
            <h3>ALPHAUPO</h3>
            <p>
              Ctra. de Utrera, 1, 41013<br>
              Sevilla <br><br>
              <strong>Email:</strong> emende@alu.upo.es<br>
            </p>
          </div>

          <div class="col-lg-3 col-md-6 footer-links mx-3">
            <h4>LINKS</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('juega') }}">Juega</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('basededatos') }}">Base de Datos</a></li>
              @auth
                @if(auth()->user()->is_admin == 1)
                  <li><i class="bx bx-chevron-right"></i><a href="{{ route('admin') }}">Portal Administrador</a></li>
                @endif
              @endauth



              @auth 

                @else
                <li><i class="bx bx-chevron-right"></i><a href="{{ route('login') }}">Login</a></li>
                <li><i class="bx bx-chevron-right"></i><a href="{{ route('register') }}">Register</a></li>
              @endauth
            </ul>
          </div>


          <div class="col-lg-3 col-md-6 footer-links mx-3">
            <h4>SOCIAL</h4>
            <p>Échale un ojo a nuestros métodos de comunicación.</p>
            <div class="social-links mt-3">
              <a href="https://github.com/nenomg" class="twitter"><i class="bx bxl-github"></i></a>
              <a href="https://www.upo.es/" class="facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z"/><path fill="currentColor" d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z"/></svg></a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="container footer-bottom clearfix">
      <div class="copyright">
        &copy; Copyright <strong><span>ALPHAUPO</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/ -->
      </div>
    </div>
  </footer><!-- End Footer -->