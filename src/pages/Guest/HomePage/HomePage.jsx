import "./HomePage.css";
import { Header } from "/src/components/Header/Header";
import { Link } from "react-router-dom";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import "bootstrap/dist/css/bootstrap.min.css";

function Homepage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="hero-container d-flex align-items-center justify-content-center pt-5">
        <div className="container text-center text-white">
          <h1 className="display-3 fw-bold mb-4">Una experiencia única</h1>
          <p className="lead mb-5">
            Productores estrellas, beats ilimitados, sin tags y más
          </p>
          <Link to="/register">
            <CustomButton
              value="Regístrate gratis"
              variant="primary"
            />
          </Link>
        </div>
      </div>

      {/* Card Section */}
      <div className="container-fluid my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card rounded-4 p-4">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 p-4 text-center text-md-start">
                  <h2 className="display-5 fw-bold mb-3 text-white">
                    Explora tu música ahora mismo.
                  </h2>
                  <p className="lead mb-4 text-white-50">
                    Desbloquea nuevas oportunidades con nuestras sencillas
                    herramientas
                  </p>
                  <Link to="/register">
                    <CustomButton
                      value="Empezar ahora"
                      variant="primary"
                      size="lg"
                    />
                  </Link>
                </div>

                <div className="col-12 col-md-6 position-relative">
                  <div className="icon-container">
                    <img className="img-fluid" src="https://cdn-images.dzcdn.net/images/misc/eb40c33a17808f047c69b5aedb6887f8/0x1800-000000-75-0-0.webp"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h2 className="display-5 fw-normal mb-3 text-white">
          Echa un vistazo a nuestro catálogo de productores.
        </h2>
        <div className="gallery col-12">
          <div className="gallery-card">
            <figure>
              <img
                src="https://media.gq.com.mx/photos/66158e1166548ab1bfa23176/3:2/w_2560%2Cc_limit/GQ_Creativity_Awards_Bizarrap.jpg"
                alt="Preview"
              />
            </figure>
          </div>
          <div className="gallery-card">
            <figure>
              <img
                src="https://www.vigoe.es/wp-content/uploads/2023/07/David-Guetta-2.jpg"
                alt="Preview"
              />
            </figure>
          </div>
          <div className="gallery-card">
            <figure>
              <img
                src="https://cdn.themedizine.com/2021/05/pharrell-williams-industria-the-medizine.jpg"
                alt="Preview"
              />
            </figure>
          </div>
          <div className="gallery-card">
            <figure>
              <img
                src="https://cms.afrotech.com/wp-content/uploads/2023/03/Metro-Boomin.jpg"
                alt="Preview"
              />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
