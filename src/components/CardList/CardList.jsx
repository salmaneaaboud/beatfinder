import trendingProducers from "/src/assets/resources/trendingProducers/trending.json";
import "./CardList.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function CardList() {
  return (
    <>
      <div className="trending-producers-list">
        {trendingProducers?.length > 0 ? (
          trendingProducers.map(({ id, title, producer, image }) => (
            <div className="producer-item" key={id}>
              <img src={image} alt={`${producer}`} className="producer-img" />
              <div className="producer-text">
                <h5 className="producer-title">{title}</h5>
                <p className="producer-subtitle">{producer}</p>
              </div>
              <div className="producer-arrow">
                <span>&#x2794;</span>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productores en tendencia.</p>
        )}
      </div>
    </>
  );
}
