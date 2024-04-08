import React from "react";
import Carrusel from "../components/Carrusel";

const Home = () => {
  return (
    <div className="bg-sky-100 p-20">
      <div className="text-slate-900 pt-24 text-center">
        <h1 className="font-bold text-6xl">Bienvenido a Super Pet</h1>
        <p className="pt-10 text-xl font-medium text-slate-900">
          ¡¡ Puertas inteligentes para tu mascota !!
        </p>
      </div>

      <Carrusel />

      <div className="bg-sky-100 text-center mt-24">
        <h2 className="font-bold text-5xl">
          Nuestro producto más novedoso !!!
        </h2>

        {/* Tarjeta para el producto estrella */}
        <div className="max-w-5xl mx-auto rounded overflow-hidden shadow-lg m-12 flex justify-center">
          {/* Contenedor para la imagen */}
          <div className="w-1/2">
            <img
              className="w-full"
              src="imagen_producto_estrella.jpg"
              alt="Producto Estrella"
            />
          </div>

          {/* Contenedor para las especificaciones */}

        </div>



      </div>
    </div>
  );
};

export default Home;
