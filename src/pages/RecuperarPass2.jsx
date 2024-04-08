import React, { useState } from "react";
import Swal from 'sweetalert2';
import { CONFIGURACIONES } from '../config/confing';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "code") {
      setCode(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();
  
    try {
      console.log("Código secreto:", code); // Imprime el código secreto
  
      const res = await fetch(CONFIGURACIONES.BASEURL2 + "/auth/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, secretCode: code, newPassword }),
      });
  
      const json = await res.json();
  
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: json.message,
        });
        navigate('/login');
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
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Recuperación de Contraseña Verificacion</h2>

        {/* Formulario para ingresar el correo electrónico */}
        <form className="flex flex-col gap-4 mt-4">
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

          {/* Formulario para verificar el código y establecer una nueva contraseña */}
          <label className="block" htmlFor="code">
            <span className="block text-sm font-medium text-slate-700">Código de Verificación</span>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={handleChange}
              className="input border border-gray-300 p-2 w-80 rounded-md"
              placeholder="Ingresa tu Código de Verificación"
            />
          </label>

          <label className="block" htmlFor="newPassword">
            <span className="block text-sm font-medium text-slate-700">Nueva Contraseña</span>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              className="input border border-gray-300 p-2 w-80 rounded-md"
              placeholder="Ingresa tu Nueva Contraseña"
            />
          </label>

          <button
            onClick={handleVerifyCode}
            className="btn bg-teal-700 rounded-lg p-2 w-80 hover:bg-emerald-400"
          >
            Confirmar Nueva Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
