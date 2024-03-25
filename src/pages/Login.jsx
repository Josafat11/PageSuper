import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useUser } from "../context/UseContext";
import { CONFIGURACIONES } from '../config/confing';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const errors = {};
    if (!email.trim()) {
      errors.email = "El correo electrónico es requerido";
    }
    if (!password.trim()) {
      errors.password = "La contraseña es requerida";
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // Detener el envío del formulario si hay errores
    }

    try {
      const res = await fetch(CONFIGURACIONES.BASEURL + "/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const json = await res.json();
  
      if (res.ok) {
        console.log(json);
        // Almacena el token en el almacenamiento local (localStorage)
        localStorage.setItem('token', json.token);
      
        // Almacena el usuario en el almacenamiento local (localStorage)
        localStorage.setItem('user', JSON.stringify({ email, role: json.role }));
      
        // Establece el usuario y su rol en el contexto
        setUser({ email, role: json.role, _id: json.id }); // Agregar el _id del usuario
      
        if (json.role === "admin") {
          navigate('/adminhome');
        } else {
          console.log(json.role)
          console.log(json)
          navigate('/Home');
        }
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
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Login de Usuario</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </label>

          <label className="block" htmlFor="password">
            <span className="block text-sm font-medium text-slate-700">Contraseña</span>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="input border border-gray-300 p-2 w-80 rounded-md"
              placeholder="Ingresa tu Contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </label>

          <button
            type="submit"
            className="btn bg-teal-700 rounded-lg p-2 w-80 hover:bg-emerald-400"
          >
            Iniciar Sesión
          </button>
        </form>

        <NavLink to="/registro" className="text-center text-sm mt-4 block hover:underline hover:text-emerald-500">
          ¿No tienes cuenta? Registrarse
        </NavLink>
        <NavLink to="/recuperarpass" className="text-center text-sm mt-4 block hover:underline hover:text-emerald-500">
          ¿Olvidaste tu Contraseña? Click Aquí
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
