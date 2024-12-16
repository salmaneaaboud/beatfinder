import "./HomePage.css";
import { Header } from "/src/components/Header/Header";
import { Link } from "react-router-dom";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from 'react-i18next';

function Homepage() {
  const { t } = useTranslation(); 

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="hero d-flex align-items-center justify-content-center position-relative overflow-hidden py-5">
        {/* Imagen y overlay */}
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
          className="hero-img w-100 h-100 position-absolute top-0 start-0" 
          alt={t("homepage.hero_description")} 
        />
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100" />
        
        {/* Contenido principal */}
        <div className="container position-relative text-white">
          <div className="row justify-content-center align-items-center min-vh-75">
            <div className="col-lg-10 text-center">
              <span className="badge bg-primary bg-opacity-25 mb-3 text-uppercase fw-bold">
                {t("homepage.hero_title")}
              </span>
              
              <h1 className="display-3 fw-bolder mb-4 text-uppercase">
                {t("homepage.hero_subtitle")} <span className="text-gradient">{t("homepage.hero_subtitle_span")}</span>
              </h1>
              
              <p className="fs-4 mb-5 text-white-75 fw-light">
                {t("homepage.hero_description")}
              </p>
              
              <div className="d-flex gap-4 justify-content-center mb-5">
                <Link to="/register">
                  <CustomButton
                    value={t("homepage.start_free")}
                    type="btn-primary"
                  />
                </Link>
                <Link to="/about">
                  <CustomButton
                    value={t("homepage.explore_beats")}
                    type="btn-outline-light"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card rounded-4 p-4">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 p-4 text-center d-flex flex-column justify-content-center">
                  <h3 className="fw-bold mb-4 text-white">
                    {t("homepage.start_today")}
                  </h3>
                  <p className="fs-5 mb-5 text-white-50">
                    {t("homepage.create_account")}
                  </p>
                  <div className="text-center">
                    <Link to="/register">
                      <CustomButton
                        value={t("homepage.register")}
                        variant="primary"
                        size="lg"
                      />
                    </Link>
                  </div>
                </div>

                <div className="col-12 col-md-6 px-4">
                  <img
                    className="img-fluid rounded shadow-lg"
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
                    alt={t("homepage.hero_description")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h3 className="text-center text-white mb-4 px-3">
          {t("homepage.features_title")}
        </h3>
        <div className="row g-4 row-cols-1 row-cols-md-3 h-100">
          <div className="col-12 col-md-4">
            <div className="feature-card text-center p-3 p-md-4 h-100 d-flex flex-column">
              <div className="icon-wrapper mb-3">
                <i className="fas fa-music fa-2x fa-md-3x text-white"></i>
              </div>
              <h4 className="text-white fs-5 fs-md-4">{t("homepage.quality_sound")}</h4>
              <p className="text-white-50 flex-grow-1 small">
                {t("homepage.quality_description")}
              </p>
              <div className="feature-footer mt-auto d-flex flex-wrap justify-content-center gap-2">
                <span className="badge bg-primary">WAV</span>
                <span className="badge bg-primary">MP3</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-card text-center p-3 p-md-4 h-100 d-flex flex-column">
              <div className="icon-wrapper mb-3">
                <i className="fas fa-sliders-h fa-2x fa-md-3x text-white"></i>
              </div>
              <h4 className="text-white fs-5 fs-md-4">{t("homepage.easy_to_use")}</h4>
              <p className="text-white-50 flex-grow-1 small">
                {t("homepage.easy_description")}
              </p>
              <div className="feature-footer mt-auto">
                <span className="badge bg-primary d-inline-block text-wrap px-2">{t("homepage.filters")}</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-card text-center p-3 p-md-4 h-100 d-flex flex-column">
              <div className="icon-wrapper mb-3">
                <i className="fas fa-users fa-2x fa-md-3x text-white"></i>
              </div>
              <h4 className="text-white fs-5 fs-md-4">{t("homepage.collaborations")}</h4>
              <p className="text-white-50 flex-grow-1 small">
                {t("homepage.collaborations_description")}
              </p>
              <div className="feature-footer mt-auto d-flex flex-wrap justify-content-center gap-2">
                <span className="badge bg-primary">{t("homepage.comment_system")}</span>
                <span className="badge bg-primary">{t("homepage.contacts")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h3 className="fw-normal mb-3 text-white">
          {t("homepage.catalog_title")}
        </h3>
        <div className="gallery col-12">
          <div className="gallery-card">
            <figure data-producer="Bizarrap">
              <img
                src="https://media.gq.com.mx/photos/66158e1166548ab1bfa23176/3:2/w_2560%2Cc_limit/GQ_Creativity_Awards_Bizarrap.jpg"
                alt="Bizarrap"
              />
              <figcaption className="text-white p-3 bg-dark bg-opacity-75 rounded-bottom">
                <h5 className="mb-0 fw-bold">Bizarrap</h5>
                <p className="mb-0 text-white-50">{t("homepage.bizarrap_description")}</p>
              </figcaption>
            </figure>
          </div>
          <div className="gallery-card">
            <figure data-producer="David Guetta">
              <img
                src="https://www.vigoe.es/wp-content/uploads/2023/07/David-Guetta-2.jpg"
                alt="David Guetta"
              />
              <figcaption className="text-white p-3 bg-dark bg-opacity-75 rounded-bottom">
                <h5 className="mb-0 fw-bold">David Guetta</h5>
                <p className="mb-0 text-white-50">{t("homepage.guetta_description")}</p>
              </figcaption>
            </figure>
          </div>
          <div className="gallery-card">
            <figure data-producer="Pharrell Williams">
              <img
                src="https://cdn.themedizine.com/2021/05/pharrell-williams-industria-the-medizine.jpg"
                alt="Pharrell Williams"
              />
              <figcaption className="text-white p-3 bg-dark bg-opacity-75 rounded-bottom">
                <h5 className="mb-0 fw-bold">Pharrell Williams</h5>
                <p className="mb-0 text-white-50">{t("homepage.williams_description")}</p>
              </figcaption>
            </figure>
          </div>
          <div className="gallery-card">
            <figure data-producer="Metro Boomin">
              <img
                src="https://cms.afrotech.com/wp-content/uploads/2023/03/Metro-Boomin.jpg"
                alt="Metro Boomin"
              />
              <figcaption className="text-white p-3 bg-dark bg-opacity-75 rounded-bottom">
                <h5 className="mb-0 fw-bold">Metro Boomin</h5>
                <p className="mb-0 text-white-50">{t("homepage.boomin_description")}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container my-5">
        <h3 className="text-center text-white mb-4">{t("homepage.testimonials_title")}</h3>
        <div className="row gy-4 gy-md-0">
          <div className="col-md-6">
            <blockquote className="blockquote text-white h-100 d-flex flex-column justify-content-center">
              <p className="w-100">
                &quot;{t("homepage.testimonial_1")}&quot;
              </p>
              <footer className="blockquote-footer text-white-50">
                {t("homepage.testimonial_1_author")}
              </footer>
            </blockquote>
          </div>
          <div className="col-md-6">
            <blockquote className="blockquote text-white h-100 d-flex flex-column justify-content-center">
              <p className="w-100">
                &quot;{t("homepage.testimonial_2")}&quot;
              </p>
              <footer className="blockquote-footer text-white-50">
                {t("homepage.testimonial_2_author")}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}





export default Homepage;
