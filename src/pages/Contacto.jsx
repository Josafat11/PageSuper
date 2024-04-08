import React, { useState, useEffect } from "react";
import { CONFIGURACIONES } from "../config/confing";
import Map from "../components/Map";


const Contacto = () => {
  const [contactDetails, setContactDetails] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");
  const [mostrarExito, setMostrarExito] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL2 + "/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          email: email,
          comment: comentario,
        }),
      });
      if (response.ok) {
        console.log("Comentario enviado exitosamente");
        setNombre(""); // Limpiar el campo de nombre
        setEmail(""); // Limpiar el campo de email
        setComentario(""); // Limpiar el campo de comentario
        setMostrarExito(true); // Mostrar la notificación de éxito
        // Ocultar la notificación después de unos segundos
        setTimeout(() => {
          setMostrarExito(false);
        }, 3000);
      } else {
        console.error("Error al enviar el comentario:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(CONFIGURACIONES.BASEURL2 + "/contact/");
        if (response.ok) {
          const data = await response.json();
          setContactDetails(data);
        } else {
          console.error(
            "Error al obtener los detalles de contacto:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error al obtener los detalles de contacto:", error);
      }
    };
    fetchContactDetails();
  }, []);

  return (
    <div className="bg-sky-100 p-8">
      {/* Formulario de contacto */}
      <div className="bg-sky-50 p-6 mb-8 pt-10 mt-32">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Formulario de Contacto
        </h2>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="comentario"
            >
              Comentario
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comentario"
              placeholder="Escribe tu comentario aquí"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
      {/* Version de Josa */}
      {/* Notificación de éxito */}
      {mostrarExito && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">¡Éxito!</strong>
          <span className="block sm:inline">
            {" "}
            Comentario enviado correctamente.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setMostrarExito(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Cerrar</title>
              <path d="M14.348 14.849a1 1 0 01-1.415 1.414l-2.829-2.828-2.828 2.828a1 1 0 01-1.414-1.414l2.828-2.829-2.828-2.828a1 1 0 111.414-1.414l2.829 2.828 2.828-2.828a1 1 0 111.415 1.414l-2.828 2.829 2.828 2.828z" />
            </svg>
          </span>
        </div>
      )}

      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Detalles de Contacto</h2>
          {contactDetails ? (
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Dirección:</span>{" "}
                {contactDetails.direccion}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Correo Electrónico:</span>{" "}
                {contactDetails.correoElectronico}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Teléfono:</span>{" "}
                {contactDetails.telefono}
              </p>
            </div>
          ) : (
            <p>Cargando detalles de contacto...</p>
          )}

        </div>
      </div>
      <div>
        <p className=" text-2xl font-bold mb-4 text-center mt-10" > Puedes Encontrarnos en Nuestra Ubicación </p>
        <Map />
      </div>
    </div>
  );
};

export default Contacto;
