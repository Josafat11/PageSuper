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
          <div className="w-1/2 px-6 py-4">
            <div className="font-bold text-xl mb-2">Producto Estrella</div>
            <p className="text-gray-700 text-base">
              Descripción detallada del Producto Estrella.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Precio del producto */}
            <div className="px-6 pt-4 pb-2">
              <p className="text-gray-700 text-base">$50</p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default Home;
