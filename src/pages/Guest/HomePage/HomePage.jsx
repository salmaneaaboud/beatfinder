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
              size="lg"
            />
          </Link>
        </div>
      </div>

      {/* Card Section */}
      <div className="container my-5">
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
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
