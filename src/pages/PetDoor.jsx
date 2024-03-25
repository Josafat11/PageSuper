import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { CONFIGURACIONES } from '../config/confing';
import { useUser } from '../context/UseContext'; // Importa el hook useUser del contexto

const RegistroPuerta = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Obtén el usuario del contexto
  const [mac, setMac] = useState("");
  const [name, setName] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [errors, setErrors] = useState({});
  const [onSubmit, setOnSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      mac,
      name,
      closingTime,
      userId: user ? user._id : null, // Utiliza el ID del usuario obtenido del contexto
    };

    try {
      const response = await fetch(CONFIGURACIONES.BASEURL2 + "/petdoor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const json = await response.json();

      if (json.message === 'Puerta registrada exitosamente') {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: json.message,
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: json.message,
        });
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Error interno 500',
      });
    }
  };

  return (
    <div className="bg-sky-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-3/6 mt-44 mb-32 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Registro de Puerta de Mascota
        </h1>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <span>Dirección MAC</span>
            <input
              type="text"
              placeholder="Dirección MAC"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.mac && (
              <p className="text-red-500 text-sm">{errors.mac}</p>
            )}

            <span>Nombre de la Puerta</span>
            <input
              type="text"
              placeholder="Nombre de la Puerta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <span>Hora de Cierre</span>
            <input
              type="time"
              placeholder="Hora de Cierre"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.closingTime && (
              <p className="text-red-500 text-sm">{errors.closingTime}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-teal-700 rounded-lg p-2 col-span-2 hover:bg-green-400 hover:font-bold text-gray-900"
            disabled={onSubmit}
          >
            Registrar Puerta
          </button>
        </form>

        <NavLink
          to="/veriot"
          className="text-center text-sm mt-4 block hover:underline hover:text-emerald-500"
        >
          Ir al Panel de Usuario
        </NavLink>
      </div>
    </div>
  );
};

export default RegistroPuerta;
