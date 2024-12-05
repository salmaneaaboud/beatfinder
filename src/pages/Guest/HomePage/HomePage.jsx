import "./HomePage.css";
import { Header } from "/src/components/Header/Header";
import { Link } from "react-router-dom";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

function Homepage() {
  const { t, i18n } = useTranslation('home');

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Header />
      <div className="hero d-flex align-items-center justify-content-center position-relative overflow-hidden py-5">
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
          className="hero-img w-100 h-100 position-absolute top-0 start-0" 
          alt={t("hero.alt")} 
        />
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100" />
        <div className="container position-relative text-white">
          <div className="row justify-content-center align-items-center min-vh-75">
            <div className="col-lg-10 text-center">
              <span className="badge bg-primary bg-opacity-25 mb-3 text-uppercase fw-bold">
                {t("hero.badge")}
              </span>
              <h1 className="display-3 fw-bolder mb-4 text-uppercase">
                {t("hero.title")} <span className="text-gradient">{t("hero.subtitle")}</span>
              </h1>
              <p className="fs-4 mb-5 text-white-75 fw-light">
                {t("hero.description")}
              </p>
              <div className="d-flex gap-4 justify-content-center mb-5">
                <Link to="/register">
                  <CustomButton
                    value={t("hero.buttons.start")}
                    type="btn-primary"
                  />
                </Link>
                <Link to="/about">
                  <CustomButton
                    value={t("hero.buttons.explore")}
                    type="btn-outline-light"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card rounded-4 p-4">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 p-4 text-center d-flex flex-column justify-content-center">
                  <h3 className="fw-bold mb-4 text-white">
                    {t("card.title")}
                  </h3>
                  <p className="fs-5 mb-5 text-white-50">
                    {t("card.description")}
                  </p>
                  <div className="text-center">
                    <Link to="/register">
                      <CustomButton
                        value={t("card.button")}
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
                    alt={t("card.alt")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h3 className="text-center text-white mb-4 px-3">
          {t("features.title")}
        </h3>
        <div className="row g-4 row-cols-1 row-cols-md-3 h-100">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className="feature-card text-center p-3 p-md-4 h-100 d-flex flex-column">
                <div className="icon-wrapper mb-3">
                  <i className={`fas ${t(`features.items.${index}.icon`)} fa-2x fa-md-3x text-white`}></i>
                </div>
                <h4 className="text-white fs-5 fs-md-4">
                  {t(`features.items.${index}.title`)}
                </h4>
                <p className="text-white-50 flex-grow-1 small">
                  {t(`features.items.${index}.description`)}
                </p>
                <div className="feature-footer mt-auto">
                  {t(`features.items.${index}.badges`, { returnObjects: true }).map((badge, idx) => (
                    <span key={idx} className="badge bg-primary">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h3 className="fw-normal mb-3 text-white">
          {t("catalog.title")}
        </h3>
        <div className="gallery col-12">
          {t("catalog.items", { returnObjects: true }).map((item, index) => (
            <div key={index} className="gallery-card">
              <figure data-producer={item.name}>
                <img src={item.img} alt={item.alt} />
                <figcaption className="text-white p-3 bg-dark bg-opacity-75 rounded-bottom">
                  <h5 className="mb-0 fw-bold">{item.name}</h5>
                  <p className="mb-0 text-white-50">{item.description}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h3 className="text-center text-white mb-4">{t("testimonials.title")}</h3>
        <div className="row gy-4 gy-md-0">
          {t("testimonials.items", { returnObjects: true }).map((testimonial, index) => (
            <div key={index} className="col-md-6">
              <blockquote className="blockquote text-white h-100 d-flex flex-column justify-content-center">
                <p className="w-100">{testimonial.quote}</p>
                <footer className="blockquote-footer text-white-50">
                  {testimonial.author}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <div className="language-switcher d-flex justify-content-center mt-4">
        <button onClick={() => handleLanguageChange("en")} className="btn btn-outline-light me-2">
          English
        </button>
        <button onClick={() => handleLanguageChange("es")} className="btn btn-outline-light">
          Español
        </button>
      </div>
    </>
  );
}

export default Homepage;
