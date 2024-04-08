import React, { useState, useEffect } from "react";
import nosotros1 from '../assets/nosotros1.jpg'
import { CONFIGURACIONES } from "../config/confing";

const Nosotros = () => {
  const [nosotrosInfo, setNosotrosInfo] = useState(null);

  useEffect(() => {
    const fetchNosotrosInfo = async () => {
      try {
        const response = await fetch(CONFIGURACIONES.BASEURL2 + "/nosotros/");
        if (response.ok) {
          const data = await response.json();
          setNosotrosInfo(data);
        } else {
          console.error('Error al obtener la información de Nosotros:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener la información de Nosotros:', error);
      }
    };

    fetchNosotrosInfo();
  }, []);

  return (
    <div className="bg-sky-100 justify-center items-center pt-32 pb-32 mt-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-10 mr-10">

        {/* Tarjeta 1 */}
        <div className="bg-sky-100 p-8 text-center">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-4 pt-28">
            ¡Bienvenido a Super Pet!
          </h2>
          {nosotrosInfo ? (
            <p className="text-lg text-gray-700 pt-16">{nosotrosInfo.resumen}</p>
          ) : (
            <p>Cargando información...</p>
          )}
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-sky-100 p-8 text-center">
          <div className="">
            <img src={nosotros1} alt="Nosotros" className="w-auto h-auto object-cover" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-32 ml-10 mr-10 text-center">
        {/* Tarjeta 3 - Mision */}
        <div className="bg-sky-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-4">Misión</h2>
          {nosotrosInfo ? (
            <p className="text-lg text-gray-700">{nosotrosInfo.mision}</p>
          ) : (
            <p>Cargando información...</p>
          )}
        </div>
        {/* Tarjeta 4 - Vision */}
        <div className="bg-sky-100 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-4">Visión</h2>
          {nosotrosInfo ? (
            <p className="text-lg text-gray-700">{nosotrosInfo.vision}</p>
          ) : (
            <p>Cargando información...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
