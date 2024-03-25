
import React, { useState, useEffect } from 'react';
import { CONFIGURACIONES } from '../config/confing';

const AdminFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + "/faq/");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (editId) {
        response = await fetch(CONFIGURACIONES.BASEURL + `/faq/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pregunta: pregunta,
            respuesta: respuesta,
          }),
        });
      } else {
        response = await fetch(CONFIGURACIONES.BASEURL + "/faq/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pregunta: pregunta,
            respuesta: respuesta,
          }),
        });
      }
      if (response.ok) {
        fetchFaqs();
        setPregunta('');
        setRespuesta('');
        setEditId(null);
      } else {
        console.error("Error al guardar la pregunta frecuente:", response.status);
      }
    } catch (error) {
      console.error("Error al guardar la pregunta frecuente:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + `/faq/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchFaqs();
      } else {
        console.error("Error al eliminar la pregunta frecuente:", response.status);
      }
    } catch (error) {
      console.error("Error al eliminar la pregunta frecuente:", error);
    }
  };

  const handleEdit = (faq) => {
    setPregunta(faq.pregunta);
    setRespuesta(faq.respuesta);
    setEditId(faq._id);
  };

  return (
    <div className="bg-sky-100 p-12">
    <h2 className="text-3xl font-bold mb-6">Administrar Preguntas Frecuentes</h2>
    <form onSubmit={handleSubmit} className="mt-16">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pregunta">
            Pregunta
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pregunta"
            type="text"
            placeholder="Ingrese la pregunta"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="respuesta">
            Respuesta
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="respuesta"
            placeholder="Ingrese la respuesta"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {editId ? "Actualizar" : "Agregar"} Pregunta Frecuente
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Listado de Preguntas Frecuentes</h3>
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h4 className="text-lg font-bold mb-2">{faq.pregunta}</h4>
            <p>{faq.respuesta}</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                onClick={() => handleEdit(faq)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDelete(faq._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFaq;
