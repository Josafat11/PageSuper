import React, { useState, useEffect } from "react";
import { CONFIGURACIONES } from '../config/confing';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL2 + "/faq/");
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      } else {
        console.error('Error al obtener las preguntas frecuentes:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener las preguntas frecuentes:', error);
    }
  };

  return (
    <div>
      <div>
        <header className="bg-sky-100 text-gray-900 py-4">
          <div className="container mx-auto pt-12">
            <h1 className="text-3xl font-bold">Preguntas Frecuentes (FAQ)</h1>
          </div>
        </header>
        <main className="bg-sky-100 pb-20 ">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold mb-4">{faq.pregunta}</h2>
                  <p>{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FaqPage;
