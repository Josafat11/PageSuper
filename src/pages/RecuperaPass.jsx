import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { CONFIGURACIONES } from '../config/confing';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendCode = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(CONFIGURACIONES.BASEURL2 + "/auth/forgotPasswordEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: json.message,
        });
        navigate('/recuperarpass2');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: json.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error interno 500 " + error,
      });
    }
  };

  return (
    <div className="bg-sky-200 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Super Pet</h1>
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Recuperación de Contraseña</h2>

        <form className="flex flex-col gap-4">
          <label className="block" htmlFor="email">
            <span className="block text-sm font-medium text-slate-700">Correo Electrónico</span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="input border border-gray-300 p-2 w-80 rounded-md"
              placeholder="Ingresa tu Correo Electrónico"
            />
          </label>

          <button
            onClick={handleSendCode}
            className="btn bg-teal-700 rounded-lg p-2 w-80 hover:bg-emerald-400"
          >
            Enviar Código de Verificación
          </button>

          <p className="text-center text-sm mt-4">
            ¿Recuperar por pregunta?{" "}
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={() => navigate("/recuperarpassp")}
            >
              Recupéralo aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
