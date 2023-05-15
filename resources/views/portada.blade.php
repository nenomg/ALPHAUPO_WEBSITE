<!DOCTYPE html>
<html lang="en">

<head>
    @extends('Layout.linksPortada')
</head>

<body>
    <!-- Header -->

@extends('Layout.header-portada')

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <h1>TESIS A LA INFORMÁTICA EN EL AJEDREZ</h1>
          <h2>Alphaupo consiste en varias implementaciones que pretenden resolver el ajedrez y entender mejor la algorítmica con diferentes formas de pensar.</h2>
          <div class="d-flex justify-content-center justify-content-lg-start">
            <a href="{{ route('juega') }}" class="btn-get-started scrollto">JUEGA AHORA</a>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
          <img src="assets/img/icono-piezas.png" class="img-fluid animated" alt="">
        </div>
      </div>
    </div>

  </section><!-- End Hero -->

  <main id="main">

    <!-- ======= Clients Section ======= -->
    <section id="clients" class="clients section-bg">
      <div class="container">

        <div class="row" data-aos="zoom-in">

          <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center margen-automatico">
            <img src="assets/img/clients/upo-icono.png" class="img-fluid" alt="">
          </div>

          <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center margen-automatico">
            <img src="assets/img/clients/html-js-css-logo.png" class="img-fluid" alt="">
          </div>

          <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center margen-automatico">
            <img src="assets/img/clients/laravel-logo.png" class="img-fluid" alt="">
          </div>

          <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center margen-automatico">
            <img src="assets/img/clients/python-logo.png" class="img-fluid" alt="">
          </div>

        </div>

      </div>
    </section><!-- End Cliens Section -->

    <!-- ======= About Us Section ======= -->
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>QUIENES SOMOS</h2>
        </div>

        <div class="row content">
          <!--
          
          -->
          <div class="col-lg-12 pt-4 pt-lg-0">
            <p>
              Alphaupo es un trabajo de investigación sobre la informática en el ajedrez, incluyendo varios puntos
              de vista para computar el ajedrez y nuevas implementaciones para otros aspectos del juego aplicando 
              técnicas de inteligencia artificial.
            </p>
            <br/>
            <p>
              <strong>Investigaciones</strong>
            </p>
            <br/>
            <ul>
              <li><i class="ri-gamepad-line"></i> Algoritmo de Minimax </li>
              <li><i class="ri-gamepad-line"></i> Algoritmo de Minimax con ponderación alpha y beta </li>
              <li><i class="ri-gamepad-line"></i> Modificaciones sobre Minimax</li>
              <li><i class="ri-gamepad-line"></i> Turochamp, algoritmo de Alan Turin como heurística</li>
              <li><i class="ri-bilibili-fill"></i> Redes Convolucionales para la predicción de jaques y jaques mate</li>
              <li><i class="ri-bilibili-fill"></i> Redes Convolucionales como heurística en el ajedrez</li>
            </ul>
          </div>
        </div>

      </div>
    </section><!-- End About Us Section -->




    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>SERVICIOS</h2>
        </div>

        <div class="row">
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><i class="ri-gamepad-line"></i></div>
              <h4><a href="">JUEGA</a></h4>
              <p>Juega contra el algoritmo de Minimax, Minimax con ponderación alpha, beta y demás implementaciones</p>
            </div>
          </div>
          
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box">
            <div class="icon"><i class="bx bx-book"></i></div>
              <h4><a href="">INVESTIGACIÓN</a></h4>
              <p>Investigación a la informática en el ajedrez e implementaciones de modelos antiguos como Turochamp</p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-tachometer"></i></div>
              <h4><a href="">REDES CONVOLUCIONALES</a></h4>
              <p>Redes convolucionales para el aprendizaje de reglas sin conocimiento previo alguno y como método heurístico</p>
            </div>
          </div>
          

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-layer"></i></div>
              <h4><a href="">BASE DE DATOS</a></h4>
              <p>Accede a partidas de varios maestros de ajedrez y filtra las mismas en nuestra base de datos</p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Services Section -->
    
    
        <!-- ======= Skills Section ======= -->
    <section id="skills" class="skills">
      <div class="container" data-aos="fade-up">

        <div class="row">
          <div class="col-lg-6 d-flex align-items-center" data-aos="fade-right" data-aos-delay="100">
            <img style="margin: auto" src="assets/img/icono-ordenador.png" class="img-fluid" alt="">
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
            <h3>Aplicación web</h3>

            <div class="skills-content">

              <div class="progress">
                <span class="skill">LARAVEL <i class="val">100%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div class="progress">
                <span class="skill">HTML <i class="val">30%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div class="progress">
                <span class="skill">PHP <i class="val">30%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div class="progress">
                <span class="skill">JAVASCRIPT <i class="val">25%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div class="progress">
                <span class="skill">CSS <i class="val">15%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section><!-- End Skills Section -->


    <section id="skills" class="skills">
  <div class="container" data-aos="fade-up">
    <div class="row align-items-center">
      <div class="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
        <h3>INVESTIGACIÓN</h3>
        <div class="skills-content">
          <div class="progress">
            <span class="skill">GOOGLE COLABORATORY <i class="val">100%</i></span>
            <div class="progress-bar-wrap">
              <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="progress">
            <span class="skill">PYTHON <i class="val">100%</i></span>
            <div class="progress-bar-wrap">
              <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 d-flex align-items-center" data-aos="fade-right" data-aos-delay="100">
        <img src="assets/img/icono-alphaupo.png" class="img-fluid" alt="">
      </div>
    </div>
  </div>
</section>






    <!-- ======= Team Section ======= -->
    <section id="team" class="team section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>EQUIPO</h2>
          <p>Somos un equipo altamente colaborativo y comprometido, con habilidades complementarias y una pasión compartida por lograr los mejores resultados en todo lo que hacemos.</p>
        </div>

        <div class="row">

          <div class="col-lg-6">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100">
              <div class="pic"><img src="assets/img/team/team-1.png" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Eugenio Menacho de Góngora</h4>
                <span>Estudiante, desarrollador</span>
                <p>Estudiante deIngeniería informática de sistemas de información en la universidad Pablo de Olavide, Escuela Politécnica Superior.</p>
                
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4 mt-lg-0">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200">
              <div class="pic"><img src="assets/img/team/team-2.png" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Francisco Martínez Álvarez</h4>
                <span>Catedrático de universidad, Tutor</span>
                <p>Profesor en la universidad Pablo de Olavide, Escuela Politécnica Superior, Ingeniería informática de sistemas de información. </p>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200">
              <div class="pic"><img src="assets/img/team/team-3.png" class="img-fluid" alt=""></div>
              <div class="member-info">
                <h4>Alicia Troncoso Lora</h4>
                <span>Catedrática de universidad, Coordinadora</span>
                <p>Profesora en la universidad Pablo de Olavide, Escuela Politécnica superior, Ingeniería informática de sistemas de información. </p>
                
              </div>
            </div>
          </div>


        </div>

      </div>
    </section><!-- End Team Section -->





     <!-- ======= About Us Section ======= -->
     <section id="investigation" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Investigación</h2>
        </div>

        <div class="row content">
          <!--
          
          -->
          <div class="col-lg-12 pt-4 pt-lg-0">
            <p>
              El resultado de las investigaciones hemos decidido plasmarlo en cuadernos de Jupyter con el objetivo de que cualquier persona pueda ejecutarlos y probar los códigos proporcionados, accede a la codificación desde aquí: 
                <a href="https://github.com/nenomg/ALPHAUPO-INVESTIGATION">https://github.com/nenomg/ALPHAUPO-INVESTIGATION</a>
            </p>
            <br/>
            <p>
              <strong>Investigaciones</strong>
            </p>
            <br/>
            <ul>
              <li><i class="ri-gamepad-line"></i> Algoritmo de Minimax </li>
              <li><i class="ri-gamepad-line"></i> Algoritmo de Minimax con ponderación alpha y beta </li>
              <li><i class="ri-gamepad-line"></i> Modificaciones sobre Minimax</li>
              <li><i class="ri-gamepad-line"></i> Turochamp, algoritmo de Alan Turin como heurística</li>
              <li><i class="ri-bilibili-fill"></i> Redes Convolucionales para la predicción de jaques y jaques mate</li>
              <li><i class="ri-bilibili-fill"></i> Redes Convolucionales como heurística en el ajedrez</li>
            </ul>
          </div>
        </div>

      </div>
    </section><!-- End About Us Section -->



  </main><!-- End #main -->



  @extends('Layout.footer')








  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</body>

</html>