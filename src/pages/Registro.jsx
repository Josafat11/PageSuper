import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import { CONFIGURACIONES } from '../config/confing';

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); //confirmacion de contraseña
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [preguntaSecreta, setPreguntaSecreta] = useState(""); // Nuevo estado para la pregunta secreta
  const [respuestaSecreta, setRespuestaSecreta] = useState(""); // Nuevo estado para la respuesta secreta
  const [errors, setErrors] = useState({});
  const [OnSubmit, setOnSubmit] = useState(false);
  
  const validarFechaNacimiento = (fecha) => {
    const fechaMinima = new Date("1950-01-01");
    const fechaMaxima = new Date();
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 12); // Restar 18 años para obtener la fecha máxima permitida

    const fechaIngresada = new Date(fecha);
    return fechaIngresada >= fechaMinima && fechaIngresada <= fechaMaxima;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!nombre.trim()) {
      errors.nombre = "El nombre es requerido";
    }
    if (!apellidos.trim()) {
      errors.lastName = "Los apellidos son requeridos";
    }
    if (!email.trim()) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "El correo electrónico no es válido";
    }
    if (!password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (password !== confirmPassword || !password.trim()) { // Validar que la contraseña coincida con la confirmación de contraseña
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!fechaNacimiento.trim()) {
      errors.fechaNacimiento = "La fecha de nacimiento es requerida";
    } else if (!validarFechaNacimiento(fechaNacimiento)) {
      errors.fechaNacimiento = "Debe tener una edad apropiada para ingresar";
    }
    if (!nombreUsuario.trim() || nombreUsuario.length < 6 || nombreUsuario.length > 12) {
      errors.nombreusuario = "El nombre de usuario debe tener entre 6 y 12 caracteres";
    }
    if (!telefono.trim() || telefono.length !== 10) {
      errors.telefono = "El numero de Telefono debe tener exactamente 10 dígitos";
    }
    // Validar pregunta secreta
    if (!preguntaSecreta.trim()) {
      errors.preguntaSecreta = "La pregunta secreta es requerida";
    }
    // Validar respuesta de pregunta secreta
    if (!respuestaSecreta.trim()) {
      errors.respuestaSecreta = "La respuesta de pregunta secreta es requerida";
    }
    

    if (Object.keys(errors).length === 0) {
      setOnSubmit(!OnSubmit);

      try {
        console.log("Datos enviados al backend:", {
          nombre,
          apellidos,
          email,
          password,
          fechaNacimiento,
          nombreUsuario,
          telefono,
          preguntaSecreta,
          respuestaSecreta
        });
        
        const response = await fetch(CONFIGURACIONES.BASEURL + "/auth/signup", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre,
            apellidos,
            email,
            password,
            fechaNacimiento,
            nombreusuario: nombreUsuario,
            telefono,
            preguntaSecreta,
            respuestaSecreta
          })
        });

        const json = await response.json();

        if (response.ok) {
          console.log("Registro exitoso");
          navigate("/Login"); // Redirect to verification page
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: json.message,
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Error interno 500',
        });
      } finally {
        setOnSubmit(false);
      }
    } else {
      setErrors(errors);
    }
  }

  return (
    <div className="bg-sky-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-3/6 mt-44 mb-32 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Super Pet
        </h1>
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
          Registro de Usuario
        </h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
        <div>
            <span>Ingresa tu Nombre</span>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}
            <span>Apellidos</span>
            <input
              type="text"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">
                {errors.lastName}
              </p>
            )}

            <span>Correo Electrónico</span>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <span>Telefono</span>
            <input
              type="number"
              placeholder="Telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm">{errors.telefono}</p>
            )}

          </div>
          <div>
            <span>Fecha de Nacimiento</span>
            <input
              type="date"
              name="edad"
              id="edad"
              placeholder="Fecha de Nacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.fechaNacimiento && (
              <p className="text-red-500 text-sm">
                {errors.fechaNacimiento}
              </p>
            )}
            <span>Nombre de Usuario</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nombre Usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.nombreusuario && (
              <p className="text-red-500 text-sm">
                {errors.nombreusuario}
              </p>
            )}

            <span>Contraseña</span>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <span>Confirmar Contraseña</span> {/* Nuevo campo para confirmar contraseña */}
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <span>Selecciona una Pregunta Secreta</span>
            <select
              value={preguntaSecreta}
              onChange={(e) => setPreguntaSecreta(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            >
              <option value="">Selecciona una pregunta secreta</option>
              <option value="Nombre de tu primera mascota">Nombre de tu primera mascota</option>
              <option value="Ciudad de nacimiento de tu madre">Ciudad de nacimiento de tu madre</option>
              <option value="Nombre de tu mejor amigo de la infancia">Nombre de tu mejor amigo de la infancia</option>
            </select>
            {errors.preguntaSecreta && (
              <p className="text-red-500 text-sm">{errors.preguntaSecreta}</p>
            )}
          </div>
          {/* Campo para ingresar la respuesta secreta */}
          <div>
            <span>Respuesta Secreta</span>
            <input
              type="text"
              placeholder="Respuesta Secreta"
              value={respuestaSecreta}
              onChange={(e) => setRespuestaSecreta(e.target.value)}
              className="input border border-gray-300 p-2 w-full rounded-md"
            />
            {errors.respuestaSecreta && (
              <p className="text-red-500 text-sm">
                {errors.respuestaSecreta}
              </p>
            )}
          </div>
          

            <button
              type="submit"
              className="btn bg-teal-700 rounded-lg p-2 col-span-2 hover:bg-green-400 hover:font-bold text-gray-900"
              disabled={OnSubmit}
              >
              Registrarse
            </button>
          
        </form>

        <NavLink
          to="/login"
          className="text-center text-sm mt-4 block hover:underline hover:text-emerald-500"
        >
          Ya tienes Cuenta? Inicia Sesión
        </NavLink>
      </div>
    </div>
  );
};

export default Registro;
