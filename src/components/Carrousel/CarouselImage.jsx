import React from "react";
import PropTypes from "prop-types";

function CarouselImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "400px", 
        objectFit: "cover",
      }}
    />
  );
}

CarouselImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

CarouselImage.defaultProps = {
  alt: "Carousel Image",
};

export default CarouselImage;
