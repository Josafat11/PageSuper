import React, { useEffect, useState } from 'react';
import { CONFIGURACIONES } from '../config/confing';

const Politicas = () => {
  const [politicas, setPoliticas] = useState([]);

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        const response = await fetch(CONFIGURACIONES.BASEURL2 + "/politicas/", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPoliticas(data);
        } else {
          console.error('Error al obtener las políticas:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener las políticas:', error);
      }
    };
    fetchPoliticas();
  }, []);

  return (
    <div className="pt-20 bg-sky-100">
      <header className="bg-sky-100 text-gray-900 py-1">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Politicas de Super Pet</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 mt-8 pb-28">
        {politicas.map(politica => (
          <div key={politica._id} className="mb-8">
            <h2 className="font-bold text-xl pb-4">{politica.titulo}</h2>
            <p className="text-gray-700 ">{politica.descripcion}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Politicas;
