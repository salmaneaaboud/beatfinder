import React from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "./CarouselImage";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import images from "/src/assets/resources/carouselImages.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Carrousel.css";

export function Carrousel() {
  return (
    <Carousel className="carousel">
      {images.map((image, index) => (
        <Carousel.Item key={index} className="carousel-item">
          <div className="carousel-image-container">
            <CarouselImage src={image.src} alt={image.alt} />
          </div>
          <Carousel.Caption className="carousel-caption">
            <h3>{image.label}</h3>
            <p>{image.caption}</p>
            <div className="carousel-buttons">
              <CustomButton type="btn-primary" value="Explorar" />
              <CustomButton type="btn-outline-light" value="Más información" />
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
