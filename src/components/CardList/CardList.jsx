import "./CardList.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function CardList({trendingProducers}) {
  return (
    <>
      <div className="trending-producers-list">
        {trendingProducers?.length > 0 ? (
          trendingProducers.map(({ id, name, email, profile_picture }) => (
            <div className="producer-item" key={id}>
              <img src={profile_picture} alt={`${email}`} className="producer-img" />
              <div className="producer-text">
                <h5 className="producer-title">{name}</h5>
                <p className="producer-subtitle">{email}</p>
              </div>
              <div className="producer-arrow">
              <a href={`/producer/${id}`}>
                <span>&#x2794;</span>
              </a>

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
