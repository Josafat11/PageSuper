import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import anuncio from "../assets/anuncio.jpeg";
import anuncio2 from "../assets/anuncio2.jpeg";
import anuncio3 from "../assets/anuncio3.jpg";
import anuncio4 from "../assets/anuncio4.jpg";

const Carrusel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
    
      return (
        <div className="container mx-auto">
          <Slider {...settings} className="mt-32" arrows={false}>
            <div className="overflow-hidden w-96 h-96">
              <img
                src={anuncio}
                alt="Anuncio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden h-96">
              <img
                src={anuncio2}
                alt="Anuncio 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden h-96">
              <img
                src={anuncio3}
                alt="Imagen 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden h-96">
              <img
                src={anuncio4}
                alt="Imagen 4"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Agrega más imágenes según sea necesario */}
          </Slider>
        </div>
      );
}

export default Carrusel
